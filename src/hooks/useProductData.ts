import { useState, useEffect } from "react";
import { fetchCodeXProduct, getProducts } from "../services/supabase/products";
import { CodeXProduct, Product } from "../interfaces/product.interface"; // ajusta la ruta

export const useProductData = () => {
  const [codigos, setCodigos] = useState<CodeXProduct[] | null>(null);
  const [productos, setProductos] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [codigosData, productosData] = await Promise.all([
          fetchCodeXProduct(),
          getProducts(),
        ]);
        console.log(codigos, productosData)
        setCodigos(codigosData);
        setProductos(productosData);
      } catch (err) {
        setError("Ocurrió un error al cargar los datos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { codigos, productos, loading, error };
};
