import axios from "axios";
import { apiAzure } from "../config/apis";
import { detailsPayment } from "../../interfaces/checkout.interfase";


// Función para obtener el la liquidación de un producto
export const getDetailPayment = async (productId: number, paymentMethod: string, discount: number): Promise<detailsPayment> => {
    try {
        const response = await axios.post(
            `${apiAzure}/Payments/GetDetailPayment`,
            { productId, paymentMethod, discount },
        );
        return response.data;
    } catch (error) {
        console.error("Error al verificar el usuario:", error);
        throw new Error("Error al obtener el método de pago");
    }
};