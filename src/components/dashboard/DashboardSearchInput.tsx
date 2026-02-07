import { Search } from 'lucide-react'

export interface DashboardSearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

/**
 * Input de búsqueda unificado para todas las vistas del Dashboard.
 * Misma apariencia; el padre usa useDebouncedValue para enviar la búsqueda a la BD.
 */
export default function DashboardSearchInput({
  value,
  onChange,
  placeholder = 'Buscar...',
  className = '',
}: DashboardSearchInputProps) {
  return (
    <div className={`flex-1 relative ${className}`}>
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
        aria-hidden
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
        aria-label="Buscar"
      />
    </div>
  )
}
