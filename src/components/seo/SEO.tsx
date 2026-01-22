import { useEffect } from "react";

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
    schema?: object;
}

const SEO: React.FC<SEOProps> = ({
    title = "Medicall24 | Telemedicina al alcance de todos",
    description = "Plataforma de telemedicina en Colombia. Consulta médica virtual, examen BEXA para detección de masas en mama, planes de salud y atención médica desde casa.",
    keywords = "telemedicina, medicina virtual, consulta médica online, BEXA, examen de mama, salud digital, medicina a domicilio, EPS Colombia, prestadores de salud",
    image = "https://medicall24.com.co/wp-content/uploads/2024/12/lettermarkoriginal.png",
    url = typeof window !== "undefined" ? window.location.href : "https://medicall24.com.co",
    type = "website",
    schema,
}) => {
    useEffect(() => {
        // Actualizar título
        document.title = title;

        // Función para actualizar o crear meta tags
        const updateMetaTag = (property: string, content: string, isProperty = false) => {
            const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
            let element = document.querySelector(selector) as HTMLMetaElement;
            
            if (!element) {
                element = document.createElement("meta");
                if (isProperty) {
                    element.setAttribute("property", property);
                } else {
                    element.setAttribute("name", property);
                }
                document.head.appendChild(element);
            }
            element.setAttribute("content", content);
        };

        // Meta tags básicos
        updateMetaTag("description", description);
        updateMetaTag("keywords", keywords);
        updateMetaTag("author", "Medicall24 SAS");
        updateMetaTag("robots", "index, follow");

        // Open Graph (Facebook)
        updateMetaTag("og:title", title, true);
        updateMetaTag("og:description", description, true);
        updateMetaTag("og:image", image, true);
        updateMetaTag("og:url", url, true);
        updateMetaTag("og:type", type, true);
        updateMetaTag("og:site_name", "Medicall24", true);
        updateMetaTag("og:locale", "es_CO", true);

        // Twitter Card
        updateMetaTag("twitter:card", "summary_large_image");
        updateMetaTag("twitter:title", title);
        updateMetaTag("twitter:description", description);
        updateMetaTag("twitter:image", image);

        // Canonical URL
        let canonicalLink = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
        if (!canonicalLink) {
            canonicalLink = document.createElement("link");
            canonicalLink.setAttribute("rel", "canonical");
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute("href", url);

        // Schema.org JSON-LD
        if (schema) {
            // Eliminar schema anterior si existe
            const existingSchema = document.querySelector('script[type="application/ld+json"]');
            if (existingSchema) {
                existingSchema.remove();
            }

            const schemaScript = document.createElement("script");
            schemaScript.type = "application/ld+json";
            schemaScript.text = JSON.stringify(schema);
            document.head.appendChild(schemaScript);
        }
    }, [title, description, keywords, image, url, type, schema]);

    return null;
};

export default SEO;

