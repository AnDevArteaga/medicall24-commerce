import React, { useState } from "react";
import { TermBlock } from "../../../../interfaces/terms.interface";
import ButtonForm from "../../../ui/button-forms";
import InputCheck from "../../../ui/checkbox";

interface TerminosModalProps {
    onClose: () => void;
    headerTitle: string;
    content: TermBlock[];
    next?: boolean;
    onClick?: () => void;
}

const TermCondModal: React.FC<TerminosModalProps> = (
    { onClose, headerTitle, content, next, onClick },
) => {
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
                        if (block.type === "title") {
                            return (
                                <h2
                                    key={index}
                                    className="text-xl font-bold text-gray-700 text-center uppercase"
                                >
                                    {block.content}
                                </h2>
                            );
                        }

                        if (block.type === "paragraph") {
                            return (
                                <p
                                    key={index}
                                    className="text-sm text-gray-900"
                                >
                                    {block.content}
                                    {block.link && (
                                        <>
                                            {" "}
                                            <a
                                                href={block.link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-pink-600 underline font-semibold"
                                            >
                                                {block.link.label}
                                            </a>
                                        </>
                                    )}
                                </p>
                            );
                        }

                        if (block.type === "grid" && block.items) {
                            return (
                                <div
                                    key={index}
                                    className="grid w-1/4 sm:w-1/2 grid-cols-2 gap-2 font-bold"
                                >
                                    <div>Ciudad</div>
                                    <div>Departamento</div>
                                    {block.items.map((item, idx) => (
                                        <React.Fragment key={idx}>
                                            <div className="font-normal">
                                                {item.ciudad}
                                            </div>
                                            <div className="font-normal">
                                                {item.departamento}
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </div>
                            );
                        }

                        return null;
                    })}
                </div>
                {next
                    ? (
                        <div className="px-6 py-4 flex items-center justify-between bg-gray-100 rounded-b-lg">
                            <InputCheck id="accept" checked={accept} onChange={handleChange} label="Acepto los términos y condiciones" />
                            <div className="flex space-x-4">
                                <ButtonForm onClick={onClose} text="Cancelar" />
                                <ButtonForm onClick={onClick} text="Aceptar" disabled={!accept} />
                            </div>
                        </div>
                    )
                    : (
                        <div className="px-6 py-4 flex justify-end bg-gray-100 rounded-b-lg">
                            <ButtonForm onClick={onClose} text="Cerrar" />
                        </div>
                    )}
            </div>
        </div>
    );
};

export default TermCondModal;
