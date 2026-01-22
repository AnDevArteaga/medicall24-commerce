import axios from "axios";
import { apiSupabase } from "../config/apis";

export interface AliadoComercial {
    id_aliado: number;
    nombre_prestador?: string;
    razon_social?: string;
    nombre?: string;
}

// Obtener todos los aliados comerciales
export const getAliadosComerciales = async (): Promise<AliadoComercial[]> => {
    try {
        // Intentar con diferentes nombres de tabla posibles
        let response;
        try {
            response = await axios.get(
                `${apiSupabase}/aliado_comercial?select=*&order=id_aliado.asc`,
                {
                    headers: {
                        apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                        Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
                    },
                }
            );
        } catch {
            // Si falla, intentar con la tabla que ya sabemos que existe
            response = await axios.get(
                `${apiSupabase}/aliado_comercialbexa_claro?select=id_aliado,nombre_prestador&order=id_aliado.asc`,
                {
                    headers: {
                        apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                        Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
                    },
                }
            );
        }
        
        // Normalizar los datos para tener un formato consistente
        const data = response.data || [];
        return data.map((item: any) => ({
            id_aliado: item.id_aliado,
            nombre_prestador: item.nombre_prestador || item.razon_social || item.nombre || 'Sin nombre',
        }));
    } catch (error) {
        console.error("Error obteniendo aliados comerciales:", error);
        return [];
    }
};
