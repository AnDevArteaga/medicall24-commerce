import React from "react";
import Nequi1 from "../../../assets/img/Nequi1.webp";
import Nequi2 from "../../../assets/img/Nequi2.webp";

const TutorialNequi: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
        <div className="flex flex-row sm:flex-col gap-6 justify-center">
            {/* Primera instrucción */}
            <div className="bg-gray-50 rounded-lg p-4 transition-all hover:shadow-md flex-1">
                <div className="flex flex-col items-center">
                    <p className="text-center font-medium text-gray-800 mb-4 text-xs sm:text-base">
                        Entra a tu aplicación de Nequi y consulta las
                        notificaciones
                    </p>
                    <div className="rounded-lg overflow-hidden relative w-2/3">
                        <img
                            src={Nequi1}
                            alt="Notificaciones de Nequi"
                            className="w-auto h-auto"
                            style={{
                                userSelect: "none",
                                pointerEvents: "none",
                            }}
                        />
                        <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 rounded-bl-lg text-sm">
                            Paso 1
                        </div>
                    </div>
                </div>
            </div>

            {/* Segunda instrucción */}
            <div className="bg-gray-50 rounded-lg p-4 transition-all hover:shadow-md flex-1">
                <div className="flex flex-col items-center">
                    <p className="text-center text-xs font-medium text-gray-800 mb-4 sm:text-base">
                        Acepta el pago pendiente de MEDICALL24
                    </p>
                    <div className="rounded-lg overflow-hidden relative w-2/3">
                        <img
                            src={Nequi2}
                            alt="Botón aceptar en Nequi"
                            className="w-auto h-auto"
                            style={{
                                userSelect: "none",
                                pointerEvents: "none",
                            }}
                        />
                        <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 rounded-bl-lg text-sm">
                            Paso 2
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default TutorialNequi;