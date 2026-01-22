import axios from "axios";
import { apiSupabase, apiSupabaseFunctions } from "../config/apis";
import toast from "react-hot-toast";

interface FormData {
  [key: string]: any;
}

export const registerAuthorizationData = async (formData: FormData): Promise<number | undefined> => {
    console.log("formData", formData);
    try {
        const response = await axios.post(
            `${apiSupabase}/registro_usuario_credito`,
            formData,
            {
                headers: {
                    apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                    Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
                    "Content-Type": "application/json",
                    Prefer: "return=minimal",
                },
            }
        );
        if (response.status === 201 || response.status === 200) {
            toast.success("Guardado correctamente");
        }

        console.log("response", response);

        return response.status;
    } catch (error) {
        console.error("Error inserting data:", error);
        toast.error("Error saving data");
    }
};

export const getAuthorizationData = async () => {
    try {
        const response = await axios.get(
            `${apiSupabase}/registro_usuario_credito?select=*&order=fecha_aprobacion.desc`,
            {
                headers: {
                    apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                    Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
                },
            }
        );
        if (response.status === 201 || response.status === 200) {
            toast.success("Datos actualizados correctamente");
        }
        return response;
    } catch (error) {
        console.error("Error retrieving data:", error);
        toast.error("Error retrieving data");
    }
};


export const updateAuthorizationData = async (code: string) => {
    try {
        const response = await axios.patch(
            `${apiSupabase}/registro_usuario_credito?codigo_credito=eq.${code}`,
            { validado: true },
            {
                headers: {
                    apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                    Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
                    "Content-Type": "application/json",
                    Prefer: "return=minimal",
                },
            }
        );

        if (response.status === 200 || response.status === 204) {
            toast.success("Guardado correctamente");
        }

        console.log("response", response);
        return response.status;
    } catch (error) {
        console.error("Error updating data:", error);
        toast.error("Error guardando datos");
    }
};

export const sendEmailAuthorization = async (email: string, authorization_code: string) => {
    try {
        const response = await axios.post(
            `${apiSupabaseFunctions}/send-email-authorization-credit`,
            { email, authorization_code },
            {
                headers: {
                    apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                    Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.status === 200 || response.status === 204) {
            toast.success("Email enviado correctamente");
        }
        return response.status;
    } catch (error) {
        console.error("Error sending email:", error);
        toast.error("Error sending email");
    }
};

export const sendEmailNegacionCredito = async (email: string) => {
    try {
        const response = await axios.post(
            `${apiSupabaseFunctions}/send-email-authorization-credit-negation`,
            { email },
            {
                headers: {
                    apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                    Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.status === 200 || response.status === 204) {
            toast.success("Email de negación enviado correctamente");
        }
        return response.status;
    } catch (error) {
        console.error("Error sending email:", error);
        toast.error("Error enviando email de negación");
    }
};