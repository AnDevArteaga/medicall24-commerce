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
                <div className="container mx-auto flex items-center lg:justify-center md:justify-between sm:justify-between xs:justify-between py-4 px-6">
                    <img
                        src={ico}
                        alt="Logo"
                        className="lg:hidden select-none h-8 w-auto transform transition duration-200 hover:scale-105 flex"
                    />
                    <MobileMenu {...props} />
                    <DesktopNav {...props} />
                </div>
            </nav>
        </header>
    );
}

export default HeaderStart;
