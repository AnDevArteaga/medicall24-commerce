import { useState, useEffect } from 'react'
import { useDashboardVentas } from '../../dashboard/useDashboardVentas'
import { useDebouncedValue } from '../../dashboard/useDebouncedValue'
import DashboardTableHeader from './DashboardTableHeader'
import DashboardTablePagination from './DashboardTablePagination'
import Loader from '../ui/loader'

const SEARCH_DEBOUNCE_MS = 400

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(value)
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function SalesManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const debouncedSearch = useDebouncedValue(searchTerm, SEARCH_DEBOUNCE_MS)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const { data: ventas, total: totalVentas, isLoading, isFetching } = useDashboardVentas(
    currentPage,
    debouncedSearch
  )

  const loading = isLoading || isFetching

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <DashboardTableHeader
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Buscar por nombre, producto, email, ciudad..."
        right={
          <span className="text-sm text-gray-600">
            {totalVentas} venta{totalVentas !== 1 ? 's' : ''}
          </span>
        }
      />

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
            {loading && ventas.length === 0 ? (
              <tr>
                <td colSpan={13} className="px-6 py-12 text-center">
                  <Loader />
                </td>
              </tr>
            ) : ventas.length === 0 ? (
              <tr>
                <td colSpan={13} className="px-6 py-12 text-center text-gray-500">
                  No se encontraron ventas
                </td>
              </tr>
            ) : (
              ventas.map((venta) => (
                <tr key={venta.id_compra} className="hover:bg-gray-50 transition-colors">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                    {venta.id_compra}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 hidden sm:table-cell">
                    {venta.identificacion_comprador || 'N/A'}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    <div className="flex flex-col">
                      <span className="font-medium">{venta.nombre_comprador || 'N/A'}</span>
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
                    {venta.fecha_compra ? formatDate(venta.fecha_compra) : 'N/A'}
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
                    <div className="max-w-xs truncate" title={venta.producto || 'N/A'}>
                      {venta.producto || 'N/A'}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 hidden xl:table-cell">
                    <div className="max-w-xs truncate" title={venta.nombre_institucion || 'N/A'}>
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

      <DashboardTablePagination
        currentPage={currentPage}
        totalItems={totalVentas}
        onPageChange={setCurrentPage}
        isLoading={loading}
      />
    </div>
  )
}
