import { useEffect, useState, useRef } from 'react'
import { Search } from 'lucide-react'
import {
  getVentasCompletas,
  VentaCompleta,
} from '../../services/supabase/sales'
import Loader from '../ui/loader'

const ITEMS_PER_PAGE = 20

export default function SalesManagement() {
  const [ventas, setVentas] = useState<VentaCompleta[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalVentas, setTotalVentas] = useState(0)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const loadVentas = async (page: number, search?: string) => {
    setLoading(true)
    try {
      const result = await getVentasCompletas(page, ITEMS_PER_PAGE, search)
      setVentas(result.data)
      setTotalVentas(result.total)
    } catch (error) {
      console.error('Error cargando ventas:', error)
      setVentas([])
      setTotalVentas(0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadVentas(currentPage, searchTerm)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  // Debounce para la búsqueda
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(() => {
      setCurrentPage(1) // Resetear a la primera página cuando se busca
      loadVentas(1, searchTerm)
    }, 500) // Esperar 500ms después de que el usuario deje de escribir

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchTerm])

  const totalPages = Math.ceil(totalVentas / ITEMS_PER_PAGE)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header con búsqueda */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">
              {totalVentas} venta{totalVentas !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Tabla de ventas - Responsive */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                ID Compra
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden sm:table-cell">
                Identificación
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden lg:table-cell">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden xl:table-cell">
                Ciudad
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden xl:table-cell">
                Departamento
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">
                Método Pago
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden lg:table-cell">
                Producto
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden xl:table-cell">
                Institución
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden xl:table-cell">
                Código Promo
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden xl:table-cell">
                Gestor
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {loading ? (
              <tr>
                <td
                  colSpan={13}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <div className="flex items-center justify-center">
                    <Loader />
                  </div>
                </td>
              </tr>
            ) : ventas.length === 0 ? (
              <tr>
                <td
                  colSpan={13}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No se encontraron ventas
                </td>
              </tr>
            ) : (
              ventas.map((venta) => (
                <tr
                  key={venta.id_compra}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                    {venta.id_compra}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 hidden sm:table-cell">
                    {venta.identificacion_comprador || 'N/A'}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {venta.nombre_comprador || 'N/A'}
                      </span>
                      <span className="text-xs text-gray-500 sm:hidden">
                        {venta.identificacion_comprador || 'N/A'}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 hidden lg:table-cell">
                    {venta.email_comprador || 'N/A'}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 hidden xl:table-cell">
                    {venta.ciudad_comprador || 'N/A'}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 hidden xl:table-cell">
                    {venta.departamento_comprador || 'N/A'}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    {venta.fecha_compra
                      ? formatDate(venta.fecha_compra)
                      : 'N/A'}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm hidden md:table-cell">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-secondary/20 text-secondary">
                      {venta.metodo_pago || 'N/A'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900">
                    {formatCurrency(venta.total || 0)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 hidden lg:table-cell">
                    <div
                      className="max-w-xs truncate"
                      title={venta.producto || 'N/A'}
                    >
                      {venta.producto || 'N/A'}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 hidden xl:table-cell">
                    <div
                      className="max-w-xs truncate"
                      title={venta.nombre_institucion || 'N/A'}
                    >
                      {venta.nombre_institucion || 'N/A'}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 hidden xl:table-cell">
                    {venta.id_codigo_promo && venta.id_codigo_promo !== 0 ? (
                      <div>
                        <div className="font-medium">
                          {venta.codigo_promo?.cod_promo || 'N/A'}
                        </div>
                        {(venta.codigo_promo?.procentaje_descuento ||
                          venta.codigo_promo?.procentaje_descuento_compra) && (
                          <div className="text-xs text-gray-500">
                            {venta.codigo_promo.procentaje_descuento ||
                              venta.codigo_promo.procentaje_descuento_compra}
                            % desc.
                          </div>
                        )}
                      </div>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 hidden xl:table-cell">
                    {venta.id_gestor && venta.id_gestor !== 0
                      ? venta.gestor?.razon_social || 'N/A'
                      : 'N/A'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="bg-gray-50 px-4 sm:px-6 py-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-gray-700 text-center sm:text-left">
              Mostrando{' '}
              <span className="font-medium">
                {totalVentas > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}
              </span>{' '}
              a{' '}
              <span className="font-medium">
                {Math.min(currentPage * ITEMS_PER_PAGE, totalVentas)}
              </span>{' '}
              de <span className="font-medium">{totalVentas}</span> resultados
            </div>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => {
                  const newPage = Math.max(1, currentPage - 1)
                  setCurrentPage(newPage)
                }}
                disabled={currentPage === 1 || loading}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Anterior
              </button>
              <span className="px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700">
                {currentPage} / {totalPages || 1}
              </span>
              <button
                onClick={() => {
                  const newPage = Math.min(totalPages, currentPage + 1)
                  setCurrentPage(newPage)
                }}
                disabled={currentPage === totalPages || loading}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
