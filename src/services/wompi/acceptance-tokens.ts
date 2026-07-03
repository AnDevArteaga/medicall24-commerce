export type WompiAcceptancePair = {
  acceptance_token: string
  accept_personal_auth: string
  privacyPermalink?: string
  personalDataPermalink?: string
}

export function wompiBaseUrl(publicKey: string): string {
  const k = publicKey.trim()
  const sandbox =
    k.includes('_test_') ||
    k.toLowerCase().includes('sandbox') ||
    k.startsWith('pub_test')
  return sandbox
    ? 'https://sandbox.wompi.co/v1'
    : 'https://production.wompi.co/v1'
}

/**
 * Tokens de aceptación requeridos por Wompi (fuentes de pago / transacciones).
 * @see https://docs.wompi.co/docs/colombia/tokens-de-aceptacion/
 */
export async function fetchWompiAcceptanceTokens(
  publicKey: string,
): Promise<WompiAcceptancePair> {
  const trimmed = publicKey.trim()
  if (!trimmed) {
    throw new Error('Falta la llave pública de Wompi (VITE_WOMPI_PUBLIC_KEY).')
  }
  const base = wompiBaseUrl(trimmed)
  const url = `${base}/merchants/${encodeURIComponent(trimmed)}`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${trimmed}`,
      Accept: 'application/json',
    },
  })
  let json: Record<string, unknown> = {}
  try {
    json = (await res.json()) as Record<string, unknown>
  } catch {
    /* vacío */
  }
  if (!res.ok) {
    const err = json.error as Record<string, unknown> | undefined
    const reason =
      typeof err?.reason === 'string'
        ? err.reason
        : typeof json.message === 'string'
          ? json.message
          : 'No se pudo obtener la información del comercio en Wompi.'
    throw new Error(reason)
  }
  const data = json.data as Record<string, unknown> | undefined
  if (!data) throw new Error('Respuesta inválida de Wompi.')

  const rawPa = data.presigned_acceptance
  const pa: Record<string, unknown> | undefined = Array.isArray(rawPa)
    ? (rawPa[0] as Record<string, unknown> | undefined)
    : rawPa && typeof rawPa === 'object'
      ? (rawPa as Record<string, unknown>)
      : undefined

  const rawPd = data.presigned_personal_data_auth
  const pd: Record<string, unknown> | undefined = Array.isArray(rawPd)
    ? (rawPd[0] as Record<string, unknown> | undefined)
    : rawPd && typeof rawPd === 'object'
      ? (rawPd as Record<string, unknown>)
      : undefined

  const acceptance_token =
    typeof pa?.acceptance_token === 'string' ? pa.acceptance_token : ''
  const accept_personal_auth =
    typeof pd?.acceptance_token === 'string' ? pd.acceptance_token : ''

  if (!acceptance_token || !accept_personal_auth) {
    throw new Error('Wompi no devolvió los tokens de aceptación.')
  }

  return {
    acceptance_token,
    accept_personal_auth,
    privacyPermalink:
      typeof pa?.permalink === 'string' ? pa.permalink : undefined,
    personalDataPermalink:
      typeof pd?.permalink === 'string' ? pd.permalink : undefined,
  }
}
