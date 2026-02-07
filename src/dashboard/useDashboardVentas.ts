import { useQuery } from '@tanstack/react-query'
import {
  getVentasCompletas,
  VentaCompleta,
} from '../services/supabase/sales'
import {
  DASHBOARD_PAGE_SIZE,
  DASHBOARD_QUERY_KEYS,
  DASHBOARD_STALE_TIME_MS,
} from './constants'

export function useDashboardVentas(page: number, searchTerm: string) {
  const query = useQuery({
    queryKey: [...DASHBOARD_QUERY_KEYS.ventas, page, searchTerm],
    queryFn: () =>
      getVentasCompletas(page, DASHBOARD_PAGE_SIZE, searchTerm || undefined),
    staleTime: DASHBOARD_STALE_TIME_MS,
    placeholderData: (prev) => prev,
  })

  return {
    data: (query.data?.data ?? []) as VentaCompleta[],
    total: query.data?.total ?? 0,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    refetch: query.refetch,
  }
}
