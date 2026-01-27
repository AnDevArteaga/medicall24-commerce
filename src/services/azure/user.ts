import axios from "axios";
// import { apiAzure_test } from "../config/apiConfig";
import { apiAzure } from "../config/apis";
import { TypeId } from "../../interfaces/types-id";
import { User } from "../../interfaces/user.interface";

// Función para obtener los tipos de identificación
export const fetchTypeId = async (): Promise<TypeId[]> => {
    try {
        // Definimos el tipo explícitamente como un array de TypeId
        const response = await axios.get(`${apiAzure}/Users/GetTypeIdentification/paciente`);
        return response.data || []; // Aseguramos que siempre retornamos un array
    } catch (error) {
        console.error("Error al cargar tipos de identificación:", error);
        return []; // En caso de error, retornamos un array vacío
    }
};
// Función para registrar un usuario
export const userRegister = async (registerData: User) => {
    try {
        const response = await axios.post(`${apiAzure}/Patients`, registerData);
        return response;
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        return error
    }
};

// Función para verificar si un usuario está registrado
export const checkUserRegistrationService = async (typeId: string, identification: string) => {
    try {
        const response = await axios.post(`${apiAzure}/Users/GetUser`, {
            typeId,
            identification,
        });
        return response.data;
    } catch (error) {
        console.error("Error al verificar el usuario:", error);
        throw error;
    }
};


export const resendActivationCode = async (email: string) => {
    try {
        const response = await axios.post(
            `${apiAzure}/Users/ResendActivationCode`,
            {
                email,
            },
        );
        return response;
    } catch (error) {
        console.error("Error al activar la cuenta:", error);
        return error;
    }
};

export const activateAccount = async (code: string) => {
    const body = {
        type: "string",
        validationCode: code,
    };
    try {
        const response = await axios.post(
            `${apiAzure}/Patients/ActivateAccount`,
            {
                ...body,
            },
        );
        return response;
    } catch (error: any) {
        console.error("Error al activar la cuenta:", error);
        return error.response;
    }
};

// Función para solicitar código de recuperación de contraseña
export const recoveryPassword = async (email: string) => {
    try {
        const response = await axios.post(
            `${apiAzure}/Auth/RecoveryPassword`,
            {
                email,
            },
        );
        return response;
    } catch (error: any) {
        console.error("Error al solicitar código de recuperación:", error);
        throw error;
    }
};

// Función para cambiar la contraseña con código de validación
export const changePassword = async (validationCode: string, password: string) => {
    try {
        const response = await axios.post(
            `${apiAzure}/Users/ChangePassword`,
            {
                validationCode,
                password,
            },
        );
        return response;
    } catch (error: any) {
        console.error("Error al cambiar la contraseña:", error);
        throw error;
    }
};