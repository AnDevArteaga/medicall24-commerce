import { supabase } from "./client/create-client";

export const loginUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { success: false, message: error.message };
    }

    return {
        success: true,
        message: "Login exitoso",
        session: data.session,
        user: data.user,
    };
};
