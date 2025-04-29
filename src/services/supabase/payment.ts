import axios from "axios";
import { apiSupabase } from "../config/apis";
import { registerPurchase } from "../../interfaces/checkout.interfase";

export const registerPurchaseData = async ( registerPurchase: registerPurchase) => {
    console.log("registerPurchase en fecth", registerPurchase)
    try {
        const response = await axios.post(
          `${apiSupabase}/registro_compra`,
          registerPurchase,
          {
            headers: {
              apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
              Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
              "Content-Type": "application/json",
              Prefer: "return=minimal",
            },
          }
        );
        console.log("response", response);
        if (response.status === 201 || response.status === 200) {
          console.log("Datos insertados correctamente");
        }
        return response.status
      }  catch (error) {
        console.error("Error guardando compra:", error);
        throw error;
    }
};