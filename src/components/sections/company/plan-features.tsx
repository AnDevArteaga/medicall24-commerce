import React from "react";
import paciente from "../../../assets/img/paciente.webp";
import { CheckCircle } from "lucide-react";

const FeauturesPlan: React.FC = () => {
    return (
        <div className="container mx-auto flex flex-row sm:flex-col-reverse md:flex-col-reverse space-x-20 sm:space-x-0 md:flex-row items-center justify-center gap-8">
            {/* Imagen con tamaño fijo */}
            <div className="w-80 md:w-1/2 rounded-3xl overflow-hidden">
                <img
                    src={paciente}
                    alt="image"
                    className="w-full h-auto transition-transform transform scale-100 hover:scale-110 hover:rotate-1 hover:translate-y-[-5px] duration-300"
                />
            </div>

            {/* Información con ancho más pequeño */}
            <div className="w-3/6 sm:w-full md:w-full text-left md:text-center text-justify sm:text-left">
                <h1 className="text-5xl md:text-3xl sm:text-4xl font-bold md:leading-normal">
                    <span className="font-bold bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent">
                        Acceso rápido
                    </span>{" "}
                    <span className="text-gray-600">
                        a la salud sin salir del trabajo
                    </span>
                </h1>

                {/* Secciones con CheckCircle */}
                <div className="mt-4 flex items-start gap-3 text-gray-600">
                    <CheckCircle className="text-primary w-6 h-6 sm:w-3 sm:h-3 md:w-8 md:h-8 mt-1 flex-shrink-0" />
                    <p className="md:text-left md:text-2xl text-sm">
                        Disminuye el ausentismo laboral con los planes de
                        Telemedicina para trabajadores, que también brindan
                        cobertura para sus familias.
                    </p>
                </div>

                <div className="mt-4 flex items-start gap-3 text-gray-600">
                    <CheckCircle className="text-primary w-6 h-6 md:w-8 sm:w-3 sm:h-3 md:h-8 mt-1 flex-shrink-0" />
                    <p className="md:text-left md:text-2xl text-sm">
                        Atención rápida, segura y de calidad, garantizada a
                        través de la App para dispositivos móviles MEDICALL24, o
                        mediante nuestras Cabinas de Telemedicina Insonorizadas
                        que brindan una experiencia cómoda y agradable.
                    </p>
                </div>

                {/* Última sección con ArrowRight */}
                <div className="mt-4 flex items-start gap-3 text-gray-600">
                    <CheckCircle className="text-primary w-6 h-6 md:w-8 sm:w-3 sm:h-3 md:h-8 mt-1 flex-shrink-0" />
                    <div>
                        <p className="md:text-left md:text-2xl text-sm">
                            Los pacientes podrán descargar en línea los
                            documentos generados durante la atención, tales
                            como:
                        </p>
                        <ul className="mt-2 pl-8 list-disc md:text-left md:text-2xl text-sm">
                            <li>Historias clínicas</li>
                            <li>Fórmulas de medicamentos</li>
                            <li>Órdenes médicas</li>
                            <li>Remisiones y certificados de incapacidad</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-4 flex items-start gap-3 text-gray-600">
                    <CheckCircle className="text-primary w-6 h-6 md:w-8 sm:w-3 sm:h-3 md:h-8 mt-1 flex-shrink-0" />
                    <p className="md:text-left md:text-2xl text-sm">
                        Los planes de telemedicina pueden incluir la entrega de
                        los medicamentos prescritos durante las consultas.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FeauturesPlan;
