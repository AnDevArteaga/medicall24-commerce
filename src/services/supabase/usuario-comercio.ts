import axios from 'axios'
import { apiSupabase } from '../config/apis'
import { checkUserRegistrationService } from '../azure/user'

export interface UsuarioComercioRow {
  id: number
  id_usuario_medicall: number
  id_paciente: number
  email?: string | null
  tipo_identificacion?: string | null
  identificacion?: string | null
  wompi_payment_source_id?: string | null
  tarjeta_ultimos_4?: string | null
  wompi_payment_source_status?: string | null
}

function supabaseHeaders(extra?: Record<string, string>) {
  return {
    apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
    Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
    'Content-Type': 'application/json',
    ...extra,
  }
}

export async function getUsuarioComercioByUsuarioId(
  idUsuarioMedicall: number,
): Promise<UsuarioComercioRow | null> {
  if (!idUsuarioMedicall) return null
  try {
    const res = await axios.get<UsuarioComercioRow[]>(
      `${apiSupabase}/usuario_comercio?id_usuario_medicall=eq.${idUsuarioMedicall}&select=*&limit=1`,
      { headers: supabaseHeaders() },
    )
    return res.data?.[0] ?? null
  } catch (e) {
    console.warn('[usuario_comercio] get by usuario:', e)
    return null
  }
}

async function resolvePacienteId(
  idUsuarioMedicall: number,
  tipoIdentificacion?: string,
  identificacion?: string,
): Promise<number> {
  if (tipoIdentificacion?.trim() && identificacion?.trim()) {
    try {
      const data = await checkUserRegistrationService(
        tipoIdentificacion.trim(),
        identificacion.trim(),
      )
      const pid = data?.id ?? (data?.user as { id?: number } | undefined)?.id
      if (typeof pid === 'number' && pid > 0) return pid
    } catch {
      /* usar id usuario */
    }
  }
  return idUsuarioMedicall
}

/** Crea el registro si no existe; si ya existe, devuelve el existente sin duplicar. */
export async function ensureUsuarioComercio(params: {
  id_usuario_medicall: number
  tipo_identificacion?: string
  identificacion?: string
  email?: string
}): Promise<UsuarioComercioRow | null> {
  const { id_usuario_medicall } = params
  if (!id_usuario_medicall) return null

  const existing = await getUsuarioComercioByUsuarioId(id_usuario_medicall)
  if (existing) return existing

  const id_paciente = await resolvePacienteId(
    id_usuario_medicall,
    params.tipo_identificacion,
    params.identificacion,
  )

  try {
    const res = await axios.post<UsuarioComercioRow[]>(
      `${apiSupabase}/usuario_comercio`,
      {
        id_usuario_medicall,
        id_paciente,
        email: params.email?.trim() || null,
        tipo_identificacion: params.tipo_identificacion?.trim() || null,
        identificacion: params.identificacion?.trim() || null,
        updated_at: new Date().toISOString(),
      },
      {
        headers: supabaseHeaders({
          Prefer: 'return=representation',
        }),
      },
    )
    return Array.isArray(res.data) ? res.data[0] : (res.data as unknown as UsuarioComercioRow)
  } catch (e) {
    // Carrera: otro request insertó primero
    const again = await getUsuarioComercioByUsuarioId(id_usuario_medicall)
    if (again) return again
    console.error('[usuario_comercio] ensure insert:', e)
    return null
  }
}

export async function saveUsuarioComercioPaymentSource(params: {
  id_usuario_medicall: number
  wompi_payment_source_id: string
  tarjeta_ultimos_4: string
  wompi_payment_source_status?: string
}): Promise<UsuarioComercioRow | null> {
  const last4 = params.tarjeta_ultimos_4.replace(/\D/g, '').slice(-4)
  if (!params.id_usuario_medicall || !params.wompi_payment_source_id || last4.length !== 4) {
    throw new Error('Datos incompletos para guardar la fuente de pago.')
  }

  const res = await axios.patch<UsuarioComercioRow[]>(
    `${apiSupabase}/usuario_comercio?id_usuario_medicall=eq.${params.id_usuario_medicall}`,
    {
      wompi_payment_source_id: String(params.wompi_payment_source_id),
      tarjeta_ultimos_4: last4,
      wompi_payment_source_status: params.wompi_payment_source_status ?? 'AVAILABLE',
      updated_at: new Date().toISOString(),
    },
    {
      headers: supabaseHeaders({ Prefer: 'return=representation' }),
    },
  )
  const row = Array.isArray(res.data) ? res.data[0] : null
  if (!row) {
    throw new Error('No se encontró usuario_comercio para actualizar la tarjeta.')
  }
  return row
}

export function extractLastFourDigits(
  cardNumber: string,
  tokenizeResponse?: unknown,
): string {
  const fromCard = cardNumber.replace(/\D/g, '').slice(-4)
  if (fromCard.length === 4) return fromCard
  if (tokenizeResponse && typeof tokenizeResponse === 'object') {
    const o = tokenizeResponse as Record<string, unknown>
    const pub = o.public_data as Record<string, unknown> | undefined
    const lf = pub?.last_four ?? pub?.lastFour
    if (typeof lf === 'string' && /^\d{4}$/.test(lf)) return lf
  }
  return fromCard.padStart(4, '0').slice(-4)
}
