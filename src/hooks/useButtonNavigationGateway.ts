//Hook para el botón de navegación de la pasarela de pago
import { useEffect, useState } from "react";
import { validateFields } from "../utils/validate-fields"; // Importamos la función de validación
import { usePurchaseContext } from "../contexts/checkout";
import { useModal } from "../contexts/modals";
import { termBexaPackageContent } from "../components/modals/term&cond/bexa/content-terms";

const useNavigationButton = (
    currentStep: number,
    isUserRegistered: boolean,
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
) => {
    const { validations, registerData, handleNext } = usePurchaseContext();
    const { openModal, closeModal } = useModal();
    const [buttonConfig, setButtonConfig] = useState({
        text: "",
        disabled: true,
        onClick: () => {},
    });

    useEffect(() => {
        // Lógica de botones según el paso y estado de registro
        const config = {
            text: "",
            disabled: true,
            onClick: () => {},
        };
        console.log(config);
        // Paso 0
        if (currentStep === 0) {
            if (!isUserRegistered) {
                // Si el usuario no está registrado, mostramos "Regístrate"
                config.text = "Regístrate";
                config.disabled = !validateFields(registerData, [
                    "user.identification",
                    "user.typeId",
                    "user.name1",
                    "user.lastName1",
                    "user.email",
                    "user.password",
                    "user.confirmPassword",
                ], Object.values(validations).every(Boolean));
                config.onClick = () => {
                    openModal("termCond", {
                        next: true,
                        onClose: () => closeModal("termCond"),
                        content: termBexaPackageContent,
                        headerTitle:
                            "TÉRMINOS Y CONDICIONES DE USO Y POLÍTICA DE PRIVACIDAD DE LOS CANALES VIRTUALES DE MEDICALL24 SAS",
                        onClick: () => {
                            closeModal("termCond");
                            openModal("confirmData");
                        },
                    });
                };
            } else {
                // Si el usuario ya está registrado, mostramos "Siguiente"
                config.text = "Siguiente";
                config.disabled = false;
                config.onClick = () => {
                    handleNext();
                };
            }
        }

        // Paso 1
        if (currentStep === 1) {
            config.text = "Continuar";
            config.disabled = !validateFields(registerData, [
                "user.name1",
                "user.lastName1",
            ], false); // Validamos un objeto diferente
            config.onClick = () => {
                console.log("Función Y ejecutada en paso 1");
                setCurrentStep((prev) => prev + 1); // Continuamos al siguiente paso
            };
        }

        // Paso 2
        if (currentStep === 2) {
            config.text = "Pagar";
            config.disabled = !validateFields(registerData, [
                "user.password",
                "user.confirmPassword",
            ], false); // Validamos otro objeto
            config.onClick = () => {
                console.log("Función Z ejecutada en paso 2");
                // Lógica de pago o lo que necesites
            };
        }

        // Actualizamos el estado del botón
        setButtonConfig(config);
    }, [
        currentStep,
        isUserRegistered,
        setCurrentStep,
        registerData,
        validations,
    ]);

    return buttonConfig;
};

export default useNavigationButton;
