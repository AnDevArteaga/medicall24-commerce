import { useEffect, useMemo, useState, useCallback } from 'react'
import { FileText, UserCheck, CreditCard } from 'lucide-react'
import { toast } from 'react-hot-toast'
import {
  getAuthorizationData,
  registerAuthorizationData,
  sendEmailAuthorization,
  sendEmailNegacionCredito,
} from '../../services/supabase/manage-credit'
import {
  getGestionUsuarioCredito,
  GestionUsuarioCreditoResponse,
  updateGestionadoByIdentificacion,
  negarSolicitudCredito,
} from '../../services/supabase/manage-user-credit'
import FormView from '../manage-credit/form-view'
import TableView from '../manage-credit/table-view'
import TableViewUsers from '../manage-credit/table-view-users'
import NotificationBadge from '../manage-credit/notification-badge'
import Loader from '../ui/loader'
import { useModal } from '../../contexts/modals'
import ConfirmNegarModal from '../manage-credit/confirm-negar-modal'
import { useRealtimeCreditNotifications } from '../../hooks/useRealtimeCreditNotifications'

const ITEMS_PER_PAGE = 20

interface UsuarioData {
  identificacion_usuario: string
  codigo_credito: string
  fecha_aprobacion: string
  nombre_usuario?: string
  correo_usuario?: string
  correo_comprador?: string
}

interface CreditManagementProps {
  newRecordsCount: number
  onNotificationClick: () => void
}

export default function CreditManagement({
  newRecordsCount, // Prop recibido pero no usado directamente, usamos el contador interno del hook
  onNotificationClick,
}: CreditManagementProps) {
  // Usamos el contador del hook interno en lugar del prop
  void newRecordsCount // Evitar warning de variable no usada
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
  const [initialNonGestionadosCount, setInitialNonGestionadosCount] = useState(0)
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
    isGestionMode: false,
    id_gestion: undefined,
  })

  useEffect(() => {
    const obtenerUID = async () => {
      const { supabase } = await import(
        '../../services/supabase/client/create-client'
      )
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
    const nonGestionadosCount = users.filter((user) => !user.gestionado && !user.negado).length
    setInitialNonGestionadosCount(nonGestionadosCount)
    
    setLoadingPageUsers(false)
  }

  // Actualizar el contador inicial cuando cambien los datos
  useEffect(() => {
    const nonGestionadosCount = dataUsers.filter((user) => !user.gestionado && !user.negado).length
    if (nonGestionadosCount !== initialNonGestionadosCount) {
      setInitialNonGestionadosCount(nonGestionadosCount)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUsers])

  // Callbacks memoizados para las notificaciones en tiempo real
  const handleNewNotification = useCallback((newRecord: GestionUsuarioCreditoResponse) => {
    // Actualizar la tabla cuando llegue una nueva notificación
    getDataUsers()
    // Solo mostrar toast si estamos en el tab de usuarios
    if (activeTab === 'users') {
      toast.success(
        `Nueva solicitud de crédito: ${newRecord.nombre_comprador}`,
        {
          icon: '🔔',
          duration: 3000,
        }
      )
    }
  }, [activeTab])

  const handleUpdate = useCallback(() => {
    // Actualizar la tabla cuando se actualice un registro
    getDataUsers()
  }, [])

  // Notificaciones en tiempo real para actualizar la tabla automáticamente
  // El hook dispara las actualizaciones cuando llegan nuevas notificaciones
  const { resetNotificationCount } = useRealtimeCreditNotifications({
    initialCount: initialNonGestionadosCount,
    onNewNotification: handleNewNotification,
    onUpdate: handleUpdate,
  })

  // Calcular el contador basado en los datos reales de la tabla
  // Este se actualiza automáticamente cuando se llama a getDataUsers()
  const displayCount = useMemo(() => {
    return dataUsers.filter((user) => !user.gestionado && !user.negado).length
  }, [dataUsers])

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

    const orderByStatus = (item: GestionUsuarioCreditoResponse): number => {
      if (item.negado) return 3
      if (!item.gestionado && !item.negado) return 1
      if (item.gestionado && !item.negado) return 2
      return 1
    }

    return filtered.sort((a, b) => {
      const statusA = orderByStatus(a)
      const statusB = orderByStatus(b)
      if (statusA !== statusB) {
        return statusA - statusB
      }
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0
      return dateB - dateA
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

    const userToUpdate = dataUsers.find(
      (u) => u.identificacion.toString() === formData.identificacion_usuario
    )

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
      valor_aprobado: valorAprobadoNumerico,
      fecha_aprobacion: formData.fecha_aprobacion,
      codigo_credito: formData.codigo_credito,
      cod_usua_ingresa: formData.cod_usua_ingresa,
      correo_comprador: formData.correo_comprador,
      nombre_usuario: userToUpdate?.nombre_comprador || '',
    }

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
        isGestionMode: false,
        id_gestion: undefined,
      })
      const nuevaConsulta = await getAuthorizationData()
      setData(nuevaConsulta!.data || [])
      toast.success('Usuario creado y gestionado correctamente')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Usado':
        return 'bg-green-100 text-green-800'
      case 'Sin usar':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loadingPage || loadingPageUsers) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Tabs */}
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
            onClick={() => setActiveTab('users')}
            className={`relative px-6 py-4 font-semibold text-sm transition-all duration-300 ${
              activeTab === 'users'
                ? 'text-primary'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center space-x-2">
              <UserCheck size={18} />
              <span>Gestionar Solicitud</span>
              {displayCount > 0 && (
                <NotificationBadge
                  count={displayCount}
                  onClick={(e?: React.MouseEvent<HTMLButtonElement>) => {
                    if (e) {
                      e.stopPropagation()
                    }
                    resetNotificationCount()
                    onNotificationClick()
                  }}
                />
              )}
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
  )
}
