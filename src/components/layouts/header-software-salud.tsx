import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Home, Menu, User, X } from 'lucide-react'
import { softwareMenuItems } from '../../config/software-menu-routes'
import PrefetchLink from '../ui/prefetch-link'

const navLinkClass = (active: boolean) =>
  [
    'flex items-center justify-center text-center font-medium leading-snug transition-shadow',
    'rounded-lg lg:rounded-xl shadow-md hover:shadow-lg',
    active
      ? 'bg-primary text-white'
      : 'bg-white text-slate-700 hover:bg-slate-50',
  ].join(' ')

function HeaderSoftwareSalud() {
  const location = useLocation()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const isActive = (href: string) => location.pathname === href

  const currentItem = softwareMenuItems.find(
    (item) => item.href === location.pathname,
  )

  const mobileNavLabel =
    location.pathname === '/software-en-salud'
      ? 'Secciones de software en salud'
      : (currentItem?.label ?? 'Secciones de software en salud')

  return (
    <header className="relative bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between py-3 gap-3">
          <PrefetchLink to="/software-en-salud" className="shrink-0">
            <img
              src="/M5.png"
              alt="Medicall24"
              className="h-8 sm:h-9 lg:h-10 w-auto"
              width={160}
              height={40}
              decoding="async"
            />
          </PrefetchLink>

          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
            <PrefetchLink
              to="/iniciar-sesion"
              className="bg-primary text-white text-xs sm:text-sm font-medium px-4 sm:px-6 py-2 rounded-full hover:bg-primarydark transition-colors shadow-sm whitespace-nowrap"
            >
              Iniciar sesión
            </PrefetchLink>
            <PrefetchLink
              to="/iniciar-sesion"
              className="text-primary hover:text-primarydark transition-colors"
              aria-label="Usuario"
            >
              <User className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
            </PrefetchLink>
            <PrefetchLink
              to="/"
              className="flex items-center gap-1.5 text-primary font-medium text-sm hover:text-primarydark transition-colors whitespace-nowrap"
            >
              <span className="hidden sm:inline">Inicio</span>
              <Home className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
            </PrefetchLink>
          </div>
        </div>
      </div>

      <div className="bg-slate-100 border-t border-slate-200 w-full">
        {/* Nav móvil */}
        <div className="lg:hidden xl:hidden px-4 sm:px-6 py-3">
          <button
            type="button"
            onClick={() => setMobileNavOpen((open) => !open)}
            className="w-full flex items-center justify-between gap-3 bg-white text-slate-700 font-medium text-sm sm:text-base px-4 py-3 rounded-xl shadow-md"
            aria-expanded={mobileNavOpen}
            aria-controls="software-salud-mobile-nav"
          >
            <span className="text-left leading-snug">{mobileNavLabel}</span>
            {mobileNavOpen ? (
              <X className="w-5 h-5 shrink-0 text-primary" />
            ) : (
              <Menu className="w-5 h-5 shrink-0 text-primary" />
            )}
          </button>

          <div
            id="software-salud-mobile-nav"
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              mobileNavOpen
                ? 'max-h-[600px] opacity-100 mt-3'
                : 'max-h-0 opacity-0'
            }`}
          >
            <nav className="flex flex-col gap-2 pb-1">
              {softwareMenuItems.map(({ label, href }) => (
                <PrefetchLink
                  key={href}
                  to={href}
                  onClick={() => setMobileNavOpen(false)}
                  className={`${navLinkClass(isActive(href))} text-sm px-4 py-3`}
                >
                  {label}
                </PrefetchLink>
              ))}
            </nav>
          </div>
        </div>

        {/* Nav desktop — ancho completo */}
        <nav
          className="hidden lg:flex xl:flex w-full items-stretch gap-2 xl:gap-3 px-4 lg:px-6 xl:px-8 py-3 lg:py-4 xl:py-5"
          aria-label="Secciones de software en salud"
        >
          {softwareMenuItems.map(({ label, href }) => (
            <PrefetchLink
              key={href}
              to={href}
              className={`${navLinkClass(isActive(href))} flex-1 min-w-0 px-2 xl:px-3 py-3 lg:py-4 xl:py-5 text-xs lg:text-sm xl:text-base`}
            >
              {label}
            </PrefetchLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default HeaderSoftwareSalud
