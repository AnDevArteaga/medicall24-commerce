import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProductById, getCodeByPromo } from "../services/supabase/products";
import { Product, CodeXProduct } from "../interfaces/product.interface";
import { usePurchaseContext } from "../contexts/checkout";

export const useGetProduct = () => {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { setProduct, setGeneralPaymentData } = usePurchaseContext();

    const getProduct = async () => {
        try {
            const productId = searchParams.get("p");
            const codeId = searchParams.get("c");

            // Verificar que productId esté disponible
            if (!productId) {
                setError("Producto no encontrado.");
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            let finalProduct: Product | CodeXProduct | null = null;

            // Si hay un código promocional, lo buscamos
            if (codeId) {
                const code = await getCodeByPromo(codeId);
                if (code && code !== null) {
                    finalProduct = code;
                } else {
                    setError("Código promocional no encontrado.");
                }
            } else {
                // Si no, buscamos el producto
                const product = await getProductById(productId);
                if (product && product !== null) {
                    finalProduct = product;
                } else {
                    setError("Producto no encontrado.");
                }
            }

            // Si encontramos un producto o código, lo seteamos
            if (finalProduct) {
                setProduct(finalProduct);
                setGeneralPaymentData(
                    (prev) => ({
                        ...prev,
                        productId: finalProduct.id_producto,
                    }),
                );
            }
            console.log(finalProduct);
        } catch (error: any) {
            setError(error.message || "Error al obtener el producto.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProduct();
    }, [searchParams, setProduct]);

    return { loading, error };
};
