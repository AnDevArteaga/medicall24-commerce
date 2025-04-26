import axios from "axios";
import { apiAzure_test, apiAzure } from "../config/apis"; // Importar las configuraciones

import { Department, Municipality } from "../../interfaces/location.interfaces"; // Importar las interfaces

// Función para obtener los departamentos
export const getDepartments = async (): Promise<Department[]> => {
  try {
    const response = await axios.get<Department[]>(`${apiAzure_test}/Departments/ListDepartments`);
    // Limpiar nombres con espacios adicionales
    const cleanedDepartments = response.data.map((dept) => ({
      ...dept,
      nombre: dept.nombre.trim(), // Elimina espacios al inicio y final
    }));

    console.log("Departamentos limpios:", cleanedDepartments);
    return cleanedDepartments;
  } catch (error) {
    console.error("Error al cargar departamentos:", error);
    throw new Error("Error al cargar departamentos"); // Lanza un error en caso de fallar
  }
};

// Función para obtener los municipios basados en el departamento
export const getMunicipalities = async (departamentoId: string): Promise<Municipality[]> => {
  try {
    const response = await axios.get<Municipality[]>(`${apiAzure_test}/Departments/ListMunicipalties/${departamentoId}`);
    return response.data;
  } catch (error) {
    console.error("Error al cargar municipios:", error);
    throw new Error("Error al cargar municipios"); // Lanza un error en caso de fallar
  }
};

// Función para obtener información sobre las instituciones
export const getInstitution = async (id: string, tipo: string): Promise<any> => {
  try {
    const identificationCleaned = id.trim();
    const tipoCompleto = tipo === "NI" ? tipo + "T" : tipo;

    const body = {
      identification: identificationCleaned,
      typeId: tipoCompleto,
    };

    console.log("body", body);

    const response = await axios.post(
      `${apiAzure}/Institutions/GetInstitution`,
      body,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
        },
      }
    );

    console.log("Institution", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al cargar instituciones:", error);
    throw new Error("Error al cargar instituciones"); // Lanza un error en caso de fallar
  }
};
