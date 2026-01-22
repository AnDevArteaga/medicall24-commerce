import { queryParamsProduct } from "../interfaces/product.interface";

export function redirectPaid(data: queryParamsProduct) {
    if (!data.id_producto) {
        console.error("El id de producto no está presente en la URL");
        return;
    }

    const baseUrl = `${window.location.origin}/pagos?p=${data.id_producto}`;

    // Si el campo opcional existe, añadirlo
    const fullUrl = data.code
        ? `${baseUrl}&c=${data.code}`
        : baseUrl;

    window.open(fullUrl, '_blank');
}
