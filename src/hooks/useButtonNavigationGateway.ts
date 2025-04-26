//Hook para el botón de navegación de la pasarela de pago
import { useEffect, useState } from "react";
import { validateFields } from "../utils/validate-fields"; // Importamos la función de validación
import { usePurchaseContext } from "../contexts/checkout";
import { useModal } from "../contexts/modals";
import { termBexaPackageContent } from "../components/modals/term&cond/bexa/content-terms";
import { validateStates } from "../utils/validate-fields";
import { usePaymentFlow } from "../hooks/usePaymentFlow";

const useNavigationButton = (
    currentStep: number,
    isUserRegistered: boolean,
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
) => {
    const { validations, registerData, handleNext, purchaseData, paymentMethod, selectedMethod, creditData, generalPaymentData, detailPayment } = usePurchaseContext();
    const { executeAction } = usePaymentFlow();
    const { openModal, closeModal } = useModal();
    const [buttonConfig, setButtonConfig] = useState({
        text: "",
        disabled: true,
        onClick: () => {},
    });

    const validateByMethod = (method: string): boolean => {
        switch (method) {
            case "BANCOLOMBIA_TRANSFER":
                return true
            
            case "CARD":
                return validateFields(paymentMethod, [
                    "number",
                    "cardHolder",
                    "expMonth",
                    "expYear",
                    "installments",
                    "cvc",
                ], validateStates(validations, [
                    "cardNumber",
                ] ));
    
            case "PSE":
                return validateFields(paymentMethod, [
                    "userType",
                    "financialInstitutionCode",
                ], true);
            case "NEQUI":
                return validateFields(paymentMethod, [
                    "phoneNumber",
                ], validateStates(validations, [
                    "phoneNumber",
                ] ));
            case "MEDDIPAY":
                return validateFields(creditData, [
                    "meddipayAuthorizationCode",
                ], validateStates(validations, [
                    "meddipayAuthorizationCode",
                ] ));
            default:
                return true;
        }
    };

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
                ], validateStates(validations, [
                    "emailValid",
                    "passwordMatch",
                ]));
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
            console.log('validate', validateByMethod(selectedMethod), 'credit', creditData.meddipayAuthorizationCode)
            config.disabled = !(validateFields(purchaseData, [
                "identification",
                "typeId",
                "names",
                "lastNames",
                "email",
                "address",
                "phone",
                "departament",
                "city"

            ], validateStates(validations, ['emailValid']) ) && validateByMethod(selectedMethod) && selectedMethod);

            console.log()
            config.onClick = () => {
                executeAction("nextStepTwo");
            };
        }

        // Paso 2
        if (currentStep === 2) {
            config.text = "Pagar";
            console.log(generalPaymentData)
            config.disabled = !validateFields(detailPayment, [
                "paymentMethod",
                "valor",
                "subtotal",
                "total",
             
            ], 
             true);
            config.onClick = () => {
                executeAction("paidStepThree");
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
        purchaseData,
        paymentMethod,
        creditData

    ]);

    return buttonConfig;
};

export default useNavigationButton;
