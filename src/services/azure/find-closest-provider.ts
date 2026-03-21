import {
  getSedesByListSpecialists,
  getProfessionalsByListSpecilists,
  getDaysAvailable,
  getHoursAvailable,
} from "./appoiment";
import { fetchAllies } from "../supabase/allies";
import { Ally } from "../../interfaces/allies-supabase.interface";
import { Sede, Professional, DayAvailable, HourAvailable } from "../../interfaces/appoiment.interface";

export interface ProviderWithSlot {
  ally: Ally;
  institutionId: string;
  sede: Sede;
  professional: Professional;
  earliestSlot: Date;
  departmentId: string;
  municipalityId: string;
}

/**
 * Parsea una hora en formato "2:00 PM", "14:00" o ISO a Date combinada con el día
 */
function parseSlotDateTime(dateStr: string, timeStr: string): Date {
  const dateOnly = dateStr.includes("T") ? dateStr.split("T")[0] : dateStr;

  if (timeStr.includes("T") || /^\d{4}-\d{2}-\d{2}/.test(timeStr)) {
    return new Date(timeStr);
  }

  const match = String(timeStr).match(/(\d+):(\d+)\s*(AM|PM)/i);
  let hour: number;
  let minute: number;

  if (match) {
    hour = parseInt(match[1], 10);
    minute = parseInt(match[2], 10);
    if (match[3].toUpperCase() === "PM" && hour < 12) hour += 12;
    if (match[3].toUpperCase() === "AM" && hour === 12) hour = 0;
  } else {
    const parts = String(timeStr).split(":");
    hour = parseInt(parts[0] || "0", 10);
    minute = parseInt(parts[1] || "0", 10);
  }

  return new Date(`${dateOnly}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`);
}

/**
 * Obtiene el slot más cercano para un profesional (primer horario disponible >= ahora)
 */
async function getEarliestSlotForProfessional(
  institutionId: string,
  specialtyId: number,
  sedeId: string,
  professionalId: string,
  typeServiceId: number
): Promise<Date | null> {
  const daysResponse = await getDaysAvailable(
    institutionId,
    specialtyId,
    professionalId,
    sedeId,
    typeServiceId
  );

  if (!Array.isArray(daysResponse) || daysResponse.length === 0) return null;

  const now = new Date();
  const sortedDays = (daysResponse as DayAvailable[])
    .map((d) => d.date)
    .filter((d) => new Date(d) >= new Date(now.toISOString().split("T")[0]))
    .sort();

  for (const dayDate of sortedDays) {
    const hoursResponse = await getHoursAvailable(
      institutionId,
      specialtyId,
      professionalId,
      sedeId,
      typeServiceId,
      dayDate
    );

    if (!Array.isArray(hoursResponse) || hoursResponse.length === 0) continue;

    const hours = hoursResponse as HourAvailable[];
    for (const h of hours) {
      const slotDate = parseSlotDateTime(dayDate, h.fecha);
      if (slotDate >= now) return slotDate;
    }
  }
  return null;
}

export type FindClosestProviderOptions = {
  /** Si true, usa tabla aliado_comercial_citasfree (consulta gratuita) */
  useCitasFreeAllies?: boolean;
};

/**
 * Encuentra el prestador con el turno disponible más cercano a la hora actual.
 * Solo considera prestadores que tengan agenda disponible para la especialidad.
 */
export async function findProviderWithClosestSlot(
  specialtyId: number,
  typeServiceId: number = 3,
  options?: FindClosestProviderOptions
): Promise<ProviderWithSlot | null> {
  const allies = await fetchAllies({ citasFree: options?.useCitasFreeAllies });
  if (!allies || allies.length === 0) return null;

  const now = new Date();
  let best: ProviderWithSlot | null = null;

  for (const ally of allies) {
    const institutionId = String(ally.id_institucion);
    let sedes: Sede[];

    try {
      const sedesData = await getSedesByListSpecialists(institutionId, specialtyId);
      if (typeof sedesData === "string" || !Array.isArray(sedesData)) continue;
      sedes = sedesData as Sede[];
    } catch {
      continue;
    }

    for (const sede of sedes) {
      let professionals: Professional[];
      try {
        const profsData = await getProfessionalsByListSpecilists(
          institutionId,
          specialtyId,
          sede.id
        );
        if (!Array.isArray(profsData)) continue;
        professionals = profsData as Professional[];
      } catch {
        continue;
      }

      for (const professional of professionals) {
        try {
          const earliestSlot = await getEarliestSlotForProfessional(
            institutionId,
            specialtyId,
            sede.id,
            professional.id,
            typeServiceId
          );

          if (!earliestSlot || earliestSlot < now) continue;

          if (!best || earliestSlot < best.earliestSlot) {
            best = {
              ally,
              institutionId,
              sede,
              professional,
              earliestSlot,
              departmentId: String(ally.id_departamento),
              municipalityId: String(ally.id_municipio),
            };
          }
        } catch {
          continue;
        }
      }
    }
  }

  return best;
}
