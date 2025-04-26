import { usePurchaseContext } from "../contexts/checkout";
import { payment, checkAsyncPaymentUrl } from "../services/azure/payments";
export const useGenerateTransaction = () => {
    const { generalPaymentData } = usePurchaseContext();
    const handleGenerateTransaction = async () => {
        try {
            console.log("generalPaymentData", generalPaymentData);
            const transactionId = await payment(generalPaymentData);
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
     
  return {
    handleGenerateTransaction,
    handleCheckAsyncPaymentUrl,
    redirectToPaymentPage,
  };

}







