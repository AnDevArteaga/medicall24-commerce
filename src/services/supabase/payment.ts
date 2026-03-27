import axios from "axios";
import { apiSupabase, apiSupabaseFunctions } from "../config/apis";
import { registerPurchase } from "../../interfaces/checkout.interfase";
import { CreateAppointmentDataProps } from "../../contexts/appoiment";

/** Columnas de registro_compra que son integer en la DB. Evitar enviar "" para no provocar 22P02. */
const REGISTRO_COMPRA_INTEGER_KEYS = [
  "id_usuario_medicall", "id_aliado", "id_codigo_promo", "id_gestor", "id_producto", "id_cita_medicall",
  "porcentaje_comision_gestor", "subtotal", "iva", "comision_transaccion", "total", "total_centavos",
  "tipopersona_factura", "id_paciente", "id_orden_pago",
] as const;

function sanitizeRegistroCompraPayload<T extends Record<string, unknown>>(payload: T): T {
  const out = { ...payload };
  for (const key of REGISTRO_COMPRA_INTEGER_KEYS) {
    if (!(key in out)) continue;
    const v = (out as Record<string, unknown>)[key];
    if (v === "" || v === undefined) {
      (out as Record<string, unknown>)[key] = null;
    } else if (typeof v === "string") {
      const n = Number(v);
      (out as Record<string, unknown>)[key] = Number.isFinite(n) ? n : null;
    }
  }
  return out;
}

export const registerPurchaseData = async (registerPurchase: registerPurchase) => {
  try {
    const payload = sanitizeRegistroCompraPayload(registerPurchase as unknown as Record<string, unknown>) as unknown as registerPurchase;
    const response = await axios.post(
      `${apiSupabase}/registro_compra`,
      payload,
      {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
          Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
          "Content-Type": "application/json",
          Prefer: "return=representation", // Cambiar para obtener el ID de la compra guardada
        },
      }
    );
    if (response.status === 201 || response.status === 200) {
      console.log("Datos insertados correctamente");
    }
    // Retornar tanto el status como los datos (que incluyen el ID)
    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
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

export const registerAppointmentData = async (id_transaccion: string, appointment: CreateAppointmentDataProps, patientId: number, id_municipio: number | string, id_compra?: number) => {
  console.log("appointment en fecth", appointment)
  const { professionalName, ...appointmentWithoutUiFields } = appointment;
  const appoimentComplete = {
    ...appointmentWithoutUiFields,
    id_transaccion,
    patientId: patientId, // Usar el ID del paciente (userCompleteData.id)
    ...(professionalName ? { professional_name: professionalName } : {}),
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
  } catch (error: unknown) {
    const ax = error as { response?: { status?: number; data?: { message?: string; error?: string } } };
    const msg = String(ax?.response?.data?.message ?? ax?.response?.data?.error ?? "");

    // Compatibilidad: si la columna professional_name aún no existe en producción,
    // reintentar sin ese campo para no bloquear la creación de la cita.
    const professionalColumnMissing =
      msg.includes("professional_name") &&
      (msg.includes("schema cache") || msg.includes("column") || msg.includes("does not exist"));

    if (professionalColumnMissing) {
      console.warn("⚠️ professional_name no existe en DB, reintentando insert sin ese campo");
      const fallbackPayload = { ...(appoimentComplete as Record<string, unknown>) };
      delete fallbackPayload.professional_name;
      const retry = await axios.post(
        `${apiSupabase}/citas_external_provider`,
        fallbackPayload,
        {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
            Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
        }
      );
      if (retry.status === 201 || retry.status === 200) {
        console.log("Datos insertados correctamente (sin professional_name)");
      }
      return retry.status;
    }

    console.error("Error guardando compra:", error);
    throw error;
  }
};

export const getPurchaseIdByTransactionId = async (idTransaccion: string): Promise<number | null> => {
  try {
    const response = await axios.get(
      `${apiSupabase}/registro_compra?id_transaccion=eq.${idTransaccion}&select=id_compra`,
      {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
          Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
          "Content-Type": "application/json",
        },
      }
    );
    
    if (response.status === 200 && response.data && response.data.length > 0) {
      const idCompra = response.data[0]?.id_compra;
      console.log("✅ [GET] id_compra obtenido por id_transaccion:", idCompra);
      return idCompra || null;
    }
    
    console.warn("⚠️ [GET] No se encontró compra con id_transaccion:", idTransaccion);
    return null;
  } catch (error) {
    console.error("❌ [GET] Error obteniendo id_compra por id_transaccion:", error);
    return null;
  }
};

export const updatePurchaseData = async (idCompra: number, updates: Partial<registerPurchase>) => {
  try {
    const payload = sanitizeRegistroCompraPayload(updates as unknown as Record<string, unknown>) as unknown as Partial<registerPurchase>;
    const response = await axios.patch(
      `${apiSupabase}/registro_compra?id_compra=eq.${idCompra}`,
      payload,
      {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
          Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
      }
    );
    if (response.status === 200 || response.status === 204) {
      console.log("Compra actualizada correctamente");
    }
    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
    console.error("Error actualizando compra:", error);
    throw error;
  }
};

/** Obtiene payload de correo por compra (quick-action) y envía con rapid-service. Llamar antes de createConsultation. */
export const sendConfirmationEmail = async (idCompra: number, transactionId?: string) => {
  console.log("[EMAIL] sendConfirmationEmail llamado → id_compra:", idCompra, "id_transaccion:", transactionId ?? "(no)");
  try {
    const body: { id_compra: number; id_transaccion?: string } = { id_compra: idCompra };
    if (transactionId) body.id_transaccion = transactionId;
    const payloadRes = await axios.post(
      `${apiSupabaseFunctions}/quick-action`,
      body,
      {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
          Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("[EMAIL] quick-action → status:", payloadRes.status, "to:", (payloadRes.data as { to?: string })?.to);
    const payload = payloadRes.data as { template_id: string; to: string; dynamic_template_data: Record<string, unknown> };
    const emailRes = await axios.post(
      `${apiSupabaseFunctions}/rapid-service`,
      payload,
      {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
          Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("[EMAIL] rapid-service → status:", emailRes.status);
    if (emailRes.status === 202) {
      console.log("✅ Correo de confirmación enviado");
    } else {
      console.warn("[EMAIL] rapid-service no devolvió 202:", emailRes.status, emailRes.data);
    }
    return { ok: emailRes.status === 202 };
  } catch (error: unknown) {
    const ax = error as { response?: { status?: number; data?: unknown }; message?: string };
    console.warn(
      "⚠️ No se pudo enviar correo de confirmación:",
      ax?.response?.status != null ? `HTTP ${ax.response.status}` : ax?.message ?? error
    );
    if (ax?.response?.data) console.warn("[EMAIL] respuesta error:", ax.response.data);
    return { ok: false };
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
