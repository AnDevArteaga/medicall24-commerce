import { useEffect } from "react";
import { usePurchaseContext } from "../contexts/checkout";
import {
    CustomPaymentData,
    detailsPayment,
    PaymentMethodData,
    PurchaseData,
    registerPurchase,
} from "../interfaces/checkout.interfase";
import { CodeXProduct, Product } from "../interfaces/product.interface";
import { DetailPayment } from "../hooks/useDetailPayment";
import { useGenerateTransaction } from "../hooks/useGenerateTransaction";
import { useModal } from "../contexts/modals";
import { getProductLinks } from "../hooks/useSelectDataEmail";
import { useSavePurchaseData } from "./useSavePurchaseData";
import { updateAuthorizationData } from "../services/supabase/manage-credit";
import { capitalize } from "../utils/forms";
import { getDepartments, getMunicipalities } from "../services/azure/location";
import { createConsultation, sendConfirmationEmail } from "../services/supabase/payment";


type ButtonId = "nextStepTwo" | "paidStepThree" | "confirmar" | string;
type PaymentMethod =
    | "BANCOLOMBIA_TRANSFER"
    | "CARD"
    | "PSE"
    | "NEQUI"
    | "MEDDIPAY"
    | "EFECTIVO"
    | string;

type ActionFunction = () => Promise<void>;

type ActionsMap = {
    [method in PaymentMethod]?: {
        [button in ButtonId]?: ActionFunction;
    };
};

