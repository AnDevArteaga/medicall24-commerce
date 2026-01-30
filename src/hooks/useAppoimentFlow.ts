//Hook para el flujo de agendamiento de citas
import { useEffect, useState } from "react";
import { Appointment } from "../contexts/appoiment";
import {
  getSedesByListSpecialists,
  getProfessionalsByListSpecilists,
  getDaysAvailable,
  getHoursAvailable,
} from "../services/azure/appoiment";
import { Sede, Professional, DayAvailable, HourAvailable } from "../interfaces/appoiment.interface";

type ViewType = "sedes" | "professionals" | "days" | "hours" | "error";

export const useAppointmentFlow = (onClose: () => void) => {
  const { appointment, setAppointment, institutions } = Appointment();

  const [view, setView] = useState<ViewType>("sedes");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [days, setDays] = useState<DayAvailable[]>([]);
  const [hours, setHours] = useState<HourAvailable[]>([]);


  useEffect(() => {
    const fetchSedes = async () => {
      if (!appointment.institutionsId) return;

      setLoading(true);
      setError(null);

      try {
        const data = await getSedesByListSpecialists(appointment.institutionsId, appointment.idSpecialist);
        if (data === "No se encontraron resultados") {
          setError(data);
          setView("error");
          return;
        }
        setSedes(data);
      } catch (err) {
        setError("Error al obtener sedes");
      } finally {
        setLoading(false);
      }
    };

    fetchSedes();
  }, [appointment.institutionsId]);

  const selectSede = async (sede: any) => {
    setAppointment((prev) => ({ ...prev, idSede: sede.id }));
    setView("professionals");
    setLoading(true);
    try {
      const data = await getProfessionalsByListSpecilists(
        appointment.institutionsId,
        appointment.idSpecialist,
        sede.id
      );
      setProfessionals(data);
    } catch (err) {
      setError("Error al obtener profesionales");
    } finally {
      setLoading(false);
    }
  };

  const selectProfessional = async (prof: any) => {
    setAppointment((prev) => ({ ...prev, idProfessional: prof.id }));
    setView("days");
    setLoading(true);
    try {
      const data = await getDaysAvailable(
        appointment.institutionsId,
        appointment.idSpecialist,
        prof.id,
        appointment.idSede,
        appointment.idTypeServices
      );
      setDays(data);
    } catch (err) {
      setError("Error al obtener días");
    } finally {
      setLoading(false);
    }
  };

  const selectDay = async (day: any) => {
    setAppointment((prev) => ({ ...prev, date: day.date }));
    setView("hours");
    setLoading(true);
    try {
      const data = await getHoursAvailable(
        appointment.institutionsId,
        appointment.idSpecialist,
        appointment.idProfessional,
        appointment.idSede,
        appointment.idTypeServices,
        day.date
      );
      setHours(data);
    } catch (err) {
      setError("Error al obtener horarios");
    } finally {
      setLoading(false);
    }
  };

  const goBack = (to: ViewType) => {
    setView(to);
  };

  const reset = () => {
    setAppointment(
      {
        idSpecialist: 140,
        idSede: "",
        idProfessional: "",
        date: "",
        idTypeServices: 3,
        institutionsId: "",
      },
    );
    onClose();
    setView("sedes");
  };

  const handleClose = () => {
    reset();
  };

  return {
    appointment,
    institutions,
    view,
    sedes,
    professionals,
    days,
    hours,
    loading,
    error,
    selectSede,
    selectProfessional,
    selectDay,
    goBack,
    handleClose,
  };
};
