import axios from 'axios'
import { apiSupabase } from '../config/apis'

export interface CitasFreeEspecialidadRow {
  id: number
  id_institucion: number
  id_especialidad: number
  nom_espe: string | null
  estado: number
  id_profesional: number
}

const TABLE = 'aliado_comercial_citasfree_especialidad'

const supabaseHeaders = {
  apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
  Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
}

export const fetchCitasFreeEspecialidadRows = async (): Promise<
  CitasFreeEspecialidadRow[]
> => {
  const url = `${apiSupabase}/${TABLE}?select=*`
  const response = await axios.get<CitasFreeEspecialidadRow[]>(url, {
    headers: supabaseHeaders,
  })
  return response.data ?? []
}

/** Primer id_institucion por cada id_especialidad (orden de filas Supabase). */
export const mapEspecialidadToInstitucion = (
  rows: CitasFreeEspecialidadRow[],
): Map<number, number> => {
  const m = new Map<number, number>()
  for (const r of rows) {
    const eid = Number(r.id_especialidad)
    const iid = Number(r.id_institucion)
    if (Number.isNaN(eid) || Number.isNaN(iid)) continue
    if (!m.has(eid)) m.set(eid, iid)
  }
  return m
}

/**
 * IDs de especialidad habilitadas para consulta gratuita (tabla Supabase).
 */
export const fetchCitasFreeEspecialidadIds = async (): Promise<number[]> => {
  const rows = await fetchCitasFreeEspecialidadRows()
  const ids = new Set<number>()
  for (const row of rows) {
    const id = Number(row.id_especialidad)
    if (!Number.isNaN(id)) ids.add(id)
  }
  return [...ids]
}
