import { DASHBOARD_PAGE_SIZE } from '../../dashboard/constants'

export interface DashboardTablePaginationProps {
  currentPage: number
  totalItems: number
  onPageChange: (page: number) => void
  isLoading?: boolean
}

/**
 * Paginación unificada para tablas del Dashboard (siempre 20 por página).
 */
export default function DashboardTablePagination({
  currentPage,
  totalItems,
  onPageChange,
  isLoading = false,
}: DashboardTablePaginationProps) {
  const totalPages = Math.ceil(totalItems / DASHBOARD_PAGE_SIZE) || 1
  const from = totalItems > 0 ? (currentPage - 1) * DASHBOARD_PAGE_SIZE + 1 : 0
  const to = Math.min(currentPage * DASHBOARD_PAGE_SIZE, totalItems)

  if (totalPages <= 1) return null

  return (
    <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex flex-wrap items-center justify-between gap-2">
      <span className="text-sm text-gray-600">
        Mostrando <span className="font-medium">{from}</span> a{' '}
        <span className="font-medium">{to}</span> de{' '}
        <span className="font-medium">{totalItems}</span>
      </span>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1 || isLoading}
          className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <span className="px-3 py-1.5 text-sm font-medium text-gray-700">
          {currentPage} / {totalPages}
        </span>
        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages || isLoading}
          className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}
