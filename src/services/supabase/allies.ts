import axios from "axios";
import { Ally } from "../../interfaces/allies-supabase.interface";
import { apiSupabase } from "../config/apis";
import { listInstitutionsById } from "../azure/institutions";

export const fetchAllies = async (): Promise<Ally[]> => {
    const url = `${apiSupabase}/aliados_gestores?select=*`;
    try {
        const response = await axios.get<Ally[]>(url, {
            headers: {
                apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                Authorization:
                    import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
            },
        });

        const enrichedData = await listInstitutionsById(response.data);
        return enrichedData;
    } catch (error) {
        console.error("Error al obtener los aliados:", error);
        throw error;
    }
};
export const fetchAlliesById = async (id: number): Promise<Ally> => {
    const url = `${apiSupabase}/aliados_gestores?id_aliado=eq.${id}&select=*`;
    try {
        const response = await axios.get<Ally>(url, {
            headers: {
                apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                Authorization:
                    import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener el aliado:", error);
        throw error;
    }
};


export const fetchAlliesByIdMunicipality = async (id: number): Promise<Ally> => {
    const url = `${apiSupabase}/aliados_gestores?id_municipio=eq.${id}&select=*`;
    try {
        const response = await axios.get<Ally>(url, {
            headers: {
                apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                Authorization:
                    import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener el aliado:", error);
        throw error;
    }
};