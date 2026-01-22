import React from "react";
import { TriangleAlert } from "lucide-react";

const codeInvalid: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    ✕
                </button>
                <TriangleAlert className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <p className="text-gray-700 text-left">
                    Código promocional inválido, verifica que lo ingresaste
                    correctamente. Si lo hiciste bien, puede que el código haya
                    expirado.
                </p>
                <p className="text-gray-700 text-left mt-6">
                    Pero no te preocupes, aún puedes acceder al descuento.
                    Comunícate con la persona que te lo proporcionó para que te
                    genere uno nuevo.
                </p>
                <button
                    className="mt-4 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default codeInvalid;
