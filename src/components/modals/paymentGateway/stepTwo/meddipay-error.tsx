import React from "react";
import ButtonForm from "../../../ui/button-forms";
import { AlertCircle } from "lucide-react";

interface MeddipayErrorModalProps {
    error: string;
    onClose: () => void;
}

const MeddipayErrorModal: React.FC<MeddipayErrorModalProps> = ({
    error,
    onClose,
}) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
                <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    Error al enviar solicitud
                </h2>
                <p className="text-sm text-gray-700 mb-6 text-center">
                    {error}
                </p>
                <div className="flex justify-center">
                    <ButtonForm onClick={onClose} text="Cerrar" />
                </div>
            </div>
        </div>
    );
};

export default MeddipayErrorModal;

