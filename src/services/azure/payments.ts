import axios, { AxiosError } from "axios";
import { apiAzure, apiSupabase } from "../config/apis";
import {
    CreditUser,
    CustomPaymentData,
    detailsPayment,
} from "../../interfaces/checkout.interfase";

// Función para obtener el la liquidación de un producto
export const getDetailPayment = async (
    productId: number,
    paymentMethod: string,
    discount: number,
): Promise<detailsPayment> => {
    try {
        const method = paymentMethod === "NEQUI" ? "PSE" : paymentMethod;

        const response = await axios.post(
            `${apiAzure}/Payments/GetDetailPayment`,
            { productId, paymentMethod: method, discount },
        );
        return response.data;
    } catch (error) {
        console.error("Error al verificar el usuario:", error);
        throw new Error("Error al obtener el método de pago");
    }
};

export const validateCodeAuthorization = async (
    authorizationCode: string,
    id: string,
): Promise<CreditUser> => {
    try {
        const response = await axios.get(
            `${apiSupabase}/registro_usuario_credito?identificacion_usuario=eq.${id}&select=*`,
            {
                headers: {
                    apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                    Authorization:
                        import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
                },
            },
        );

        const registros = response.data;
        if (!registros) {
            throw new Error("No se encontraron registros");
        }
        const isValid = registros.some(
            (item: CreditUser) =>
                item.codigo_credito === authorizationCode &&
                item.identificacion_usuario === id &&
                item.validado === false,
        );
        return isValid;
    } catch (error) {
        console.error("Error al validar el código de autorización:", error);
        throw new Error("Error al validar el código de autorización");
    }
};

export const payment = async (
    generalPaymentData: CustomPaymentData,
) => {
    try {
        // const type = paidObject.paymentMethod.type;
        const createTransactionResponse = await axios.post(
            `${apiAzure}/Payments/PatientPlan`,
            generalPaymentData,
            {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
                },
            },
        );

        const { success, message, data } = createTransactionResponse.data;

        if (!success || message !== "Transacción generada exitosamente!.") {
            console.log(success, message, data);
            throw new Error(
                "Algo ha pasado con la transacción, inténtelo más tarde.",
            );
        }

        console.log("Transacción generada exitosamente:", data);

        const { transactionId } = data;
        return transactionId;
    } catch (error) {
        console.error("Error en la compra:", error);
        
        return null;
    }
};

export const checkAsyncPaymentUrl = async (
    transactionId: string,
): Promise<string | null> => {
    const maxAttempts = 10;
    const delay = 1000;
    let attempts = 0;

    console.log("transactionId:", transactionId);

    while (attempts < maxAttempts) {
        try {
            const statusResponse = await axios.get(
                `${apiAzure}/Payments/GetStatusOrder/${transactionId}`,
            );
            console.log('statusResponse', statusResponse)
            const paymentData = statusResponse.data?.data?.payment_method;
            console.log('paymentData', paymentData)
            if (paymentData?.extra?.async_payment_url) {
                console.log(
                    "URL de pago obtenida:",
                    paymentData.extra.async_payment_url,
                );
                return paymentData.extra.async_payment_url;
            }

            console.log(
                `Intento ${
                    attempts + 1
                }: URL aún no disponible, reintentando...`,
            );
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error(
                `Error al obtener el estado de la transacción en el intento ${
                    attempts + 1
                }:`,
                axiosError.message,
            );
        }

        await new Promise((resolve) => setTimeout(resolve, delay));
        attempts += 1;
    }

    console.error(
        "Se alcanzó el máximo número de intentos sin obtener una URL válida.",
    );
    return null;
};


export const fetchPaymentStatus = async (transactionId: string) => {
    try {
        const response = await axios.get(
            `${apiAzure}/Payments/GetStatusOrder/${transactionId}`,
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching payment status:", error);
        throw error;
    }
};

