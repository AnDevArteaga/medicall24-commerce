import React from "react";
import Eslogan from "./slogan";
import Price from "./price";
import { CheckCircle, ChevronRight, Info } from "lucide-react";
import ButtonBuy from "../../ui/button-buy";
import { termBexaPackageContent } from "../../modals/term&cond/bexa/content-terms";
import { useModal } from "../../../contexts/modals";

interface BexaPackageProps {
    onVerProducto: (id_producto: number) => void;
  }

const BexaPackage: React.FC<BexaPackageProps> = ( { onVerProducto }) => {
    const { openModal, closeModal } = useModal();
    return (
    <section
        id="servicio"
        className="grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1 sm:gap-12 gap-0 items-center px-32 py-12 md:px-4 sm:px-4"
    >
        {/* Contenedor del Video */}
        <div className="relative bg-gray-100 order-1 sm:hidden md:order-2 sm:order-2 rounded-2xl overflow-hidden max-w-lg mx-auto shadow-lg">
            <video
                className="w-full h-full rounded-2xl object-cover object-right"
                src="https://medicall24.com.co/wp-content/uploads/2025/01/bexa3.mp4"
                autoPlay
                loop
                muted
            />
        </div>

        {/* Contenedor de Información */}
        <div className="sm:space-y-12 space-y-6 md:space-y-3 p-8  order-2 md:order-1 sm:order-1 bg-gray-100 rounded-lg shadow-lg transition-transform duration-300 md:flex md:flex-col md:items-center md:justify-center">
            <div className="space-y-2">
                {/* Título */}
                <h2 className="text-3xl md:text-center sm:text-2xl font-bold text-gray-600 hover:text-pink-500 transition-colors duration-200">
                    Paquete de Servicios Complementarios para Detectar Cáncer de
                    Mama
                </h2>
                <Eslogan
                    text="¡Recibe una atención integral y asegúrate de estar bien!"
                    value={2}
                />
            </div>

            <div className="relative bg-gray-100 order-1 hidden sm:block md:order-2 sm:order-2 rounded-2xl overflow-hidden max-w-lg mx-auto shadow-lg">
                <video
                    className="w-full h-full rounded-2xl object-cover object-right"
                    src="https://medicall24.com.co/wp-content/uploads/2025/01/bexa3.mp4"
                    autoPlay
                    loop
                    muted
                />
            </div>
            <div className="space-y-2">
                {/* Servicios incluidos */}
                <p className="md:text-center text-gray-700 text-sm md:text-2xl">
                    Beneficios que incluye el paquete:
                </p>

                <ul className="space-y-0 md:space-y-2">
                    {/* Ecografía de mama */}
                    <li className="flex space-x-3 hover:translate-x-2 transition-transform duration-200">
                        <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-orange-500 group-hover:text-orange-600 transition-colors duration-200" />
                        <span className="text-gray-600 text-sm md:text-xl group-hover:text-gray-700 transition-colors duration-200">
                            Ecografía de mama
                        </span>
                        <div className="ml-2 group relative flex">
                            <Info className="w-4 h-4 md:w-6 md:h-6 text-gray-500 hover:text-pink-600 cursor-pointer" />
                            <div className="absolute bottom-full left-1/2 transform translate-y-[-5px] invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all bg-gray-800 text-white text-sm p-2 rounded-lg shadow-md w-96 sm:text-xs sm:w-60 sm:-translate-x-48">
                                <p className="text-white ml-2 text-sm md:text-base sm:text-base">
                                    Se garantiza en caso de hallazgo de masas en
                                    mama con el examen BEXA
                                </p>
                            </div>
                        </div>
                    </li>

                    {/* Consultas complementarias */}
                    <li>
                        <div className="flex space-x-3 hover:translate-x-2 transition-transform duration-200">
                            <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-orange-500 group-hover:text-orange-600 transition-colors duration-200" />
                            <span className="text-gray-600 text-sm  md:text-xl group-hover:text-gray-700 transition-colors duration-200">
                                Consultas complementarias por:
                            </span>
                            <div className="ml-2 group relative flex">
                                <Info className="w-4 h-4 md:w-6 md:h-6 text-gray-500 hover:text-pink-600 cursor-pointer" />
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 translate-y-[-5px] invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all bg-gray-800 text-white text-sm p-2 rounded-lg shadow-md w-96 sm:text-xs sm:w-72 sm:-translate-x-72">
                                    <p className="text-white ml-2 text-sm md:text-base sm:text-base">
                                        Se garantiza por prescripción del
                                        profesional de la salud o especialista
                                        que realice el examen BEXA o la
                                        ecografía
                                    </p>
                                </div>
                            </div>
                        </div>
                        <ul className="ml-8 mt-2 md:ml-0 space-y-0">
                            <li className="flex space-x-3">
                                <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-pink-500" />
                                <span className="text-gray-600 text-sm md:text-xl">
                                    Mastología
                                </span>
                            </li>
                            <li className="flex space-x-3">
                                <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-pink-500" />
                                <span className="text-gray-600 text-sm md:text-xl">
                                    Psicología
                                </span>
                            </li>
                        </ul>
                    </li>
                </ul>

                {/* Precio */}
                <Price price="$249.500" />
                <div className="flex justify-center md:items-center flex-col w-2/3 md:w-full sm:w-full">
                    {/* Botón de Acción */}
                    <ButtonBuy text="Comprar Paquete" onClick={() => onVerProducto(16)} />
                </div>
                <div className="flex flex-col w-1/2 sm:w-full">
                    {/* Términos y condiciones */}
                    <p // onClick={handleOpenModalTermPackage}
                    className="cursor-pointer text-left mt-2 text-gray-600 text-sm md:text-base md:text-center underline" onClick={() => openModal("termCond", {content: termBexaPackageContent, onClose: () => closeModal("termCond"), headerTitle: "Términos y Condiciones del Servicio"})}>
                        Ver Términos y Condiciones
                    </p>
                </div>
            </div>
        </div>
    </section>
)};

export default BexaPackage;
