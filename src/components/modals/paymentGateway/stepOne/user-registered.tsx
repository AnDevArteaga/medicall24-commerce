import React from "react";
import { usePurchaseContext } from "../../../../contexts/checkout";
import ButtonForm from "../../../ui/button-forms";
import { useModal } from "../../../../contexts/modals";
const UserRegistered: React.FC = () => {
    const { handleNext, registerData } = usePurchaseContext();
    const { closeModal, openModal } = useModal();

    const handleForgotPassword = () => {
        if (registerData.user?.email && registerData.user?.typeId && registerData.user?.identification) {
            openModal("recoveryPassword", {
                email: registerData.user.email,
                typeId: registerData.user.typeId,
                identification: registerData.user.identification,
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-20">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-lg text-center font-semibold text-gray-800">
                    ¡Ya tienes un usuario en MEDICALL24!
                </h3>
                <p className="mt-4 text-gray-600 mb-6 text-center">
                    Presiona el botón continuar y selecciona el método de pago
                    para finalizar tu compra.
                </p>

                <div className="flex items-center justify-center">
                    <button
                        onClick={handleForgotPassword}
                        className="text-gray-600 hover:text-primary underline cursor-pointer text-sm transition-colors"
                    >
                        Olvide mi usuario y contraseña
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <ButtonForm onClick={() => {
                        handleNext();
                        closeModal("userRegistered");
                        openModal("selectAllieBexa")

                    } } text="Continuar" />
                </div>
            </div>
        </div>
    );
};

export default UserRegistered;
