import axios from "axios";
import { apiAzure } from "../config/apis";

export interface ConsentResponse {
    id: number;
    name: string;
    description: string;
    institutionId: number;
    typeServiceId: number;
    created: string;
    updated: string;
    institution: null;
    typeService: null;
}

export interface GetConsentRequest {
    typeServiceId: number;
    institutionId: number;
}

export const getConsent = async (request: GetConsentRequest): Promise<ConsentResponse> => {
    try {
        const response = await axios.post<ConsentResponse>(
            `${apiAzure}/Consents/GetConsent`,
            request,
            {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error al obtener el consentimiento:", error);
        throw new Error("No se pudo obtener el consentimiento");
    }
};

