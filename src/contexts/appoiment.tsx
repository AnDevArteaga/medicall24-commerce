import { createContext, useContext, useState, ReactNode } from "react";
import { Institution } from "../interfaces/appoiment.interface";

// Interfaces para el estado
export interface AppointmentProps {
  institutionsId: string;
  idSpecialist: number;
  idSede: string;
  idProfessional: string;
  idTypeServices: number;
  date: string;
}

// Nueva interface para la cita a crear
export interface CreateAppointmentDataProps {
  fecha: string;
  desiredDate: string;
  professionalId: number;
  specialtyId: number;
  contractId: number;
  institutionId: number;
  sedeId: number;
  patientId: number;
  regimeId: number;
  level: number;
  typeAffiliateId: number;
  type: string;
  tipoConsultaId: number;
  duration: number;
  requestAnotation: string;
  externalProvider: boolean;
}

interface AppointmentContextType {
  appointment: AppointmentProps;
  setAppointment: React.Dispatch<React.SetStateAction<AppointmentProps>>;
  createAppointmentData: CreateAppointmentDataProps;
  setCreateAppointmentData: React.Dispatch<React.SetStateAction<CreateAppointmentDataProps>>;
  institutions: Institution;
  setInstitutions: React.Dispatch<React.SetStateAction<Institution>>;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [appointment, setAppointment] = useState<AppointmentProps>({
    institutionsId: "",
    idSpecialist: 140,
    idSede: "",
    idProfessional: "",
    idTypeServices: 3,
    date: "",
  });

  const [createAppointmentData, setCreateAppointmentData] = useState<CreateAppointmentDataProps>({
    fecha: "",
    desiredDate: "",
    professionalId: 0,
    specialtyId: 140,
    contractId: 0,
    institutionId: 0,
    sedeId: 0,
    patientId: 0,
    regimeId: 2,
    level: 1,
    typeAffiliateId: 1,
    type: "presencial",
    tipoConsultaId: 0,
    duration: 0,
    requestAnotation: "Cita-Exámen-bexa",
    externalProvider: true,
  });

  const [institutions, setInstitutions] = useState<Institution>({
    id_institucion: "",
    nombre_prestador: "",
    num_identificacion: "",
    tipo_identificacion: "",
    estado: false,
    id_departamento: 0,
    id_municipio: 0,
    id_aliado: 0,
    id_gestor: 0,
    cover: "",
  });

  return (
    <AppointmentContext.Provider
      value={{
        appointment,
        setAppointment,
        createAppointmentData,
        setCreateAppointmentData,
        institutions,
        setInstitutions,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const Appointment = (): AppointmentContextType => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error("useAppointment must be used within an AppointmentProvider");
  }
  return context;
};