import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TermBlock, GridItem } from "../interfaces/terms.interface";
import { 
    termBexaContent, 
    termBexaPackageContent,
    termContent
} from "../components/modals/term&cond/bexa/content-terms";

const TerminosPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [termsData, setTermsData] = useState<{ title: string; content: TermBlock[] } | null>(null);

    useEffect(() => {
        const getContent = () => {
            switch (id) {
                case "1":
                case "17":
                    return {
                        title: "Términos y Condiciones - Examen BEXA",
                        content: termBexaContent,
                    };
                case "2":
                case "16":
                    return {
                        title: "Términos y Condiciones - Paquete BEXA",
                        content: termBexaPackageContent,
                    };
                case "3":
                    return {
                        title: "TÉRMINOS Y CONDICIONES DE USO",
                        content: termContent,
                    };
                default:
                    return null;
            }
        };
        const content = getContent();
        setTermsData(content);
    }, [id]);

    if (!termsData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-700 mb-4">
                        Términos no encontrados
                    </h1>
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primarydark"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-gray-100 py-8">
            <div className="w-3/4 mx-auto bg-white rounded-lg shadow-lg">

                {/* HEADER */}
                <div className="px-6 py-4 bg-primary text-white text-lg font-bold rounded-t-lg uppercase text-center">
                    {termsData.title}
                </div>

                {/* CONTENT */}
                <div className="px-16 py-4 text-sm text-gray-900 space-y-4">

                    {termsData.content.map((block, index) => {

                        // ----------- TITLE -----------
                        if (block.type === "title") {
                            return (
                                <h2
                                    key={index}
                                    className="text-xl font-bold text-gray-700 text-center uppercase mt-6"
                                >
                                    {block.content}
                                </h2>
                            );
                        }

                        // ----------- SUBTITLE -----------
                        if (block.type === "subtitle") {
                            return (
                                <h3
                                    key={index}
                                    className="text-lg font-semibold text-gray-800 mt-4"
                                >
                                    {block.content}
                                </h3>
                            );
                        }

                        // ----------- PARAGRAPH -----------
                        if (block.type === "paragraph") {
                            return (
                                <p key={index} className="leading-relaxed text-gray-900">
                                    {block.content}
                                    {block.link && (
                                        <>
                                            {" "}
                                            <a
                                                href={block.link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline font-semibold"
                                            >
                                                {block.link.label}
                                            </a>
                                        </>
                                    )}
                                </p>
                            );
                        }

                        // ----------- LIST (VIÑETAS) -----------
                        if (block.type === "list" && block.items && Array.isArray(block.items) && typeof block.items[0] === "string") {
                            const stringItems = block.items as string[];
                            return (
                                <ul key={index} className="list-disc pl-6 space-y-1">
                                    {stringItems.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            );
                        }

                        // ---------------- DASH LIST ----------------
                        if (block.type === "dash-list" && block.items && Array.isArray(block.items) && typeof block.items[0] === "string") {
                            const stringItems = block.items as string[];
                            return (
                                <ul key={index} className="pl-6 space-y-1">
                                    {stringItems.map((item, idx) => (
                                        <li key={idx} className="flex gap-2">
                                            <span>—</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            );
                        }

                        // ----------- ORDERED LIST (NUMERADA) -----------
                        if (block.type === "ordered-list" && block.items && Array.isArray(block.items) && typeof block.items[0] === "string") {
                            const stringItems = block.items as string[];
                            return (
                                <ol key={index} className="list-decimal pl-6 space-y-1">
                                    {stringItems.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ol>
                            );
                        }

                        // ----------- GRID (CIUDADES) -----------
                        if (block.type === "grid" && block.items && Array.isArray(block.items)) {
                            // Verificar que los items sean del tipo GridItem
                            const gridItems = block.items as GridItem[];
                            if (gridItems.length > 0 && typeof gridItems[0] === "object" && "ciudad" in gridItems[0]) {
                                return (
                                    <div
                                        key={index}
                                        className="w-full max-w-2xl mx-auto border border-gray-300 rounded-lg overflow-hidden"
                                    >
                                        <div className="grid grid-cols-2 bg-gray-200 font-bold">
                                            <div className="px-4 py-3 border-r border-gray-300">
                                                Ciudad
                                            </div>
                                            <div className="px-4 py-3">Departamento</div>
                                        </div>

                                        {gridItems.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className={`grid grid-cols-2 ${
                                                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                                }`}
                                            >
                                                <div className="px-4 py-3 border-r border-t border-gray-300">
                                                    {item.ciudad}
                                                </div>
                                                <div className="px-4 py-3 border-t border-gray-300">
                                                    {item.departamento}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                );
                            }
                        }

                        return null;
                    })}
                </div>

                {/* FOOTER */}
                <div className="px-6 py-4 flex justify-center bg-gray-100 rounded-b-lg">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primarydark transition-colors duration-300"
                    >
                        Volver
                    </button>
                </div>

            </div>
        </div>
    );
};

export default TerminosPage;
