import axios from "axios";
import { apiAzure } from "../config/apis";
import { BankPse } from "../../interfaces/checkout.interfase";


// Función para obtener la lista de bancos
export const loadBankPse = async (): Promise<BankPse[]> => {
    try {
        const response = await axios.get<{ data: BankPse[] }>(
            `${apiAzure}/Payments/FinancialInstitutions`,
        );

        return response.data.data;
    } catch (error) {
        console.error("Error al cargar el banco:", error);
        return [];

    }
};
