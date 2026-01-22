import React, { useState } from 'react'
import { ArrowLeft, Home, Menu, X, LogOut } from 'lucide-react'
import { useLocation } from 'react-router-dom'

interface HeaderSecondaryProps {
  menuItems?: Array<{
    id: string
    label: string
    icon: React.ComponentType<{ className?: string }>
    badge?: number
  }>
  activeSection?: string
  onSectionChange?: (section: string) => void
  onLogout?: () => void
}

const HeaderSecondary: React.FC<HeaderSecondaryProps> = ({
  menuItems = [],
  activeSection,
  onSectionChange,
  onLogout,
}) => {
  const { pathname } = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isOnAliados = pathname === '/aliados'
  const isDashboard = pathname.includes('/gestionar-creditos')
  const icon = isOnAliados ? (
    <ArrowLeft className="h-5 w-5" />
  ) : (
    <Home className="h-5 w-5" />
  )
  const href = isOnAliados ? '/Examen-bexa' : '/'
  const label = isOnAliados ? 'Volver' : 'Inicio'

  const handleMenuItemClick = (itemId: string) => {
    if (onSectionChange) {
      onSectionChange(itemId)
    }
    setMobileMenuOpen(false)
  }

  return (
    <header className="bg-gray-100 text-white shadow-md z-10 relative">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="https://medicall24.com.co/wp-content/uploads/2024/12/lettermarkoriginal.png"
            alt="Medicall24 Logo"
            className="w-40 h-auto"
          />
        </div>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-6">
            {!isDashboard && (
              <li className="hover:text-orange-500 text-primary transition-colors">
                <a href={href} className="flex items-center space-x-1">
                  {icon}
                  <span className="font-medium">{label}</span>
                </a>
              </li>
            )}
          </ul>
        </nav>

        {/* Botón Menú Móvil - Solo en Dashboard */}
        {isDashboard && menuItems.length > 0 && (
          <button
            className="lg:hidden xl:hidden md:hidden p-2 rounded-lg hover:bg-gray-200 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-primary" />
            )}
          </button>
        )}

        {/* Navegación Móvil - Solo si no es Dashboard */}
        {!isDashboard && (
          <nav className="md:hidden">
            <ul className="flex space-x-6">
              <li className="hover:text-orange-500 text-primary transition-colors">
                <a href={href} className="flex items-center space-x-1">
                  {icon}
                  <span className="font-medium">{label}</span>
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>

      {/* Menú Desplegable Móvil - Solo en Dashboard */}
      {isDashboard && menuItems.length > 0 && (
        <div
          className={`absolute top-full left-0 w-full bg-white shadow-lg z-50 overflow-hidden transition-all duration-500 ease-in-out lg:hidden xl:hidden ${
            mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="py-4">
            <ul className="space-y-2 px-4">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id

                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleMenuItemClick(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                          : 'text-neutral hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="flex-1 text-left font-medium">
                        {item.label}
                      </span>
                      {item.badge && item.badge > 0 && (
                        <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-red-500 rounded-full">
                          {item.badge > 99 ? '99+' : item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                )
              })}
              <li className="border-t border-gray-200 mt-2 pt-2 space-y-2">
                <button
                  onClick={() => {
                    window.location.href = '/'
                    setMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-primary hover:bg-primary/10 transition-all duration-200 font-medium"
                >
                  <ArrowLeft className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1 text-left">Volver al Inicio</span>
                </button>
                {onLogout && (
                  <button
                    onClick={() => {
                      onLogout()
                      setMobileMenuOpen(false)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 font-medium"
                  >
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    <span className="flex-1 text-left">Cerrar Sesión</span>
                  </button>
                )}
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}

export default HeaderSecondary
