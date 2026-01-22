import axios from "axios";
import { apiSupabase } from "../config/apis";

export interface Gestor {
    id_gestor?: number;
    naturaleza_juridica: number; // 0 = Natural, 1 = Jurídica
    tipo_identificacion: string; // "CC" o "NI"
    num_identificacion: string;
    digito_verificacion: string;
    razon_social: string;
    direccion: string;
    telefono: string;
    email: string;
    ciudad: string;
    departamento: string;
    pais: string;
    longitud?: string;
    latitud?: string;
    representante_legal: string;
    nombre_contacto: string;
    telefono_contacto: string;
    id_banco: number;
    tipo_cuenta: string; // "Ahorros" o "Corriente"
    numero_cuenta_bancaria: string;
    documentos: boolean;
    estado_gestor: boolean;
    habilitado_operar: boolean;
    id_aliado: number;
}

// Obtener todos los gestores
export const getGestores = async (): Promise<{
    data: Gestor[];
}> => {
    try {
        const response = await axios.get(
            `${apiSupabase}/gestor_comercial?select=*&order=id_gestor.desc`,
            {
                headers: {
                    apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                    Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
                },
            }
        );
        return { data: response.data || [] };
    } catch (error) {
        console.error("Error obteniendo gestores:", error);
        return { data: [] };
    }
};

// Crear un nuevo gestor
export const createGestor = async (data: Omit<Gestor, 'id_gestor'>): Promise<number | undefined> => {
    try {
        const response = await axios.post(
            `${apiSupabase}/gestor_comercial`,
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
        console.error("Error creando gestor:", error);
        const axiosError = error as { response?: { data?: { message?: string } } };
        throw new Error(
            axiosError?.response?.data?.message || "Error al crear el gestor"
        );
    }
};

// Actualizar un gestor
export const updateGestor = async (
    id: number,
    data: Partial<Omit<Gestor, 'id_gestor'>>
): Promise<number | undefined> => {
    try {
        const response = await axios.patch(
            `${apiSupabase}/gestor_comercial?id_gestor=eq.${id}`,
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
    } catch (error) {
        console.error("Error actualizando gestor:", error);
        throw error;
    }
};

// Eliminar un gestor
export const deleteGestor = async (id: number): Promise<number | undefined> => {
    try {
        const response = await axios.delete(
            `${apiSupabase}/gestor_comercial?id_gestor=eq.${id}`,
            {
                headers: {
                    apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                    Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
                    Prefer: "return=minimal",
                },
            }
        );
        return response.status;
    } catch (error) {
        console.error("Error eliminando gestor:", error);
        throw error;
    }
};

// Obtener un gestor por ID
export const getGestorById = async (id: number): Promise<Gestor | null> => {
    try {
        const response = await axios.get(
            `${apiSupabase}/gestor_comercial?id_gestor=eq.${id}&select=*`,
            {
                headers: {
                    apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                    Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
                },
            }
        );
        if (response.data && response.data.length > 0) {
            return response.data[0];
        }
        return null;
    } catch (error) {
        console.error("Error obteniendo gestor:", error);
        return null;
    }
};
