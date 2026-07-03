import React from 'react'
import { Menu } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import PrefetchLink from '../ui/prefetch-link'

interface NavItem {
  href: string
  label: string
}

interface Props {
  navItems: NavItem[]
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}

const MobileMenu: React.FC<Props> = ({ navItems, menuOpen, setMenuOpen }) => {
  const location = useLocation()

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  return (
    <>
      <button
        className="w-10 h-10 flex justify-center items-center relative z-50"
        aria-label="Abrir menú"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="relative w-12 h-6">
          <span
            className={`absolute mt-1 ml-1 transition-all duration-300 ${
              menuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
            }`}
          >
            <Menu className="w-6 h-6 text-primary" />
          </span>
          <span
            className={`absolute text-2xl font-bold text-primary transition-all duration-300 ${
              menuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
          >
            ✕
          </span>
        </div>
      </button>

      <div
        className={`fixed inset-0 top-[72px] bg-white z-40 overflow-y-auto transition-all duration-300 lg:hidden xl:hidden ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 py-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <PrefetchLink
                to={item.href}
                onClick={() => setMenuOpen(false)}
                className={`block py-3 text-lg font-medium border-b border-gray-100 transition-colors ${
                  isActive(item.href)
                    ? 'text-primary'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {item.label}
              </PrefetchLink>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3 px-6 pb-8">
          <a
            href="https://app.medicall24.com.co/"
            className="bg-primary text-white text-center px-6 py-3 rounded-full font-medium"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            Acceso pacientes
          </a>
          <a
            href="https://app.medicall24.com.co/?type_user=profesional"
            className="bg-primary text-white text-center px-6 py-3 rounded-full font-medium"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            Acceso médicos
          </a>
        </div>
      </div>
    </>
  )
}

export default MobileMenu
