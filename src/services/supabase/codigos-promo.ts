import axios from "axios";
import { apiSupabase } from "../config/apis";
import { appendSearchParam } from "../../dashboard/utils";

export interface CodigoPromo {
    id_codigo?: number;
    created_at?: string;
    cod_promo: string;
    procentaje_descuento: number;
    fecha_inicio: string;
    fecha_fin: string;
    compra_maxima: number;
    cuenta_compra: number;
    estado: boolean;
    id_prod_pago: number;
    id_producto: number;
    id_gestor: number;
    porcentaje_gestor: number;
    imagen_diseno?: string; // URL o base64 del diseño generado (campo adicional para guardar)
}

const HEADERS = {
    apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
    Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
};

// Columnas buscables en codigo_promo; búsqueda por producto/gestor vía tablas relacionadas
async function buildCodigosSearchOr(
    searchTerm: string
): Promise<string> {
    const term = searchTerm.trim().replace(/%/g, "").replace(/\*/g, "");
    const enc = encodeURIComponent(term);
    const parts: string[] = [`cod_promo.ilike.*${enc}*`];

    try {
        const [prodRes, gestRes] = await Promise.all([
            axios.get<{ id_producto: number }[]>(
                `${apiSupabase}/producto?select=id_producto&nombre=ilike.*${enc}*`,
                { headers: HEADERS }
            ),
            axios.get<{ id_gestor: number }[]>(
                `${apiSupabase}/gestor_comercial?select=id_gestor&razon_social=ilike.*${enc}*`,
                { headers: HEADERS }
            ),
        ]);
        const productIds = (prodRes.data || []).map((r) => r.id_producto);
        const gestorIds = (gestRes.data || []).map((r) => r.id_gestor);
        if (productIds.length) parts.push(`id_producto.in.(${productIds.join(",")})`);
        if (gestorIds.length) parts.push(`id_gestor.in.(${gestorIds.join(",")})`);
    } catch {
        // Si fallan las consultas auxiliares, solo buscamos por cod_promo
    }
    return `(${parts.join(",")})`;
}

// Obtener códigos promocionales con paginación y búsqueda en base de datos (código, producto, gestor)
export const getCodigosPromo = async (
    page: number = 1,
    limit: number = 20,
    searchTerm?: string
): Promise<{
    data: CodigoPromo[];
    total: number;
}> => {
    try {
        const offset = (page - 1) * limit;
        const from = offset;
        const to = offset + limit - 1;

        let url = `${apiSupabase}/codigo_promo?select=*&order=id_codigo.desc&limit=${limit}&offset=${offset}`;
        if (searchTerm?.trim()) {
            const orFilter = await buildCodigosSearchOr(searchTerm);
            url = appendSearchParam(url, orFilter);
        }

        const response = await axios.get(url, {
            headers: {
                ...HEADERS,
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
        console.error("Error obteniendo códigos promocionales:", error);
        return { data: [], total: 0 };
    }
};

// Crear un nuevo código promocional
export const createCodigoPromo = async (
    data: Omit<CodigoPromo, 'id_codigo' | 'created_at'>
): Promise<number | undefined> => {
    try {
        const response = await axios.post(
            `${apiSupabase}/codigo_promo`,
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
        console.error("Error creando código promocional:", error);
        const axiosError = error as { response?: { data?: { message?: string } } };
        throw new Error(
            axiosError?.response?.data?.message || "Error al crear el código promocional"
        );
    }
};

// Actualizar un código promocional
export const updateCodigoPromo = async (
    id: number,
    data: Partial<Omit<CodigoPromo, 'id_codigo' | 'created_at'>>
): Promise<number | undefined> => {
    try {
        const response = await axios.patch(
            `${apiSupabase}/codigo_promo?id_codigo=eq.${id}`,
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
        console.error("Error actualizando código promocional:", error);
        throw error;
    }
};

// Eliminar un código promocional
export const deleteCodigoPromo = async (id: number): Promise<number | undefined> => {
    try {
        const response = await axios.delete(
            `${apiSupabase}/codigo_promo?id_codigo=eq.${id}`,
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
        console.error("Error eliminando código promocional:", error);
        throw error;
    }
};

// Obtener un código promocional por ID
export const getCodigoPromoById = async (id: number): Promise<CodigoPromo | null> => {
    try {
        const response = await axios.get(
            `${apiSupabase}/codigo_promo?id_codigo=eq.${id}&select=*`,
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
        console.error("Error obteniendo código promocional:", error);
        return null;
    }
};
