import React, { useState } from "react";
import { TermBlock, GridItem } from "../../../../interfaces/terms.interface";
import ButtonForm from "../../../ui/button-forms";
import InputCheck from "../../../ui/checkbox";

interface TerminosModalProps {
    onClose: () => void;
    headerTitle: string;
    content: TermBlock[];
    next?: boolean;
    onClick?: () => void;
}

const TermCondModal: React.FC<TerminosModalProps> = ({
    onClose,
    headerTitle,
    content,
    next,
    onClick,
}) => {
    const [accept, setAccept] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccept(e.target.checked);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-lg w-full max-w-4xl transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="px-6 py-4 bg-primary text-white text-lg font-bold rounded-t-lg uppercase text-center">
                    {headerTitle}
                </div>

                <div className="px-16 py-4 max-h-96 overflow-y-auto text-sm text-gray-900 space-y-4">
                    {content.map((block, index) => {
                        // ---------------- TITLE ----------------
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

                        // ---------------- SUBTITLE ----------------
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

                        // ---------------- PARAGRAPH ----------------
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

                        // ---------------- UNORDERED LIST ----------------
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

                        // ---------------- ORDERED LIST ----------------
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

                        // ---------------- GRID (CIUDADES) ----------------
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

                {next ? (
                    <div className="px-6 py-4 flex items-center justify-between bg-gray-100 rounded-b-lg">
                        <InputCheck
                            id="accept"
                            checked={accept}
                            onChange={handleChange}
                            label="Acepto los términos y condiciones"
                        />
                        <div className="flex space-x-4">
                            <ButtonForm onClick={onClose} text="Cancelar" />
                            <ButtonForm
                                onClick={onClick}
                                text="Aceptar"
                                disabled={!accept}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="px-6 py-4 flex justify-end bg-gray-100 rounded-b-lg">
                        <ButtonForm onClick={onClose} text="Cerrar" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default TermCondModal;
