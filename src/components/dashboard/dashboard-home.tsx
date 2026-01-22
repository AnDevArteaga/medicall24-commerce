import { useEffect, useState } from 'react'
import {
  CreditCard,
  ShoppingCart,
  TrendingUp,
  Users,
  Clock,
} from 'lucide-react'
import { getGestionUsuarioCredito } from '../../services/supabase/manage-user-credit'
import { getAuthorizationData } from '../../services/supabase/manage-credit'
import { getVentas } from '../../services/supabase/sales'

interface DashboardHomeProps {
  onNavigate?: (section: 'credits' | 'sales') => void
}

export default function DashboardHome({ onNavigate }: DashboardHomeProps) {
  const [stats, setStats] = useState({
    creditosPendientes: 0,
    creditosAprobados: 0,
    totalVentas: 0,
    ventasHoy: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true)
      try {
        // Obtener créditos pendientes
        const gestionResponse = await getGestionUsuarioCredito()
        const gestionUsers = gestionResponse?.data || []
        const pendientes = gestionUsers.filter(
          (user) => !user.gestionado
        ).length

        // Obtener créditos aprobados
        const creditosResponse = await getAuthorizationData()
        const creditosAprobados = creditosResponse?.data?.length || 0

        // Obtener ventas (solo la primera página para estadísticas)
        const ventasResponse = await getVentas(1, 100)
        const ventas = ventasResponse?.data || []
        const totalVentas = ventasResponse?.total || 0

        // Ventas de hoy
        const hoy = new Date()
        hoy.setHours(0, 0, 0, 0)
        const ventasHoy = ventas.filter((venta) => {
          const fechaVenta = new Date(venta.fecha_compra)
          fechaVenta.setHours(0, 0, 0, 0)
          return fechaVenta.getTime() === hoy.getTime()
        }).length

        setStats({
          creditosPendientes: pendientes,
          creditosAprobados,
          totalVentas,
          ventasHoy,
        })
      } catch (error) {
        console.error('Error cargando estadísticas:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  const statCards = [
    {
      title: 'Créditos Pendientes',
      value: stats.creditosPendientes,
      icon: Clock,
      color: 'from-secondary to-orange-400',
      bgColor: 'bg-orange-50',
      iconColor: 'text-secondary',
    },
    {
      title: 'Créditos Aprobados',
      value: stats.creditosAprobados,
      icon: CreditCard,
      color: 'from-primary to-pink-500',
      bgColor: 'bg-pink-50',
      iconColor: 'text-primary',
    },
    {
      title: 'Total Ventas',
      value: stats.totalVentas,
      icon: ShoppingCart,
      color: 'from-neutral to-gray-600',
      bgColor: 'bg-gray-50',
      iconColor: 'text-neutral',
    },
    {
      title: 'Ventas Hoy',
      value: stats.ventasHoy,
      icon: TrendingUp,
      color: 'from-primary to-secondary',
      bgColor: 'bg-gradient-to-br from-pink-50 to-orange-50',
      iconColor: 'text-primary',
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Cards de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className={`${stat.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-md`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Sección de Accesos Rápidos */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Accesos Rápidos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          <div
            onClick={() => onNavigate?.('credits')}
            className="p-4 border border-gray-200 rounded-xl hover:border-primary hover:shadow-md transition-all cursor-pointer"
          >
            <Users className="w-8 h-8 text-primary mb-2" />
            <h4 className="font-semibold text-gray-800">Gestionar Créditos</h4>
            <p className="text-sm text-gray-600 mt-1">
              Administra solicitudes de crédito
            </p>
          </div>
          <div
            onClick={() => onNavigate?.('sales')}
            className="p-4 border border-gray-200 rounded-xl hover:border-secondary hover:shadow-md transition-all cursor-pointer"
          >
            <ShoppingCart className="w-8 h-8 text-secondary mb-2" />
            <h4 className="font-semibold text-gray-800">Ver Ventas</h4>
            <p className="text-sm text-gray-600 mt-1">
              Consulta todas las ventas realizadas
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
