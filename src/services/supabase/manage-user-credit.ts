import axios from "axios";
import { apiSupabase } from "../config/apis";

export interface GestionUsuarioCredito {
    tipoId: string;
    identificacion: number;
    nombre_comprador: string;
    correo_comprador: string;
    telefono_comprador: number;
    gestionado?: boolean;
    credito_aprobado?: string;
    negado?: boolean;
}

export interface GestionUsuarioCreditoResponse extends GestionUsuarioCredito {
    id: number;
    created_at?: string;
}

// Registrar solicitud de validación de cupo
export const registerGestionUsuarioCredito = async (
    data: GestionUsuarioCredito
): Promise<number | undefined> => {
    try {
        const response = await axios.post(
            `${apiSupabase}/gestion_usuario_credito`,
            data,
            {
                headers: {
                    apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                    Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
                    "Content-Type": "application/json",
                    Prefer: "return=minimal",
                },
            }
        );
        return response.status;
    } catch (error: unknown) {
        console.error("Error insertando datos:", error);
        const errorMessage = error instanceof Error 
            ? error.message 
            : "Error al enviar la solicitud";
        const axiosError = error as { response?: { data?: { message?: string } } };
        throw new Error(
            axiosError?.response?.data?.message || errorMessage
        );
    }
};

// Obtener todos los usuarios de gestión
export const getGestionUsuarioCredito = async (): Promise<{
    data: GestionUsuarioCreditoResponse[];
} | null> => {
    try {
        const response = await axios.get(
            `${apiSupabase}/gestion_usuario_credito?select=*&order=created_at.desc`,
            {
                headers: {
                    apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                    Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error obteniendo datos:", error);
        return null;
    }
};

// Actualizar estado gestionado
export const updateGestionado = async (
    id: number,
    gestionado: boolean
): Promise<number | undefined> => {
    try {
        const response = await axios.patch(
            `${apiSupabase}/gestion_usuario_credito?id=eq.${id}`,
            { gestionado },
            {
                headers: {
                    apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                    Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
                    "Content-Type": "application/json",
                    Prefer: "return=minimal",
                },
            }
        );
        return response.status;
    } catch (error) {
        console.error("Error actualizando estado:", error);
        throw error;
    }
};

// Actualizar estado gestionado por identificación
export const updateGestionadoByIdentificacion = async (
    identificacion: string,
    gestionado: boolean
): Promise<number | undefined> => {
    try {
        const response = await axios.patch(
            `${apiSupabase}/gestion_usuario_credito?identificacion=eq.${identificacion}`,
            { gestionado },
            {
                headers: {
                    apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                    Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
                    "Content-Type": "application/json",
                    Prefer: "return=minimal",
                },
            }
        );
        return response.status;
    } catch (error) {
        console.error("Error actualizando estado por identificación:", error);
        throw error;
    }
};

// Negar solicitud de crédito
export const negarSolicitudCredito = async (
    id: number,
    // email: string
): Promise<number | undefined> => {
    try {
        const response = await axios.patch(
            `${apiSupabase}/gestion_usuario_credito?id=eq.${id}`,
            { gestionado: true, negado: true },
            {
                headers: {
                    apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                    Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
                    "Content-Type": "application/json",
                    Prefer: "return=minimal",
                },
            }
        );
        return response.status;
    } catch (error) {
        console.error("Error negando solicitud:", error);
        throw error;
    }
};

