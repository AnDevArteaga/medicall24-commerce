import axios from 'axios'
import { apiSupabase } from '../config/apis'

const TABLE = 'aliado_comercial_citasfree'

export interface CitasFreePrestadorRow {
  id_aliado: number
  id_institucion: number
  num_identificacion: string
  nombre_prestador: string
  id_departamento: number
  id_municipio: number
  estado: boolean
  nombre_departamento?: string
  nombre_municipio?: string
}

const supabaseHeaders = {
  apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
  Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
}

/**
 * Prestador de consulta gratuita por id de institución (tabla aliado_comercial_citasfree).
 */
export const fetchCitasFreePrestadorByInstitucion = async (
  idInstitucion: number,
): Promise<CitasFreePrestadorRow | null> => {
  const url = `${apiSupabase}/${TABLE}?id_institucion=eq.${idInstitucion}&estado=eq.true&select=*`
  const response = await axios.get<CitasFreePrestadorRow[]>(url, {
    headers: supabaseHeaders,
  })
  const rows = response.data ?? []
  return rows[0] ?? null
}
