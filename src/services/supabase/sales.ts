import axios from "axios";
import { apiSupabase } from "../config/apis";
import { buildOrIlikeFilter, appendSearchParam } from "../../dashboard/utils";

export interface RegistroCompra {
    id_compra: number;
    id_orden_pago?: number | null;
    id_transaccion: string;
    id_usuario_medicall: number;
    id_aliado: number;
    id_codigo_promo: number;
    id_gestor: number;
    id_producto: number;
    porcentaje_comision_gestor: number;
    identificacion_comprador: string;
    nombre_comprador: string;
    email_comprador: string;
    direccion_comprador: string;
    telefono_comprador: string;
    ciudad_comprador: string;
    departamento_comprador: string;
    fecha_compra: string;
    metodo_pago: string;
    subtotal: number;
    iva: number;
    comision_transaccion: number;
    total: number;
    total_centavos: number;
    fecha_pago: string;
    descripcion_compra: string;
    estado_transaccion: string;
    ip_transaccion: string;
    compra_cancelada: boolean;
    id_cita_medicall: number;
    estado_cuenta: boolean;
    tipopersona_factura: number;
    tipoid_factura: string;
    numid_factura: string;
    dv_factura: string;
    nombre_factura: string;
    direccion_factura: string;
    correo_factura: string;
    pais_factura: string;
    num_factura: string;
    envio_factura: boolean;
    producto: string;
    nombre_institucion: string;
    telefono_institucio: string;
    direccion_institucion: string;
    ciudad_institucion: string;
    dpto_institucion: string;
    pais_institucion: string;
    link_ayuda: string;
    link_terminos: string;
    link_pasos: string;
}

export interface CodigoPromo {
    id_codigo: number;
    cod_promo: string;
    procentaje_descuento?: number;
    procentaje_descuento_compra?: number;
}

export interface GestorComercial {
    id_gestor: number;
    razon_social: string;
}

export interface VentaCompleta extends RegistroCompra {
    codigo_promo?: CodigoPromo | null;
    gestor?: GestorComercial | null;
}

// Obtener el total de ventas (para paginación)
export const getTotalVentas = async (): Promise<number> => {
    try {
        const url = `${apiSupabase}/registro_compra?select=id_compra&estado_transaccion=eq.APPROVED`;
        
        const response = await axios.get(url, {
            headers: {
                apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
                Prefer: "count=exact",
            },
        });
        
        // Obtener el count del header Content-Range
        const contentRange = response.headers['content-range'];
        if (contentRange) {
            const total = parseInt(contentRange.split('/')[1]);
            return total;
        }
        
        // Si no hay Content-Range, contar los resultados
        return Array.isArray(response.data) ? response.data.length : 0;
    } catch (error) {
        console.error("Error obteniendo total de ventas:", error);
        return 0;
    }
};

const VENTAS_SEARCH_COLUMNS = [
    "producto",
    "nombre_comprador",
    "email_comprador",
    "identificacion_comprador",
    "ciudad_comprador",
    "departamento_comprador",
    "nombre_institucion",
] as const;

// Obtener ventas con paginación y búsqueda en base de datos
export const getVentas = async (
    page: number = 1,
    limit: number = 20,
    searchTerm?: string
): Promise<{
    data: RegistroCompra[];
    total: number;
} | null> => {
    try {
        const offset = (page - 1) * limit;
        const from = offset;
        const to = offset + limit - 1;

        let url = `${apiSupabase}/registro_compra?select=*&estado_transaccion=eq.APPROVED&order=fecha_compra.desc&limit=${limit}&offset=${offset}`;
        if (searchTerm?.trim()) {
            const orFilter = buildOrIlikeFilter(
                [...VENTAS_SEARCH_COLUMNS],
                searchTerm
            );
            url = appendSearchParam(url, orFilter);
        }

        const response = await axios.get(url, {
            headers: {
                apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
                Range: `${from}-${to}`,
                Prefer: "count=exact",
            },
        });

        const contentRange = response.headers["content-range"];
        let total = 0;
        if (contentRange) {
            total = parseInt(contentRange.split("/")[1], 10);
        } else {
            total = Array.isArray(response.data) ? response.data.length : 0;
        }

        return {
            data: response.data || [],
            total,
        };
    } catch (error) {
        console.error("Error obteniendo ventas:", error);
        return null;
    }
};

// Obtener código promocional por ID
export const getCodigoPromoById = async (
    id: number
): Promise<CodigoPromo | null> => {
    try {
        // Intentar primero con codigo_promo, si no existe, usar codigos_x_productos
        let response;
        try {
            response = await axios.get(
                `${apiSupabase}/codigo_promo?id_codigo=eq.${id}&select=id_codigo,cod_promo,procentaje_descuento`,
                {
                    headers: {
                        apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                        Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
                    },
                }
            );
        } catch {
            // Si falla, intentar con codigos_x_productos
            response = await axios.get(
                `${apiSupabase}/codigos_x_productos?id_codigo=eq.${id}&select=id_codigo,cod_promo,procentaje_descuento_compra`,
                {
                    headers: {
                        apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                        Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
                    },
                }
            );
        }
        if (response.data && response.data.length > 0) {
            return response.data[0];
        }
        return null;
    } catch (error) {
        console.error("Error obteniendo código promocional:", error);
        return null;
    }
};

