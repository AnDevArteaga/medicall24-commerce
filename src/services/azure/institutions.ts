import axios from "axios";
import { Ally, InstitutionResponse } from "../../interfaces/allies-supabase.interface";
import { apiAzure } from "../config/apis";

export const listInstitutionsById = async (items: Ally[]): Promise<Ally[]> => {
    const DEFAULT_COVER = "https://medicall24.com.co/wp-content/uploads/2023/12/1_2_1.png";

    try {
        const responses = await Promise.allSettled(
            items.map((item) =>
                axios.get<InstitutionResponse>(
                    `${apiAzure}/Institutions/GetInstitution/${item.id_institucion}`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
                        },
                    }
                )
            )
        );

        const dataWithImages: Ally[] = responses.map((res, index) => {
            const item = items[index];

            if (res.status === "fulfilled") {
                const cover =
                    res.value.data.institution.cover ??
                    DEFAULT_COVER; 

                return {
                    ...item,
                    cover,
                };
            }

            // Si fallo la petición → usar cover por defecto
            return {
                ...item,
                cover: DEFAULT_COVER,
            };
        });

        return dataWithImages;
    } catch (error) {
        console.error("Error loading institutions:", error);
        return items.map((item) => ({
            ...item,
            cover: "/assets/default-cover.png",
        }));
    }
};

export const listInstitutionsByIdComplete = async (id: number | string): Promise<InstitutionResponse> => {
    try {
        const response = await axios.get<InstitutionResponse>(
            `${apiAzure}/Institutions/GetInstitution/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
                },
            },
        );
        console.log('response', response)
        return response.data;
    } catch (error) {
        console.error("Error loading institutions:", error);
        throw new Error("No se pudo cargar la institución");
    }

}