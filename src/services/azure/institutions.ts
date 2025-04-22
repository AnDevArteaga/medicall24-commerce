import axios from "axios";
import { Ally, InstitutionResponse } from "../../interfaces/allies-supabase.interface";
import { apiAzure } from "../config/apis";

export const listInstitutionsById = async (items: Ally[]): Promise<Ally[]> => {
    try {
        const responses = await Promise.all(
            items.map((item) =>
                axios.get<InstitutionResponse>(
                    `${apiAzure}/Institutions/GetInstitution/${item.id_institucion}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
                        },
                    },
                )
            ),
        );

        const dataWithImages = responses.map((response, index) => ({
            ...items[index],
            cover: response.data.institution.cover,
        }));

        return dataWithImages;
    } catch (error) {
        console.error("Error loading institutions:", error);
        return items;
    }
};
