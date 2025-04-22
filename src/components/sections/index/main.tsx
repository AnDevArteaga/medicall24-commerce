import { Minus } from "lucide-react";
import video from "../../../assets/videos/telemedicina.mp4";
import ButtonSecondary from "../../ui/button-secondary";

const Principal = () => {
    return (
        <div className="flex flex-row items-center min-h-screen sm:flex-col md:flex-col xs:flex-col bg-white px-0 py-4">
            {/* Video */}
            <div className="relative w-full h-screen md:h-1/2 md:mt-24 sm:h-1/2 xs:h-1/2">
                <div className="relative w-full h-[calc(110vh-50px)] sm:h-[calc(65vh-50px)] xs:h-[calc(65vh-50px)] overflow-hidden">
                    <video
                        className="w-full h-auto mr-20"
                        src={video}
                        autoPlay
                        loop
                        muted
                    />
                </div>
                <div className="absolute bottom-0 left-0 w-full h-0 bg-white" />
            </div>

            {/* Contenido */}
            <div className="w-full flex flex-col items-center mt-10 md:mt-0 sm:mt-0 sm:px-10 xs:px-4">
                <img
                    src="https://medicall24.com.co/wp-content/uploads/2025/01/Recurso-6mujeres.png"
                    alt="Imagen horizontal"
                    className="w-2/5 md:w-4/5 h-auto sm:w-4/5 xs:w-4/5 mb-8"
                />
                {/* Títulos y descripciones */}
                <p className="text-5xl sm:text-4xl xs:text-4xl md:text-7xl font-extrabold text-center text-primary">
                    Consultas médicas
                </p>
                <p className="text-5xl sm:text-5xl xs:text-5xl md:text-7xl font-extrabold text-center text-primary mb-8">
                    virtuales
                </p>

                <h2 className="text-2xl md:text-4xl sm:text-center xs:text-center font-medium text-primary">
                    Desde cualquier zona del país
                </h2>
                <p className="text-lg text-gray-600 md:text-3xl sm:text-center xs:text-center font-semibold">
                    Sin filas, sin aglomeraciones, ni salas de espera
                </p>

                <p className="text-gray-600 text-lg md:text-3xl sm:text-center xs:text-center mb-8">
                    Atención inmediata o programada{" "}
                    <span className="font-semibold">¡Tú lo decides!</span>
                </p>

                <ButtonSecondary link="/prueba" color="bg-secondary" text="Pide una consulta gratis" />
                <ButtonSecondary link="/Consulta-Paciente" color="bg-primary" text="Mira el paso a paso" />

                {/* Logos de tiendas */}
                <div className="flex justify-between items-center w-full max-w-md bg-white py-8 px-4 rounded-b-xl">
                    <a
                        href="https://play.google.com/store/apps/details?id=com.devdvs.medicall.medicall24"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            src="https://medicall24.com.co/wp-content/uploads/2025/01/Recurso-1logosStore.png"
                            alt="Play Store"
                            className="w-48 md:w-60 h-auto"
                        />
                    </a>

                    <div className="transform rotate-90">
                        <Minus className="text-gray-400 w-10 h-10" />
                    </div>

                    <a
                        href="https://apps.apple.com/co/app/medicall24/id6661032000"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            src="https://medicall24.com.co/wp-content/uploads/2025/01/Recurso-2logosStore.png"
                            alt="App Store"
                            className="w-48 md:w-60 h-auto"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Principal;
