//Hook para la activación de cuenta de Medicall24
import { useState, useEffect } from "react";
import { activateAccount, resendActivationCode } from "../services/azure/user"; // Importamos los servicios

export const useAccountActivation = () => {
  const [activationCode, setActivationCode] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isActivated, setIsActivated] = useState<boolean>(false);
  const [resendTimer, setResendTimer] = useState<number>(10);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  // Temporizador para reenvío de código
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!canResend && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }

    return () => clearInterval(timer);
  }, [resendTimer, canResend]);

  // Función para manejar el cambio en el código de activación
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase(); // Convierte a mayúsculas
    value = value.replace(/[^A-Z0-9]/g, ""); // Permite solo letras y números
    if (value.length <= 6) {
      setActivationCode(value);
    }
  };

  // Función para verificar el código de activación
  const handleVerifyCode = async () => {
    if (activationCode.length < 6) {
      setErrorMessage("El código debe tener 6 caracteres.");
      setIsError(true);
      return;
    }

    setIsVerifying(true);
    const response = await activateAccount(activationCode);

    if (response.status === 200) {
      setIsActivated(true);
      setIsError(false);
    } else {
      setErrorMessage(response.data?.message || "Error al activar la cuenta");
      setIsError(true);
    }
    setIsVerifying(false);
  };

  // Función para reenviar el código
  const handleResendCode = async (email: string) => {
    setCanResend(false);
    setResendTimer(10);
    const response = await resendActivationCode(email); // Llamamos al servicio de reenvío
    console.log(response);
    if (response?.status != 200) {
        setErrorMessage("Error al reenviar el código");
        setIsError(true);
    } else {
        setErrorMessage("");
        setIsError(false);
  };}

  return {
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
  };
};
