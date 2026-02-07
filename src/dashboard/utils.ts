/**
 * Utilidades para construir filtros de búsqueda en Supabase (PostgREST).
 * Búsqueda en base de datos (ilike) para que sea global y no solo en la página actual.
 */

/**
 * Construye el valor del filtro "or" para PostgREST: (col1.ilike.*term*,col2.ilike.*term*,...)
 * El término se escapa (sin % ni *) para no romper el patrón. * en la URL = % en SQL.
 */
export function buildOrIlikeFilter(columns: string[], searchTerm: string): string {
  const term = searchTerm.trim()
  if (!term) return ''
  const safe = term.replace(/%/g, '').replace(/\*/g, '')
  const conditions = columns.map((col) => `${col}.ilike.*${safe}*`).join(',')
  return `(${conditions})`
}

/**
 * Añade el parámetro &or= al baseUrl si hay filtro (codifica el valor completo para la query string).
 */
export function appendSearchParam(baseUrl: string, orValue: string): string {
  if (!orValue) return baseUrl
  const sep = baseUrl.includes('?') ? '&' : '?'
  return `${baseUrl}${sep}or=${encodeURIComponent(orValue)}`
}
