import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { validateFields } from "../utils/validate-fields";
import { usePurchaseContext } from "../contexts/checkout";
import { useModal } from "../contexts/modals";
import { termContent } from "../components/modals/term&cond/bexa/content-terms";
import { validateStates } from "../utils/validate-fields";
import { usePaymentFlow } from "./usePaymentFlow";
import { validateCodeAuthorization } from "../services/azure/payments";
import { toast } from "react-hot-toast";

const useNavigationButton = (
    currentStep: number,
    isUserRegistered: boolean,
    // setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
) => {
    const { validations, registerData, handleNext, purchaseData, paymentMethod, selectedMethod, creditData, detailPayment, isFree } = usePurchaseContext();
    const { openModal, closeModal } = useModal();
    
    // Inicializar el estado con un valor por defecto basado en el paso inicial
    const getInitialButtonText = () => {
        if (currentStep === 0) {
            return !isUserRegistered ? "Regístrate" : "Siguiente";
        } else if (currentStep === 1) {
            return "Continuar";
        } else if (currentStep === 2) {
            return "Continuar";
        }
        return "";
    };
    
    const [buttonConfig, setButtonConfig] = useState({
        text: getInitialButtonText(),
        disabled: true,
        onClick: () => {},
    });

    const { executeAction } = usePaymentFlow()
    
    // Usar refs para almacenar valores anteriores y evitar loops
    const prevValuesRef = useRef<{
        currentStep?: number;
        isUserRegistered?: boolean;
        isFree?: boolean;
        selectedMethod?: string;
        creditDataMeddipay?: string;
        registerDataStr?: string;
        purchaseDataStr?: string;
        paymentMethodStr?: string;
        validationsStr?: string;
        detailPaymentStr?: string;
    }>({});

    // Memoizar las funciones de callback para evitar recrearlas
    const handleOpenTermModal = useCallback(() => {
        openModal("termCond", {
            next: true,
            onClose: () => closeModal("termCond"),
            content: termContent,
            headerTitle:
                "TÉRMINOS Y CONDICIONES DE USO Y POLÍTICA DE PRIVACIDAD DE LOS CANALES VIRTUALES DE MEDICALL24 SAS",
            onClick: () => {
                closeModal("termCond");
                openModal("confirmData");
            },
        });
    }, [openModal, closeModal]);

    const handleMeddipayValidation = useCallback(async () => {
        if (selectedMethod === "MEDDIPAY" && creditData.meddipayAuthorizationCode) {
            try {
                const isValid = await validateCodeAuthorization(
                    creditData.meddipayAuthorizationCode,
                    registerData.user.identification
                ) as unknown as boolean;
                
                if (!isValid) {
                    toast.error("El código de autorización es incorrecto o ya fue utilizado");
                    return;
                }
                
                executeAction('nextStepTwo');
            } catch (error) {
                console.error("Error al validar código:", error);
                toast.error("Error al validar el código de autorización");
            }
        } else {
            executeAction('nextStepTwo');
        }
    }, [selectedMethod, creditData.meddipayAuthorizationCode, registerData.user.identification, executeAction]);

    const handleVerifyEmail = useCallback(() => {
        openModal("verifiyEmail");
    }, [openModal]);

    // Memoizar las validaciones para evitar recalcularlas constantemente
    const validationResults = useMemo(() => {
        const validateByMethod = (method: string): boolean => {
            switch (method) {
                case "BANCOLOMBIA_TRANSFER":
                    return true
                
                case "CARD":
                    return validateFields(paymentMethod, [
                        "card.number",
                        "card.cardHolder",
                        "card.expMonth",
                        "card.expYear",
                        "installments",
                        "card.cvc",
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
                    ], true);
                default:
                    return true;
            }
        };

        return {
            step0: !isUserRegistered ? !validateFields(registerData, [
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
            ])) : false,
            step1: !(validateFields(purchaseData, [
                "identification",
                "typeId",
                "names",
                "lastNames",
                "email",
                "address",
                "phone",
                "departament",
                "city"
            ], validateStates(validations, ['emailValid']) ) && validateByMethod(selectedMethod) && selectedMethod),
            step2: !validateFields(detailPayment, [
                "paymentMethod",
                "valor",
                "subtotal",
                "total",
            ], true) || (selectedMethod === "MEDDIPAY" && (!creditData.meddipayAuthorizationCode || creditData.meddipayAuthorizationCode.trim() === "")),
        };
    }, [
        isUserRegistered,
        registerData,
        validations,
        purchaseData,
        paymentMethod,
        selectedMethod,
        creditData,
        detailPayment,
    ]);

    useEffect(() => {
        // Comparar valores actuales con anteriores para evitar actualizaciones innecesarias
        const currentValues = {
            currentStep,
            isUserRegistered,
            isFree,
            selectedMethod,
            creditDataMeddipay: creditData?.meddipayAuthorizationCode || '',
            registerDataStr: JSON.stringify(registerData),
            purchaseDataStr: JSON.stringify(purchaseData),
            paymentMethodStr: JSON.stringify(paymentMethod),
            validationsStr: JSON.stringify(validations),
            detailPaymentStr: JSON.stringify(detailPayment),
        };

        // Verificar si realmente hay cambios relevantes
        const hasRelevantChanges = 
            prevValuesRef.current.currentStep !== currentValues.currentStep ||
            prevValuesRef.current.isUserRegistered !== currentValues.isUserRegistered ||
            prevValuesRef.current.isFree !== currentValues.isFree ||
            prevValuesRef.current.selectedMethod !== currentValues.selectedMethod ||
            prevValuesRef.current.creditDataMeddipay !== currentValues.creditDataMeddipay ||
            prevValuesRef.current.registerDataStr !== currentValues.registerDataStr ||
            prevValuesRef.current.purchaseDataStr !== currentValues.purchaseDataStr ||
            prevValuesRef.current.paymentMethodStr !== currentValues.paymentMethodStr ||
            prevValuesRef.current.validationsStr !== currentValues.validationsStr ||
            prevValuesRef.current.detailPaymentStr !== currentValues.detailPaymentStr;

        // Verificar si es el primer render
        const isFirstRender = prevValuesRef.current.currentStep === undefined;
        
        // En el primer render o si hay cambios relevantes, actualizar la configuración
        if (!hasRelevantChanges && !isFirstRender) {
            return; // No hay cambios relevantes, no actualizar (excepto en el primer render)
        }

        // Actualizar referencia
        prevValuesRef.current = currentValues;
        const config = {
            text: "",
            disabled: true,
            onClick: () => {},
        };

        // Paso 0
        if (currentStep === 0) {
            if (!isUserRegistered) {
                config.text = "Regístrate";
                config.disabled = validationResults.step0;
                config.onClick = handleOpenTermModal;
            } else {
                config.text = "Siguiente";
                config.disabled = false;
                // Con isFree, "Siguiente" abre directamente el modal de agendar cita (sin paso de pago)
                config.onClick = isFree ? () => openModal("selectAllieBexa") : handleNext;
            }
        }

        // Paso 1
        if (currentStep === 1) {
            config.text = "Continuar";
            config.disabled = validationResults.step1;
            config.onClick = handleMeddipayValidation;
        }

        // Paso 2
        if (currentStep === 2) {
            config.text = "Continuar";
            config.disabled = validationResults.step2;
            config.onClick = handleVerifyEmail;
        }

        setButtonConfig(config);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        currentStep,
        isUserRegistered,
        validationResults,
        handleOpenTermModal,
        handleMeddipayValidation,
        handleVerifyEmail,
        handleNext,
        isFree,
    ]);

    return buttonConfig;
};

export default useNavigationButton;