import React from 'react'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'

// Función para obtener el nombre del producto por ID
const getProductName = (idProducto: string | number): string => {
  const productId =
    typeof idProducto === 'string' ? parseInt(idProducto, 10) : idProducto
  const productNames: Record<number, string> = {
    17: 'EXAMEN BEXA PARA DETECTAR MASAS EN MAMA',
    16: 'PAQUETE DE SERVICIOS COMPLEMENTARIOS PARA DETECTAR CÁNCER DE MAMA',
  }
  return productNames[productId] || `Producto ${productId}`
}

interface TableViewProps {
  activeTab: string
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  filteredData: any[]
  paginatedData: any[]
  getStatusColor: (status: string) => string
}

const ITEMS_PER_PAGE = 20

const TableView: React.FC<TableViewProps> = ({
  activeTab,
  searchTerm,
  setSearchTerm,
  currentPage,
  setCurrentPage,
  filteredData,
  paginatedData,
  getStatusColor,
}) => {
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)

  return (
    <div className={`${activeTab !== 'table' ? 'hidden' : ''}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Créditos Aprobados
          </h2>
          <p className="text-gray-500 text-sm">
            Gestiona y visualiza todos los créditos aprobados
          </p>
        </div>
        <div className="mt-4 md:mt-0 md:w-80">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar por identificación, código, nombre, correo o producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                ID Crédito
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                ID Gestión
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Fecha de aprobación
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Identificación
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Nombre Usuario
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Correo Usuario
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Código de autorización
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Producto
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Valor aprobado
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Estado
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.length > 0 ? (
              paginatedData.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {row.id || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-700">
                      {row.id_gestion || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {row.fecha_aprobacion || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {row.identificacion_usuario}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {row.nombre_usuario || row.correo_comprador || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {row.correo_usuario || row.correo_comprador || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded inline-block">
                      {row.codigo_credito}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {getProductName(row.id_producto)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-green-600">
                      ${Number(row.valor_aprobado).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        row.validado ? 'Usado' : 'Sin usar'
                      )}`}
                    >
                      {row.validado ? 'Usado' : 'Sin usar'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center">
                    <div className="bg-gray-100 rounded-full p-4 mb-4">
                      <Search className="text-gray-400" size={32} />
                    </div>
                    <p className="text-gray-500 font-medium">
                      No se encontraron resultados
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Intenta con otros términos de búsqueda
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación Moderna */}
      {filteredData.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
          <div className="text-sm text-gray-700">
            Mostrando{' '}
            <span className="font-semibold">
              {(currentPage - 1) * ITEMS_PER_PAGE + 1}
            </span>{' '}
            a{' '}
            <span className="font-semibold">
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)}
            </span>{' '}
            de <span className="font-semibold">{filteredData.length}</span>{' '}
            resultados
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg border transition-all duration-200 ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-primary'
              }`}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      currentPage === pageNum
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg border transition-all duration-200 ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-primary'
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TableView
