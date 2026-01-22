import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, LogOut, UserCheck, CreditCard } from 'lucide-react'
import { toast } from 'react-hot-toast'
import {
  getAuthorizationData,
  registerAuthorizationData,
  sendEmailAuthorization,
  sendEmailNegacionCredito,
} from '../services/supabase/manage-credit'
import {
  getGestionUsuarioCredito,
  GestionUsuarioCreditoResponse,
  updateGestionadoByIdentificacion,
  negarSolicitudCredito,
} from '../services/supabase/manage-user-credit'
import FormView from '../components/manage-credit/form-view'
import TableView from '../components/manage-credit/table-view'
import TableViewUsers from '../components/manage-credit/table-view-users'
import NotificationBadge from '../components/manage-credit/notification-badge'
import { supabase } from '../services/supabase/client/create-client'
import Loader from '../components/ui/loader'
import LayoutSecondary from '../layouts/layout-secondary'
import { useRealtimeCreditNotifications } from '../hooks/useRealtimeCreditNotifications'
import { useModal } from '../contexts/modals'
import ConfirmNegarModal from '../components/manage-credit/confirm-negar-modal'

const ITEMS_PER_PAGE = 20

interface UsuarioData {
  identificacion_usuario: string
  codigo_credito: string
  fecha_aprobacion: string
  nombre_usuario?: string
  correo_usuario?: string
  correo_comprador?: string
}

