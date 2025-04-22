import React from "react";
import ButtonIndex from "../../ui/button-index";


const PlanesEmpresa: React.FC = () => {
    return (
        <main className="mx-auto flex flex-row md:flex-col sm:flex-col xs:flex-col items-center px-8 justify-center gap-8 bg-gray-200 py-16 sm:py-2 sm:pb-12 xs:pb-12 xs:py-2">
            <div className="flex flex-row sm:justify-center xs:justify-center items-center mt-5 gap-16 sm:flex-wrap-reverse xs:flex-wrap-reverse">
                {/* Imagen */}
                <div className="flex justify-center">
                    <div className="w-full sm:w-96 xs:w-95 flex flex-col items-center bg-white rounded-lg overflow-hidden shadow-lg">
                        <div className="w-80 sm:w-full xs:w-full h-full sm:h-64 xs:h-64 overflow-hidden rounded-lg">
                            <img
                                src="https://medicall24.com.co/wp-content/uploads/2025/01/imagenEmpresa-scaled.webp"
                                alt="Telemedicina para empresas"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Texto y Botón */}
                <div className="flex flex-col items-center space-y-2 text-center">
                    <div>
                        <p className="text-5xl sm:text-4xl xs:text-4xl text-gray-500">
                            Planes de
                        </p>
                        <p className="text-6xl sm:text-5xl xs:text-5xl font-bold text-gray-500">
                            Telemedicina
                        </p>
                        <p className="text-7xl sm:text-5xl xs:text-5xl font-extrabold text-primary mb-4">
                            Para Empresas
                        </p>
                    </div>

                    <p className="text-gray-600 text-3xl sm:text-xl xs:text-xl">
                        Reduce el ausentismo laboral
                    </p>

                    <ButtonIndex link="/empresas" />
                </div>
            </div>
        </main>
    );
};

export default PlanesEmpresa;
