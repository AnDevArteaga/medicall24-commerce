import { useQuery } from '@tanstack/react-query'
import {
  getCodigosPromo,
  CodigoPromo,
} from '../services/supabase/codigos-promo'
import {
  DASHBOARD_PAGE_SIZE,
  DASHBOARD_QUERY_KEYS,
  DASHBOARD_STALE_TIME_MS,
} from './constants'

export function useDashboardCodigos(page: number, searchTerm: string) {
  const query = useQuery({
    queryKey: [...DASHBOARD_QUERY_KEYS.codigos, page, searchTerm],
    queryFn: async () => {
      const res = await getCodigosPromo(page, DASHBOARD_PAGE_SIZE, searchTerm || undefined)
      const data = (res.data || []).map((c) => ({
        ...c,
        cod_promo: c.cod_promo?.trim() || '',
      }))
      return { data, total: res.total }
    },
    staleTime: DASHBOARD_STALE_TIME_MS,
    placeholderData: (prev) => prev,
  })

  return {
    data: (query.data?.data ?? []) as CodigoPromo[],
    total: query.data?.total ?? 0,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    refetch: query.refetch,
  }
}