// Obtener gestor comercial por ID
export const getGestorComercialById = async (
    id: number
): Promise<GestorComercial | null> => {
    try {
        const response = await axios.get(
            `${apiSupabase}/gestor_comercial?id_gestor=eq.${id}&select=id_gestor,razon_social`,
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
        console.error("Error obteniendo gestor comercial:", error);
        return null;
    }
};

// Obtener ventas con información completa (código promo y gestor) con paginación
export const getVentasCompletas = async (
    page: number = 1,
    limit: number = 20,
    searchTerm?: string
): Promise<{
    data: VentaCompleta[];
    total: number;
}> => {
    try {
        const ventas = await getVentas(page, limit, searchTerm);
        if (!ventas || !ventas.data) {
            return { data: [], total: 0 };
        }

        const ventasCompletas: VentaCompleta[] = await Promise.all(
            ventas.data.map(async (venta) => {
                const ventaCompleta: VentaCompleta = { ...venta };

                // Obtener código promocional si existe
                if (venta.id_codigo_promo && venta.id_codigo_promo !== 0) {
                    ventaCompleta.codigo_promo = await getCodigoPromoById(
                        venta.id_codigo_promo
                    );
                } else {
                    ventaCompleta.codigo_promo = null;
                }

                // Obtener gestor comercial si existe
                if (venta.id_gestor && venta.id_gestor !== 0) {
                    ventaCompleta.gestor = await getGestorComercialById(
                        venta.id_gestor
                    );
                } else {
                    ventaCompleta.gestor = null;
                }

                return ventaCompleta;
            })
        );

        return {
            data: ventasCompletas,
            total: ventas.total,
        };
    } catch (error) {
        console.error("Error obteniendo ventas completas:", error);
        return { data: [], total: 0 };
    }
};

/** Tipo para la vista de pago a gestores: venta con numero_orden si tiene orden asociada */
export interface VentaParaPagoGestores extends VentaCompleta {
    numero_orden?: number | null;
}

/** Columnas buscables en ventas para pago gestores (misma tabla registro_compra) */
const PAGO_GESTORES_SEARCH_COLUMNS = [
    "producto",
    "nombre_comprador",
    "email_comprador",
    "identificacion_comprador",
] as const;

/** Obtener ventas filtradas para el módulo de pago a gestores: APPROVED, id_gestor > 0, id_codigo_promo > 0. Búsqueda en BD. */
export const getVentasParaPagoGestores = async (
    page: number = 1,
    limit: number = 20,
    searchTerm?: string
): Promise<{ data: VentaParaPagoGestores[]; total: number }> => {
    try {
        const offset = (page - 1) * limit;
        const from = offset;
        const to = offset + limit - 1;

        let url = `${apiSupabase}/registro_compra?select=*&estado_transaccion=eq.APPROVED&id_gestor=gt.0&id_codigo_promo=gt.0&order=fecha_compra.desc&limit=${limit}&offset=${offset}`;
        if (searchTerm?.trim()) {
            const orFilter = buildOrIlikeFilter(
                [...PAGO_GESTORES_SEARCH_COLUMNS],
                searchTerm
            );
            url = appendSearchParam(url, orFilter);
        }

        const response = await axios.get(url, {
            headers: {
                apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
                Range: `${from}-${to}`,
                Prefer: "count=exact",
            },
        });

        const contentRange = response.headers["content-range"];
        let total = 0;
        if (contentRange) {
            total = parseInt(contentRange.split("/")[1], 10);
        } else {
            total = Array.isArray(response.data) ? response.data.length : 0;
        }

        const ventas: RegistroCompra[] = response.data || [];

        const { getOrdenPagoById } = await import("./ordenes-pago-gestores");

        const ventasParaPago: VentaParaPagoGestores[] = await Promise.all(
            ventas.map(async (venta) => {
                const ventaCompleta: VentaParaPagoGestores = {
                    ...venta,
                    codigo_promo: venta.id_codigo_promo
                        ? await getCodigoPromoById(venta.id_codigo_promo)
                        : null,
                    gestor: venta.id_gestor
                        ? await getGestorComercialById(venta.id_gestor)
                        : null,
                };
                if (venta.id_orden_pago) {
                    const orden = await getOrdenPagoById(venta.id_orden_pago);
                    ventaCompleta.numero_orden = orden?.numero_orden ?? null;
                } else {
                    ventaCompleta.numero_orden = null;
                }
                return ventaCompleta;
            })
        );

        return { data: ventasParaPago, total };
    } catch (error) {
        console.error("Error obteniendo ventas para pago gestores:", error);
        return { data: [], total: 0 };
    }
};

/** Obtener registros de compra asociados a una orden de pago (para modal en modo visualización) */
export const getRegistrosCompraPorOrdenPago = async (
    idOrdenPago: number
): Promise<VentaParaPagoGestores[]> => {
    try {
        const response = await axios.get(
            `${apiSupabase}/registro_compra?select=*&id_orden_pago=eq.${idOrdenPago}&order=fecha_compra.desc`,
            {
                headers: {
                    apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                    Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
                },
            }
        );
        const ventas: RegistroCompra[] = response.data || [];
        const ventasParaPago: VentaParaPagoGestores[] = await Promise.all(
            ventas.map(async (v) => {
                const gestor = v.id_gestor
                    ? await getGestorComercialById(v.id_gestor)
                    : null;
                return {
                    ...v,
                    gestor: gestor ?? undefined,
                    numero_orden: undefined,
                } as VentaParaPagoGestores;
            })
        );
        return ventasParaPago;
    } catch (error) {
        console.error("Error obteniendo registros por orden de pago:", error);
        return [];
    }
};

