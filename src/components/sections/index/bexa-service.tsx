import React from "react";
import bexa6 from "../../../assets/img/bexa6.png";
import ButtonIndex from "../../ui/button-index";

const ServiciosBexa: React.FC = () => {
    return (
        <main
            className="mx-auto py-6 px-8 flex items-center justify-center"
            style={{
                backgroundImage:
                    "url('https://medicall24.com.co/wp-content/uploads/2025/01/bexa5.png')",
                backgroundSize: "cover",
            }}
        >
            {/* Contenedor izquierdo fantasma */}
            <div className="flex-1 xs:hidden sm:hidden" />

            {/* Contenedor principal */}
            <div className="flex-1 flex justify-center mr-48 sm:mr-0 xs:mr-0">
                <div className="bg-white/90 p-8 rounded-xl max-w-xl w-full flex flex-col items-center space-y-6 transform -translate-x-10 md:translate-x-0 sm:translate-x-0 xs:translate-x-0 md:max-w-lg">
                    {/* Títulos */}
                    <div className="text-center">
                        <p className="text-5xl sm:text-4xl xs:text-4xl text-gray-500">
                            Examen{" "}
                            <span className="text-6xl sm:text-5xl xs:text-5xl font-bold">
                                Bexa
                            </span>
                        </p>
                        <p className="text-3xl sm:text-xl xs:text-xl text-gray-600 mt-6 mb-4">
                            Para detectar masas en mama
                        </p>
                        <p className="text-3xl sm:text-xl xs:text-xl font-semibold text-gray-600">
                            Sin dolor, sin radiación, con resultados inmediatos
                        </p>
                    </div>

                    {/* Imagen */}
                    <div className="w-full sm:w-72 xs:w-72 h-auto overflow-hidden rounded-lg">
                        <img
                            src={bexa6}
                            alt="Examen Bexa"
                            className="w-5/6 h-full object-cover"
                            style={{ objectPosition: "center top" }}
                        />
                    </div>

                    {/* Botón */}
                    <ButtonIndex link="/bexa" label="Más información" />
                </div>
            </div>
        </main>
    );
};

export default ServiciosBexa;
