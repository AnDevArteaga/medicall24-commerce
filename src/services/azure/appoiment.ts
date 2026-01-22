import axios from "axios";
import { apiAzure } from "../config/apis";

const authHeaders = {
  Authorization: `Bearer ${import.meta.env.VITE_PATIENTS_TOKEN}`,
};

export const getSedesByListSpecialists = async (institutionId: string, specialtyId: number) => {
  const { data } = await axios.post(`${apiAzure}/Sedes/ListBySpecialty`, { institutionId, specialtyId }, { headers: authHeaders });
  return data;
};

export const getProfessionalsByListSpecilists = async (institutionId: string, specialtyId: number, sedeId: string) => {
  const { data } = await axios.post(`${apiAzure}/Professionals/ListByInstitutionSpecialty`, { institutionId, specialtyId, sedeId }, { headers: authHeaders });
  return data;
};

export const getDaysAvailable = async (
  institutionId: string,
  specialtyId: number,
  professionalId: string,
  sedeId: string,
  typeServiceId: number
) => {
  const { data } = await axios.post(`${apiAzure}/Schedules/GetDaysAvailable`, { institutionId, specialtyId, professionalId, sedeId, typeServiceId }, { headers: authHeaders });
  return data;
};

export const getHoursAvailable = async (
  institutionId: string,
  specialtyId: number,
  professionalId: string,
  sedeId: string,
  typeServiceId: number,
  date: string
) => {
  const { data } = await axios.post(`${apiAzure}/Schedules/GetHoursAvailables`, { institutionId, specialtyId, professionalId, sedeId, typeServiceId, date }, { headers: authHeaders });
  return data;
};
