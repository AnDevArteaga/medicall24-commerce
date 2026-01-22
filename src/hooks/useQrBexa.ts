import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Product } from "../interfaces/product.interface";
import { CodeXProduct } from "../interfaces/product.interface";

interface UsePromoQueryParams {
  productos: Product[];
  codigos: CodeXProduct[];
  openModal: (name: string) => void;
  seleccionarProducto: (id_producto: number, productos: Product[]) => void;
}

export const usePromoQueryEffect = ({
  productos,
  codigos,
  openModal,
  seleccionarProducto,
}: UsePromoQueryParams) => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const promo = searchParams.get("promo");
    const productId = searchParams.get("product");

    if (promo && productId && productos && codigos) {
      const id_producto = parseInt(productId);

      const productoSeleccionado = productos.find(
        (p) => p.id_producto === id_producto
      );

      if (productoSeleccionado) {
        seleccionarProducto(id_producto, productos);
        openModal("producto");
        // Puedes almacenar promo en un estado global o manejarlo en el modal
      }
    }
  }, [searchParams, productos, codigos]);
};