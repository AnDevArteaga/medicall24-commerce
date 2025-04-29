import axios from "axios";
import { apiSupabase } from "../config/apis";
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
            toast.success("Data saved successfully");
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
            `${apiSupabase}/registro_usuario_credito?select=*`,
            {
                headers: {
                    apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                    Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
                },
            }
        );
        if (response.status === 201 || response.status === 200) {
            toast.success("Data retrieved successfully");
        }
        return response;
    } catch (error) {
        console.error("Error retrieving data:", error);
        toast.error("Error retrieving data");
    }
};


