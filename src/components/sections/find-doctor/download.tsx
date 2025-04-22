import React from "react";
import paciente from "../../../assets/img/paciente2.jpg";
import { Minus } from "lucide-react";
import ButtonSecondary from "../../ui/button-secondary";

const DownloadSection: React.FC = () => {
    const handleScroll = () => {
        const target = document.getElementById("find");
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section className="flex flex-col lg:flex-row items-center justify-center bg-gray-50 px-8 py-16 gap-12">
            {/* Imagen del paciente */}
            <div className="w-full max-w-md">
                <img
                    src={paciente}
                    alt="Consulta médica"
                    className="rounded-xl shadow-lg w-full"
                />
                <div className="mt-6 flex justify-center">
                    <ButtonSecondary link="/find-doctor" color="bg-primary" text="Mira el paso a paso" />
                </div>
            </div>

            {/* Contenido y enlaces */}
            <div className="w-full max-w-xl text-center lg:text-left">
                <h2 className="text-4xl md:text-3xl sm:text-2xl font-bold text-gray-700 mb-4 leading-tight">
                    App de Telemedicina <br />
                    <span className="text-3xl text-primary">MEDICALL24</span>
                </h2>

                <p className="text-gray-700 text-lg md:text-base mb-4">
                    Ingresa y contacta a un médico desde la comodidad de tu
                    hogar, sin filas, sin aglomeraciones, ni salas de espera.
                </p>
                <p className="text-primary font-bold text-lg mb-8">
                    ¡Ahorrando tiempo y dinero!
                </p>

                {/* Logos de tiendas */}
                <div className="flex items-center justify-between bg-white py-6 px-4 rounded-xl shadow max-w-md mx-auto lg:mx-0">
                    <a
                        href="https://play.google.com/store/apps/details?id=com.devdvs.medicall.medicall24"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            src="https://medicall24.com.co/wp-content/uploads/2025/01/Recurso-1logosStore.png"
                            alt="Play Store"
                            className="w-36 md:w-40 h-auto"
                        />
                    </a>

                    <div className="transform rotate-90">
                        <Minus className="text-gray-300 w-8 h-8" />
                    </div>

                    <a
                        href="https://apps.apple.com/co/app/medicall24/id6661032000"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            src="https://medicall24.com.co/wp-content/uploads/2025/01/Recurso-2logosStore.png"
                            alt="App Store"
                            className="w-36 md:w-40 h-auto"
                        />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default DownloadSection;
