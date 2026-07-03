import CountrySelector from '../header/country-selector'
import DesktopNav from '../header/desktop-nav'
import MobileMenu from '../header/mobile-menu'
import ico from '../../assets/SVG/icoLogo.svg'
import { useHeaderPrimary } from '../../hooks/useHeaderPrimary'
import { Link } from 'react-router-dom'

function HeaderStart() {
  const props = useHeaderPrimary()

  return (
    <header className="relative bg-white shadow-sm">
      <CountrySelector {...props} />
      <nav className="bg-white">
        <div className="container mx-auto px-6">
          {/* Fila superior: logo + botones de acceso */}
          <div className="flex items-center justify-between py-3 gap-3">
            <Link to="/" className="flex items-center shrink-0">
              <img
                src={ico}
                alt="Medicall24"
                className="lg:hidden xl:hidden h-8 w-auto"
              />
              <img
                src="/M5.png"
                alt="Medicall24 Logo"
                className="hidden lg:block xl:block w-40 h-auto"
              />
            </Link>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden lg:flex xl:flex items-center gap-2 sm:gap-3">
                <a
                  href="https://app.medicall24.com.co/"
                  className="bg-primary text-white text-xs sm:text-sm font-medium px-4 sm:px-6 py-2 rounded-full hover:bg-primarydark transition-colors whitespace-nowrap"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Acceso pacientes
                </a>
                <a
                  href="https://app.medicall24.com.co/?type_user=profesional"
                  className="bg-primary text-white text-xs sm:text-sm font-medium px-4 sm:px-6 py-2 rounded-full hover:bg-primarydark transition-colors whitespace-nowrap"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Acceso médicos
                </a>
              </div>
              <div className="lg:hidden xl:hidden">
                <MobileMenu {...props} />
              </div>
            </div>
          </div>

          {/* Fila inferior: menú de navegación centrado (desktop) */}
          <div className="hidden lg:flex xl:flex items-center justify-center border-t border-gray-100 py-3">
            <DesktopNav {...props} />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default HeaderStart
