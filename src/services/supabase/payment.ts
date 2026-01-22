import axios from "axios";
import { apiSupabase, apiSupabaseFunctions } from "../config/apis";
import { registerPurchase } from "../../interfaces/checkout.interfase";
import { CreateAppointmentDataProps } from "../../contexts/appoiment";

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
              Prefer: "return=representation", // Cambiar para obtener el ID de la compra guardada
            },
          }
        );
        console.log("response", response);
        if (response.status === 201 || response.status === 200) {
          console.log("Datos insertados correctamente");
        }
        // Retornar tanto el status como los datos (que incluyen el ID)
        return {
            status: response.status,
            data: response.data
        };
      }  catch (error) {
        console.error("Error guardando compra:", error);
        throw error;
    }
};

// function normalizeDate(fechaStr: string | null): string | null {
//   if (!fechaStr) return null;

//   // Si ya está en formato ISO, solo la normalizamos
//   if (!fechaStr.includes('T00:00:00T')) {
//     return new Date(fechaStr).toISOString();
//   }

//   // Si viene con formato incorrecto como "2025-12-05T00:00:00T11:08 AM:00"
//   const cleaned = fechaStr.replace(/T00:00:00T/, ' ');
//   return new Date(cleaned).toISOString();
// }

export const registerAppointmentData = async (id_transaccion: string, appointment: CreateAppointmentDataProps, userId: number, id_municipio: number | string, id_compra?: number) => {
    console.log("appointment en fecth", appointment)
const appoimentComplete = {
    ...appointment,
  id_transaccion,
  patientId: userId,
  municipio: typeof id_municipio === 'string' ? parseInt(id_municipio, 10) : id_municipio, // Convertir a número si es string
  ...(id_compra && { id_compra }), // Agregar id_compra si está presente
};


    try {
        const response = await axios.post(
          `${apiSupabase}/citas_external_provider`,
          appoimentComplete,
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

export const createConsultation = async (transactionId: string, idCompra?: number) => {
    console.log("consultation en fecth", { id_transaccion: transactionId, id_compra: idCompra })
    try {
        const requestBody: { id_transaccion: string; id_compra?: number } = {
            id_transaccion: transactionId
        };
        
        // Agregar id_compra solo si está presente
        if (idCompra !== undefined && idCompra !== null) {
            requestBody.id_compra = idCompra;
        }
        
        const response = await axios.post(
          `${apiSupabaseFunctions}/create-consultation`,
          requestBody,
          {
            headers: {
              apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
              Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response", response);
        if (response.status === 201 || response.status === 200) {
          console.log("Consulta creada correctamente");
        }
        // Retornar tanto el status como los datos completos
        return {
            status: response.status,
            data: response.data
        };
    }
catch (error: unknown) {
    console.error("Error creando consulta:", error);
    // Retornar información del error también
    const errorResponse = error as { response?: { status?: number; data?: unknown }; message?: string };
    return {
        status: errorResponse.response?.status || 500,
        data: errorResponse.response?.data || { error: errorResponse.message || "Error desconocido" },
        error: true
    };
} 
}
