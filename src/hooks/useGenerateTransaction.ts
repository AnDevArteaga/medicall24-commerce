import { useEffect, useState } from "react";
import { usePurchaseContext } from "../contexts/checkout";
import { fillRegisterPurchase } from "./usePaymentFlow";
import { useSavePurchaseData } from "./useSavePurchaseData";
import {
    checkAsyncPaymentUrl,
    fetchPaymentStatus,
    payment,
} from "../services/azure/payments";
export const useGenerateTransaction = () => {
    const [loading, setLoading] = useState(false);
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
    useEffect(() => {
        const transactionId = registerPurchase.id_transaccion;
        let intervalId: NodeJS.Timeout;

        const handleFetchPaymentStatus = async () => {
            try {
                const order = await fetchPaymentStatus(transactionId);
                console.log("order", order);
                setOrder(order);
                setStatus(order.order.status);
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
    
                    const registerPrurchase = fillRegisterPurchase(
                        userId,
                        purchaseData,
                        paymentMethod,
                        detailPayment,
                        product,
                        registerPurchase,
                        extractedOrder,
                    );
                    console.log("registerPrurchase en hook", registerPrurchase);
                    const savePurchaseData = await savePurchase(registerPrurchase);
                    console.log("savePurchaseData", savePurchaseData);
    
                    setRegisterPurchaseSaved(true);
                }
            
                const redirect_url =
                    `${order.data.redirect_url}?id=${transactionId}`;
                if (
                    order.order.status === "aprobada" ||
                    order.order.status === "rechazada" ||
                    order.order.status === "error"
                ) {
                    clearInterval(intervalId);
                    window.open(redirect_url, "_blank");
                }
                return order;
            } catch (error) {
                console.error("Error fetching payment status:", error);
                setLoading(false);
            }
        };

        if (startFetchingStatusPayment) {
            intervalId = setInterval(() => {
                handleFetchPaymentStatus();
            }, 4000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [registerPurchase.id_transaccion, startFetchingStatusPayment, registerPurchaseSaved]);

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
