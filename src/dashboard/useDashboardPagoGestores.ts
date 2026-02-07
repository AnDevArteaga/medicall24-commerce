import { useQuery } from '@tanstack/react-query'
import {
  getVentasParaPagoGestores,
  VentaParaPagoGestores,
} from '../services/supabase/sales'
import {
  DASHBOARD_PAGE_SIZE,
  DASHBOARD_QUERY_KEYS,
  DASHBOARD_STALE_TIME_MS,
} from './constants'

export function useDashboardPagoGestores(page: number, searchTerm: string) {
  const query = useQuery({
    queryKey: [...DASHBOARD_QUERY_KEYS.pagoGestores, page, searchTerm],
    queryFn: () =>
      getVentasParaPagoGestores(page, DASHBOARD_PAGE_SIZE, searchTerm || undefined),
    staleTime: DASHBOARD_STALE_TIME_MS,
    placeholderData: (prev) => prev,
  })

  return {
    data: (query.data?.data ?? []) as VentaParaPagoGestores[],
    total: query.data?.total ?? 0,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    refetch: query.refetch,
  }
}