export const usePaymentFlow = () => {
    const { closeModal, openModal } = useModal();
    const { handleGetDetailPayment, handleSetterDetailPayment } =
        DetailPayment();
    const { savePurchase } = useSavePurchaseData();
    const { setStatus, setMessage, setConsultationResult } = usePurchaseContext();
    const {
        paymentMethod,
        setGeneralPaymentData,
        purchaseData,
        handleNext,
        selectedMethod,
        setLoading,
        registerPurchase,
        detailPayment,
        product,
        userId,
        creditData,
        idMunicipioInstitucion
    } = usePurchaseContext();
    const {
        handleGenerateTransaction,
        handleCheckAsyncPaymentUrl,
        redirectToPaymentPage,
        setStartFetchingStatusPayment,
    } = useGenerateTransaction();

    useEffect(() => {
    }, [registerPurchase]);
    const actions: ActionsMap = {
        BANCOLOMBIA_TRANSFER: {
            nextStepTwo: async () => {
                setLoading(true);
                fillGeneralPaymentDataFromPurchaseAndPayment(
                    purchaseData,
                    paymentMethod,
                    setGeneralPaymentData,
                );
                await handleGetDetailPayment();
                closeModal("selectAllieBexa");
                setLoading(false);
                handleNext();
            },
            paidStepThree: async () => {
                setLoading(true);
                const transactionId = await handleGenerateTransaction();
                if (!transactionId) {
                    closeModal("verifiyEmail");
                    openModal("errorPurchase");
                    setLoading(false);
                    return;
                }
                const asyncPaymentUrl = await handleCheckAsyncPaymentUrl(
                    transactionId,
                );
                redirectToPaymentPage(asyncPaymentUrl || undefined);
                setStartFetchingStatusPayment(true);
                closeModal("verifiyEmail");
                setLoading(false);
                handleNext();
            },
        },
        CARD: {
            nextStepTwo: async () => {
                setLoading(true);
                fillGeneralPaymentDataFromPurchaseAndPayment(
                    purchaseData,
                    paymentMethod,
                    setGeneralPaymentData,
                );
                await handleGetDetailPayment();
                // closeModal("selectAllie");
                closeModal("selectAllieBexa");
                setLoading(false);
                handleNext();
            },
            paidStepThree: async () => {
                setLoading(true);
                const transactionId = await handleGenerateTransaction();
                if (!transactionId) {
                    closeModal("verifiyEmail");
                    openModal("errorPurchase");
                    setLoading(false);
                    return;
                }
                setStartFetchingStatusPayment(true);
                closeModal("verifiyEmail");
                setLoading(false);
                handleNext();
            },
        },
        PSE: {
            nextStepTwo: async () => {
                setLoading(true);
                fillGeneralPaymentDataFromPurchaseAndPayment(
                    purchaseData,
                    paymentMethod,
                    setGeneralPaymentData,
                );
                await handleGetDetailPayment();
                // closeModal("selectAllie");
                closeModal("selectAllieBexa");
                setLoading(false);
                handleNext();
            },
            paidStepThree: async () => {
                setLoading(true);
                const transactionId = await handleGenerateTransaction();
                if (!transactionId) {
                    closeModal("verifiyEmail");
                    openModal("errorPurchase");
                    setLoading(false);
                    return;
                }
                const asyncPaymentUrl = await handleCheckAsyncPaymentUrl(
                    transactionId,
                );
                redirectToPaymentPage(asyncPaymentUrl || undefined);
                setStartFetchingStatusPayment(true);
                closeModal("verifiyEmail");
                setLoading(false);
                handleNext();
            },
        },
        NEQUI: {
            nextStepTwo: async () => {
                setLoading(true);
                fillGeneralPaymentDataFromPurchaseAndPayment(
                    purchaseData,
                    paymentMethod,
                    setGeneralPaymentData,
                );
                await handleGetDetailPayment();
                // closeModal("selectAllie");
                closeModal("selectAllieBexa");
                setLoading(false);
                handleNext();
            },
            paidStepThree: async () => {
                setLoading(true);
                const transactionId = await handleGenerateTransaction();
                if (!transactionId) {
                    closeModal("verifiyEmail");
                    openModal("errorPurchase");
                    setLoading(false);
                    return;
                }
                setStartFetchingStatusPayment(true);
                closeModal("verifiyEmail");
                setLoading(false);
                handleNext();
            },
        },
        MEDDIPAY: {
            nextStepTwo: async () => {
                setLoading(true);
                handleSetterDetailPayment();
                // closeModal("selectAllie");
                closeModal("selectAllieBexa");
                handleNext();
                setLoading(false);
            },
            paidStepThree: async () => {
                setLoading(true);
                // Para MEDDIPAY, establecer estado como aprobada (pero el estado en BD será APPROVED)
                setStatus("aprobada");
                setMessage("Compra aprobada");
                // id_transaccion único por compra para que el backend (obtener la cita) devuelva una sola fila
                const meddipayIdTransaccion = `MEDDIPAY_${Date.now()}`;
                const meddipayOrder = {
                    id_transaccion: meddipayIdTransaccion,
                    estado_transaccion: "APPROVED",
                    fecha_compra: new Date().toISOString(),
                    fecha_pago: new Date().toISOString(),
                    ip_transaccion: "0",
                };
                const registerPruchase = await fillRegisterPurchase(
                    userId,
                    purchaseData,
                    paymentMethod,
                    detailPayment,
                    product,
                    registerPurchase,
                    meddipayOrder, // Order especial para MEDDIPAY
                );
                // Pasar el ID del municipio de la institución desde el contexto
                const savePurchaseResult = await savePurchase(registerPruchase, idMunicipioInstitucion);
                await updateAuthorizationData(creditData.meddipayAuthorizationCode);

                const idCompra = savePurchaseResult?.id_compra;
                console.log("[MEDDIPAY] savePurchaseResult.id_compra:", idCompra, "savePurchaseResult:", savePurchaseResult);
                if (idCompra) {
                    await sendConfirmationEmail(idCompra, meddipayIdTransaccion);
                } else {
                    console.warn("[MEDDIPAY] No hay id_compra, no se envía correo de confirmación");
                }
                // Crear consulta después del correo de confirmación
                try {
                    const consultation = await createConsultation(meddipayIdTransaccion, idCompra);
                    
                    // Verificar si la consulta fue exitosa
                    if (consultation.error || (consultation.status !== 200 && consultation.status !== 201)) {
                        // Extraer mensaje de error del objeto retornado
                        const errorMessage = consultation.data?.error || 
                            (typeof consultation.data === 'object' && consultation.data !== null && 'error' in consultation.data 
                                ? String(consultation.data.error) 
                                : 'Error al crear la consulta');
                        
                        console.error("❌ [MEDDIPAY] Error en respuesta:", errorMessage);
                        
                        // Establecer el resultado con el error para que se muestre en el modal de consulta
                        setConsultationResult({
                            ...consultation,
                            error: true,
                            data: {
                                ...consultation.data,
                                error: errorMessage
                            }
                        });
                    } else {
                        // Guardar el resultado de la consulta en el contexto
                        setConsultationResult(consultation);
                    }
                } catch (error: unknown) {
                    console.error("❌ [MEDDIPAY] Error creando consulta:", error);
                    
                    // Extraer el mensaje de error
                    let errorMessage = 'Ocurrió un error al crear la consulta. Por favor comparte este error con soporte.';
                    
                    // Manejar diferentes tipos de errores
                    if (error && typeof error === 'object' && 'response' in error) {
                        const axiosError = error as { response?: { data?: { error?: string } } };
                        if (axiosError.response?.data?.error) {
                            errorMessage = axiosError.response.data.error;
                        }
                    } else if (error && typeof error === 'object' && 'message' in error) {
                        const errorWithMessage = error as { message?: string };
                        if (errorWithMessage.message) {
                            errorMessage = errorWithMessage.message;
                        }
                    } else if (typeof error === 'string') {
                        errorMessage = error;
                    }
                    
                    // Establecer el resultado con el error para que se muestre en el modal de consulta
                    setConsultationResult({
                        status: 500,
                        error: true,
                        data: {
                            error: errorMessage
                        }
                    });
                }

                setTimeout(() => {
                    handleNext();
                }, 1000);
                closeModal("verifiyEmail");
                setLoading(false);
            },
        },
        EFECTIVO: {
            nextStepTwo: async () => {
                setLoading(true);
                handleSetterDetailPayment();
                closeModal("selectAllieBexa");
                handleNext();
                setLoading(false);
            },
            paidStepThree: async () => {
                setLoading(true);
                setStatus("aprobada");
                setMessage("Compra aprobada");
                // id_transaccion único por compra para que el backend (obtener la cita) devuelva una sola fila
                const efectivoIdTransaccion = `EFECTIVO_${Date.now()}`;
                const efectivoOrder = {
                    id_transaccion: efectivoIdTransaccion,
                    estado_transaccion: "APPROVED",
                    fecha_compra: new Date().toISOString(),
                    fecha_pago: new Date().toISOString(),
                    ip_transaccion: "0",
                };
                const registerPruchase = await fillRegisterPurchase(
                    userId,
                    purchaseData,
                    paymentMethod,
                    detailPayment,
                    product,
                    registerPurchase,
                    efectivoOrder,
                );
                const savePurchaseResult = await savePurchase(registerPruchase, idMunicipioInstitucion);

                const idCompra = savePurchaseResult?.id_compra;
                console.log("[EFECTIVO] savePurchaseResult.id_compra:", idCompra, "savePurchaseResult:", savePurchaseResult);
                if (idCompra) {
                    await sendConfirmationEmail(idCompra, efectivoIdTransaccion);
                } else {
                    console.warn("[EFECTIVO] No hay id_compra, no se envía correo de confirmación");
                }
                try {
                    const consultation = await createConsultation(efectivoIdTransaccion, idCompra);

                    if (consultation.error || (consultation.status !== 200 && consultation.status !== 201)) {
                        const errorMessage = consultation.data?.error ||
                            (typeof consultation.data === 'object' && consultation.data !== null && 'error' in consultation.data
                                ? String(consultation.data.error)
                                : 'Error al crear la consulta');
                        console.error("❌ [EFECTIVO] Error en respuesta:", errorMessage);
                        setConsultationResult({
                            ...consultation,
                            error: true,
                            data: {
                                ...consultation.data,
                                error: errorMessage
                            }
                        });
                    } else {
                        setConsultationResult(consultation);
                    }
                } catch (error: unknown) {
                    console.error("❌ [EFECTIVO] Error creando consulta:", error);
                    let errorMessage = 'Ocurrió un error al crear la consulta. Por favor comparte este error con soporte.';
                    if (error && typeof error === 'object' && 'response' in error) {
                        const axiosError = error as { response?: { data?: { error?: string } } };
                        if (axiosError.response?.data?.error) {
                            errorMessage = axiosError.response.data.error;
                        }
                    } else if (error && typeof error === 'object' && 'message' in error) {
                        const errorWithMessage = error as { message?: string };
                        if (errorWithMessage.message) errorMessage = errorWithMessage.message;
                    } else if (typeof error === 'string') {
                        errorMessage = error;
                    }
                    setConsultationResult({
                        status: 500,
                        error: true,
                        data: { error: errorMessage }
                    });
                }

                setTimeout(() => {
                    handleNext();
                }, 1000);
                closeModal("verifiyEmail");
                setLoading(false);
            },
        },
    };

    const executeAction = async (buttonId: ButtonId) => {
        if (!paymentMethod) {
            console.warn("No hay método de pago seleccionado");
            return;
        }

        const methodActions = actions[selectedMethod];
        if (!methodActions) {
            console.warn(
                `No hay acciones definidas para el método: ${paymentMethod}`,
            );
            return;
        }

        const action = methodActions[buttonId];
        if (!action) {
            console.warn(
                `No hay acción definida para el botón: ${buttonId} en el método: ${paymentMethod}`,
            );
            return;
        }

        await action();
    };

    return {
        executeAction,
        paymentMethod,
    };
};

