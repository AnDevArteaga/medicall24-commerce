import React from "react";
import { X } from "lucide-react";
import { useAccountActivation } from "../../../../hooks/useAccounActivation"; // Importamos el hook
import { usePurchaseContext } from "../../../../contexts/checkout"
import ButtonForm from "../../../ui/button-forms";
interface ModalProps {
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = (
    {   onClose},
) => {
    const {
        activationCode,
        isVerifying,
        isActivated,
        resendTimer,
        canResend,
        errorMessage,
        isError,
        handleChange,
        handleVerifyCode,
        handleResendCode,
    } = useAccountActivation();
    const { statusRegister, registerData, errors, handleNext } = usePurchaseContext();

    return (
        <div className="fixed inset-0 bg-gray-600/50 flex justify-center items-center backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                <X
                    className="absolute top-0 right-0 m-2 text-gray-400 hover:text-gray-700 transition cursor-pointer"
                    onClick={() => {onClose(); handleNext();}}
                    size={20}
                />

                {statusRegister === "success" && (
                    <div className="text-center">
                        {!isActivated
                            ? (
                                <>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Registro exitoso
                                    </h3>
                                    <p className="mt-4 text-gray-600">
                                        Hemos enviado un código de activación a
                                        tu correo. Ingresa el código para
                                        activar tu cuenta.
                                    </p>

                                    <div className="mt-4 flex justify-center space-x-2">
                                        <input
                                            type="text"
                                            value={activationCode}
                                            onChange={handleChange}
                                            maxLength={6}
                                            className="p-2 border border-gray-400 rounded w-2/3 text-center text-sm uppercase ring-2 ring-primary focus:outline-none focus:ring-primary"
                                            placeholder="Código de activación"
                                        />
                                    </div>

                                    {isError && (
                                        <p className="mt-2 text-red-600 text-sm">
                                            {errorMessage}
                                        </p>
                                    )}

                                    <button
                                        onClick={handleVerifyCode}
                                        disabled={isVerifying ||
                                            activationCode.length < 6}
                                        className={`mt-4 px-6 py-2 font-semibold rounded-lg shadow-md transition-colors duration-300 disabled:bg-gray-400 ${
                                            isVerifying
                                                ? "bg-gray-400 cursor-not-allowed text-white"
                                                : "bg-primary text-white hover:bg-primarydark cursor-pointer"
                                        }`}
                                    >
                                        {isVerifying
                                            ? "Verificando..."
                                            : "Activar cuenta"}
                                    </button>

                                    <p className="mt-4 text-sm text-gray-600">
                                        ¿No recibiste el código?{" "}
                                        <button
                                            onClick={() =>
                                                handleResendCode(registerData.user.email)} // Pasamos el email aquí
                                            disabled={!canResend}
                                            className={`text-primary font-semibold ${
                                                !canResend
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : "hover:underline cursor-pointer"
                                            }`}
                                        >
                                            {canResend
                                                ? "Reenviar código"
                                                : `Reenviar en ${resendTimer}s`}
                                        </button>
                                    </p>
                                </>
                            )
                            : (
                                <>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Cuenta activada
                                    </h3>
                                    <p className="mt-4 text-gray-600 mb-6">
                                        Tu cuenta ha sido activada exitosamente.
                                        Puedes continuar con tu compra pulsando
                                        el botón siguiente.
                                    </p>
                                    <ButtonForm onClick={() => {onClose(); handleNext();}} text="Siguiente" />
                                </>
                            )}
                    </div>
                )}

                {statusRegister === "error" && (
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-800">
                            ¡Error!
                        </h3>
                        <p className="mt-4 mb-6 text-gray-600">
                            {errors.statusRegister || "Ocurrio un error al registrar tu cuenta ¿Tus datos son válidos?"} 
                        </p>
                        <ButtonForm onClick={onClose} text="Cerrar" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
