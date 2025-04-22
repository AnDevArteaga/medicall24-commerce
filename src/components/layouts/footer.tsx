import { Facebook, Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gray-200 text-gray-600 border-t border-gray-200 py-8 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                {/* Texto legal */}
                <p className="text-center text-sm md:text-left">
                    © {new Date().getFullYear()}{" "}
                    Medicall24 – Todos los derechos reservados
                </p>

                {/* Navegación */}
                <div className="flex space-x-6 text-sm">
                    <a
                        href="#"
                        className="hover:text-pink-600 transition-colors"
                    >
                        Términos de Servicio
                    </a>
                    <a
                        href="#"
                        className="hover:text-pink-600 transition-colors"
                    >
                        Política de Privacidad
                    </a>
                    <a
                        href="#"
                        className="hover:text-pink-600 transition-colors"
                    >
                        Contacto
                    </a>
                </div>

                {/* Redes sociales */}
                <div className="flex space-x-4 text-gray-500">
                    <a
                        href="#"
                        className="hover:text-pink-600 transition-colors"
                    >
                        <Facebook className="w-5 h-5" />
                    </a>
                    <a
                        href="#"
                        className="hover:text-pink-600 transition-colors"
                    >
                        <Instagram className="w-5 h-5" />
                    </a>
                    <a
                        href="mailto:contacto@medicall24.com"
                        className="hover:text-pink-600 transition-colors"
                    >
                        <Mail className="w-5 h-5" />
                    </a>
                    <a
                        href="tel:+573001234567"
                        className="hover:text-pink-600 transition-colors"
                    >
                        <Phone className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
