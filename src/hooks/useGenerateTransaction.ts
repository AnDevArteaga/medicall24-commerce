import { useEffect, useState } from "react";
import { usePurchaseContext } from "../contexts/checkout";
import {
    checkAsyncPaymentUrl,
    fetchPaymentStatus,
    payment,
} from "../services/azure/payments";
export const useGenerateTransaction = () => {
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState({});

    const { generalPaymentData, setRegisterPurchase, registerPurchase, startFetchingStatusPayment, setStartFetchingStatusPayment, message, setMessage, status, setStatus } =
        usePurchaseContext();
    const handleGenerateTransaction = async () => {
        try {
            console.log("generalPaymentData", generalPaymentData);
            const transactionId = await payment(generalPaymentData);
            setRegisterPurchase({ transactionId });
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
        console.log('aprovada inmediatamente')
    }
    useEffect(() => {
        const transactionId = registerPurchase.transactionId;
        let intervalId: NodeJS.Timeout;
    
        const handleFetchPaymentStatus = async () => {
            try {
                const order = await fetchPaymentStatus(transactionId);
                console.log("order", order);
                setOrder(order);
                setStatus(order.order.status);
                setMessage(order.message);
                setLoading(false);
                console.log("statusOrder", order.order.status, 'statusHook', status);
                console.log("messageOrder", order.message, 'messageHook', message);
                const redirect_url = `${order.data.redirect_url}?id=${transactionId}`;
                if (
                    order.order.status === "aprobada" ||
                    order.order.status === "rechazada" ||
                    order.order.status === "error"
                ) {
                    clearInterval(intervalId);
                    window.open(redirect_url, "_blank");
                }
            } catch (error) {
                console.error("Error fetching payment status:", error);
                setLoading(false);
            }
        };
    
        if (startFetchingStatusPayment) {
            intervalId = setInterval(() => {
                handleFetchPaymentStatus();
            }, 1000);
        }
    
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [registerPurchase.transactionId, startFetchingStatusPayment]);

    return {
        handleGenerateTransaction,
        handleCheckAsyncPaymentUrl,
        redirectToPaymentPage,
        approvePaymentInmediately,
        loading,
        message,
        order,
        status,
        startFetchingStatusPayment,
        setStartFetchingStatusPayment
    };
};
