import { apiSupabaseFunctions } from '../config/apis'

const VERIFY_URL = `${apiSupabaseFunctions}/wompi-trial-card-verify`

export type SmartResponderCardPayload = {
  number: string
  cvc: string
  exp_month: string
  exp_year: string
  card_holder: string
  customer_email: string
  acceptance_token: string
  accept_personal_auth: string
  id_usuario_medicall: number
  id_paciente?: number
  tipo_identificacion?: string
  identificacion?: string
}

export type SmartResponderResult = {
  payment_source_id: string | number
  status?: string
  public_data?: { last_four?: string } | null
  tarjeta_ultimos_4?: string
  verified?: boolean
  reason?: string
  voided?: boolean
  saved?: boolean
}

export class CardVerifyNetworkError extends Error {
  constructor(message = 'No se pudo conectar con el servidor.') {
    super(message)
    this.name = 'CardVerifyNetworkError'
  }
}

function supabaseFunctionHeaders(): Record<string, string> {
  return {
    apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API as string,
    Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH as string,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
}

function extractErrorMessage(data: unknown, status: number): string {
  if (data && typeof data === 'object' && 'error' in data) {
    const e = (data as { error: unknown }).error
    if (typeof e === 'string' && e.trim()) return e.trim()
  }
  return `No se pudo verificar la tarjeta (${status})`
}

export async function tokenizeCardViaSmartResponder(
  payload: SmartResponderCardPayload,
): Promise<SmartResponderResult> {
  let res: Response
  try {
    res = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: supabaseFunctionHeaders(),
      body: JSON.stringify(payload),
    })
  } catch {
    throw new CardVerifyNetworkError()
  }

  const text = await res.text()
  let data: unknown
  try {
    data = text ? JSON.parse(text) : {}
  } catch {
    throw new Error(`Respuesta inválida del servidor (${res.status})`)
  }

  if (!res.ok) {
    throw new Error(extractErrorMessage(data, res.status))
  }

  const body = data as {
    ok?: boolean
    payment_source_id?: string | number
    status?: string
    public_data?: { last_four?: string } | null
    tarjeta_ultimos_4?: string
    verified?: boolean
    reason?: string
    voided?: boolean
    saved?: boolean
    error?: string
  }

  if (!body.ok || !body.payment_source_id) {
    throw new Error(body.error ?? 'No se recibió la fuente de pago.')
  }

  return {
    payment_source_id: body.payment_source_id,
    status: body.status,
    public_data: body.public_data ?? null,
    tarjeta_ultimos_4: body.tarjeta_ultimos_4,
    verified: body.verified,
    reason: body.reason,
    voided: body.voided,
    saved: body.saved,
  }
}