function fillGeneralPaymentDataFromPurchaseAndPayment(
    purchaseData: PurchaseData,
    paymentMethod: PaymentMethodData,
    setGeneralPaymentData: React.Dispatch<
        React.SetStateAction<CustomPaymentData>
    >,
) {
    setGeneralPaymentData((prev) => ({
        ...prev,
        identification: purchaseData.identification,
        typeId: purchaseData.typeId,
        names: purchaseData.names,
        lastNames: purchaseData.lastNames,
        email: purchaseData.email,
        address: purchaseData.address,
        phone: purchaseData.phone,
        paymentMethod: {
            ...paymentMethod,
            userLegalIdType: purchaseData.typeId,
            userLegalId: purchaseData.identification,
        },
    }));
}

export async function fillRegisterPurchase(
    userId: number,
    purchaseData: PurchaseData,
    paymentMethod: PaymentMethodData,
    detailPayment: detailsPayment,
    product: Product | CodeXProduct | null,
    registerPurchase: registerPurchase,
    order?: { estado_transaccion: string, fecha_compra: string, fecha_pago: string, ip_transaccion: string, id_transaccion: string }  // 👈 order opcional para metodos de pago Tipo Credito, no se genera trancsacción
) {
    const getProductName = () => {
        if (!product) return "Sin producto";
        return "nombre" in product ? product.nombre : product.producto;
    };
    const productLinks = product?.id_producto 
        ? getProductLinks(product.id_producto) 
        : { linkBanner: "", linkTerminos: "", linkPasos: "" };
    const id_aliado = product && "id_aliado" in product ? product.id_aliado : 0;
    const id_codigo_promo = product && "id_codigo" in product
        ? Number(product.id_codigo)
        : 0;
    const id_gestor = product && "id_gestor" in product ? product.id_gestor : 0;
    const porcentaje_gestor = product && "porcentaje_gestor" in product
        ? product.porcentaje_gestor
        : 0;

    // Obtener los nombres de ciudad y departamento desde los IDs (solo para registro compra)
    let ciudadNombre = purchaseData.city;
    let departamentoNombre = purchaseData.departament;

    try {
        // Obtener el nombre del departamento
        if (purchaseData.departament) {
            const departments = await getDepartments();
            const department = departments.find(d => d.id === purchaseData.departament);
            if (department) {
                departamentoNombre = department.nombre;
            }
        }

        // Obtener el nombre del municipio/ciudad
        if (purchaseData.city && purchaseData.departament) {
            const municipalities = await getMunicipalities(purchaseData.departament);
            const municipality = municipalities.find(m => String(m.id) === String(purchaseData.city));
            if (municipality) {
                ciudadNombre = municipality.nombre;
            }
        }
    } catch (error) {
        console.error("Error al obtener nombres de ciudad y departamento:", error);
        // Si hay error, usar los IDs como fallback
    }

    const prev = registerPurchase;
    return {
        ...prev,
        ciudad_comprador: ciudadNombre, // Guardar el nombre en lugar del ID
        comision_transaccion: Number(detailPayment.commission),
        departamento_comprador: departamentoNombre, // Guardar el nombre en lugar del ID
        descripcion_compra: getProductName(),
        direccion_comprador: purchaseData.address,
        email_comprador:
            purchaseData.email?.trim() ||
            prev.correo_factura?.trim() ||
            prev.email_comprador?.trim() ||
            "",
        estado_cuenta: false,
        estado_transaccion: order?.estado_transaccion ?? "aprobada", // 👈 por defecto "aprobada" si no hay order
        fecha_compra: order?.fecha_compra ?? new Date().toISOString(),
        fecha_pago: order?.fecha_pago ?? new Date().toISOString(),
        id_producto: product ? product.id_producto : 0,
        id_usuario_medicall: userId || 0,
        id_aliado: id_aliado,
        id_codigo_promo: id_codigo_promo,
        id_gestor: id_gestor,
        identificacion_comprador: purchaseData.identification,
        id_transaccion: order?.id_transaccion ?? "0",
        ip_transaccion: order?.ip_transaccion ?? "0",
        iva: Number(detailPayment.iva),
        metodo_pago: paymentMethod.type,
        nombre_comprador: capitalize(`${purchaseData.names} ${purchaseData.lastNames}`.trim()),
        ...(paymentMethod.type === "EFECTIVO" && registerPurchase.agente_efectivo_email && { agente_efectivo_email: registerPurchase.agente_efectivo_email }),
        pais_institucion: "COLOMBIA",
        porcentaje_comision_gestor: porcentaje_gestor,
        producto: getProductName(),
        subtotal: Number(detailPayment.subtotal),
        telefono_comprador: purchaseData.phone,
        total: Number(detailPayment.total),
        total_centavos: Number(detailPayment.total) * 100,
        link_ayuda: productLinks.linkBanner || "",
        link_terminos: productLinks.linkTerminos,
        link_pasos: productLinks.linkPasos + id_aliado,
    };
}
