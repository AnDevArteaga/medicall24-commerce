import { ProductLinks } from "../interfaces/email.interface";

const productLinksMap: Record<number, ProductLinks> = {
    16: {
        linkBanner: "https://medicall24.com.co/wp-content/uploads/2025/02/Paquete-Tamizaje.jpg",
        linkTerminos: "https://appmedicall24.com/terminos-y-condiciones/16",
        linkPasos: "https://appmedicall24.com/pasos-bexa/",
    },
    17: {
        linkBanner: "https://medicall24.com.co/wp-content/uploads/2025/01/Examen-Bexa.jpg",
        linkTerminos: "https://appmedicall24.com/terminos-y-condiciones/17",
        linkPasos: "https://appmedicall24.com/pasos-bexa/",
    },
};

export const getProductLinks = (idProducto: number): ProductLinks => {

    return productLinksMap[idProducto];
};