export default function Dashboard() {
  const { isModalOpen, openModal, closeModal, getModalProps } = useModal()
  const [activeTab, setActiveTab] = useState('table')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchTermUsers, setSearchTermUsers] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingPage, setLoadingPage] = useState(false)
  const [loadingPageUsers, setLoadingPageUsers] = useState(false)
  const [data, setData] = useState<UsuarioData[]>([])
  const [dataUsers, setDataUsers] = useState<GestionUsuarioCreditoResponse[]>(
    []
  )
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageUsers, setCurrentPageUsers] = useState(1)
  const [initialNonGestionadosCount, setInitialNonGestionadosCount] =
    useState(0)
  const [formData, setFormData] = useState<{
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
  }>({
    identificacion_usuario: '',
    id_producto: '',
    codigo_plataforma_credito: '',
    valor_aprobado: '',
    fecha_aprobacion: '',
    codigo_credito: '',
    cod_usua_ingresa: '',
    correo_comprador: '',
    isGestionMode: false, // Flag para indicar si está en modo gestión
    id_gestion: undefined,
  })
  const navigate = useNavigate()

  const cerrarSesion = async () => {
    const { error } = await supabase.auth.signOut()

    if (!error) {
      toast.success('Sesión cerrada correctamente 👋')
      navigate('/iniciar-sesion')
    } else {
      toast.error('Error al cerrar sesión')
      console.error('Error al cerrar sesión:', error.message)
    }
  }

  useEffect(() => {
    const obtenerUID = async () => {
      const { data } = await supabase.auth.getSession()
      const uid = data?.session?.user?.id
      if (uid) {
        setFormData((prev) => ({
          ...prev,
          cod_usua_ingresa: uid,
        }))
      }
    }

    obtenerUID()
  }, [])

  const getData = async () => {
    setLoadingPage(true)
    const response = await getAuthorizationData()
    setData(response!.data || [])
    setLoadingPage(false)
  }

  const getDataUsers = async () => {
    setLoadingPageUsers(true)
    const response = await getGestionUsuarioCredito()
    const users = response?.data || []
    setDataUsers(users)

    // Calcular el número de registros no gestionados para el contador inicial
    const nonGestionadosCount = users.filter((user) => !user.gestionado).length
    setInitialNonGestionadosCount(nonGestionadosCount)

    setLoadingPageUsers(false)
  }

  // Notificaciones en tiempo real
  const { newRecordsCount, resetNotificationCount } =
    useRealtimeCreditNotifications({
      initialCount: initialNonGestionadosCount,
      onNewNotification: (newRecord) => {
        console.log('Nueva notificación recibida:', newRecord)
        // Actualizar la lista cuando llegue una nueva notificación
        getDataUsers()
        toast.success(
          `Nueva solicitud de crédito: ${newRecord.nombre_comprador}`,
          {
            icon: '🔔',
            duration: 5000,
          }
        )
      },
      onUpdate: () => {
        // Actualizar la lista cuando se actualice un registro
        getDataUsers()
      },
    })

  useEffect(() => {
    getData()
    getDataUsers()
  }, [])

  const filteredData = useMemo(() => {
    if (!data) return []

    const lowerSearch = searchTerm.toLowerCase()

    return data.filter(
      (item) =>
        item.identificacion_usuario?.toLowerCase().includes(lowerSearch) ||
        item.codigo_credito?.toLowerCase().includes(lowerSearch)
    )
    // Ya viene ordenado por fecha_aprobacion desc desde la API
  }, [data, searchTerm])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return filteredData.slice(startIndex, endIndex)
  }, [filteredData, currentPage])

  const filteredDataUsers = useMemo(() => {
    if (!dataUsers) return []

    const lowerSearch = searchTermUsers.toLowerCase()

    const filtered = dataUsers.filter(
      (item) =>
        item.identificacion?.toString().includes(lowerSearch) ||
        item.nombre_comprador?.toLowerCase().includes(lowerSearch) ||
        item.correo_comprador?.toLowerCase().includes(lowerSearch) ||
        item.telefono_comprador?.toString().includes(lowerSearch)
    )

    // Ordenar primero por estado: Pendientes, Aprobado, Negados
    const orderByStatus = (item: GestionUsuarioCreditoResponse): number => {
      if (item.negado) return 3 // Negados
      if (!item.gestionado && !item.negado) return 1 // Pendientes
      if (item.gestionado && !item.negado) return 2 // Aprobado
      return 1 // Por defecto pendiente
    }

    // Ordenar por estado y luego mantener el orden por fecha (más antiguo primero)
    return filtered.sort((a, b) => {
      const statusA = orderByStatus(a)
      const statusB = orderByStatus(b)
      if (statusA !== statusB) {
        return statusA - statusB
      }
      // Si tienen el mismo estado, mantener orden por fecha (created_at descendente - más reciente primero)
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0
      return dateB - dateA // Invertido para orden descendente
    })
  }, [dataUsers, searchTermUsers])

  const paginatedDataUsers = useMemo(() => {
    const startIndex = (currentPageUsers - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return filteredDataUsers.slice(startIndex, endIndex)
  }, [filteredDataUsers, currentPageUsers])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  useEffect(() => {
    setCurrentPageUsers(1)
  }, [searchTermUsers])

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    const camposRequeridos = [
      'identificacion_usuario',
      'id_producto',
      'codigo_plataforma_credito',
      'valor_aprobado',
      'fecha_aprobacion',
      'codigo_credito',
    ] as const

    const hayCamposVacios = camposRequeridos.some((campo) => {
      const valor = formData[campo]
      if (valor === null || valor === undefined) return true
      const valorString = String(valor)
      return !valorString || valorString.trim() === ''
    })

    if (hayCamposVacios) {
      toast.error('Por favor, complete todos los campos obligatorios.')
      setLoading(false)
      return
    }

    // Remover separadores de miles del valor_aprobado antes de validar
    const valorAprobadoString = String(formData.valor_aprobado || '').trim()
    const valorAprobadoNumerico = valorAprobadoString.replace(/\D/g, '')

    if (
      !valorAprobadoNumerico ||
      isNaN(Number(valorAprobadoNumerico)) ||
      Number(valorAprobadoNumerico) <= 0
    ) {
      toast.error('El valor aprobado debe ser un número mayor que cero.')
      setLoading(false)
      return
    }
    // Obtener el nombre_comprador de la solicitud para guardarlo como nombre_usuario
    const userToUpdate = dataUsers.find(
      (u) => u.identificacion.toString() === formData.identificacion_usuario
    )

    // Agregar nombre_usuario al formData antes de guardar y remover separadores de miles
    // Excluir isGestionMode ya que es solo un flag del frontend
    const formDataWithNombre: {
      identificacion_usuario: string
      id_producto: string
      codigo_plataforma_credito: string
      valor_aprobado: string
      fecha_aprobacion: string
      codigo_credito: string
      cod_usua_ingresa: string
      correo_comprador: string
      nombre_usuario: string
      id_gestion?: number
    } = {
      identificacion_usuario: formData.identificacion_usuario,
      id_producto: formData.id_producto,
      codigo_plataforma_credito: formData.codigo_plataforma_credito,
      valor_aprobado: valorAprobadoNumerico, // Guardar sin formato
      fecha_aprobacion: formData.fecha_aprobacion,
      codigo_credito: formData.codigo_credito,
      cod_usua_ingresa: formData.cod_usua_ingresa,
      correo_comprador: formData.correo_comprador,
      nombre_usuario: userToUpdate?.nombre_comprador || '',
    }

    // Incluir id_gestion solo si existe (cuando se gestiona desde la tabla)
    if (formData.id_gestion !== undefined && formData.id_gestion !== null) {
      formDataWithNombre.id_gestion = formData.id_gestion
    }

    const response = await registerAuthorizationData(formDataWithNombre)
    setLoading(false)
    if (response === 201 || response === 200) {
      try {
        await updateGestionadoByIdentificacion(
          formData.identificacion_usuario,
          true
        )
        // Actualizar estado a aprobado
        // const userToUpdate = dataUsers.find(
        //   (u) => u.identificacion.toString() === formData.identificacion_usuario
        // )
        // if (userToUpdate) {
        //   // Actualizar estado a aprobado usando axios
        //   await axios.patch(
        //     `${apiSupabase}/gestion_usuario_credito?id=eq.${userToUpdate.id}`,
        //     { estado: 'aprobado' },
        //     {
        //       headers: {
        //         apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
        //         Authorization: import.meta.env
        //           .VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
        //         'Content-Type': 'application/json',
        //         Prefer: 'return=minimal',
        //       },
        //     }
        //   )
        // }
        await getDataUsers()
        await sendEmailAuthorization(
          formData.correo_comprador,
          formData.codigo_credito
        )
      } catch (error) {
        console.error('Error al actualizar gestionado:', error)
        toast.error('Error al actualizar el estado de gestión')
      }

      setFormData({
        identificacion_usuario: '',
        id_producto: '',
        codigo_plataforma_credito: '',
        valor_aprobado: '',
        fecha_aprobacion: '',
        codigo_credito: '',
        cod_usua_ingresa: formData.cod_usua_ingresa,
        correo_comprador: '',
        isGestionMode: false, // Desactivar modo gestión
        id_gestion: undefined, // Limpiar ID de gestión
      })
      const nuevaConsulta = await getAuthorizationData()
      setData(nuevaConsulta!.data || [])
      toast.success('Usuario creado y gestionado correctamente')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'validado':
        return 'bg-green-100 text-green-800'
      case 'sin validar':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loadingPage || loadingPageUsers) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <LayoutSecondary title="Gestión de Créditos">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Header Moderno */}
        <div className="bg-gradient-to-r from-primary via-primarydark to-primary shadow-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                  <CreditCard className="text-white" size={32} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    Gestión de Créditos
                  </h1>
                  <p className="text-white/80 text-sm mt-1">
                    Panel de administración de créditos aprobados por Aliados
                  </p>
                </div>
              </div>
              <button
                onClick={cerrarSesion}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
              >
                <LogOut size={18} />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Panel Principal */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Tabs Modernos */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <nav className="flex space-x-1 px-4">
                <button
                  onClick={() => setActiveTab('table')}
                  className={`relative px-6 py-4 font-semibold text-sm transition-all duration-300 ${
                    activeTab === 'table'
                      ? 'text-primary'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <CreditCard size={18} />
                    <span>Créditos Aprobados</span>
                  </div>
                  {activeTab === 'table' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
                  )}
                </button>
                <button
                  onClick={() => {
                    setActiveTab('users')
                    // Resetear contador cuando se cambia a la pestaña de usuarios
                    if (activeTab !== 'users') {
                      resetNotificationCount()
                    }
                  }}
                  className={`relative px-6 py-4 font-semibold text-sm transition-all duration-300 ${
                    activeTab === 'users'
                      ? 'text-primary'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <UserCheck size={18} />
                    <span>Gestionar Solicitud</span>
                    <NotificationBadge
                      count={newRecordsCount}
                      onClick={(e?: React.MouseEvent<HTMLButtonElement>) => {
                        if (e) {
                          e.stopPropagation()
                        }
                        setActiveTab('users')
                        resetNotificationCount()
                      }}
                    />
                  </div>
                  {activeTab === 'users' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('form')}
                  className={`relative px-6 py-4 font-semibold text-sm transition-all duration-300 ${
                    activeTab === 'form'
                      ? 'text-primary'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <FileText size={18} />
                    <span>Formulario</span>
                  </div>
                  {activeTab === 'form' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
                  )}
                </button>
              </nav>
            </div>

            {/* Contenido */}
            <div className="p-6">
              <TableView
                activeTab={activeTab}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                filteredData={filteredData}
                paginatedData={paginatedData}
                getStatusColor={getStatusColor}
              />

              <TableViewUsers
                activeTab={activeTab}
                searchTerm={searchTermUsers}
                setSearchTerm={setSearchTermUsers}
                currentPage={currentPageUsers}
                setCurrentPage={setCurrentPageUsers}
                filteredData={filteredDataUsers}
                paginatedData={paginatedDataUsers}
                onUpdateData={getDataUsers}
                setActiveTab={setActiveTab}
                setFormData={setFormData}
                onOpenNegarModal={(
                  id: number,
                  email: string,
                  nombreComprador: string
                ) => {
                  openModal('confirmNegar', {
                    id,
                    email,
                    nombreComprador,
                  })
                }}
              />

              <FormView
                activeTab={activeTab}
                handleSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
                handleFormChange={handleFormChange}
                loading={loading}
              />
            </div>
          </div>
        </div>

        {/* Modal de confirmación para negar solicitud */}
        {isModalOpen('confirmNegar') &&
          (() => {
            const negarProps = getModalProps<{
              id: number
              email: string
              nombreComprador: string
            }>('confirmNegar')

            if (!negarProps) return null

            return (
              <ConfirmNegarModal
                nombreComprador={negarProps.nombreComprador}
                onConfirm={async () => {
                  try {
                    await negarSolicitudCredito(negarProps.id)
                    await sendEmailNegacionCredito(negarProps.email)
                    await getDataUsers()
                    closeModal('confirmNegar')
                    toast.success(
                      'Solicitud negada y correo enviado correctamente'
                    )
                  } catch (error) {
                    console.error('Error al negar solicitud:', error)
                    toast.error('Error al negar la solicitud')
                  }
                }}
              />
            )
          })()}
      </div>
    </LayoutSecondary>
  )
}
