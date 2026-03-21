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
