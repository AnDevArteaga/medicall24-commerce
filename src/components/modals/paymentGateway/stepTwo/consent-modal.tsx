import React from "react";
import ButtonForm from "../../../ui/button-forms";

interface ConsentModalProps {
    onClose: () => void;
    onAccept: () => void;
    name: string;
    description: string;
}

const ConsentModal: React.FC<ConsentModalProps> = ({
    onClose,
    onAccept,
    name,
    description,
}) => {
    const handleAccept = () => {
        onAccept();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
                {/* Encabezado */}
                <div className="px-6 py-4 bg-primary text-white text-lg font-bold rounded-t-lg text-center shrink-0">
                    {name}
                </div>

                {/* Contenido */}
                <div className="px-6 py-4 overflow-y-auto text-gray-700 flex-1">
                    <div className="whitespace-pre-line text-sm leading-relaxed">
                        {description}
                    </div>
                </div>

                {/* Footer con botones */}
                <div className="px-6 py-4 flex justify-end space-x-4 bg-gray-100 rounded-b-lg shrink-0">
                    <ButtonForm onClick={onClose} text="Cancelar" />
                    <ButtonForm onClick={handleAccept} text="Aceptar" />
                </div>
            </div>
        </div>
    );
};

export default ConsentModal;

