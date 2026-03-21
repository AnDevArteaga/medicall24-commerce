import { useEffect, useRef, useState } from "react";
import { usePurchaseContext } from "../contexts/checkout";
import { fillRegisterPurchase } from "./usePaymentFlow";
import { useSavePurchaseData } from "./useSavePurchaseData";
import {
    checkAsyncPaymentUrl,
    fetchPaymentStatus,
    payment,
} from "../services/azure/payments";
import { createConsultation, updatePurchaseData, getPurchaseIdByTransactionId, sendConfirmationEmail } from "../services/supabase/payment";

export const useGenerateTransaction = () => {
    const [loading, setLoading] = useState(false);
    const [consultationCreated, setConsultationCreated] = useState(false);

    // 🔒 refs para evitar dobles ejecuciones
    const purchaseSavedRef = useRef(false);
    const pollingStoppedRef = useRef(false);
    const consultationCreatedRef = useRef(false);

    const {
        generalPaymentData,
        setRegisterPurchase,
        registerPurchase,
        startFetchingStatusPayment,
        setStartFetchingStatusPayment,
        setMessage,
        setStatus,
        setOrder,
        purchaseData,
        paymentMethod,
        detailPayment,
        product,
        userId,
        setConsultationResult,
        idMunicipioInstitucion,
    } = usePurchaseContext();

    const { savePurchase } = useSavePurchaseData();

    // Resetear refs cuando cambia la transacción
    useEffect(() => {
        if (!registerPurchase.id_transaccion) {
            purchaseSavedRef.current = false;
            pollingStoppedRef.current = false;
            consultationCreatedRef.current = false;
            setConsultationCreated(false);
        }
    }, [registerPurchase.id_transaccion]);

    /* =======================
        GENERAR TRANSACCIÓN Y GUARDAR COMPRA
       ======================= */
    const handleGenerateTransaction = async () => {
        try {
            const transactionId = await payment(generalPaymentData);
            if (!transactionId) {
                console.error("❌ No se pudo generar la transacción");
                return null;
            }

            setRegisterPurchase((prev) => ({
                ...prev,
                id_transaccion: transactionId,
            }));

            // 💾 GUARDAR COMPRA INMEDIATAMENTE después de generar la transacción
            if (!purchaseSavedRef.current) {
                console.log("💾 [SAVE] Guardando compra inmediatamente después de generar transacción");
                
                const initialOrder = {
                    estado_transaccion: "pendiente",
                    fecha_compra: new Date().toISOString(),
                    fecha_pago: new Date().toISOString(),
                    id_transaccion: transactionId,
                    ip_transaccion: "0",
                };

                const filled = await fillRegisterPurchase(
                    userId,
                    purchaseData,
                    paymentMethod,
                    detailPayment,
                    product,
                    registerPurchase,
                    initialOrder
                );

                const saved = await savePurchase(
                    filled,
                    idMunicipioInstitucion
                );

                if (saved?.id_compra) {
                    purchaseSavedRef.current = true;
                    console.log("✅ [SAVE] Compra guardada con id_compra:", saved.id_compra);
                } else {
                    console.error("❌ [SAVE] No se pudo obtener id_compra de la compra guardada");
                }
            }

            return transactionId;
        } catch (error) {
            console.error("❌ Error al generar transacción:", error);
            return null;
        }
    };

    const handleCheckAsyncPaymentUrl = async (transactionId: string) => {
        return await checkAsyncPaymentUrl(transactionId);
    };

    const redirectToPaymentPage = (url?: string) => {
        if (url) window.open(url, "_blank");
    };

    /* =======================
        POLLING - ACTUALIZAR COMPRA Y CREAR CONSULTA
       ======================= */
    useEffect(() => {
        const transactionId = registerPurchase.id_transaccion;
        let intervalId: ReturnType<typeof setInterval> | null = null;
        const intervalIdRef: { current: ReturnType<typeof setInterval> | null } = { current: null };

        const poll = async () => {
            try {
                const order = await fetchPaymentStatus(transactionId);

                console.log("🔄 [POLL] Order completo:", order);
                console.log("🔄 [POLL] order.order:", order.order);

                const orderStatus = order.order?.status;
                console.log("🔄 [POLL] orderStatus:", orderStatus);
                console.log("🔄 [POLL] orderStatus tipo:", typeof orderStatus);
                console.log("🔄 [POLL] orderStatus toLowerCase:", orderStatus?.toLowerCase());
                
                const isApproved =
                    orderStatus === "APPROVED" ||
                    orderStatus === "Approved" ||
                    orderStatus?.toLowerCase() === "aprobada";
                
                console.log("🔄 [POLL] isApproved:", isApproved);
                console.log("🔄 [POLL] consultationCreated:", consultationCreated);

                setOrder(order);
                setStatus(orderStatus);
                setMessage(order.message);
                setLoading(false);

                /* =======================
                    ACTUALIZAR COMPRA Y CREAR CONSULTA CUANDO ESTÉ APROBADA
                   ======================= */
                if (isApproved && !consultationCreatedRef.current) {
                    console.log("✅ [APPROVED] Pago aprobado, obteniendo id_compra y creando consulta");
                    
                    // Obtener id_compra desde la base de datos usando id_transaccion
                    const idCompra = await getPurchaseIdByTransactionId(transactionId);
                    console.log("🔄 [POLL] id_compra obtenido:", idCompra);
                    
                    if (!idCompra) {
                        console.error("❌ [POLL] No se pudo obtener id_compra, no se puede crear consulta");
                        return;
                    }

                    // Marcar de inmediato para evitar que otro poll cree la consulta otra vez
                    consultationCreatedRef.current = true;
                    setConsultationCreated(true);
                    
                    console.log("✅ [APPROVED] id_compra encontrado:", idCompra);

                    // Actualizar compra existente a estado "aprobada"
                    try {
                        console.log("🔄 [UPDATE] Actualizando compra con id_compra:", idCompra);
                        console.log("🔄 [UPDATE] order.data:", order.data);
                        console.log("🔄 [UPDATE] order.order.paymentRemoteIP:", order.order?.paymentRemoteIP);
                        
                        await updatePurchaseData(idCompra, {
                            estado_transaccion: "aprobada",
                            fecha_pago: order.data?.created_at || new Date().toISOString(),
                            ip_transaccion: order.order?.paymentRemoteIP ?? "0",
                        });
                        console.log("✅ [UPDATE] Compra actualizada a aprobada");
                    } catch (error) {
                        console.error("❌ [UPDATE] Error actualizando compra:", error);
                    }

                    /* =======================
                        CORREO DE CONFIRMACIÓN Y LUEGO CREAR CONSULTA (ASIGNAR CITA)
                       ======================= */
                    console.log("[POLL] Enviando correo confirmación id_compra:", idCompra);
                    await sendConfirmationEmail(idCompra, transactionId);

                    try {
                        console.log("📅 [CONSULT] Creando consulta con id_compra:", idCompra);

                        const consultation = await createConsultation(
                            transactionId,
                            idCompra
                        );

                        // Verificar si la consulta fue exitosa
                        if (consultation.error || (consultation.status !== 200 && consultation.status !== 201)) {
                            // Extraer mensaje de error del objeto retornado
                            const errorMessage = consultation.data?.error || 
                                (typeof consultation.data === 'object' && consultation.data !== null && 'error' in consultation.data 
                                    ? String(consultation.data.error) 
                                    : 'Error al crear la consulta');
                            
                            console.error("❌ [CONSULT] Error en respuesta:", errorMessage);
                            
                            // Establecer el resultado con el error para que se muestre en el modal de consulta
                            setConsultationResult({
                                ...consultation,
                                error: true,
                                data: {
                                    ...consultation.data,
                                    error: errorMessage
                                }
                            });
                            setConsultationCreated(true);
                            
                            // Detener el polling aunque haya error
                            if (!pollingStoppedRef.current) {
                                pollingStoppedRef.current = true;
                                const idToClear = intervalId || intervalIdRef.current;
                                if (idToClear) {
                                    clearInterval(idToClear);
                                }
                                intervalId = null;
                                intervalIdRef.current = null;
                                setStartFetchingStatusPayment(false);
                            }
                            return;
                        }

                        setConsultationResult(consultation);
                        setConsultationCreated(true);
                        console.log("✅ [CONSULT] Consulta creada exitosamente");
                        console.log("📋 [CONSULT] Objeto consultation completo (para depurar modal):", JSON.stringify(consultation, null, 2));
                        console.log("📋 [CONSULT] consultation.data:", consultation?.data);
                        console.log("📋 [CONSULT] consultation.data?.data:", consultation?.data?.data);
                        console.log("📋 [CONSULT] consultation.data?.cita:", consultation?.data?.cita);
                    } catch (error: unknown) {
                        console.error("❌ [CONSULT] Error creando consulta:", error);
                        
                        // Extraer el mensaje de error
                        let errorMessage = 'Ocurrió un error al crear la consulta. Por favor comparte este error con soporte.';
                        
                        // Manejar diferentes tipos de errores
                        if (error && typeof error === 'object' && 'response' in error) {
                            const axiosError = error as { response?: { data?: { error?: string } } };
                            if (axiosError.response?.data?.error) {
                                // Error desde el servidor (AxiosError)
                                errorMessage = axiosError.response.data.error;
                            }
                        } else if (error && typeof error === 'object' && 'message' in error) {
                            const errorWithMessage = error as { message?: string };
                            if (errorWithMessage.message) {
                                // Error con mensaje personalizado
                                errorMessage = errorWithMessage.message;
                            }
                        } else if (typeof error === 'string') {
                            // Error como string
                            errorMessage = error;
                        }
                        
                        console.error("❌ [CONSULT] Mensaje de error:", errorMessage);
                        
                        // Establecer el resultado con el error para que se muestre en el modal de consulta
                        setConsultationResult({
                            status: 500,
                            error: true,
                            data: {
                                error: errorMessage
                            }
                        });
                        setConsultationCreated(true);
                        
                        // Detener el polling aunque haya error
                        if (!pollingStoppedRef.current) {
                            pollingStoppedRef.current = true;
                            const idToClear = intervalId || intervalIdRef.current;
                            if (idToClear) {
                                clearInterval(idToClear);
                            }
                            intervalId = null;
                            intervalIdRef.current = null;
                            setStartFetchingStatusPayment(false);
                        }
                    }

                    /* =======================
                        DETENER POLLING
                       ======================= */
                    console.log("🔄 [POLL] Intentando detener polling:");
                    console.log("  - pollingStoppedRef.current:", pollingStoppedRef.current);
                    console.log("  - intervalId:", intervalId);
                    console.log("  - intervalIdRef.current:", intervalIdRef.current);
                    
                    if (!pollingStoppedRef.current) {
                        pollingStoppedRef.current = true;
                        
                        // Detener el intervalo usando el ref o el valor local
                        const idToClear = intervalId || intervalIdRef.current;
                        if (idToClear) {
                            clearInterval(idToClear);
                            console.log("🛑 [POLL] Intervalo limpiado:", idToClear);
                        }
                        
                        intervalId = null;
                        intervalIdRef.current = null;
                        setStartFetchingStatusPayment(false);
                        console.log("🛑 [POLL] Polling detenido exitosamente");
                    } else {
                        console.log("⚠️ [POLL] Polling ya estaba detenido");
                    }
                } else {
                    console.log("⚠️ [POLL] Condiciones no cumplidas para crear consulta");
                    if (!isApproved) console.log("  - Razón: isApproved es false");
                    if (consultationCreated) console.log("  - Razón: consultationCreated es true");
                }
            } catch (err) {
                console.error("❌ Error en polling:", err);
            }
        };

        if (startFetchingStatusPayment && transactionId) {
            console.log("🔄 [POLL] Iniciando polling para transacción:", transactionId);
            poll();
            const newIntervalId = setInterval(poll, 4000);
            intervalId = newIntervalId;
            intervalIdRef.current = newIntervalId;
            console.log("🔄 [POLL] Intervalo creado:", newIntervalId);
        }

        return () => {
            console.log("🔄 [POLL] Cleanup - limpiando intervalo:", intervalId || intervalIdRef.current);
            if (intervalId) {
                clearInterval(intervalId);
            }
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
            }
        };
    }, [startFetchingStatusPayment, registerPurchase.id_transaccion, consultationCreated, setOrder, setStatus, setMessage, setConsultationResult, setStartFetchingStatusPayment]);

    return {
        handleGenerateTransaction,
        handleCheckAsyncPaymentUrl,
        redirectToPaymentPage,
        loading,
        startFetchingStatusPayment,
        setStartFetchingStatusPayment,
    };
};
