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
