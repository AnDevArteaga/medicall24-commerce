import { useState } from 'react';

interface Especialidad {
  id: number;
  nombre: string;
  proyeccion: number;
  promedio_valor_consulta: number;
}

interface Valores {
  valorMes12: number;
  promedio12: number;
  descuento12: number;
  valorMes6: number;
  promedio6: number;
  descuento6: number;
  valorMes3: number;
  promedio3: number;
}

export const useSelectSpecialitys = () => {
  const [especialidadesSeleccionadas, setEspecialidadesSeleccionadas] = useState<Especialidad[]>([]);
  const [nt, setNT] = useState<number | string>('');
  const [discount, setDiscount] = useState<number>(0);
  const [valueMonthly, setValueMonthly] = useState<number>(0);
  const [valueAnnually, setValueAnnually] = useState<number>(0);

  const especialidadesDisponibles: Especialidad[] = [
    {
      id: 1,
      nombre: "Psiquiatría",
      proyeccion: 0.05,
      promedio_valor_consulta: 30871,
    },
    {
      id: 2,
      nombre: "Medicina General",
      proyeccion: 0.20,
      promedio_valor_consulta: 13275,
    },
    {
      id: 3,
      nombre: "Pediatría",
      proyeccion: 0.04,
      promedio_valor_consulta: 30871,
    },
    {
      id: 4,
      nombre: "Ginecología",
      proyeccion: 0.04,
      promedio_valor_consulta: 37045,
    },
    {
      id: 5,
      nombre: "Psicología",
      proyeccion: 0.04,
      promedio_valor_consulta: 20066,
    },
    {
      id: 6,
      nombre: "Medicina Interna",
      proyeccion: 0.06,
      promedio_valor_consulta: 30871,
    },
    {
      id: 7,
      nombre: "Neurología",
      proyeccion: 0.03,
      promedio_valor_consulta: 67917,
    },
    {
      id: 8,
      nombre: "Urología",
      proyeccion: 0.06,
      promedio_valor_consulta: 46307,
    },
    {
      id: 9,
      nombre: "Medicina Familiar",
      proyeccion: 0.03,
      promedio_valor_consulta: 37045,
    },
    {
      id: 10,
      nombre: "Cardiología",
      proyeccion: 0.05,
      promedio_valor_consulta: 77178,
    },
    {
      id: 11,
      nombre: "Gastroenterología",
      proyeccion: 0.05,
      promedio_valor_consulta: 77178,
    },
  ];

  const toggleEspecialidad = (id: number, type: string) => {
    if (type === "personas") {
      setNT(1);
    }
    setEspecialidadesSeleccionadas((prev) => {
      const existe = prev.find((esp) => esp.id === id);
      const nuevasEspecialidades = existe
        ? prev.filter((esp) => esp.id !== id)
        : [...prev, especialidadesDisponibles.find((esp) => esp.id === id)!];

      if (nuevasEspecialidades.length === 0) {
        setNT("");
        setDiscount(0);
        setValueMonthly(0);
        setValueAnnually(0);
      }
      return nuevasEspecialidades;
    });
  };

  const openModalCotize = () => {
    // Lógica para abrir el modal de cotización
  };

  const handleOpenModalTerm = () => {
    // Lógica para abrir el modal de términos y condiciones
  };

  return {
    especialidadesDisponibles,
    especialidadesSeleccionadas,
    toggleEspecialidad,
    nt,
    discount,
    valueMonthly,
    valueAnnually,
    openModalCotize,
    handleOpenModalTerm,
  };
};
