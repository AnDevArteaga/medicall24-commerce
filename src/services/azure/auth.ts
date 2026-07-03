import axios from "axios";
import { apiAzure } from "../config/apis";

export interface LoginAdminRequest {
  nit: string;
  email: string;
  password: string;
}

/**
 * Autenticación de administrador / agente recaudador (panel).
 * POST /api/Auth/LoginAdmin
 */
export const loginAdmin = async (
  payload: LoginAdminRequest
): Promise<{ success: true }> => {
  const response = await axios.post(
    `${apiAzure}/Auth/LoginAdmin`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export interface SimpleLoginRequest {
  email: string;
  password: string;
}

/** Respuesta flexible según el contrato del API (usuario plano o anidado). */
export type SimpleLoginResponse = {
  id?: number;
  userId?: number;
  user?: {
    id?: number;
    identification?: string;
    typeId?: string;
    name1?: string;
    name2?: string;
    lastname1?: string;
    lastname2?: string;
    email?: string;
    phone?: string;
  };
} & Record<string, unknown>;

/**
 * Login paciente / usuario con correo y contraseña.
 * POST /api/Auth/SimpleLogin
 */
export const simpleLogin = async (
  payload: SimpleLoginRequest,
): Promise<SimpleLoginResponse> => {
  const response = await axios.post<SimpleLoginResponse>(
    `${apiAzure}/Auth/SimpleLogin`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};
