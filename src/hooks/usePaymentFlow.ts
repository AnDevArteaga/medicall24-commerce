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


type ButtonId = "nextStepTwo" | "paidStepThree" | "confirmar" | string;
type PaymentMethod =
    | "BANCOLOMBIA_TRANSFER"
    | "CARD"
    | "PSE"
    | "NEQUI"
    | "MEDDIPAY"
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
        creditData
    } = usePurchaseContext();
    const {
        handleGenerateTransaction,
        handleCheckAsyncPaymentUrl,
        redirectToPaymentPage,
        approvePaymentInmediately,
        setStartFetchingStatusPayment,
    } = useGenerateTransaction();

    useEffect(() => {
        console.log("registerPurchase", registerPurchase);
    }, [registerPurchase]);
    const actions: ActionsMap = {
        BANCOLOMBIA_TRANSFER: {
            nextStepTwo: async () => {
                setLoading(true);
                console.log("nextStepTwo");
                fillGeneralPaymentDataFromPurchaseAndPayment(
                    purchaseData,
                    paymentMethod,
                    setGeneralPaymentData,
                );
                const detailPayment = await handleGetDetailPayment();
                console.log("detailPayment", detailPayment);
                closeModal("selectAllie");
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
                redirectToPaymentPage(asyncPaymentUrl);
                console.log("transactionId", transactionId);
                setStartFetchingStatusPayment(true);
                closeModal("verifiyEmail");
                setLoading(false);
                handleNext();
            },
        },
        CARD: {
            nextStepTwo: async () => {
                setLoading(true);
                console.log("nextStepTwo");
                fillGeneralPaymentDataFromPurchaseAndPayment(
                    purchaseData,
                    paymentMethod,
                    setGeneralPaymentData,
                );
                const detailPayment = await handleGetDetailPayment();
                console.log("detailPayment", detailPayment);
                closeModal("selectAllie");
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
                console.log("transactionId", transactionId);
                setStartFetchingStatusPayment(true);
                closeModal("verifiyEmail");
                setLoading(false);
                handleNext();
            },
        },
        PSE: {
            nextStepTwo: async () => {
                setLoading(true);
                console.log("nextStepTwo");
                fillGeneralPaymentDataFromPurchaseAndPayment(
                    purchaseData,
                    paymentMethod,
                    setGeneralPaymentData,
                );
                const detailPayment = await handleGetDetailPayment();
                console.log("detailPayment", detailPayment);
                closeModal("selectAllie");
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
                redirectToPaymentPage(asyncPaymentUrl);
                console.log("transactionId", transactionId);
                setStartFetchingStatusPayment(true);
                closeModal("verifiyEmail");
                setLoading(false);
                handleNext();
            },
        },
        NEQUI: {
            nextStepTwo: async () => {
                setLoading(true);
                console.log("nextStepTwo");
                fillGeneralPaymentDataFromPurchaseAndPayment(
                    purchaseData,
                    paymentMethod,
                    setGeneralPaymentData,
                );
                const detailPayment = await handleGetDetailPayment();
                console.log("detailPayment", detailPayment);
                closeModal("selectAllie");
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
                console.log("transactionId", transactionId);
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
                closeModal("selectAllie");
                handleNext();
                setLoading(false);
            },
            paidStepThree: async () => {
                setLoading(true);
                approvePaymentInmediately();
                const registerPruchase = fillRegisterPurchase(
                    userId,
                    purchaseData,
                    paymentMethod,
                    detailPayment,
                    product,
                    registerPurchase,
                    undefined, //  no hay order, se llena con defaults
                );
                console.log("registerPruchase", registerPruchase);
                await savePurchase(registerPruchase);
                await updateAuthorizationData(creditData.meddipayAuthorizationCode);
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

export function fillRegisterPurchase(
    userId: number,
    purchaseData: PurchaseData,
    paymentMethod: PaymentMethodData,
    detailPayment: detailsPayment,
    product: Product | CodeXProduct | null,
    registerPurchase: registerPurchase,
    order?: { estado_transaccion: string, fecha_compra: string, fecha_pago: string, ip_transaccion: string, id_transaccion: string}  // 👈 order opcional para metodos de pago Tipo Credito, no se genera trancsacción
) {
    const getProductName = () => {
        if (!product) return "Sin producto";
        return "nombre" in product ? product.nombre : product.producto;
    };
    const productLinks = getProductLinks(product!.id_producto);
    const id_aliado = product && "id_aliado" in product ? product.id_aliado : 0;
    const id_codigo_promo = product && "id_codigo" in product
        ? Number(product.id_codigo)
        : 0;
    const id_gestor = product && "id_gestor" in product ? product.id_gestor : 0;
    const porcentaje_gestor = product && "porcentaje_gestor" in product
        ? product.porcentaje_gestor
        : 0;
    const prev = registerPurchase;
    return {
        ...prev,
        ciudad_comprador: purchaseData.city,
        comision_transaccion: Number(detailPayment.commission),
        departamento_comprador: purchaseData.departament,
        descripcion_compra: getProductName(),
        direccion_comprador: purchaseData.address,
        email_comprador: purchaseData.email,
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
        nombre_comprador: purchaseData.names,
        pais_institucion: "COLOMBIA",
        porcentaje_comision_gestor: porcentaje_gestor,
        producto: getProductName(),
        subtotal: Number(detailPayment.subtotal),
        telefono_comprador: purchaseData.phone,
        total: Number(detailPayment.total),
        total_centavos: Number(detailPayment.total) * 100,
        link_ayuda: productLinks.linkBanner,
        link_terminos: productLinks.linkTerminos,
        link_pasos: productLinks.linkPasos + id_aliado,
    };
}
