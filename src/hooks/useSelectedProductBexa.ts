import { useState, useCallback } from "react";
import { Product } from "../interfaces/product.interface";

export const useProductoSeleccionado = () => {
  const [producto, setProducto] = useState<Product | null>(null);

  const seleccionarProducto = useCallback((id: number, productos: Product[]) => {
    const encontrado = productos.find((p) => p.id_producto === id);
    if (encontrado) setProducto(encontrado);
  }, []);

  const limpiarProducto = useCallback(() => setProducto(null), []);

  return {
    producto,
    seleccionarProducto,
    limpiarProducto,
  };
};
