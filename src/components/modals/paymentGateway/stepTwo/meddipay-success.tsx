import React from "react";
import ButtonForm from "../../../ui/button-forms";

interface MeddipaySuccessModalProps {
    onContinue: () => void;
}

const MeddipaySuccessModal: React.FC<MeddipaySuccessModalProps> = ({
    onContinue,
}) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    Solicitud enviada
                </h2>
                <div className="space-y-4 mb-6">
                    <p className="text-sm text-gray-700">
                        La solicitud se ha enviado con éxito. En los próximos
                        minutos realizaremos la verificación de tu cupo y te
                        enviaremos una invitación a tu cuenta de{" "}
                        <strong>Meddipay</strong>.
                    </p>
                    <p className="text-sm text-gray-700">
                        Te pedimos <strong>estar pendiente de las notificaciones</strong>{" "}
                        para que podamos finalizar el proceso de compra.
                    </p>
                </div>
                <div className="flex justify-center">
                    <ButtonForm onClick={onContinue} text="Continuar" />
                </div>
            </div>
        </div>
    );
};

export default MeddipaySuccessModal;

