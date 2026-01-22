import { useEffect, useState } from 'react'
import type React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Home,
  CreditCard,
  ShoppingCart,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ArrowLeft,
  Users,
  Ticket,
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { supabase } from '../services/supabase/client/create-client'
import { useRealtimeCreditNotifications } from '../hooks/useRealtimeCreditNotifications'
import NotificationBadge from '../components/manage-credit/notification-badge'
import DashboardHome from '../components/dashboard/dashboard-home'
import CreditManagement from '../components/dashboard/credit-management'
import SalesManagement from '../components/dashboard/sales-management'
import GestoresManagement from '../components/dashboard/gestores-management'
import CodigosManagement from '../components/dashboard/codigos-management'
import LayoutSecondary from '../layouts/layout-secondary'

type Section = 'home' | 'credits' | 'sales' | 'gestores' | 'codigos'

export default function Dashboard() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState<Section>('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [initialNonGestionadosCount, setInitialNonGestionadosCount] =
    useState(0)

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

  // Obtener datos iniciales para el contador
  const getInitialCount = async () => {
    try {
      const { getGestionUsuarioCredito } = await import(
        '../services/supabase/manage-user-credit'
      )
      const response = await getGestionUsuarioCredito()
      const users = response?.data || []
      const nonGestionadosCount = users.filter(
        (user) => !user.gestionado
      ).length
      setInitialNonGestionadosCount(nonGestionadosCount)
    } catch (error) {
      console.error('Error obteniendo contador inicial:', error)
    }
  }

  useEffect(() => {
    getInitialCount()
  }, [])

  // Notificaciones en tiempo real
  const { newRecordsCount, resetNotificationCount } =
    useRealtimeCreditNotifications({
      initialCount: initialNonGestionadosCount,
      onNewNotification: () => {
        getInitialCount()
      },
      onUpdate: () => {
        getInitialCount()
      },
    })

  const handleNotificationClick = () => {
    setActiveSection('credits')
    resetNotificationCount()
  }

  const menuItems = [
    {
      id: 'home' as Section,
      label: 'Inicio',
      icon: Home,
    },
    {
      id: 'credits' as Section,
      label: 'Gestión de Créditos',
      icon: CreditCard,
      badge: newRecordsCount > 0 ? newRecordsCount : undefined,
    },
    {
      id: 'sales' as Section,
      label: 'Gestión de Ventas',
      icon: ShoppingCart,
    },
    {
      id: 'gestores' as Section,
      label: 'Gestión de Gestores',
      icon: Users,
    },
    {
      id: 'codigos' as Section,
      label: 'Gestión de Códigos',
      icon: Ticket,
    },
  ]

  return (
    <LayoutSecondary
      title="Dashboard - Medicall24"
      menuItems={menuItems}
      activeSection={activeSection}
      onSectionChange={(section) => {
        setActiveSection(section as Section)
        if (section === 'credits' && newRecordsCount > 0) {
          resetNotificationCount()
        }
      }}
      onLogout={cerrarSesion}
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
        {/* Sidebar - Visible desde md (769px) en adelante */}
        <aside
          className={`hidden md:flex lg:flex xl:flex bg-white shadow-2xl transition-all duration-300 ease-in-out flex-shrink-0 ${
            sidebarOpen ? 'w-64' : 'w-20'
          }`}
        >
          <div className="flex flex-col h-full overflow-hidden sticky top-0">
            {/* Header del Sidebar */}
            <div
              className={`flex items-center ${
                sidebarOpen ? 'justify-between' : 'justify-center'
              } p-4 border-b border-gray-200 bg-white`}
            >
              {sidebarOpen ? (
                <>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Dashboard
                  </h1>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Cerrar sidebar"
                  >
                    <X className="w-5 h-5 text-neutral" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Abrir sidebar"
                >
                  <Menu className="w-5 h-5 text-neutral" />
                </button>
              )}
            </div>

            {/* Menú de Navegación */}
            <nav className="flex-1 overflow-y-auto p-3 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id)
                      if (item.id === 'credits' && item.badge) {
                        resetNotificationCount()
                      }
                      // Cerrar sidebar después de seleccionar
                      setSidebarOpen(false)
                    }}
                    className={`w-full flex items-center ${
                      sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'
                    } py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                        : 'text-neutral hover:bg-gray-100'
                    }`}
                    title={!sidebarOpen ? item.label : undefined}
                  >
                    <div className="relative flex-shrink-0">
                      <Icon className="w-5 h-5" />
                      {!sidebarOpen && item.badge && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                          {item.badge > 9 ? '9+' : item.badge}
                        </span>
                      )}
                    </div>
                    {sidebarOpen && (
                      <>
                        <span className="flex-1 text-left font-medium text-base truncate">
                          {item.label}
                        </span>
                        {item.badge && (
                          <NotificationBadge
                            count={item.badge}
                            onClick={(
                              e?: React.MouseEvent<HTMLButtonElement>
                            ) => {
                              if (e) {
                                e.stopPropagation()
                              }
                              handleNotificationClick()
                            }}
                          />
                        )}
                        {isActive && (
                          <ChevronRight className="w-4 h-4 flex-shrink-0" />
                        )}
                      </>
                    )}
                  </button>
                )
              })}
            </nav>

            {/* Footer del Sidebar - Inicio y Cerrar Sesión */}
            <div className="p-4 border-t border-gray-200 bg-white space-y-2">
              <button
                onClick={() => navigate('/')}
                className={`w-full flex items-center ${
                  sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'
                } py-3 rounded-lg text-primary hover:bg-primary/10 transition-all duration-200 font-medium`}
                title={!sidebarOpen ? 'Volver al Inicio' : undefined}
              >
                <ArrowLeft className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && (
                  <span className="text-base">Volver al Inicio</span>
                )}
              </button>
              <button
                onClick={cerrarSesion}
                className={`w-full flex items-center ${
                  sidebarOpen ? 'gap-3 px-4' : 'justify-center px-2'
                } py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 font-medium`}
                title={!sidebarOpen ? 'Cerrar Sesión' : undefined}
              >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && (
                  <span className="text-base">Cerrar Sesión</span>
                )}
              </button>
            </div>
          </div>
        </aside>

        {/* Contenido Principal */}
        <main className="flex-1 overflow-x-hidden md:ml-0">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Header del Contenido */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral mb-2">
                {activeSection === 'home' && 'Inicio'}
                {activeSection === 'credits' && 'Gestión de Créditos'}
                {activeSection === 'sales' && 'Gestión de Ventas'}
                {activeSection === 'gestores' && 'Gestión de Gestores'}
                {activeSection === 'codigos' && 'Gestión de Códigos'}
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {activeSection === 'home' &&
                  'Bienvenido al panel de administración'}
                {activeSection === 'credits' &&
                  'Administra las solicitudes y créditos aprobados'}
                {activeSection === 'sales' &&
                  'Visualiza y gestiona todas las ventas realizadas'}
                {activeSection === 'gestores' &&
                  'Administra los gestores comerciales del sistema'}
                {activeSection === 'codigos' &&
                  'Administra los códigos promocionales y genera diseños con QR'}
              </p>
            </div>

            {/* Contenido de las Secciones */}
            {activeSection === 'home' && (
              <DashboardHome
                onNavigate={(section) => setActiveSection(section)}
              />
            )}
            {activeSection === 'credits' && (
              <CreditManagement
                newRecordsCount={newRecordsCount}
                onNotificationClick={handleNotificationClick}
              />
            )}
            {activeSection === 'sales' && <SalesManagement />}
            {activeSection === 'gestores' && <GestoresManagement />}
            {activeSection === 'codigos' && <CodigosManagement />}
          </div>
        </main>
      </div>
    </LayoutSecondary>
  )
}
