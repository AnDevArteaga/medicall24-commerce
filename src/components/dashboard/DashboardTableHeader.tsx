import type { ReactNode } from 'react'
import DashboardSearchInput from './DashboardSearchInput'

export interface DashboardTableHeaderProps {
  searchValue: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string
  right?: ReactNode
}

/**
 * Cabecera unificada para tablas del Dashboard: búsqueda a la izquierda, contenido opcional a la derecha.
 */
export default function DashboardTableHeader({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Buscar...',
  right,
}: DashboardTableHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <DashboardSearchInput
          value={searchValue}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
        />
        {right != null && <div className="flex-shrink-0 flex items-center gap-2">{right}</div>}
      </div>
    </div>
  )
}
