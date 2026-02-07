import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useModal } from '../../contexts/modals'
import type { VentaParaPagoGestores } from '../../services/supabase/sales'
import { useDashboardPagoGestores } from '../../dashboard/useDashboardPagoGestores'
import { useDebouncedValue } from '../../dashboard/useDebouncedValue'
import DashboardTableHeader from './DashboardTableHeader'
import DashboardTablePagination from './DashboardTablePagination'
import ButtonForm from '../ui/button-forms'
import Loader from '../ui/loader'
import ModalPagoGestores from './modals/modal-pago-gestores'
import { useQueryClient } from '@tanstack/react-query'
import { DASHBOARD_QUERY_KEYS } from '../../dashboard/constants'

const SEARCH_DEBOUNCE_MS = 400
const MODAL_NAME = 'modalPagoGestores'

function valorAPagar(total: number, porcentaje: number): number {
  return (total * porcentaje) / 100
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(value)
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function PaymentGestoresManagement() {
  const queryClient = useQueryClient()
  const { openModal, isModalOpen } = useModal()
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [selectedGestorId, setSelectedGestorId] = useState<number | null>(null)

  const debouncedSearch = useDebouncedValue(searchTerm, SEARCH_DEBOUNCE_MS)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const { data: ventas, total, isLoading, isFetching, refetch } = useDashboardPagoGestores(
    currentPage,
    debouncedSearch
  )

  const loading = isLoading || isFetching

  const invalidateAndClose = () => {
    queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEYS.pagoGestores })
    refetch()
    setSelectedIds(new Set())
    setSelectedGestorId(null)
  }

  const toggleSelect = (venta: VentaParaPagoGestores) => {
    const id = venta.id_compra
    const idGestor = venta.id_gestor ?? 0

    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
        if (next.size === 0) setSelectedGestorId(null)
        return next
      }
      if (selectedGestorId != null && selectedGestorId !== idGestor) {
        toast.error(
          'Solo puedes seleccionar registros del mismo gestor. Desmarca los actuales para elegir otro.'
        )
        return prev
      }
      next.add(id)
      setSelectedGestorId(idGestor)
      return next
    })
  }

  const handleAlistarPago = () => {
    const selected = ventas.filter((v) => selectedIds.has(v.id_compra))
    if (selected.length === 0) return
    openModal(MODAL_NAME, {
      mode: 'preview',
      items: selected,
      onClose: invalidateAndClose,
    })
  }

  const handleVerOrden = (ordenId: number) => {
    openModal(MODAL_NAME, {
      mode: 'view',
      ordenId,
      onClose: () => {
        queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEYS.pagoGestores })
        refetch()
      },
    })
  }

  const canAlistar = selectedIds.size >= 1

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        <DashboardTableHeader
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Buscar por producto, gestor o % participación..."
          right={
            <>
              <span className="text-sm text-gray-600">{total} registros</span>
              <ButtonForm
                text="Alistar pago"
                onClick={handleAlistarPago}
                disabled={!canAlistar}
              />
            </>
          }
        />

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  ID Compra
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Fecha Compra
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Total Pagado
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Gestor
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  % Participación
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Valor a Pagar
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Seleccionar
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  No. Orden
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {loading && ventas.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center">
                    <Loader />
                  </td>
                </tr>
              ) : ventas.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-gray-500">
                    No hay registros con estado APPROVED, gestor y código promo asignados
                  </td>
                </tr>
              ) : (
                ventas.map((v) => {
                  const valorPagar = valorAPagar(
                    v.total ?? 0,
                    v.porcentaje_comision_gestor ?? 0
                  )
                  const tieneOrden =
                    v.id_orden_pago != null && v.numero_orden != null
                  const isSelected = selectedIds.has(v.id_compra)
                  const canCheck =
                    selectedGestorId == null || selectedGestorId === (v.id_gestor ?? 0)

                  return (
                    <tr key={v.id_compra} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {v.id_compra}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {v.fecha_compra ? formatDate(v.fecha_compra) : '—'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                        {v.producto ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">
                        {formatCurrency(v.total ?? 0)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {v.gestor?.razon_social ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-sm text-center text-gray-600">
                        {v.porcentaje_comision_gestor ?? 0}%
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">
                        {formatCurrency(valorPagar)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {!tieneOrden && (
                          <input
                            type="checkbox"
                            checked={isSelected}
                            disabled={!canCheck}
                            onChange={() => toggleSelect(v)}
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {tieneOrden ? (
                          <button
                            type="button"
                            onClick={() =>
                              v.id_orden_pago && handleVerOrden(v.id_orden_pago)
                            }
                            className="text-primary font-medium hover:underline"
                          >
                            {v.numero_orden}
                          </button>
                        ) : (
                          <span className="text-gray-500">Pendiente</span>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        <DashboardTablePagination
          currentPage={currentPage}
          totalItems={total}
          onPageChange={setCurrentPage}
          isLoading={loading}
        />
      </div>

      {isModalOpen(MODAL_NAME) && <ModalPagoGestores />}
    </div>
  )
}
