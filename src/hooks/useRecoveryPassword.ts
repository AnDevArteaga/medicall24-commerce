import { useState, useEffect } from "react";
import { recoveryPassword, changePassword } from "../services/azure/user";
import { checkPasswordMatch } from "../utils/handle-password";

interface RecoveryPasswordData {
    validationCode: string;
    password: string;
    confirmPassword: string;
}

export const useRecoveryPassword = (email: string) => {
    const [step, setStep] = useState<number>(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [canResend, setCanResend] = useState(false);
    const [resendTimer, setResendTimer] = useState(20);
    const [formData, setFormData] = useState<RecoveryPasswordData>({
        validationCode: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    // Temporizador para reenvío de código
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (!canResend && resendTimer > 0 && step === 2) {
            timer = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        } else if (resendTimer === 0) {
            setCanResend(true);
        }

        return () => clearInterval(timer);
    }, [resendTimer, canResend, step]);

    // Enviar código de recuperación
    const sendRecoveryCode = async () => {
        if (!email) {
            setError("El email es requerido");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await recoveryPassword(email);
            if (response.status === 200) {
                setStep(2);
                setResendTimer(20);
                setCanResend(false);
            }
        } catch (error: any) {
            setError(
                error.response?.data?.message ||
                "Error al enviar el código. Por favor intenta nuevamente."
            );
        } finally {
            setLoading(false);
        }
    };

    // Validar que las contraseñas coincidan
    const validatePasswords = (): boolean => {
        if (!formData.password || !formData.confirmPassword) {
            setPasswordError("Ambos campos de contraseña son requeridos");
            return false;
        }

        if (formData.password.length < 6) {
            setPasswordError("La contraseña debe tener al menos 6 caracteres");
            return false;
        }

        if (!checkPasswordMatch(formData.password, formData.confirmPassword)) {
            setPasswordError("Las contraseñas no coinciden");
            return false;
        }

        setPasswordError(null);
        return true;
    };

    // Cambiar contraseña
    const handleChangePassword = async () => {
        if (!validatePasswords()) {
            return;
        }

        if (!formData.validationCode || formData.validationCode.length < 6) {
            setError("El código de validación es requerido");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await changePassword(
                formData.validationCode.toUpperCase(),
                formData.password
            );
            if (response.status === 200) {
                setStep(3); // Éxito
            }
        } catch (error: any) {
            setError(
                error.response?.data?.message ||
                "Error al cambiar la contraseña. Verifica el código e intenta nuevamente."
            );
        } finally {
            setLoading(false);
        }
    };

    // Volver al paso 1
    const resetToStepOne = () => {
        setStep(1);
        setFormData({
            validationCode: "",
            password: "",
            confirmPassword: "",
        });
        setError(null);
        setPasswordError(null);
        setResendTimer(20);
        setCanResend(false);
    };

    // Manejar cambio de inputs
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        
        // Limitar código a 6 caracteres y convertir a mayúsculas
        if (name === "validationCode") {
            const upperValue = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
            setFormData((prev) => ({
                ...prev,
                validationCode: upperValue,
            }));
        }

        // Limpiar errores cuando el usuario empieza a escribir
        if (error) setError(null);
        if (passwordError && (name === "password" || name === "confirmPassword")) {
            setPasswordError(null);
        }
    };

    // Resetear todo
    const reset = () => {
        setStep(1);
        setFormData({
            validationCode: "",
            password: "",
            confirmPassword: "",
        });
        setError(null);
        setPasswordError(null);
        setLoading(false);
        setResendTimer(20);
        setCanResend(false);
    };

    return {
        step,
        loading,
        error,
        formData,
        showPassword,
        showConfirmPassword,
        passwordError,
        canResend,
        resendTimer,
        setShowPassword,
        setShowConfirmPassword,
        sendRecoveryCode,
        handleChangePassword,
        resetToStepOne,
        handleInputChange,
        reset,
    };
};

