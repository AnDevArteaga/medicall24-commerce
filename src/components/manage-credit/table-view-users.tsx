import React from 'react'
import { GestionUsuarioCreditoResponse } from '../../services/supabase/manage-user-credit'
import { getProductById } from '../../services/supabase/products'
import { toast } from 'react-hot-toast'
import {
  Search,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  CheckCircle2,
  XCircle,
} from 'lucide-react'

interface FormData {
  identificacion_usuario: string
  id_producto: string
  codigo_plataforma_credito: string
  valor_aprobado: string
  fecha_aprobacion: string
  codigo_credito: string
  cod_usua_ingresa: string
  correo_comprador: string
  isGestionMode?: boolean
  id_gestion?: number
}

interface TableViewUsersProps {
  activeTab: string
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  filteredData: GestionUsuarioCreditoResponse[]
  paginatedData: GestionUsuarioCreditoResponse[]
  onUpdateData: () => void
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  onNegarSolicitud?: (id: number, email: string) => Promise<void>
  onOpenNegarModal?: (
    id: number,
    email: string,
    nombreComprador: string
  ) => void
}

const ITEMS_PER_PAGE = 20

const TableViewUsers: React.FC<TableViewUsersProps> = ({
  activeTab,
  searchTerm,
  setSearchTerm,
  currentPage,
  setCurrentPage,
  filteredData,
  paginatedData,
  setActiveTab,
  setFormData,
  onNegarSolicitud,
  onOpenNegarModal,
}) => {
  const [loadingGestion, setLoadingGestion] = React.useState<number | null>(
    null
  )

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)

  const handleGestionar = async (row: GestionUsuarioCreditoResponse) => {
    setLoadingGestion(row.id)
    try {
      let valorAprobado = row.credito_aprobado || ''

      if (!valorAprobado) {
        const product = await getProductById('17')
        valorAprobado = product?.valor_cop?.toString() || '0'
      }

      setActiveTab('form')

      // Obtener la fecha actual en formato YYYY-MM-DD
      const today = new Date()
      const fechaAprobacion = today.toISOString().split('T')[0]

      // Formatear el valor aprobado con separadores de miles
      const valorNumerico = String(valorAprobado).replace(/\D/g, '')
      const valorFormateado = valorNumerico
        ? Number(valorNumerico).toLocaleString('es-CO')
        : ''

      setFormData((prev: FormData) => ({
        identificacion_usuario: row.identificacion.toString(),
        id_producto: '17',
        codigo_plataforma_credito: '17',
        valor_aprobado: valorFormateado,
        fecha_aprobacion: fechaAprobacion,
        codigo_credito: '',
        cod_usua_ingresa: prev.cod_usua_ingresa || '',
        correo_comprador: row.correo_comprador || '',
        isGestionMode: true, // Activar modo gestión
        id_gestion: row.id, // Guardar el ID de la gestión
      }))

      toast.success(
        'Formulario prellenado. Complete la fecha de aprobación y el código de autorización.'
      )
    } catch (error) {
      toast.error('Error al cargar los datos del formulario')
      console.error('Error:', error)
    } finally {
      setLoadingGestion(null)
    }
  }

  return (
    <div className={`${activeTab !== 'users' ? 'hidden' : ''}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Gestionar solicitud
          </h2>
          <p className="text-gray-500 text-sm">
            Administra y gestiona los usuarios con créditos pendientes
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
              placeholder="Buscar por cédula, nombre, correo o teléfono..."
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
                ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Fecha Solicitud
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Tipo ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Identificación
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Nombre Comprador
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Correo
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Teléfono
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Crédito Aprobado
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Gestión
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
                    <div className="text-sm text-gray-600">
                      {row.created_at
                        ? new Date(row.created_at).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })
                        : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {row.tipoId}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {row.identificacion}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {row.nombre_comprador}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">
                      {row.correo_comprador}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {row.telefono_comprador}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {row.credito_aprobado ? (
                      <div className="text-sm font-semibold text-green-600">
                        ${Number(row.credito_aprobado).toLocaleString()}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 italic">
                        No especificado
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${
                        row.negado
                          ? 'bg-red-100 text-red-800'
                          : row.gestionado && !row.negado
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {row.gestionado && !row.negado && (
                        <CheckCircle2 size={14} className="mr-1" />
                      )}
                      {row.negado && <XCircle size={14} className="mr-1" />}
                      {row.negado
                        ? 'Negado'
                        : row.gestionado && !row.negado
                        ? 'Aprobado'
                        : 'Pendiente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleGestionar(row)}
                        disabled={
                          row.gestionado ||
                          row.negado ||
                          loadingGestion === row.id
                        }
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                          row.gestionado || row.negado
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : loadingGestion === row.id
                            ? 'bg-primary/70 text-white cursor-wait'
                            : 'bg-primary hover:bg-primarydark text-white hover:scale-105'
                        }`}
                      >
                        {loadingGestion === row.id ? (
                          <span className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                            Cargando...
                          </span>
                        ) : row.gestionado || row.negado ? (
                          'Gestionado'
                        ) : (
                          <span className="flex items-center">
                            <UserCheck size={16} className="mr-1" />
                            Gestionar
                          </span>
                        )}
                      </button>
                      {!row.gestionado && !row.negado && onOpenNegarModal && (
                        <button
                          onClick={() => {
                            if (onOpenNegarModal) {
                              onOpenNegarModal(
                                row.id,
                                row.correo_comprador,
                                row.nombre_comprador
                              )
                            } else if (onNegarSolicitud) {
                              // Fallback si no hay modal
                              if (
                                window.confirm(
                                  '¿Está seguro de que desea negar esta solicitud?'
                                )
                              ) {
                                onNegarSolicitud(row.id, row.correo_comprador)
                              }
                            }
                          }}
                          disabled={loadingGestion === row.id}
                          className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 bg-red-500 hover:bg-red-600 text-white hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="flex items-center">
                            <XCircle size={16} className="mr-1" />
                            Negar
                          </span>
                        </button>
                      )}
                    </div>
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

export default TableViewUsers
