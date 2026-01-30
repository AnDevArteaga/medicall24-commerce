import { useEffect, useState, useRef, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getProductById, getCodeByPromo } from "../services/supabase/products";
import { Product, CodeXProduct } from "../interfaces/product.interface";
import { usePurchaseContext } from "../contexts/checkout";

export const useGetProduct = () => {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { setProduct, setGeneralPaymentData, product } = usePurchaseContext();

    // Usar refs para evitar llamadas duplicadas y almacenar funciones del contexto
    const isFetchingRef = useRef(false);
    const lastProductIdRef = useRef<string | null>(null);
    const lastCodeIdRef = useRef<string | null>(null);
    const mountedRef = useRef(true);
    const setProductRef = useRef(setProduct);
    const setGeneralPaymentDataRef = useRef(setGeneralPaymentData);

    // Mantener las referencias actualizadas
    useEffect(() => {
        setProductRef.current = setProduct;
        setGeneralPaymentDataRef.current = setGeneralPaymentData;
    }, [setProduct, setGeneralPaymentData]);

    // Memoizar los parámetros para evitar re-renders innecesarios
    const productId = useMemo(() => searchParams.get("p"), [searchParams]);
    const codeId = useMemo(() => searchParams.get("c"), [searchParams]);

    useEffect(() => {
        mountedRef.current = true;

        const getProduct = async () => {
            // Si ya estamos obteniendo el producto, no hacer nada
            if (isFetchingRef.current) {
                return;
            }

            // Verificar si los parámetros han cambiado
            const currentProductId = productId || null;
            const currentCodeId = codeId || null;

            if (
                currentProductId === lastProductIdRef.current &&
                currentCodeId === lastCodeIdRef.current &&
                product
            ) {
                // Si los parámetros no han cambiado y ya tenemos el producto, no hacer nada
                if (mountedRef.current) {
                    setLoading(false);
                }
                return;
            }

            // Verificar que productId esté disponible
            if (!productId) {
                if (mountedRef.current) {
                    setError("Producto no encontrado.");
                    setLoading(false);
                }
                return;
            }

            // Marcar que estamos obteniendo el producto
            isFetchingRef.current = true;
            if (mountedRef.current) {
                setLoading(true);
                setError(null);
            }

            try {
                let finalProduct: Product | CodeXProduct | null = null;

                // Si hay un código promocional, lo buscamos
                if (codeId) {
                    const code = await getCodeByPromo(codeId);
                    if (code && code !== null) {
                        finalProduct = code;
                        if (mountedRef.current) {
                            setGeneralPaymentDataRef.current(
                                (prev) => ({
                                    ...prev,
                                    discount: code.procentaje_descuento_compra,
                                }),
                            );
                        }
                        lastCodeIdRef.current = codeId;
                        lastProductIdRef.current = null;
                    } else {
                        if (mountedRef.current) {
                            setError("Código promocional no encontrado.");
                        }
                    }
                } else {
                    // Si no, buscamos el producto
                    const fetchedProduct = await getProductById(productId);
                    if (fetchedProduct && fetchedProduct !== null) {
                        finalProduct = fetchedProduct;
                        lastProductIdRef.current = productId;
                        lastCodeIdRef.current = null;
                    } else {
                        if (mountedRef.current) {
                            setError("Producto no encontrado.");
                        }
                    }
                }

                // Si encontramos un producto o código, lo seteamos
                if (finalProduct && mountedRef.current) {
                    setProductRef.current(finalProduct);
                    setGeneralPaymentDataRef.current(
                        (prev) => ({
                            ...prev,
                            productId: finalProduct.id_producto,

                        }),
                    );
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Error al obtener el producto.";
                if (mountedRef.current) {
                    setError(errorMessage);
                }
            } finally {
                if (mountedRef.current) {
                    setLoading(false);
                }
                isFetchingRef.current = false;
            }
        };

        getProduct();

        return () => {
            mountedRef.current = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId, codeId]); // Solo depender de los valores memoizados

    return { loading, error };
};
