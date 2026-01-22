import { useEffect, useState } from 'react'
import { Search, Plus, Edit, Trash2, X, Save } from 'lucide-react'
import {
  getGestores,
  createGestor,
  updateGestor,
  deleteGestor,
  Gestor,
} from '../../services/supabase/gestores'
import { getBancos, Banco } from '../../services/supabase/banks'
import {
  getAliadosComerciales,
  AliadoComercial,
} from '../../services/supabase/aliados-comerciales'
import {
  getDepartments,
  getMunicipalities,
} from '../../services/azure/location'
import { Department, Municipality } from '../../interfaces/location.interfaces'
import Loader from '../ui/loader'
import InputText from '../ui/input'
import SelectInput from '../ui/select-map'
import InputCheck from '../ui/checkbox'
import { toast } from 'react-hot-toast'

export default function GestoresManagement() {
  const [gestores, setGestores] = useState<Gestor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formLoading, setFormLoading] = useState(false)

  // Selects data
  const [bancos, setBancos] = useState<Banco[]>([])
  const [aliados, setAliados] = useState<AliadoComercial[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [municipalities, setMunicipalities] = useState<Municipality[]>([])

  // Form state
  const [formData, setFormData] = useState<Omit<Gestor, 'id_gestor'>>({
    naturaleza_juridica: 0, // Por defecto Natural
    tipo_identificacion: 'CC',
    num_identificacion: '',
    digito_verificacion: '',
    razon_social: '',
    direccion: '',
    telefono: '',
    email: '',
    ciudad: '',
    departamento: '',
    pais: 'Colombia',
    longitud: '',
    latitud: '',
    representante_legal: '',
    nombre_contacto: '',
    telefono_contacto: '',
    id_banco: 0,
    tipo_cuenta: 'Corriente',
    numero_cuenta_bancaria: '',
    documentos: false,
    estado_gestor: true,
    habilitado_operar: true,
    id_aliado: 0,
  })

  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>('')
  const [selectedCityName, setSelectedCityName] = useState<string>('')

  const [representanteLegalIgual, setRepresentanteLegalIgual] = useState(false)
  // const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    loadGestores()
    loadSelectsData()
  }, [])

  const loadGestores = async () => {
    setLoading(true)
    try {
      const result = await getGestores()
      // Aplicar trim() a todos los campos de texto al cargar desde la base de datos
      const cleanedGestores = result.data.map((gestor) => ({
        ...gestor,
        tipo_identificacion: gestor.tipo_identificacion?.trim() || '',
        num_identificacion: gestor.num_identificacion?.trim() || '',
        digito_verificacion: gestor.digito_verificacion?.trim() || '',
        razon_social: gestor.razon_social?.trim() || '',
        direccion: gestor.direccion?.trim() || '',
        telefono: gestor.telefono?.trim() || '',
        email: gestor.email?.trim() || '',
        ciudad: gestor.ciudad?.trim() || '',
        departamento: gestor.departamento?.trim() || '',
        pais: gestor.pais?.trim() || 'Colombia',
        longitud: gestor.longitud?.trim() || '',
        latitud: gestor.latitud?.trim() || '',
        representante_legal: gestor.representante_legal?.trim() || '',
        nombre_contacto: gestor.nombre_contacto?.trim() || '',
        telefono_contacto: gestor.telefono_contacto?.trim() || '',
        tipo_cuenta: gestor.tipo_cuenta?.trim() || '',
        numero_cuenta_bancaria: gestor.numero_cuenta_bancaria?.trim() || '',
      }))
      setGestores(cleanedGestores)
    } catch (error) {
      console.error('Error cargando gestores:', error)
      toast.error('Error al cargar los gestores')
      setGestores([])
    } finally {
      setLoading(false)
    }
  }

  const loadSelectsData = async () => {
    try {
      const [bancosData, aliadosData, departmentsData] = await Promise.all([
        getBancos(),
        getAliadosComerciales(),
        getDepartments(),
      ])
      setBancos(bancosData)
      setAliados(aliadosData)
      setDepartments(departmentsData)
    } catch (error) {
      console.error('Error cargando datos de selects:', error)
      toast.error('Error al cargar datos adicionales')
    }
  }

  const loadMunicipalitiesByDepartment = async (departamentoId: string) => {
    try {
      if (
        !departamentoId ||
        departamentoId === '' ||
        departamentoId === 'Selecciona'
      ) {
        setMunicipalities([])
        return
      }
      const muns = await getMunicipalities(departamentoId)
      setMunicipalities(muns)
    } catch (error) {
      console.error('Error cargando municipios:', error)
      toast.error('Error al cargar municipios')
      setMunicipalities([])
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    if (name === 'departamento') {
      // Guardar el nombre del departamento, no el ID
      const selectedDept = departments.find((d) => d.id === value)
      const deptName = selectedDept?.nombre || ''
      setSelectedDepartmentId(value)
      setFormData((prev) => ({ ...prev, departamento: deptName, ciudad: '' }))
      setSelectedCityName('')
      loadMunicipalitiesByDepartment(value)
    } else if (name === 'ciudad') {
      // Guardar el nombre de la ciudad
      setSelectedCityName(value)
      setFormData((prev) => ({ ...prev, ciudad: value }))
    } else if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleRepresentanteLegalChange = (checked: boolean) => {
    setRepresentanteLegalIgual(checked)
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        representante_legal: prev.razon_social,
        nombre_contacto: prev.razon_social,
        telefono_contacto: prev.telefono,
      }))
    }
  }

  // Actualizar representante legal cuando cambia razon_social o telefono
  useEffect(() => {
    if (representanteLegalIgual) {
      setFormData((prev) => ({
        ...prev,
        representante_legal: prev.razon_social,
        nombre_contacto: prev.razon_social,
        telefono_contacto: prev.telefono,
      }))
    }
  }, [formData.razon_social, formData.telefono, representanteLegalIgual])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)

    try {
      // Aplicar trim() a todos los campos de texto antes de guardar
      const cleanedFormData = {
        ...formData,
        num_identificacion: formData.num_identificacion.trim(),
        digito_verificacion: formData.digito_verificacion.trim(),
        razon_social: formData.razon_social.trim(),
        direccion: formData.direccion.trim(),
        telefono: formData.telefono.trim(),
        email: formData.email.trim(),
        ciudad: formData.ciudad.trim(),
        departamento: formData.departamento.trim(),
        pais: formData.pais.trim(),
        longitud: formData.longitud?.trim() || '',
        latitud: formData.latitud?.trim() || '',
        representante_legal: formData.representante_legal.trim(),
        nombre_contacto: formData.nombre_contacto.trim(),
        telefono_contacto: formData.telefono_contacto.trim(),
        tipo_cuenta: formData.tipo_cuenta.trim(),
        numero_cuenta_bancaria: formData.numero_cuenta_bancaria.trim(),
      }

      if (editingId) {
        await updateGestor(editingId, cleanedFormData)
        toast.success('Gestor actualizado correctamente')
      } else {
        await createGestor(cleanedFormData)
        toast.success('Gestor creado correctamente')
      }
      resetForm()
      loadGestores()
    } catch (error: any) {
      console.error('Error guardando gestor:', error)
      toast.error(error.message || 'Error al guardar el gestor')
    } finally {
      setFormLoading(false)
    }
  }

  const handleEdit = (gestor: Gestor) => {
    // Aplicar trim() a todos los campos de texto al cargar para editar
    setFormData({
      naturaleza_juridica: gestor.naturaleza_juridica,
      tipo_identificacion: gestor.tipo_identificacion?.trim() || '',
      num_identificacion: gestor.num_identificacion?.trim() || '',
      digito_verificacion: gestor.digito_verificacion?.trim() || '',
      razon_social: gestor.razon_social?.trim() || '',
      direccion: gestor.direccion?.trim() || '',
      telefono: gestor.telefono?.trim() || '',
      email: gestor.email?.trim() || '',
      ciudad: gestor.ciudad?.trim() || '',
      departamento: gestor.departamento?.trim() || '',
      pais: gestor.pais?.trim() || 'Colombia',
      longitud: gestor.longitud?.trim() || '',
      latitud: gestor.latitud?.trim() || '',
      representante_legal: gestor.representante_legal?.trim() || '',
      nombre_contacto: gestor.nombre_contacto?.trim() || '',
      telefono_contacto: gestor.telefono_contacto?.trim() || '',
      id_banco: gestor.id_banco,
      tipo_cuenta: gestor.tipo_cuenta?.trim() || '',
      numero_cuenta_bancaria: gestor.numero_cuenta_bancaria?.trim() || '',
      documentos: gestor.documentos,
      estado_gestor: gestor.estado_gestor,
      habilitado_operar: gestor.habilitado_operar,
      id_aliado: gestor.id_aliado,
    })

    // Buscar el ID del departamento basado en el nombre guardado
    const dept = departments.find((d) => d.nombre === gestor.departamento)
    const deptId = dept?.id || ''
    setSelectedDepartmentId(deptId)
    setSelectedCityName(gestor.ciudad)

    // Cargar municipios del departamento
    if (deptId) {
      loadMunicipalitiesByDepartment(deptId)
    }

    setRepresentanteLegalIgual(false)
    setEditingId(gestor.id_gestor || null)
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este gestor?')) {
      return
    }

    try {
      await deleteGestor(id)
      toast.success('Gestor eliminado correctamente')
      loadGestores()
    } catch (error) {
      console.error('Error eliminando gestor:', error)
      toast.error('Error al eliminar el gestor')
    }
  }

  const resetForm = () => {
    setFormData({
      naturaleza_juridica: 0, // Por defecto Natural
      tipo_identificacion: 'CC',
      num_identificacion: '',
      digito_verificacion: '',
      razon_social: '',
      direccion: '',
      telefono: '',
      email: '',
      ciudad: '',
      departamento: '',
      pais: 'Colombia',
      longitud: '',
      latitud: '',
      representante_legal: '',
      nombre_contacto: '',
      telefono_contacto: '',
      id_banco: 0,
      tipo_cuenta: 'Corriente',
      numero_cuenta_bancaria: '',
      documentos: false,
      estado_gestor: true,
      habilitado_operar: true,
      id_aliado: 0,
    })
    setSelectedDepartmentId('')
    setSelectedCityName('')
    setRepresentanteLegalIgual(false)
    setEditingId(null)
    setShowForm(false)
    setMunicipalities([])
  }

  // Filtrar gestores
  const filteredGestores = gestores.filter((gestor) => {
    const search = searchTerm.toLowerCase()
    return (
      gestor.razon_social?.toLowerCase().includes(search) ||
      gestor.num_identificacion?.toLowerCase().includes(search) ||
      gestor.email?.toLowerCase().includes(search) ||
      gestor.ciudad?.toLowerCase().includes(search) ||
      gestor.departamento?.toLowerCase().includes(search)
    )
  })

  return (
    <div className="space-y-6">
      {/* Header con búsqueda y botón agregar */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between lg:justify-between xl:justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar gestores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
              />
            </div>
            <button
              onClick={() => {
                resetForm()
                setShowForm(true)
              }}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primarydark transition-colors font-medium text-sm sm:text-base"
            >
              <Plus className="w-5 h-5" />
              Nuevo Gestor
            </button>
          </div>
        </div>

        {/* Formulario */}
        {showForm && (
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {editingId ? 'Editar Gestor' : 'Nuevo Gestor'}
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
                {/* Naturaleza Jurídica */}
                <SelectInput
                  label="Naturaleza Jurídica"
                  name="naturaleza_juridica"
                  value={String(formData.naturaleza_juridica ?? '')}
                  options={[
                    { code: 0, description: 'Natural' },
                    { code: 1, description: 'Jurídica' },
                  ]}
                  valueKey="code"
                  labelKey="description"
                  obligatory
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      naturaleza_juridica: Number(e.target.value) || 0,
                    }))
                  }
                />

                {/* Tipo Identificación */}
                <SelectInput
                  label="Tipo de Identificación"
                  name="tipo_identificacion"
                  value={formData.tipo_identificacion}
                  options={[
                    { code: 'CC', description: 'Cédula de Ciudadanía' },
                    { code: 'NI', description: 'NIT' },
                  ]}
                  valueKey="code"
                  labelKey="description"
                  obligatory
                  onChange={handleInputChange}
                />

                {/* Número Identificación */}
                <InputText
                  label="Número de Identificación"
                  name="num_identificacion"
                  value={formData.num_identificacion}
                  type="text"
                  obligatory
                  onChange={handleInputChange}
                  errorMessage={null}
                />

                {/* Dígito Verificación */}
                <InputText
                  label="Dígito de Verificación"
                  name="digito_verificacion"
                  value={formData.digito_verificacion}
                  type="text"
                  obligatory={false}
                  onChange={handleInputChange}
                  errorMessage={null}
                />

                {/* Razón Social */}
                <InputText
                  label="Razón Social"
                  name="razon_social"
                  value={formData.razon_social}
                  type="text"
                  obligatory
                  onChange={handleInputChange}
                  errorMessage={null}
                />

                {/* Dirección */}
                <InputText
                  label="Dirección"
                  name="direccion"
                  value={formData.direccion}
                  type="text"
                  obligatory
                  onChange={handleInputChange}
                  errorMessage={null}
                />

                {/* Teléfono */}
                <InputText
                  label="Teléfono"
                  name="telefono"
                  value={formData.telefono}
                  type="text"
                  obligatory
                  onChange={handleInputChange}
                  errorMessage={null}
                />

                {/* Email */}
                <InputText
                  label="Email"
                  name="email"
                  value={formData.email}
                  type="email"
                  obligatory
                  onChange={handleInputChange}
                  errorMessage={null}
                />

                {/* Departamento */}
                <SelectInput
                  label="Departamento"
                  name="departamento"
                  value={selectedDepartmentId || ''}
                  options={departments.map((department) => ({
                    id: department.id,
                    nombre: department.nombre.toUpperCase(),
                  }))}
                  valueKey="id"
                  labelKey="nombre"
                  obligatory
                  onChange={handleInputChange}
                />

                {/* Ciudad */}
                <SelectInput
                  label="Ciudad"
                  name="ciudad"
                  value={selectedCityName || ''}
                  //que la options sea por el nombre de la ciudad
                  options={municipalities.map((municipality) => ({
                    id: municipality.id,
                    nombre: municipality.nombre.toUpperCase().trim(),
                  }))}
                  valueKey="nombre"
                  labelKey="nombre"
                  obligatory
                  disabled={
                    !selectedDepartmentId ||
                    selectedDepartmentId === '' ||
                    selectedDepartmentId === 'Selecciona'
                  }
                  onChange={handleInputChange}
                />

                {/* País */}
                <InputText
                  label="País"
                  name="pais"
                  value={formData.pais}
                  type="text"
                  obligatory
                  disabled
                  onChange={handleInputChange}
                  errorMessage={null}
                />

                {/* Longitud */}
                <InputText
                  label="Longitud (Opcional)"
                  name="longitud"
                  value={formData.longitud || ''}
                  type="text"
                  obligatory={false}
                  onChange={handleInputChange}
                  errorMessage={null}
                />

                {/* Latitud */}
                <InputText
                  label="Latitud (Opcional)"
                  name="latitud"
                  value={formData.latitud || ''}
                  type="text"
                  obligatory={false}
                  onChange={handleInputChange}
                  errorMessage={null}
                />
              </div>

              {/* Representante Legal */}
              <div className="border-t pt-4">
                <h4 className="text-md font-semibold text-gray-700 mb-4">
                  Representante Legal
                </h4>
                <div className="mb-4">
                  <InputCheck
                    id="representanteLegalIgual"
                    checked={representanteLegalIgual}
                    onChange={(e) =>
                      handleRepresentanteLegalChange(e.target.checked)
                    }
                    label="Representante legal es el mismo gestor"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                  <InputText
                    label="Representante Legal"
                    name="representante_legal"
                    value={formData.representante_legal}
                    type="text"
                    obligatory
                    disabled={representanteLegalIgual}
                    onChange={handleInputChange}
                    errorMessage={null}
                  />
                  <InputText
                    label="Nombre Contacto"
                    name="nombre_contacto"
                    value={formData.nombre_contacto}
                    type="text"
                    obligatory
                    disabled={representanteLegalIgual}
                    onChange={handleInputChange}
                    errorMessage={null}
                  />
                  <InputText
                    label="Teléfono Contacto"
                    name="telefono_contacto"
                    value={formData.telefono_contacto}
                    type="text"
                    obligatory
                    disabled={representanteLegalIgual}
                    onChange={handleInputChange}
                    errorMessage={null}
                  />
                </div>
              </div>

              {/* Datos Bancarios */}
              <div className="border-t pt-4">
                <h4 className="text-md font-semibold text-gray-700 mb-4">
                  Datos Bancarios (Opcional)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                  <SelectInput
                    label="Banco"
                    name="id_banco"
                    value={formData.id_banco || ''}
                    options={bancos}
                    valueKey="id_banco"
                    labelKey="nombre_banco"
                    obligatory={false}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        id_banco: Number(e.target.value) || 0,
                      }))
                    }
                  />
                  <SelectInput
                    label="Tipo de Cuenta"
                    name="tipo_cuenta"
                    value={formData.tipo_cuenta}
                    options={[
                      { code: 'Ahorros', description: 'Ahorros' },
                      { code: 'Corriente', description: 'Corriente' },
                      { code: 'Bajo Monto', description: 'Bajo Monto' },
                    ]}
                    valueKey="code"
                    labelKey="description"
                    obligatory={false}
                    onChange={handleInputChange}
                  />
                  <InputText
                    label="Número de Cuenta"
                    name="numero_cuenta_bancaria"
                    value={formData.numero_cuenta_bancaria}
                    type="text"
                    obligatory={false}
                    onChange={handleInputChange}
                    errorMessage={null}
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="border-t pt-4">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                  <InputCheck
                    id="documentos"
                    checked={formData.documentos}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        documentos: e.target.checked,
                      }))
                    }
                    label="Documentos"
                  />
                  <InputCheck
                    id="estado_gestor"
                    checked={formData.estado_gestor}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        estado_gestor: e.target.checked,
                      }))
                    }
                    label="Estado Gestor"
                  />
                  <InputCheck
                    id="habilitado_operar"
                    checked={formData.habilitado_operar}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        habilitado_operar: e.target.checked,
                      }))
                    }
                    label="Habilitado para Operar"
                  />
                </div>
              </div>

              {/* Aliado */}
              <div className="border-t pt-4">
                <SelectInput
                  label="Aliado Comercial"
                  name="id_aliado"
                  value={formData.id_aliado || ''}
                  options={aliados}
                  valueKey="id_aliado"
                  labelKey="nombre_prestador"
                  obligatory
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      id_aliado: Number(e.target.value) || 0,
                    }))
                  }
                />
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
                  disabled={formLoading}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primarydark transition-colors disabled:opacity-50 min-w-[140px]"
                >
                  {formLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Guardando...
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

        {/* Tabla de Gestores */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Razón Social
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden sm:table-cell">
                  Identificación
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden lg:table-cell">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">
                  Ciudad
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden xl:table-cell">
                  Departamento
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <Loader />
                  </td>
                </tr>
              ) : filteredGestores.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No se encontraron gestores
                  </td>
                </tr>
              ) : (
                filteredGestores.map((gestor) => (
                  <tr
                    key={gestor.id_gestor}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {gestor.id_gestor}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {gestor.razon_social}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 hidden sm:table-cell">
                      {gestor.tipo_identificacion} {gestor.num_identificacion}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 hidden lg:table-cell">
                      {gestor.email}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 hidden md:table-cell">
                      {gestor.ciudad}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 hidden xl:table-cell">
                      {gestor.departamento}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          gestor.estado_gestor && gestor.habilitado_operar
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {gestor.estado_gestor && gestor.habilitado_operar
                          ? 'Activo'
                          : 'Inactivo'}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(gestor)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            gestor.id_gestor && handleDelete(gestor.id_gestor)
                          }
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
