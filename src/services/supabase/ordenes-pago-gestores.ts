import axios from "axios";
import { apiSupabase } from "../config/apis";

const HEADERS = {
    apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
    Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
};

export type EstadoOrdenPago = 'GENERADA';

export interface OrdenPagoGestores {
    id: number;
    numero_orden: number;
    id_gestor: number;
    total_orden: number;
    fecha_generacion: string;
    comentarios: string | null;
    banco_nombre: string | null;
    tipo_cuenta: string | null;
    numero_cuenta: string | null;
    titular_cuenta: string | null;
    nit_titular: string | null;
    estado: string;
    created_at?: string;
    updated_at?: string;
}

export interface SnapshotBancario {
    banco_nombre: string;
    tipo_cuenta: string;
    numero_cuenta: string;
    titular_cuenta: string;
    nit_titular: string;
}

export interface CreateOrdenPagoPayload {
    id_gestor: number;
    total_orden: number;
    comentarios?: string;
    banco_nombre?: string;
    tipo_cuenta?: string;
    numero_cuenta?: string;
    titular_cuenta?: string;
    nit_titular?: string;
}

/** Obtener el siguiente numero_orden disponible (máximo actual + 1, o 1 si no hay registros) */
export const getSiguienteNumeroOrden = async (): Promise<number> => {
    try {
        const response = await axios.get(
            `${apiSupabase}/ordenes_pago_gestores?select=numero_orden&order=numero_orden.desc&limit=1`,
            { headers: { ...HEADERS } }
        );
        if (response.data && response.data.length > 0 && response.data[0].numero_orden != null) {
            return Number(response.data[0].numero_orden) + 1;
        }
        return 1;
    } catch (error) {
        console.error("Error obteniendo siguiente numero_orden:", error);
        return 1;
    }
};

/** Crear una nueva orden de pago (sin snapshot; snapshot se guarda en fase 2) */
export const createOrdenPago = async (payload: CreateOrdenPagoPayload): Promise<OrdenPagoGestores | null> => {
    try {
        const body = {
            numero_orden: 0, // se actualiza después si quieres; o calculamos antes
            id_gestor: payload.id_gestor,
            total_orden: payload.total_orden,
            fecha_generacion: new Date().toISOString(),
            comentarios: payload.comentarios ?? null,
            banco_nombre: payload.banco_nombre ?? null,
            tipo_cuenta: payload.tipo_cuenta ?? null,
            numero_cuenta: payload.numero_cuenta ?? null,
            titular_cuenta: payload.titular_cuenta ?? null,
            nit_titular: payload.nit_titular ?? null,
            estado: 'GENERADA' as const,
        };

        const siguiente = await getSiguienteNumeroOrden();
        body.numero_orden = siguiente;

        const response = await axios.post(
            `${apiSupabase}/ordenes_pago_gestores`,
            body,
            {
                headers: {
                    ...HEADERS,
                    "Content-Type": "application/json",
                    Prefer: "return=representation",
                },
            }
        );

        if (response.data && response.data.length > 0) {
            return response.data[0] as OrdenPagoGestores;
        }
        return null;
    } catch (error) {
        console.error("Error creando orden de pago:", error);
        throw error;
    }
};

/** Obtener orden por id */
export const getOrdenPagoById = async (id: number): Promise<OrdenPagoGestores | null> => {
    try {
        const response = await axios.get(
            `${apiSupabase}/ordenes_pago_gestores?id=eq.${id}&select=*`,
            { headers: HEADERS }
        );
        if (response.data && response.data.length > 0) {
            return response.data[0] as OrdenPagoGestores;
        }
        return null;
    } catch (error) {
        console.error("Error obteniendo orden de pago:", error);
        return null;
    }
};

/** Actualizar orden: comentarios y snapshot bancario (fase 2) */
export const updateOrdenPagoSnapshot = async (
    id: number,
    data: { comentarios?: string | null } & Partial<SnapshotBancario>
): Promise<void> => {
    try {
        await axios.patch(
            `${apiSupabase}/ordenes_pago_gestores?id=eq.${id}`,
            {
                ...(data.comentarios !== undefined && { comentarios: data.comentarios }),
                ...(data.banco_nombre !== undefined && { banco_nombre: data.banco_nombre }),
                ...(data.tipo_cuenta !== undefined && { tipo_cuenta: data.tipo_cuenta }),
                ...(data.numero_cuenta !== undefined && { numero_cuenta: data.numero_cuenta }),
                ...(data.titular_cuenta !== undefined && { titular_cuenta: data.titular_cuenta }),
                ...(data.nit_titular !== undefined && { nit_titular: data.nit_titular }),
                updated_at: new Date().toISOString(),
            },
            {
                headers: {
                    ...HEADERS,
                    "Content-Type": "application/json",
                    Prefer: "return=minimal",
                },
            }
        );
    } catch (error) {
        console.error("Error actualizando orden de pago (snapshot):", error);
        throw error;
    }
};

/** Asignar id_orden_pago a múltiples registro_compra por id_compra */
export const asignarOrdenARegistrosCompra = async (
    idsCompra: number[],
    idOrdenPago: number
): Promise<void> => {
    if (idsCompra.length === 0) return;
    try {
        const inValues = idsCompra.join(",");
        const url = `${apiSupabase}/registro_compra?id_compra=in.(${inValues})`;
        await axios.patch(
            url,
            { id_orden_pago: idOrdenPago },
            {
                headers: {
                    ...HEADERS,
                    "Content-Type": "application/json",
                    Prefer: "return=minimal",
                },
            }
        );
    } catch (error) {
        console.error("Error asignando orden a registros de compra:", error);
        throw error;
    }
};
