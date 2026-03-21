import axios from "axios";
import { Ally } from "../../interfaces/allies-supabase.interface";
import { apiSupabase } from "../config/apis";
import { listInstitutionsById } from "../azure/institutions";

/** Tabla de prestadores para compras Bexa / flujo pago */
const TABLE_ALIADOS_BEXA_CLARO = "aliado_comercialbexa_claro";
/** Tabla de prestadores para consultas gratuitas (telemedicina free) */
const TABLE_ALIADOS_CITAS_FREE = "aliado_comercial_citasfree";

export type FetchAlliesOptions = {
    /** Si true, lee prestadores de aliado_comercial_citasfree (consulta gratuita) */
    citasFree?: boolean;
};

function alliesTableName(citasFree?: boolean): string {
    return citasFree ? TABLE_ALIADOS_CITAS_FREE : TABLE_ALIADOS_BEXA_CLARO;
}

export const fetchAllies = async (options?: FetchAlliesOptions): Promise<Ally[]> => {
    const table = alliesTableName(options?.citasFree);
    const url = `${apiSupabase}/${table}?estado=eq.true&select=*`;
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


export const fetchAlliesByIdMunicipality = async (
    id: number,
    options?: FetchAlliesOptions
): Promise<Ally> => {
    const table = alliesTableName(options?.citasFree);
    const url = `${apiSupabase}/${table}?id_municipio=eq.${id}&estado=eq.true&select=*`;
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