import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import {
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Eye,
  Download,
} from 'lucide-react'
import {
  createCodigoPromo,
  updateCodigoPromo,
  deleteCodigoPromo,
  CodigoPromo,
} from '../../services/supabase/codigos-promo'
import { useDashboardCodigos } from '../../dashboard/useDashboardCodigos'
import { useDebouncedValue } from '../../dashboard/useDebouncedValue'
import { DASHBOARD_QUERY_KEYS } from '../../dashboard/constants'
import DashboardTableHeader from './DashboardTableHeader'
import DashboardTablePagination from './DashboardTablePagination'
import { getGestores, Gestor } from '../../services/supabase/gestores'
import { getProducts } from '../../services/supabase/products'
import { Product } from '../../interfaces/product.interface'
import Loader from '../ui/loader'
import InputText from '../ui/input'
import SelectInput from '../ui/select-map'
import InputCheck from '../ui/checkbox'
import { toast } from 'react-hot-toast'
import { useModal } from '../../contexts/modals'
import {
  generateQRCode,
  getDesignImagePath,
  generateDesignWithQR,
  downloadImage,
  buildPromoUrl,
} from '../../utils/qr-generator'

const SEARCH_DEBOUNCE_MS = 400

export default function CodigosManagement() {
  const queryClient = useQueryClient()
  const { openModal, closeModal, isModalOpen, getModalProps } = useModal()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formLoading, setFormLoading] = useState(false)
  const [generatingDesign, setGeneratingDesign] = useState(false)
  const [designCache, setDesignCache] = useState<Record<number, string>>({})
  const [originalCodigoData, setOriginalCodigoData] = useState<{
    id_producto: number
    cod_promo: string
  } | null>(null)

  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  const debouncedSearch = useDebouncedValue(searchTerm, SEARCH_DEBOUNCE_MS)

  useEffect(() => {
    if (searchTerm) setSearchParams({ page: '1' })
  }, [searchTerm])

  const { data: codigos, total: totalCodigos, isLoading, isFetching, refetch } = useDashboardCodigos(
    currentPage,
    debouncedSearch
  )
  const loading = isLoading || isFetching

  const [gestores, setGestores] = useState<Gestor[]>([])
  const [productos, setProductos] = useState<Product[]>([])

  const [formData, setFormData] = useState<
    Omit<CodigoPromo, 'id_codigo' | 'created_at'>
  >({
    cod_promo: '',
    procentaje_descuento: 0,
    fecha_inicio: '',
    fecha_fin: '',
    compra_maxima: 0,
    cuenta_compra: 0,
    estado: true,
    id_prod_pago: 0,
    id_producto: 0,
    id_gestor: 0,
    porcentaje_gestor: 0,
  })

  useEffect(() => {
    loadSelectsData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() })
  }

  const invalidateCodigos = () => {
    queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEYS.codigos })
    refetch()
  }

  const loadSelectsData = async () => {
    try {
      const [gestoresResponse, productosData] = await Promise.all([
        getGestores(),
        getProducts(),
      ])
      setGestores(gestoresResponse.data)
      setProductos(productosData)
    } catch (error) {
      console.error('Error cargando datos de selects:', error)
      toast.error('Error al cargar datos adicionales')
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    if (name === 'id_producto') {
      // Cuando cambia el producto, actualizar también id_prod_pago
      setFormData((prev) => ({
        ...prev,
        id_producto: Number(value) || 0,
        id_prod_pago: Number(value) || 0,
      }))
    } else if (name === 'id_gestor') {
      // Cuando cambia el gestor, mantener el porcentaje actual o usar 0
      setFormData((prev) => ({
        ...prev,
        id_gestor: Number(value) || 0,
        // porcentaje_gestor se mantiene o se puede editar manualmente
      }))
    } else if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else if (type === 'number') {
      setFormData((prev) => ({ ...prev, [name]: Number(value) || 0 }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const generateQRAndDesign = async (
    codigo: Omit<CodigoPromo, 'id_codigo' | 'created_at'>,
    nombreGestor?: string
  ): Promise<string> => {
    try {
      // Construir URL
      const promoUrl = buildPromoUrl(codigo.id_producto, codigo.cod_promo)

      // Generar QR
      const qrDataUrl = await generateQRCode(promoUrl, {
        colorDark: 'rgb(74, 74, 74)',
        colorLight: 'rgb(255, 255, 255)',
        dotsType: 'rounded',
        cornersSquareType: 'extra-rounded',
        cornersDotType: 'dot',
        imagePath: '/M9.png',
        imageSize: 200,
        margin: 10,
      })

      // Obtener ruta del diseño según porcentaje
      const designPath = getDesignImagePath(codigo.procentaje_descuento)

      // Plasmar QR en diseño (código y nombre del gestor debajo)
      const designWithQR = await generateDesignWithQR(
        qrDataUrl,
        designPath,
        codigo.cod_promo,
        undefined,
        nombreGestor
      )

      return designWithQR
    } catch (error) {
      console.error('Error generando QR y diseño:', error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)

    try {
      // Guardar solo los datos de la tabla (sin imagen_diseno)
      // Aplicar trim() al código promocional antes de guardar
      const dataToSave = {
        cod_promo: formData.cod_promo.trim(),
        procentaje_descuento: formData.procentaje_descuento,
        fecha_inicio: formData.fecha_inicio,
        fecha_fin: formData.fecha_fin,
        compra_maxima: formData.compra_maxima,
        cuenta_compra: formData.cuenta_compra,
        estado: formData.estado,
        id_prod_pago: formData.id_prod_pago,
        id_producto: formData.id_producto,
        id_gestor: formData.id_gestor,
        porcentaje_gestor: formData.porcentaje_gestor,
      }

      if (editingId) {
        // Verificar si cambió el producto o el código promocional
        const productoCambio =
          originalCodigoData?.id_producto !== formData.id_producto
        const codigoCambio =
          originalCodigoData?.cod_promo !== formData.cod_promo
        const debeRegenerarDiseño = productoCambio || codigoCambio

        await updateCodigoPromo(editingId, dataToSave)
        toast.success('Código promocional actualizado correctamente')

        // Solo generar QR y diseño si cambió el producto o el código
        if (debeRegenerarDiseño) {
          setGeneratingDesign(true)
          try {
            const designDataUrl = await generateQRAndDesign(
              formData,
              gestores.find((g) => g.id_gestor === formData.id_gestor)
                ?.razon_social
            )
            setDesignCache((prev) => ({
              ...prev,
              [editingId]: designDataUrl,
            }))
            toast.success('Diseño regenerado correctamente')
          } catch (error) {
            console.error('Error generando diseño:', error)
            toast.error(
              'Error al regenerar el diseño, pero el código se actualizó correctamente'
            )
          } finally {
            setGeneratingDesign(false)
          }
        }
      } else {
        // Al crear, siempre generar el diseño después de guardar
        await createCodigoPromo(dataToSave)
        toast.success('Código promocional creado correctamente')

        // Recargar para obtener el ID del código creado
        invalidateCodigos()

        // El diseño se generará automáticamente cuando se visualice el código
        // o cuando se cargue en el cache si es necesario
      }

      resetForm()
      if (!editingId) {
        // Al crear, ir a la primera página para ver el nuevo código
        setSearchParams({ page: '1' })
        invalidateCodigos()
      } else {
        // Al editar, mantener la página actual
        invalidateCodigos()
      }
    } catch (error: unknown) {
      console.error('Error guardando código:', error)
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Error al guardar el código promocional'
      toast.error(errorMessage)
    } finally {
      setFormLoading(false)
      setGeneratingDesign(false)
    }
  }

  const handleEdit = (codigo: CodigoPromo) => {
    // Aplicar trim() al código promocional al cargar para editar
    const codigoPromoTrimmed = codigo.cod_promo?.trim() || ''

    setFormData({
      cod_promo: codigoPromoTrimmed,
      procentaje_descuento: codigo.procentaje_descuento,
      fecha_inicio: codigo.fecha_inicio,
      fecha_fin: codigo.fecha_fin,
      compra_maxima: codigo.compra_maxima,
      cuenta_compra: codigo.cuenta_compra,
      estado: codigo.estado,
      id_prod_pago: codigo.id_prod_pago,
      id_producto: codigo.id_producto,
      id_gestor: codigo.id_gestor,
      porcentaje_gestor: codigo.porcentaje_gestor,
    })

    // Guardar los valores originales del producto y código para comparar después (con trim)
    setOriginalCodigoData({
      id_producto: codigo.id_producto,
      cod_promo: codigoPromoTrimmed,
    })

    // Si ya hay diseño en cache, mantenerlo
    if (codigo.id_codigo && designCache[codigo.id_codigo]) {
      // El diseño ya está en cache, no necesita regenerarse a menos que cambie producto/código
    }

    setEditingId(codigo.id_codigo || null)
    setShowForm(true)
  }

  const handleViewDetail = async (codigo: CodigoPromo) => {
    // Abrir modal usando useModal
    openModal('codigoDetail', { codigo })

    // Si no hay diseño en cache, generarlo
    if (codigo.id_codigo && !designCache[codigo.id_codigo]) {
      try {
        setGeneratingDesign(true)
        const designDataUrl = await generateQRAndDesign(
          codigo,
          gestores.find((g) => g.id_gestor === codigo.id_gestor)?.razon_social
        )
        setDesignCache((prev) => ({
          ...prev,
          [codigo.id_codigo!]: designDataUrl,
        }))
      } catch (error) {
        console.error('Error generando diseño:', error)
        toast.error('Error al generar el diseño')
      } finally {
        setGeneratingDesign(false)
      }
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este código promocional?')) {
      return
    }

    try {
      await deleteCodigoPromo(id)
      toast.success('Código promocional eliminado correctamente')

      // Limpiar cache del diseño si existe
      setDesignCache((prev) => {
        const newCache = { ...prev }
        delete newCache[id]
        return newCache
      })

      // Recargar códigos manteniendo la página actual
        invalidateCodigos()
    } catch (error) {
      console.error('Error eliminando código:', error)
      toast.error('Error al eliminar el código promocional')
    }
  }

  const resetForm = () => {
    setFormData({
      cod_promo: '',
      procentaje_descuento: 0,
      fecha_inicio: '',
      fecha_fin: '',
      compra_maxima: 0,
      cuenta_compra: 0,
      estado: true,
      id_prod_pago: 0,
      id_producto: 0,
      id_gestor: 0,
      porcentaje_gestor: 0,
    })
    setEditingId(null)
    setOriginalCodigoData(null)
    setShowForm(false)
  }

  const handleDownloadDesign = async (codigo: CodigoPromo) => {
    try {
      let designDataUrl = ''

      // Buscar en cache primero
      if (codigo.id_codigo && designCache[codigo.id_codigo]) {
        designDataUrl = designCache[codigo.id_codigo]
      } else {
        // Generar si no está en cache
        setGeneratingDesign(true)
        designDataUrl = await generateQRAndDesign(
          codigo,
          gestores.find((g) => g.id_gestor === codigo.id_gestor)?.razon_social
        )
        if (codigo.id_codigo) {
          setDesignCache((prev) => ({
            ...prev,
            [codigo.id_codigo!]: designDataUrl,
          }))
        }
      }

      const filename = `codigo-${codigo.cod_promo}-${new Date().getTime()}.png`
      downloadImage(designDataUrl, filename)
      toast.success('Diseño descargado correctamente')
    } catch (error) {
      console.error('Error descargando diseño:', error)
      toast.error('Error al generar/descargar el diseño')
    } finally {
      setGeneratingDesign(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <DashboardTableHeader
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Buscar por código, producto o gestor..."
          right={
            <button
              onClick={() => {
                resetForm()
                setShowForm(true)
              }}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primarydark transition-colors font-medium text-sm sm:text-base"
            >
              <Plus className="w-5 h-5" />
              Nuevo Código
            </button>
          }
        />

        {/* Formulario */}
        {showForm && (
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {editingId
                  ? 'Editar Código Promocional'
                  : 'Nuevo Código Promocional'}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {/* Código Promocional */}
                <InputText
                  label="Código Promocional"
                  name="cod_promo"
                  value={formData.cod_promo}
                  type="text"
                  obligatory
                  onChange={handleInputChange}
                  errorMessage={null}
                />

                {/* Porcentaje Descuento */}
                <div>
                  <label className="block text-gray-700 font-medium text-xs">
                    <span className="text-red-600">*</span> Porcentaje Descuento
                  </label>
                  <input
                    type="number"
                    name="procentaje_descuento"
                    value={formData.procentaje_descuento.toString()}
                    step="0.01"
                    onChange={handleInputChange}
                    className="w-full px-3 py-1.5 text-xs rounded-lg focus:ring-1 focus:ring-primary focus:outline-none hover:shadow-md transition-all bg-white border-2 border-gray-300"
                  />
                </div>

                {/* Fecha Inicio */}
                <InputText
                  label="Fecha Inicio"
                  name="fecha_inicio"
                  value={formData.fecha_inicio}
                  type="date"
                  obligatory
                  onChange={handleInputChange}
                  errorMessage={null}
                />

                {/* Fecha Fin */}
                <InputText
                  label="Fecha Fin"
                  name="fecha_fin"
                  value={formData.fecha_fin}
                  type="date"
                  obligatory
                  onChange={handleInputChange}
                  errorMessage={null}
                />

                {/* Compra Máxima */}
                <InputText
                  label="Compra Máxima"
                  name="compra_maxima"
                  value={formData.compra_maxima.toString()}
                  type="number"
                  obligatory
                  onChange={handleInputChange}
                  errorMessage={null}
                />

                {/* Producto */}
                <SelectInput
                  label="Producto"
                  name="id_producto"
                  value={formData.id_producto || ''}
                  options={productos}
                  valueKey="id_producto"
                  labelKey="nombre"
                  obligatory
                  onChange={handleInputChange}
                />

                {/* Gestor */}
                <SelectInput
                  label="Gestor"
                  name="id_gestor"
                  value={formData.id_gestor || ''}
                  options={gestores}
                  valueKey="id_gestor"
                  labelKey="razon_social"
                  obligatory
                  onChange={handleInputChange}
                />

                {/* Porcentaje Gestor */}
                <div>
                  <label className="block text-gray-700 font-medium text-xs">
                    <span className="text-red-600">*</span> Porcentaje Gestor
                  </label>
                  <input
                    type="number"
                    name="porcentaje_gestor"
                    value={formData.porcentaje_gestor.toString()}
                    step="0.01"
                    onChange={handleInputChange}
                    className="w-full px-3 py-1.5 text-xs rounded-lg focus:ring-1 focus:ring-primary focus:outline-none hover:shadow-md transition-all bg-white border-2 border-gray-300"
                  />
                </div>

                {/* Estado */}
                <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg">
                  <InputCheck
                    id="estado"
                    checked={formData.estado}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        estado: e.target.checked,
                      }))
                    }
                    label="Estado Activo"
                  />
                </div>
              </div>

              {/* Botones */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={formLoading || generatingDesign}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primarydark transition-colors disabled:opacity-50 min-w-[140px]"
                >
                  {formLoading || generatingDesign ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {generatingDesign
                        ? 'Generando diseño...'
                        : 'Guardando...'}
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      {editingId ? 'Actualizar' : 'Guardar'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tabla de Códigos */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Código
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  % Desc.
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Cuenta Compra
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Gestor
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  % Gestor
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Fechas
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {loading ? (
                <tr>
                  <td colSpan={10} className="px-6 py-12 text-center">
                    <Loader />
                  </td>
                </tr>
              ) : codigos.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No se encontraron códigos promocionales
                  </td>
                </tr>
              ) : (
                codigos.map((codigo) => {
                  const producto = productos.find(
                    (p) => p.id_producto === codigo.id_producto
                  )
                  const gestor = gestores.find(
                    (g) => g.id_gestor === codigo.id_gestor
                  )
                  return (
                    <tr
                      key={codigo.id_codigo}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="whitespace-nowrap px-3 py-3 text-sm font-medium text-gray-900">
                        {codigo.id_codigo}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-900">
                        {codigo.cod_promo}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-600">
                        {codigo.procentaje_descuento}%
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-600">
                        {codigo.cuenta_compra || 0}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-600">
                        <div
                          className="max-w-xs truncate"
                          title={producto?.nombre || 'N/A'}
                        >
                          {producto?.nombre || 'N/A'}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-600">
                        <div
                          className="max-w-xs truncate"
                          title={gestor?.razon_social || 'N/A'}
                        >
                          {gestor?.razon_social || 'N/A'}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-600">
                        {codigo.porcentaje_gestor}%
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-600">
                        <div className="text-xs">
                          <div>
                            Inicio:{' '}
                            {new Date(codigo.fecha_inicio).toLocaleDateString()}
                          </div>
                          <div>
                            Fin:{' '}
                            {new Date(codigo.fecha_fin).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            codigo.estado
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {codigo.estado ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewDetail(codigo)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            title="Ver detalle"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(codigo)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            title="Editar"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              codigo.id_codigo && handleDelete(codigo.id_codigo)
                            }
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <DashboardTablePagination
          currentPage={currentPage}
          totalItems={totalCodigos}
          onPageChange={handlePageChange}
          isLoading={loading}
        />
      </div>

      {/* Modal de Detalle */}
      {isModalOpen('codigoDetail') &&
        (() => {
          const modalProps = getModalProps<{ codigo: CodigoPromo }>(
            'codigoDetail'
          )
          const selectedCodigo = modalProps?.codigo

          if (!selectedCodigo) return null

          return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header minimalista */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {selectedCodigo.cod_promo}
                  </h3>
                  <button
                    onClick={() => closeModal('codigoDetail')}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Contenido: Dos columnas */}
                <div className="flex-1 overflow-y-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 p-6">
                    {/* Columna Izquierda: Información */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                          Información
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-start py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-500">
                              Código
                            </span>
                            <span className="text-sm font-medium text-gray-900 text-right">
                              {selectedCodigo.cod_promo}
                            </span>
                          </div>
                          <div className="flex justify-between items-start py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-500">
                              Descuento
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {selectedCodigo.procentaje_descuento}%
                            </span>
                          </div>
                          <div className="flex justify-between items-start py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-500">
                              Fecha Inicio
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {new Date(
                                selectedCodigo.fecha_inicio
                              ).toLocaleDateString('es-CO')}
                            </span>
                          </div>
                          <div className="flex justify-between items-start py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-500">
                              Fecha Fin
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {new Date(
                                selectedCodigo.fecha_fin
                              ).toLocaleDateString('es-CO')}
                            </span>
                          </div>
                          <div className="flex justify-between items-start py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-500">
                              Compra Máxima
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {selectedCodigo.compra_maxima}
                            </span>
                          </div>
                          <div className="flex justify-between items-start py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-500">
                              Cuenta Compra
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {selectedCodigo.cuenta_compra}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-500">
                              Estado
                            </span>
                            <span
                              className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                                selectedCodigo.estado
                                  ? 'bg-green-50 text-green-700'
                                  : 'bg-red-50 text-red-700'
                              }`}
                            >
                              {selectedCodigo.estado ? 'Activo' : 'Inactivo'}
                            </span>
                          </div>
                          {selectedCodigo.id_producto && (
                            <div className="flex justify-between items-start py-2 border-b border-gray-100">
                              <span className="text-sm text-gray-500">
                                Producto
                              </span>
                              <span className="text-sm font-medium text-gray-900 text-right max-w-xs">
                                {productos.find(
                                  (p) =>
                                    p.id_producto === selectedCodigo.id_producto
                                )?.nombre || 'N/A'}
                              </span>
                            </div>
                          )}
                          {selectedCodigo.id_gestor && (
                            <div className="flex justify-between items-start py-2 border-b border-gray-100">
                              <span className="text-sm text-gray-500">
                                Gestor
                              </span>
                              <span className="text-sm font-medium text-gray-900 text-right max-w-xs">
                                {gestores.find(
                                  (g) =>
                                    g.id_gestor === selectedCodigo.id_gestor
                                )?.razon_social || 'N/A'}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between items-start py-2">
                            <span className="text-sm text-gray-500">
                              Porcentaje Gestor
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {selectedCodigo.porcentaje_gestor}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Columna Derecha: Diseño con QR */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                          Diseño
                        </h4>
                        <button
                          onClick={() => handleDownloadDesign(selectedCodigo)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primarydark transition-colors text-xs font-medium"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Descargar
                        </button>
                      </div>
                      {generatingDesign ? (
                        <div className="w-full h-[400px] border border-gray-200 rounded-lg bg-gray-50 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                            <p className="text-xs text-gray-500">
                              Generando diseño...
                            </p>
                          </div>
                        </div>
                      ) : selectedCodigo.id_codigo &&
                        designCache[selectedCodigo.id_codigo] ? (
                        <div className="w-full border border-gray-200 rounded-lg p-4 bg-gray-50 flex items-center justify-center overflow-hidden">
                          <img
                            src={designCache[selectedCodigo.id_codigo]}
                            alt={`Diseño código ${selectedCodigo.cod_promo}`}
                            className="max-w-full h-auto rounded-lg"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-[400px] border border-gray-200 rounded-lg bg-gray-50 flex items-center justify-center text-center p-6">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">
                              No hay diseño disponible
                            </p>
                            <p className="text-xs text-gray-400">
                              El diseño se generará automáticamente
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })()}
    </div>
  )
}
