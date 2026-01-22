import React from "react";
import video from "../../../assets/videos/video.mp4";
import cam from "../../../assets/img/camitemverde.png";
import ButtonSecondary from "../../ui/button-secondary";
import { CheckCircle } from "lucide-react";

const styles = `
/* Animación para que los elementos entren desde arriba */
@keyframes slideDown {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Animación para que los elementos entren desde abajo */
@keyframes slideUp {
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Animación para desvanecerse */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* Aplicación de animaciones */
.animate-slide-down {
  animation: slideDown 1s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 1s ease-out forwards;
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

.delay-200 {
  animation-delay: 0.2s;
}

.delay-400 {
  animation-delay: 0.4s;
}
`;

interface InfoPlanProps {
    openModal?: () => void;
}

const InfoPlan: React.FC<InfoPlanProps> = ({ openModal }) => {
    return (
        <main className="bg-gray-100 px-24 py-20">
            <style>{styles}</style>
            <h1 className="text-gray-600 hidden sm:block sm:text-center text-5xl md:text-4xl font-bold mb-8 animate-fade-in">
                Planes de Telemedicina para Empresas
            </h1>
            <div className="container mx-auto mb-12 flex flex-row md:flex-col sm:flex-col-reverse items-center justify-start gap-8">
                <div className="w-full text-left">
                    <div className="flex flex-col justify-start sm:justify-center sm:items-center animate-slide-down opacity-0">
                        <h1 className="text-gray-600 sm:hidden sm:text-center text-5xl md:text-4xl font-bold mb-8 animate-fade-in">
                            Planes de Telemedicina para Empresas
                        </h1>
                        <div className="w-full flex flex-col justify-start items-start sm:items-center sm:justify-center">
                            <div className="mb-3">
                                <div className="flex justify-start items-center mb-4 sm:justify-center sm:items-center">
                                    <img
                                        src="https://medicall24.com.co/wp-content/uploads/2025/01/camplan.png"
                                        alt="camara"
                                        className="w-16 h-auto mb-0 mr-4"
                                    />
                                    <span className="text-gray-600 text-4xl font-bold">
                                        Plan Basic
                                    </span>
                                </div>
                                <p className="text-3xl sm:text-3xl font-semibold text-primary sm:text-center">
                                    Consultas Ilimitadas
                                </p>
                                <div className="flex flex-row gap-4 mt-2">
                                    <div className="flex items-center">
                                        <img
                                            src={cam}
                                            alt="cam"
                                            className="w-6 h-auto"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700">
                                            Medicina General
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <img
                                            src={cam}
                                            alt="cam"
                                            className="w-6 h-auto"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700">
                                            Psicología
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <img
                                            src={cam}
                                            alt="cam"
                                            className="w-6 h-auto"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700">
                                            Pediatría
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 mb-2 sm:mb-1">
                                <span className="text-gray-600 md:text-2xl font-semibold">
                                    Desde
                                </span>
                                <span className="font-bold text-orange-500 text-6xl">
                                    $39,960
                                </span>
                                <span className="text-orange-500 text-xl font-bold">
                                    COP
                                </span>
                            </div>
                            <p className="flex items-center text-gray-600 text-xs md:text-2xl mb-4">
                                Valor mensual del plan para 4 usuarios
                            </p>
                            <div className="flex items-start sm:justify-center">
                                <CheckCircle className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                                <p className="text-gray-600 text-xs md:text-2xl mb-4 sm:text-center">
                                    Incluye Póliza de Accidentes Personales con
                                    cobertura hasta por
                                    <span className="text-base font-semibold ml-1 sm:text-sm">
                                        $20,000,000 COP
                                    </span>
                                </p>
                            </div>
                            <ButtonSecondary onClick={openModal} color="bg-primary" text="Consultar escala de precios de este plan" />
                            <p className="cursor-pointer text-sm md:text-base text-gray-600 underline mt-2">
                                {/* Ver Términos y Condiciones */}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-10/12">
                    <div className="relative w-full h-96 overflow-hidden rounded-3xl">
                        <video
                            className="absolute top-0 left-0 w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                        >
                            <source src={video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default InfoPlan;
