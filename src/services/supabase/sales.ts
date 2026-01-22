import axios from "axios";
import { apiSupabase } from "../config/apis";

export interface RegistroCompra {
    id_compra: number;
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

// Obtener ventas con paginación
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
        
        const url = `${apiSupabase}/registro_compra?select=*&estado_transaccion=eq.APPROVED&order=fecha_compra.desc&limit=${limit}&offset=${offset}`;
        
        const response = await axios.get(url, {
            headers: {
                apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
                Range: `${from}-${to}`,
                Prefer: "count=exact",
            },
        });
        
        // Obtener el total del header Content-Range
        const contentRange = response.headers['content-range'];
        let total = 0;
        if (contentRange) {
            total = parseInt(contentRange.split('/')[1]);
        } else {
            // Si no hay Content-Range, usar el total de la respuesta
            total = Array.isArray(response.data) ? response.data.length : 0;
        }
        
        // Si hay término de búsqueda, filtrar los resultados
        let filteredData = response.data || [];
        if (searchTerm && searchTerm.trim()) {
            const search = searchTerm.toLowerCase();
            filteredData = filteredData.filter(
                (venta: RegistroCompra) =>
                    venta.identificacion_comprador?.toLowerCase().includes(search) ||
                    venta.nombre_comprador?.toLowerCase().includes(search) ||
                    venta.email_comprador?.toLowerCase().includes(search) ||
                    venta.ciudad_comprador?.toLowerCase().includes(search) ||
                    venta.departamento_comprador?.toLowerCase().includes(search) ||
                    venta.producto?.toLowerCase().includes(search) ||
                    venta.nombre_institucion?.toLowerCase().includes(search)
            );
            // Cuando hay búsqueda, el total es aproximado (solo de la página actual)
            // Para obtener el total real con búsqueda, necesitaríamos otra consulta
            // Por ahora, usamos el total filtrado de esta página
            total = filteredData.length;
        }
        
        return {
            data: filteredData,
            total: total,
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

