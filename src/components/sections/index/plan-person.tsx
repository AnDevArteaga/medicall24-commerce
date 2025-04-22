import React from "react";
import ButtonIndex from "../../ui/button-index";

const backgroundStyles: React.CSSProperties = {
    backgroundImage:
        "url('https://medicall24.com.co/wp-content/uploads/2025/01/fondoPLanesInicio.png')",
    backgroundSize: "cover",
    backgroundPositionY: "70%",
};

const PlanesTelemedicina: React.FC = () => {
    return (
        <main
            className="mx-auto px-8 pt-12 sm:pt-0 xs:pt-0 pb-12 flex flex-row md:flex-col sm:flex-col xs:flex-col items-center justify-center gap-8"
            style={backgroundStyles}
        >
            <div className="flex flex-row sm:flex-col xs:flex-col items-center mt-5 gap-16">
                {/* Texto principal */}
                <div className="flex flex-col items-center text-center text-primary">
                    <h1 className="text-5xl sm:text-4xl xs:text-4xl font-normal">
                        Planes de
                    </h1>
                    <h2 className="text-7xl sm:text-5xl xs:text-5xl  font-bold">
                        Telemedicina
                    </h2>
                    <h3 className="text-5xl sm:text-4xl xs:text-4xl font-normal">
                        para personas
                    </h3>

                    <p className="text-3xl sm:text-xl xs:text-xl text-gray-600 mt-8">
                        Acceso rápido a la salud
                    </p>
                    <p className="text-3xl sm:text-xl xs:text-xl text-gray-600">
                        desde cualquier zona del país
                    </p>

                    {/* Botón */}
                    <ButtonIndex link="planes-telemedicina-personas" />
                </div>

                {/* Imagen */}
                <div className="flex justify-center">
                    <div className="w-full sm:w-96 flex flex-col items-center bg-white rounded-lg overflow-hidden shadow-lg">
                        <div className="w-full h-72 sm:h-64 overflow-hidden rounded-xl">
                            <img
                                src="https://medicall24.com.co/wp-content/uploads/2025/01/22711327-scaled.webp"
                                alt="Telemedicina"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PlanesTelemedicina;
