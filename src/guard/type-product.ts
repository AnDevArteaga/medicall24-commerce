import { CodeXProduct, Product } from "../interfaces/product.interface";

export function isProductPromo(product: Product | CodeXProduct): product is CodeXProduct {
    return (product as CodeXProduct).cod_promo !== undefined;
  }
  