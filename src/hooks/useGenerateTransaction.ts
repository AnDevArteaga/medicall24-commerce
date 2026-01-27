import { useEffect, useState } from "react";
import { usePurchaseContext } from "../contexts/checkout";
import { fillRegisterPurchase } from "./usePaymentFlow";
import { useSavePurchaseData } from "./useSavePurchaseData";
import {
    checkAsyncPaymentUrl,
    fetchPaymentStatus,
    payment,
} from "../services/azure/payments";
import { createConsultation } from "../services/supabase/payment";
export const useGenerateTransaction = () => {
    const [loading, setLoading] = useState(false);
    const [lastPurchaseId, setLastPurchaseId] = useState<number | undefined>(undefined);
    const [consultationCreated, setConsultationCreated] = useState(false);
    const {
        generalPaymentData,
        setRegisterPurchase,
        registerPurchase,
        startFetchingStatusPayment,
        setStartFetchingStatusPayment,
        message,
        setMessage,
        status,
        setStatus,
        setOrder,
        purchaseData,
        paymentMethod,
        detailPayment,
        product,
        userId,
        setRegisterPurchaseSaved,
        registerPurchaseSaved,
        setConsultationResult,
        idMunicipioInstitucion,
    } = usePurchaseContext();
    const { savePurchase } = useSavePurchaseData();
    const handleGenerateTransaction = async () => {
        try {
            console.log("generalPaymentData", generalPaymentData);
            const transactionId = await payment(generalPaymentData);
            console.log("transactionId fetch", transactionId);

            setRegisterPurchase((prev) => ({
                ...prev,
                id_transaccion: transactionId,
            }));
            return transactionId;
        } catch (error) {
            console.error("Error al generar la transacción:", error);
        }
    };

    const handleCheckAsyncPaymentUrl = async (transactionId: string) => {
        if (!transactionId) {
            throw new Error("No se proporcionó una transacción válida.");
        }
        try {
            const asyncPaymentUrl = await checkAsyncPaymentUrl(transactionId);

            if (!asyncPaymentUrl) {
                throw new Error("No se encontró una URL de pago válida.");
            }

            console.log("URL de pago:", asyncPaymentUrl);
            return asyncPaymentUrl;
        } catch (error) {
            console.error("Error al obtener la URL de pago:", error);
        }
    };

    const redirectToPaymentPage = async (url: string | undefined) => {
        if (!url) {
            throw new Error("No se proporcionó una URL válida.");
        }
        window.open(url, "_blank");
    };

    const approvePaymentInmediately = async () => {
        setMessage("Compra aprobada");
        setStatus("aprobada");
        setLoading(false);
        console.log("aprovada inmediatamente");
    };
    // Resetear el flag cuando se inicia el polling para una nueva transacción
    useEffect(() => {
        if (startFetchingStatusPayment && registerPurchase.id_transaccion) {
            setConsultationCreated(false);
        }
    }, [startFetchingStatusPayment, registerPurchase.id_transaccion]);

    useEffect(() => {
        const transactionId = registerPurchase.id_transaccion;
        let intervalId: NodeJS.Timeout | null = null;
        let currentPurchaseId: number | undefined = undefined;

        const handleFetchPaymentStatus = async () => {
            try {
                const order = await fetchPaymentStatus(transactionId);
                console.log("order", order);
                setOrder(order);
                const orderStatus = order.order.status;
                setStatus(orderStatus);
                setMessage(order.message);
                setLoading(false);
                console.log("order", order);

                // Extraer solo los valores necesarios de order
                if (!registerPurchaseSaved) {
                    const extractedOrder = {
                        estado_transaccion: order?.data?.status ?? "aprobada",
                        fecha_compra: order?.data?.created_at ??
                            new Date().toISOString(),
                        fecha_pago: order?.data?.created_at ??
                            new Date().toISOString(),
                        id_transaccion: order?.data?.id ?? 0,
                        ip_transaccion: order?.order?.paymentRemoteIP ?? "0",
                    };

                    const registerPrurchase = await fillRegisterPurchase(
                        userId,
                        purchaseData,
                        paymentMethod,
                        detailPayment,
                        product,
                        registerPurchase,
                        extractedOrder,
                    );
                    console.log("registerPrurchase en hook", registerPrurchase);
                    // Pasar el ID del municipio de la institución desde el contexto
                    const savePurchaseData = await savePurchase(registerPrurchase, idMunicipioInstitucion);
                    console.log("savePurchaseData", savePurchaseData);

                    setRegisterPurchaseSaved(true);

                    // Guardar el id_compra localmente para usarlo después en createConsultation
                    if (savePurchaseData?.id_compra) {
                        currentPurchaseId = savePurchaseData.id_compra;
                        setLastPurchaseId(savePurchaseData.id_compra);
                    }
                }

                // Crear consulta cuando el estado sea aprobado (tanto "aprobada" como "APPROVED")
                // IMPORTANTE: Crear la consulta ANTES de detener el polling
                const isApproved = orderStatus?.toLowerCase() === "aprobada" || orderStatus?.toUpperCase() === "APPROVED";
                if (isApproved && !consultationCreated) {
                    // Usar el id_compra guardado (usar currentPurchaseId si está disponible, sino lastPurchaseId)
                    const idCompraToUse = currentPurchaseId ?? lastPurchaseId;
                    if (idCompraToUse) {
                        try {
                            const consultation = await createConsultation(transactionId, idCompraToUse);
                            console.log("consultation creada para método de pago:", consultation);
                            // Guardar el resultado de la consulta en el contexto
                            setConsultationResult(consultation);
                            setConsultationCreated(true); // Marcar como creada para evitar duplicados
                        } catch (error) {
                            console.error("Error creando consulta:", error);
                        }
                    } else {
                        console.warn("No se pudo crear la consulta: id_compra no disponible");
                    }
                }

                const redirect_url =
                    `${order.data.redirect_url}?id=${transactionId}`;
                if (
                    orderStatus?.toLowerCase() === "aprobada" ||
                    orderStatus?.toUpperCase() === "APPROVED" ||
                    orderStatus?.toLowerCase() === "rechazada" ||
                    orderStatus?.toLowerCase() === "error"
                ) {
                    window.open(redirect_url, "_blank");
                }

                // Verificar si el estado está resuelto (aprobado o rechazado)
                // Detener el polling DESPUÉS de crear la consulta
                const isResolved =
                    orderStatus?.toLowerCase() === "aprobada" ||
                    orderStatus?.toUpperCase() === "APPROVED" ||
                    orderStatus?.toLowerCase() === "rechazada" ||
                    orderStatus?.toLowerCase() === "error";

                // Si el estado está resuelto, detener el polling
                if (isResolved && intervalId) {
                    clearInterval(intervalId);
                    intervalId = null;
                    setStartFetchingStatusPayment(false); // Desactivar el polling
                    console.log("Polling detenido - Estado resuelto:", orderStatus);
                }

                return order;
            } catch (error) {
                console.error("Error fetching payment status:", error);
                setLoading(false);
            }
        };

        if (startFetchingStatusPayment && transactionId) {
            // Ejecutar inmediatamente la primera vez
            handleFetchPaymentStatus();

            // Configurar el intervalo solo si el estado no está resuelto
            intervalId = setInterval(() => {
                handleFetchPaymentStatus();
            }, 4000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registerPurchase.id_transaccion, startFetchingStatusPayment, registerPurchaseSaved, consultationCreated]);

    return {
        handleGenerateTransaction,
        handleCheckAsyncPaymentUrl,
        redirectToPaymentPage,
        approvePaymentInmediately,
        loading,
        message,
        status,
        startFetchingStatusPayment,
        setStartFetchingStatusPayment,
    };
};
