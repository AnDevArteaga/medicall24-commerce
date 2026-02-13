import { useEffect, useState } from "react";
import { Appointment } from "../contexts/appoiment";
import {
  getSedesByListSpecialists,
  getProfessionalsByListSpecilists,
  getDaysAvailable,
  getHoursAvailable,
} from "../services/azure/appoiment";
import {
  Sede,
  Professional,
  DayAvailable,
  HourAvailable,
} from "../interfaces/appoiment.interface";
import { usePurchaseContext } from "../contexts/checkout";
import { getDepartments, getMunicipalities } from "../services/azure/location";
import { listInstitutionsByIdComplete } from "../services/azure/institutions";
import {
  fetchAllies,
  fetchAlliesById,
  fetchAlliesByIdMunicipality,
} from "../services/supabase/allies";
import { findProviderWithClosestSlot } from "../services/azure/find-closest-provider";
import { isProductPromo } from "../guard/type-product";
import { CodeXProduct } from "../interfaces/product.interface";
import { Ally } from "../interfaces/allies-supabase.interface";
import { Department, Municipality } from "../interfaces/location.interfaces";
import { registerPurchase } from "../interfaces/checkout.interfase";

export const useSelectAllieExtended = () => {
  const { registerPurchase, setRegisterPurchase, product, setIdMunicipioInstitucion, isFree } = usePurchaseContext();
  const { appointment, setAppointment, createAppointmentData, setCreateAppointmentData } = Appointment();

  // Estados para los selects de ubicación
  const [departments, setDepartments] = useState<Department[]>([]);
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [allyProvider, setAllyProvider] = useState<{ id: string; nombre: string }[]>([]);
  const [allies, setAllies] = useState<Ally[]>([]);
  const [loadingAliado, setLoadingAliado] = useState(false);
  const [selectsDisabled, setSelectsDisabled] = useState(false);

  // Estados para los selects del flujo de citas
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [days, setDays] = useState<DayAvailable[]>([]);
  const [hours, setHours] = useState<HourAvailable[]>([]);

  // Estados de carga individuales
  const [loadingSedes, setLoadingSedes] = useState(false);
  const [loadingProfessionals, setLoadingProfessionals] = useState(false);
  const [loadingDays, setLoadingDays] = useState(false);
  const [loadingHours, setLoadingHours] = useState(false);

  const [cover, setCover] = useState<string>()
  const [loadingClosestProvider, setLoadingClosestProvider] = useState(false)

  const [selectedValues, setSelectedValues] = useState({
    dpto_institucion: "",
    ciudad_institucion: "",
    nombre_institucion: "",
    sede: "",
    professional: "",
    day: "",
    hour: "",
  });

  // === Servicios ===
  const getInstitutionInfo = async (institutionId: number | string) => {
    const data = await listInstitutionsByIdComplete(institutionId);
    if (!data?.institution) {
      throw new Error("No se pudo obtener la información de la institución");
    }
    return {
      direccion: data.institution.address,
      telefono: data.institution.phone1,
      cover: data.institution.cover
    };
  };

  const loadAllies = async () => {
    try {
      const alliesData = await fetchAllies();
      console.log('Aliados cargados:', alliesData);
      setAllies(alliesData);

      // Filtrar departamentos con base en los aliados
      const dpts = await getDepartments();
      console.log('Departamentos obtenidos:', dpts);
      const dptIdsFromAllies = [
        ...new Set(alliesData.map((a) => String(a.id_departamento))),
      ];
      const dptsFiltered = dpts.filter((d) => dptIdsFromAllies.includes(d.id));
      console.log('Departamentos filtrados:', dptsFiltered);
      setDepartments(dptsFiltered);

      return alliesData;
    } catch (error) {
      console.error("Error cargando aliados y ubicaciones:", error);
      return [];
    }
  };

  const loadDepartments = async () => {
    try {
      const dpts = await getDepartments();
      setDepartments(dpts);
      return dpts;
    } catch (error) {
      console.error("Error cargando departamentos filtrados:", error);
      return [];
    }
  };

  const loadMunicipalities = async (departmentId: string, skipFilter: boolean = false) => {
    try {
      const muns = await getMunicipalities(departmentId);
      // Si skipFilter es true (para productos promocionales), no filtrar
      const munsFiltered = skipFilter 
        ? muns 
        : muns.filter((m) =>
            allies.map((a) => String(a.id_municipio)).includes(String(m.id))
          );
      setMunicipalities(munsFiltered);
      return munsFiltered;
    } catch (error) {
      console.error("Error cargando municipios filtrados:", error);
      return [];
    }
  };

  const loadProvidersByMunicipality = async (municipalityId: number) => {
    try {
      const allies = await fetchAlliesByIdMunicipality(municipalityId);
      if (!Array.isArray(allies)) return [];
      console.log('Prestadores obtenidos:', allies);
      const formatted = allies.map((a: Ally) => ({
        id: String(a.id_institucion),
        nombre: a.nombre_prestador,
      }));
      console.log('Prestadores formateados:', formatted);
      setAllyProvider(formatted);
      return formatted;
    } catch (error) {
      console.error("Error cargando prestadores:", error);
      setAllyProvider([]);
      return [];
    }
  };

  // Wrapper para manejar tanto eventos como llamadas directas
  const handleSelectChange = async (
    nameOrEvent: string | React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    directValue?: string
  ) => {
    let name: string;
    let value: string;

    // Si es un evento
    if (typeof nameOrEvent === 'object' && 'target' in nameOrEvent) {
      name = nameOrEvent.target.name;
      value = nameOrEvent.target.value;
    } else {
      // Si es una llamada directa
      name = nameOrEvent;
      value = directValue || '';
    }

    console.log('handleSelectChange llamado:', { name, value });
    setSelectedValues((prev) => {
      const newValues = { ...prev, [name]: value };
      console.log('selectedValues actualizado:', newValues);
      return newValues;
    });

    if (name === "dpto_institucion") {
      // Resetear todo lo que depende del departamento
      setSelectedValues((prev) => ({
        ...prev,
        ciudad_institucion: "",
        nombre_institucion: "",
        sede: "",
        professional: "",
        day: "",
        hour: "",
      }));
      setMunicipalities([]);
      setAllyProvider([]);
      setSedes([]);
      setProfessionals([]);
      setDays([]);
      setHours([]);

      const dpto = departments.find((d) => d.id === value);
      await loadMunicipalities(value);
      setRegisterPurchase((prev: registerPurchase) => ({
        ...prev,
        dpto_institucion: dpto ? dpto.nombre : "",
        ciudad_institucion: "",
        nombre_institucion: "",
        direccion_institucion: "",
        telefono_institucio: "",
      }));

    } else if (name === "ciudad_institucion") {
      // Resetear todo lo que depende del municipio
      setSelectedValues((prev) => ({
        ...prev,
        nombre_institucion: "",
        sede: "",
        professional: "",
        day: "",
        hour: "",
      }));
      setAllyProvider([]);
      setSedes([]);
      setProfessionals([]);
      setDays([]);
      setHours([]);

      const mun = municipalities.find((m) => m.id === Number(value));
      if (value) {
        await loadProvidersByMunicipality(Number(value));
      }
      const municipioId = value ? Number(value) : undefined;
      setIdMunicipioInstitucion(municipioId);
      setRegisterPurchase((prev: registerPurchase) => ({
        ...prev,
        ciudad_institucion: mun ? mun.nombre : "",
        nombre_institucion: "",
        direccion_institucion: "",
        telefono_institucio: "",
      }));

    } else if (name === "nombre_institucion") {
      // Resetear todo lo que depende de la institución
      setSelectedValues((prev) => ({
        ...prev,
        sede: "",
        professional: "",
        day: "",
        hour: "",
      }));
      setSedes([]);
      setProfessionals([]);
      setDays([]);
      setHours([]);

      console.log('Prestador seleccionado - value:', value);
      console.log('Prestadores disponibles:', allyProvider);

      // Guardar datos del prestador
      const provider = allyProvider.find((a) => String(a.id) === String(value));
      console.log('Provider encontrado:', provider);
      
      if (!provider) {
        console.error('No se encontró el prestador con id:', value);
        return;
      }

      try {
        const info = await getInstitutionInfo(value);
        console.log('Info de institución:', info);
        
        setRegisterPurchase((prev: registerPurchase) => ({
          ...prev,
          nombre_institucion: provider.nombre,
          direccion_institucion: info.direccion,
          telefono_institucio: info.telefono,
        }));
        setCover(info.cover)
        
        setAppointment((prev) => ({ 
          ...prev, 
          institutionsId: value 
        }));

        setCreateAppointmentData((prev) => ({
          ...prev,
          institutionId: parseInt(value),
        }));

        // Cargar sedes automáticamente
        await loadSedes(value);
      } catch (error) {
        console.error("Error obteniendo datos de la institución:", error);
      }

    } else if (name === "sede") {
      // Resetear todo lo que depende de la sede
      setSelectedValues((prev) => ({
        ...prev,
        professional: "",
        day: "",
        hour: "",
      }));
      setProfessionals([]);
      setDays([]);
      setHours([]);

      setAppointment((prev) => ({ ...prev, idSede: value }));
      setCreateAppointmentData((prev) => ({
        ...prev,
        sedeId: parseInt(value),
      }));

      // Cargar profesionales automáticamente
      await loadProfessionals(value);

    } else if (name === "professional") {
      // Resetear todo lo que depende del profesional
      setSelectedValues((prev) => ({
        ...prev,
        day: "",
        hour: "",
      }));
      setDays([]);
      setHours([]);

      setAppointment((prev) => ({ ...prev, idProfessional: value }));
      setCreateAppointmentData((prev) => ({
        ...prev,
        professionalId: parseInt(value),
      }));

      // Cargar días automáticamente
      await loadDays(value);

    } else if (name === "day") {
      // Resetear solo la hora
      setSelectedValues((prev) => ({
        ...prev,
        hour: "",
      }));
      setHours([]);

      setAppointment((prev) => ({ ...prev, date: value }));

      // Cargar horas automáticamente
      await loadHours(value);

    } else if (name === "hour") {
  // Construir la fecha completa
  console.log('appointment.date', appointment.date)
  console.log('value', value)
  
  const [hourPart, minutePart, period] = value.match(/(\d+):(\d+)\s*(AM|PM)/i)!.slice(1);
  console.log('hourPart, minutePart, period', hourPart, minutePart, period)

  let hour = parseInt(hourPart);
  if (period.toUpperCase() === "PM" && hour < 12) hour += 12;
  if (period.toUpperCase() === "AM" && hour === 12) hour = 0;

  console.log('hour', hour)

  // Usar solo la parte de la fecha
  const dateOnly = appointment.date.split("T")[0];
  const dateTime = new Date(`${dateOnly}T${String(hour).padStart(2, "0")}:${minutePart}:00Z`).toISOString();

  console.log('dateTime', dateTime)

  setCreateAppointmentData((prev) => ({
    ...prev,
    fecha: dateTime,
    desiredDate: dateTime,
  }));
}
  };

  const loadSedes = async (institutionId: string, specialtyId?: number) => {
    setLoadingSedes(true);
    try {
      const specialistId = specialtyId ?? appointment.idSpecialist;
      console.log('loadSedes - institutionId:', institutionId, 'specialtyId:', specialistId);
      const data = await getSedesByListSpecialists(
        institutionId,
        specialistId
      );
      if (data === "No se encontraron resultados") {
        setSedes([]);
        return;
      }
      setSedes(data);
    } catch (err) {
      console.error("Error al obtener sedes:", err);
      setSedes([]);
    } finally {
      setLoadingSedes(false);
    }
  };

  const loadProfessionals = async (sedeId: string) => {
    setLoadingProfessionals(true);
    try {
      const data = await getProfessionalsByListSpecilists(
        appointment.institutionsId,
        appointment.idSpecialist,
        sedeId
      );
      setProfessionals(data);
    } catch (err) {
      console.error("Error al obtener profesionales:", err);
      setProfessionals([]);
    } finally {
      setLoadingProfessionals(false);
    }
  };

  const loadDays = async (professionalId: string) => {
    setLoadingDays(true);
    try {
      const data = await getDaysAvailable(
        appointment.institutionsId,
        appointment.idSpecialist,
        professionalId,
        appointment.idSede,
        appointment.idTypeServices
      );
      setDays(data);
    } catch (err) {
      console.error("Error al obtener días:", err);
      setDays([]);
    } finally {
      setLoadingDays(false);
    }
  };

  const loadHours = async (date: string) => {
    setLoadingHours(true);
    try {
      const data = await getHoursAvailable(
        appointment.institutionsId,
        appointment.idSpecialist,
        appointment.idProfessional,
        appointment.idSede,
        appointment.idTypeServices,
        date
      );
      setHours(data);
    } catch (err) {
      console.error("Error al obtener horarios:", err);
      setHours([]);
    } finally {
      setLoadingHours(false);
    }
  };

  const handlePromoProduct = async (promoProduct: CodeXProduct) => {
    setLoadingAliado(true);
    try {
      const allyData = await fetchAlliesById(promoProduct.id_aliado);
      if (!allyData) throw new Error("Aliado no encontrado");
      // fetchAlliesById puede devolver un array o un objeto único
      const ally = Array.isArray(allyData) ? allyData[0] : allyData;
      if (!ally) throw new Error("Aliado no encontrado");

      const dpts = await loadDepartments();
      const dpt = dpts.find((d) => Number(d.id) === Number(ally.id_departamento));
      if (!dpt) throw new Error("Departamento no encontrado");

      // Cargar municipios sin filtrar para productos promocionales
      const muns = await loadMunicipalities(dpt.id, true);
      const mun = muns.find((m) => Number(m.id) === Number(ally.id_municipio));
      if (!mun) {
        console.error("Municipio no encontrado. Municipios disponibles:", muns);
        console.error("Buscando municipio con id:", ally.id_municipio);
        throw new Error("Municipio no encontrado");
      }

      // Usar id_institucion en lugar de id_aliado para cargar la información y las sedes
      const institutionId = ally.id_institucion || ally.id_aliado;
      console.log('handlePromoProduct - ally:', ally);
      console.log('handlePromoProduct - institutionId a usar:', institutionId);

      const info = await getInstitutionInfo(institutionId);

      // Actualizar estados
      setSelectedValues((prev) => ({
        ...prev,
        dpto_institucion: dpt.id,
        ciudad_institucion: String(mun.id),
        nombre_institucion: String(institutionId),
      }));

      setIdMunicipioInstitucion(mun.id);
      setRegisterPurchase((prev: registerPurchase) => ({
        ...prev,
        dpto_institucion: dpt.nombre,
        ciudad_institucion: mun.nombre,
        nombre_institucion: ally.nombre_prestador,
        direccion_institucion: info.direccion,
        telefono_institucio: info.telefono,
      }));
      setCover(info.cover)

      // Actualizar appointment con el institutionsId (usar id_institucion)
      setAppointment((prev) => ({ 
        ...prev, 
        institutionsId: String(institutionId)
      }));

      setCreateAppointmentData((prev) => ({
        ...prev,
        institutionId: Number(institutionId),
      }));

      setAllyProvider([{
        id: String(institutionId),
        nombre: ally.nombre_prestador,
      }]);

      setSelectsDisabled(true);

      // Esperar un momento para asegurar que los estados se actualicen
      await new Promise(resolve => setTimeout(resolve, 100));

      // Cargar sedes automáticamente para producto promo
      // Usar id_institucion para cargar las sedes
      console.log('Cargando sedes para producto promocional:', {
        institutionId: String(institutionId),
        specialtyId: appointment.idSpecialist
      });
      await loadSedes(String(institutionId), appointment.idSpecialist);
    } catch (error) {
      console.error("Error en producto promocional:", error);
      setSelectsDisabled(false);
    } finally {
      setLoadingAliado(false);
    }
  };

  const handleNormalProduct = async () => {
    setLoadingAliado(true);
    try {
      setSelectsDisabled(false);
      setRegisterPurchase((prev: registerPurchase) => ({
        ...prev,
        dpto_institucion: "",
        ciudad_institucion: "",
        nombre_institucion: "",
        direccion_institucion: "",
        telefono_institucio: "",
      }));
      setSelectedValues({
        dpto_institucion: "",
        ciudad_institucion: "",
        nombre_institucion: "",
        sede: "",
        professional: "",
        day: "",
        hour: "",
      });
      setAllyProvider([]);
      setSedes([]);
      setProfessionals([]);
      setDays([]);
      setHours([]);
    } catch (error) {
      console.error("Error procesando producto normal:", error);
    } finally {
      setLoadingAliado(false);
    }
  };

  const reset = () => {
    setSelectedValues({
      dpto_institucion: "",
      ciudad_institucion: "",
      nombre_institucion: "",
      sede: "",
      professional: "",
      day: "",
      hour: "",
    });
    setSedes([]);
    setProfessionals([]);
    setDays([]);
    setHours([]);
    setMunicipalities([]);
    setAllyProvider([]);
  };

  // Auto-asignar prestador con slot más cercano cuando isFree
  const assignClosestProvider = async () => {
    setLoadingClosestProvider(true);
    try {
      const provider = await findProviderWithClosestSlot(
        appointment.idSpecialist,
        appointment.idTypeServices
      );
      if (!provider) {
        setAllyProvider([]);
        return;
      }

      const info = await getInstitutionInfo(provider.institutionId);

      setSelectedValues((prev) => ({
        ...prev,
        dpto_institucion: provider.departmentId,
        ciudad_institucion: provider.municipalityId,
        nombre_institucion: provider.institutionId,
        sede: provider.sede.id,
        professional: provider.professional.id,
        day: "",
        hour: "",
      }));

      setAppointment((prev) => ({
        ...prev,
        institutionsId: provider.institutionId,
        idSede: provider.sede.id,
        idProfessional: provider.professional.id,
      }));

      setCreateAppointmentData((prev) => ({
        ...prev,
        institutionId: Number(provider.institutionId),
        sedeId: parseInt(provider.sede.id),
        professionalId: parseInt(provider.professional.id),
      }));

      setRegisterPurchase((prev: registerPurchase) => ({
        ...prev,
        nombre_institucion: provider.ally.nombre_prestador,
        direccion_institucion: info.direccion,
        telefono_institucio: info.telefono,
        dpto_institucion: provider.ally.nombre_departamento ?? "",
        ciudad_institucion: provider.ally.nombre_municipio ?? "",
      }));

      setAllyProvider([{ id: provider.institutionId, nombre: provider.ally.nombre_prestador }]);
      setSedes([provider.sede]);
      setProfessionals([provider.professional]);
      setIdMunicipioInstitucion(provider.municipalityId);
      setCover(info.cover);
      setSelectsDisabled(true);

      const daysData = await getDaysAvailable(
        provider.institutionId,
        appointment.idSpecialist,
        provider.professional.id,
        provider.sede.id,
        appointment.idTypeServices
      );
      setDays(Array.isArray(daysData) ? daysData : []);
    } catch (err) {
      console.error("Error asignando prestador más cercano:", err);
    } finally {
      setLoadingClosestProvider(false);
    }
  };

  // === Effects ===
  useEffect(() => {
    const init = async () => {
      console.log('Inicializando hook...');
      await loadAllies();
      if (product) {
        console.log('Producto detectado:', product);
        if (isFree && !isProductPromo(product)) {
          console.log('Es isFree: buscando prestador con slot más cercano');
          await assignClosestProvider();
        } else if (isProductPromo(product)) {
          console.log('Es producto promo');
          await handlePromoProduct(product);
        } else {
          console.log('Es producto normal');
          await handleNormalProduct();
        }
      } else {
        console.log('No hay producto, cargando departamentos');
        await loadDepartments();
      }
    };
    init();
  }, [product, isFree]);

  useEffect(() => {
    if (selectedValues.dpto_institucion) {
      loadMunicipalities(selectedValues.dpto_institucion);
    }
  }, [selectedValues.dpto_institucion]);

  return {
    // Estados de ubicación
    departments,
    municipalities,
    allyProvider,
    loadingAliado,
    loadingClosestProvider,
    selectsDisabled,

    // Estados del flujo de citas
    sedes,
    professionals,
    days,
    hours,

    // Estados de carga
    loadingSedes,
    loadingProfessionals,
    loadingDays,
    loadingHours,

    // Valores seleccionados
    selectedValues,

    // Acciones
    handleSelectChange,
    reset,

    // Datos finales
    createAppointmentData,
    registerPurchase,

    // Alias del contexto
    appointment,
    setAppointment,

    cover
  };
};