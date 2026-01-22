import axios from "axios";
import { apiSupabase } from "../config/apis";

export interface Banco {
    id_banco: number;
    nombre_banco: string;
}

// Obtener todos los bancos
export const getBancos = async (): Promise<Banco[]> => {
    try {
        const response = await axios.get(
            `${apiSupabase}/bancos?select=*&order=nombre_banco.asc`,
            {
                headers: {
                    apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                    Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
                },
            }
        );
        return response.data || [];
    } catch (error) {
        console.error("Error obteniendo bancos:", error);
        return [];
    }
};
