/**
 * Constantes unificadas para todas las vistas del Dashboard.
 * Paginación, caché y claves de query.
 */

export const DASHBOARD_PAGE_SIZE = 20

export const DASHBOARD_QUERY_KEYS = {
  ventas: ['dashboard', 'ventas'] as const,
  pagoGestores: ['dashboard', 'pagoGestores'] as const,
  codigos: ['dashboard', 'codigos'] as const,
} as const

/** Tiempo en ms que los datos se consideran "frescos" sin refetch (2 min) */
export const DASHBOARD_STALE_TIME_MS = 2 * 60 * 1000
