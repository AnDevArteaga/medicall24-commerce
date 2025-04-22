import { createContext, useContext, useState, ReactNode } from "react";
import { Institution } from "../interfaces/appoiment.interface";

// Interfaces para el estado
export interface Appointment {
  institutionsId: string;
  idSpecialist: number;
  idSede: string;
  idProfessional: string;
  idTypeServices: number;
  date: string;
}


interface AppointmentContextType {
  appointment: Appointment;
  setAppointment: React.Dispatch<React.SetStateAction<Appointment>>;
  cover: string;
  setCover: React.Dispatch<React.SetStateAction<string>>;
  institutions: Institution;
  setInstitutions: React.Dispatch<React.SetStateAction<Institution>>;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [appointment, setAppointment] = useState<Appointment>({
    institutionsId: "",
    idSpecialist: 140,
    idSede: "",
    idProfessional: "",
    idTypeServices: 3,
    date: "",
  });

  const [institutions, setInstitutions] = useState<Institution>({ id_institucion: "", nombre_prestador: "", num_identificacion: "", tipo_identificacion: "", estado: false, id_departamento: 0, id_municipio: 0, id_aliado: 0, id_gestor: 0, cover: "" });

  return (
    <AppointmentContext.Provider value={{ appointment, setAppointment, institutions, setInstitutions }}>
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
}
