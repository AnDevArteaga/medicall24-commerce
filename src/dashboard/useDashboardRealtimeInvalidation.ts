import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { supabase } from '../services/supabase/client/create-client'
import { DASHBOARD_QUERY_KEYS } from './constants'

/**
 * Suscripción a Supabase Realtime para invalidar la caché del dashboard
 * cuando cambien registro_compra, ordenes_pago_gestores o codigo_promo (INSERT, UPDATE, DELETE).
 * Así ventas, pagos a gestores y códigos se actualizan al haber nuevos datos o cambios.
 * Requiere tener Replication activada para esas tablas en Supabase (Database > Replication).
 */
export function useDashboardRealtimeInvalidation() {
  const queryClient = useQueryClient()

  useEffect(() => {
    const channel = supabase
      .channel('dashboard-invalidation')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'registro_compra',
        },
        () => {
          queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEYS.ventas })
          queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEYS.pagoGestores })
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ordenes_pago_gestores',
        },
        () => {
          queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEYS.pagoGestores })
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'codigo_promo',
        },
        () => {
          queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEYS.codigos })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [queryClient])
}
