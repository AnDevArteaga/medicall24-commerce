// src/components/header/HeaderStart.tsx
import CountrySelector from "../header/country-selector";
import DesktopNav from "../header/desktop-nav";
import MobileMenu from "../header/mobile-menu";
import ico from "../../assets/SVG/icoLogo.svg";
import { useHeaderPrimary } from "../../hooks/useHeaderPrimary";

function HeaderStart() {
    const props = useHeaderPrimary();

    return (
        <header className="relative bg-white">
            <CountrySelector {...props} />
            <nav className="bg-white transition-transform duration-500 ease-in-out">
                <div className="container mx-auto flex items-center lg:justify-between xl:justify-between md:justify-between sm:justify-between xs:justify-between py-4 px-6">
                    {/* Logo - Solo visible en mobile */}
                    <img
                        src={ico}
                        alt="Logo"
                        className="lg:hidden xl:hidden select-none h-8 w-auto transform transition duration-200 hover:scale-105 flex"
                    />
                    {/* Logo - Solo visible en desktop */}
                    <div className="hidden lg:flex xl:flex items-center">
                        <img
                            src="https://medicall24.com.co/wp-content/uploads/2024/12/lettermarkoriginal.png"
                            alt="Medicall24 Logo"
                            className="w-40 h-auto"
                        />
                    </div>
                    <MobileMenu {...props} />
                    <DesktopNav {...props} />
                    {/* Botón Acceso a Médicos - Solo desktop, a la derecha */}
                    <div className="hidden lg:flex xl:flex">
                        <a
                            href="https://app.medicall24.com.co/?type_user=profesional"
                            className="transform transition duration-200 hover:scale-105 flex hover:font-semibold hover:text-white bg-primary text-white px-4 py-2 rounded-lg"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Acceso a Médicos
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default HeaderStart;
