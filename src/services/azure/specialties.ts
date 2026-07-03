import axios from 'axios'
import { apiAzure } from '../config/apis'

const authHeaders = {
  Authorization: `Bearer ${import.meta.env.VITE_PATIENTS_TOKEN}`,
}

export interface SpecialtyDto {
  id: number
  name: string
}

function mapSpecialtyRow(row: unknown): SpecialtyDto | null {
  if (!row || typeof row !== 'object') return null
  const r = row as Record<string, unknown>
  const id = Number(r.id ?? r.Id)
  const name = String(r.name ?? r.Name ?? '').trim()
  if (Number.isNaN(id) || !name) return null
  return { id, name }
}

function normalizeSpecialtiesResponse(payload: unknown): SpecialtyDto[] {
  let list: unknown[] = []
  if (Array.isArray(payload)) {
    list = payload
  } else if (
    payload &&
    typeof payload === 'object' &&
    'data' in payload &&
    Array.isArray((payload as { data: unknown }).data)
  ) {
    list = (payload as { data: unknown[] }).data
  }
  return list
    .map(mapSpecialtyRow)
    .filter((x): x is SpecialtyDto => x !== null)
}

export const getSpecialties = async (): Promise<SpecialtyDto[]> => {
  const { data } = await axios.get<unknown>(`${apiAzure}/Specialties`, {
    headers: authHeaders,
  })
  return normalizeSpecialtiesResponse(data)
}
