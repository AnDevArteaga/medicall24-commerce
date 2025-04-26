//Hook para los eventos del registro de usuario, para listar los tipos de identificación, y verificar si el usuario ya existe
import { useEffect, useState } from "react";
import { usePurchaseContext } from "../contexts/checkout";
import {
    checkUserRegistrationService,
    fetchTypeId,
    userRegister,
} from "../services/azure/user";
import { validateEmail, validateDomainEmail } from "../utils/validators";
import { togglePasswordVisibility, checkPasswordMatch } from "../utils/handle-password";
import { setFieldError } from "../utils/forms";
import { useModal } from "../contexts/modals";
import { resendActivationCode } from "../services/azure/user";



export const useRegister = () => {
    const { setIsRegistered, registerData, setRegisterData, setValidations, setStatusRegister, setErrors, errors, typesId, setTypesId } =
        usePurchaseContext();
    const { openModal, closeModal } = useModal();
    const [loading, setLoading] = useState(false);
    
    // Estado para manejar la visibilidad de la contraseña
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


        


    // Verificar si el usuario ya está registrado
    const verifyUser = async () => {
        setLoading(true);
        if (!registerData.user.typeId || !registerData.user.identification) {
            return;
        }
        try {
            const user = await checkUserRegistrationService(
                registerData.user.typeId,
                registerData.user.identification,
            );
            if (user) {
                setIsRegistered(true);
                openModal("userRegistered");
                setRegisterData((prev) => ({
                    ...prev,
                    user: {
                        ...prev.user,
                        typeId: user.typeId,
                        identification: user.identification,
                        name1: user.name1,
                        name2: user.name2,
                        lastName1: user.lastname1,
                        lastName2: user.lastname2,
                        email: user.email,
                    },
                }));
            } else {
                setIsRegistered(false);
            }
        } catch (error) {
            setIsRegistered(false);
            console.error("Error al verificar el usuario:", error);
        } finally {
            setLoading(false);
        }
    };

    // Registrar un nuevo usuario
    const registerUser = async () => {
        setLoading(true);
        try {
            const registerDataCopy = { ...registerData }; // Para evitar que se modifique directamente el estado
            const response: any = await userRegister(registerDataCopy);
            if (response.status === 200 || response.status === 201) {
                setIsRegistered(true);
                setStatusRegister("success");
            await resendActivationCode(registerDataCopy.user.email);
            } else {
                setStatusRegister("error");
                setIsRegistered(false);
                setErrors((prev) => ({
                    ...prev,
                    statusRegister: response.response.data.message,
                }));

            }
            closeModal("confirmData");
            openModal("newUserRegister");

        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            setStatusRegister("error");
        } finally {
            setLoading(false);
        }
    };

    const handleFetchTypeId = async () => {
        setLoading(true);
        try {
            const fetchedTypeId = await fetchTypeId();
            setTypesId(fetchedTypeId);
        } catch (error) {
            console.error("Error al obtener tipos de identificación:", error);
            setTypesId([]);
        } finally {
            setLoading(false);
        }
    };

    const handleValidateDomainEmail = (value: string) => {
        const domainValid = validateDomainEmail(value);
        console.log(domainValid);
        if (!domainValid) {
            console.log("Dominio no permitido");
            openModal("domainVerified");
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        let newValue
        if (name === "identification") {
            newValue = value.replace(/[^0-9]/g, '')
        } else {
            newValue = value
        }
        if (name === 'email') {
        const emailValidation = validateEmail(value);
        console.log(emailValidation);
        if (!emailValidation) {
            setFieldError(name, 'El correo electrónico no es válido', setErrors);
            setValidations((prev) => ({
                ...prev,
                emailValid: false,
            }));
        } else {
            setFieldError(name, null, setErrors); // Limpiar el error si el correo electrónico es válido
            setValidations((prev) => ({
                ...prev,
                emailValid: true,
            }));
        }


        }
        if (name === 'password' || name === 'confirmPassword') {
            const password = registerData.user.password;
            const confirmPassword = registerData.user.confirmPassword;
        
            const currentPassword = name === 'password' ? value : password;
            const currentConfirmPassword = name === 'confirmPassword' ? value : confirmPassword;
        
            const passwordsMatch = checkPasswordMatch(currentPassword, currentConfirmPassword);
            
            console.log(passwordsMatch ? 'Las contraseñas coinciden' : 'Las contraseñas no coinciden');
        
            setFieldError(
                'confirmPassword',
                passwordsMatch ? null : 'Las contraseñas no coinciden',
                setErrors
            );
        
            setValidations((prev) => ({
                ...prev,
                passwordMatch: passwordsMatch,
            }));
        }
        setRegisterData((prev) => ({
            ...prev,
            user: {
                ...prev.user,
                [name]: newValue,
            },
        }));
    };

    useEffect(() => {
        handleFetchTypeId();
    }, []);

    return {
        verifyUser,
        registerUser,
        loading,
        handleInputChange,
        handleFetchTypeId,
        typesId,
        togglePasswordVisibility,
        showPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        setShowPassword,
        errors,
        handleValidateDomainEmail
    };
};
