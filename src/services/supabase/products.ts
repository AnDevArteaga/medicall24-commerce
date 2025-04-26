import axios from "axios";
import { CodeXProduct, Product } from "../../interfaces/product.interface";
import { apiSupabase } from "../config/apis";

export const fetchCodeXProduct = async (): Promise<CodeXProduct[]> => {
    const url = `${apiSupabase}/codigos_x_productos?select=*`;
    try {
        const response = await axios.get<CodeXProduct[]>(url, {
            headers: {
                apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                Authorization:
                    import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
            },
        });

        const date_now = new Date();

        const filter_codes = response.data.filter((code) => {
            const initDate = new Date(code.fecha_inicio);
            const finDate = new Date(code.fecha_fin);

            return (
                code.cuenta_compra <= code.compra_maxima &&
                date_now >= initDate &&
                date_now <= finDate &&
                code.estado_producto
            );
        });

        return filter_codes;
    } catch (error) {
        console.error("Error al obtener los códigos y productos:", error);
        throw error;
    }
};

// Función para obtener un código por su código promocional
export const getCodeByPromo = async (codPromo: string): Promise<CodeXProduct | null> => {
    const url = `${apiSupabase}/codigos_x_productos?select=*`;

    try {
        const response = await axios.get<CodeXProduct[]>(url, {
            headers: {
                apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
            },
        });

        // Buscar el código promocional
        const code = response.data.find((code) => code.cod_promo === codPromo);

        if (!code) {
            return null; // Código no encontrado, devolvemos null
        }

        const dateNow = new Date();
        const initDate = new Date(code.fecha_inicio);
        const endDate = new Date(code.fecha_fin);

        // Validaciones: Fecha y cuenta de compra
        if (
            code.cuenta_compra > code.compra_maxima ||
            dateNow < initDate ||
            dateNow > endDate ||
            !code.estado_producto
        ) {
            return null; // Si no es válido, devolvemos null
        }

        return code; // Retornamos el código promocional
    } catch (error) {
        console.error("Error al obtener el código promocional:", error);
        return null; // Devolvemos null si hay error
    }
};

// Función para obtener productos con nombres personalizados
export const getProducts = async (): Promise<Product[]> => {
    const url = `${apiSupabase}/producto?select=*`;

    const namePersonalizedProduct: Record<number, string> = {
        17: "EXAMEN BEXA PARA DETECTAR MASAS EN MAMA",
        16: "PAQUETE DE SERVICIOS COMPLEMENTARIOS PARA DETECTAR CÁNCER DE MAMA",
    };

    try {
        const response = await axios.get<Product[]>(url, {
            headers: {
                apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                Authorization:
                    import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
            },
        });

        const productUpdated: Product[] = response.data.map((
            product,
        ) => ({
            ...product,
            nombre: namePersonalizedProduct[product.id_producto] ||
                product.nombre,
        }));

        return productUpdated;
    } catch (error) {
        console.error("Error al obtener productos:", error);
        throw error;
    }
};

// Función para obtener un producto por su ID
export const getProductById = async (id: string): Promise<Product | null> => {
    const url = `${apiSupabase}/producto?id_producto=eq.${id}&select=*`;

    try {
        const response = await axios.get<Product[]>(url, {
            headers: {
                apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
            },
        });

        if (response.data.length === 0) {
            return null;  // Producto no encontrado, devolvemos null
        }

        return response.data[0]; // Retornamos el producto
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        return null; // Devolvemos null si hay error
    }
};