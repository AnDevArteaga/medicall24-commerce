//Hook para obtener aliados, continuar con el flujo de visualizar agenda
import { useEffect, useState } from "react";
import { fetchAllies } from "../services/supabase/allies";
import { Ally } from "../interfaces/allies-supabase.interface";
import { useModal } from "../contexts/modals";
import { Appointment } from "../contexts/appoiment";

export const useAllies = () => {
  const [allies, setAllies] = useState<Ally[]>([]);
      const { setAppointment, setInstitutions } = Appointment();
      const { isModalOpen, openModal, closeModal } = useModal();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAllies = async () => {
      try {
        const data = await fetchAllies();
        setAllies(data);
      } catch (err) {
        setError("Error al cargar aliados");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadAllies();
  }, []);
  
  const handleSelectAlly = (institution: any) => {
    console.log(institution);
    setAppointment((prev) => ({
      ...prev,
      institutionsId: institution.id_institucion
    }));
    setInstitutions(institution);
    openModal("appoiment");
  };

  return { allies, loading, error, handleSelectAlly, isModalOpen, closeModal };
};