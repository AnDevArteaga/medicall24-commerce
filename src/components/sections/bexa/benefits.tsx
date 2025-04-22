import React, { useState } from "react";
import { CheckCircle, ChevronDown } from "lucide-react";
import ServiceItem from "./benefits-item";

const Benefits: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="overflow-hidden">
            <button
                onClick={toggleAccordion}
                className="flex justify-start items-center w-full text-left transition-colors duration-300"
            >
                <p className="font-medium text-gray-700 text-sm md:text-xl sm:text-base cursor-pointer">
                    Ver beneficios que incluye
                </p>
                <div
                    className={`transform transition-transform duration-300 ease-in-out ${
                        isOpen ? "rotate-180" : "rotate-0"
                    }`}
                >
                    <ChevronDown className="w-7 h-7 text-primary cursor-pointer" />
                </div>
            </button>

            <div
                className={`
          transition-all duration-300 ease-in-out 
          origin-top 
          ${
                    isOpen
                        ? "max-h-96 opacity-100 scale-y-100"
                        : "max-h-0 opacity-0 scale-y-0"
                }
        `}
            >
                <div className="p-4 space-y-3">
                    <ServiceItem
                        icon={
                            <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-orange-500 group-hover:text-orange-600 transition-colors duration-200 flex-shrink-0" />
                        }
                        text="Valoración por médico general para establecer la condición de salud de la paciente."
                    />
                    <ServiceItem
                        icon={
                            <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-orange-500 group-hover:text-orange-600 transition-colors duration-200 flex-shrink-0" />
                        }
                        text="⁠La realización del examen en las dos mamas."
                    />
                    <ServiceItem
                        icon={
                            <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-orange-500 group-hover:text-orange-600 transition-colors duration-200 flex-shrink-0" />
                        }
                        text="El análisis clínico para interpretar el resultado del examen, identificar si hay masas anormales en las mamas, y prescribir estudios complementarios."
                    />
                    <ServiceItem
                        icon={
                            <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-orange-500 group-hover:text-orange-600 transition-colors duration-200 flex-shrink-0" />
                        }
                        text="⁠La educación para que las mujeres se realicen el autoexamen correctamente."
                    />
                    <ServiceItem
                        icon={
                            <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-orange-500 group-hover:text-orange-600 transition-colors duration-200 flex-shrink-0" />
                        }
                        text="⁠La historia clínica de la atención."
                    />
                    <ServiceItem
                        icon={
                            <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-orange-500 group-hover:text-orange-600 transition-colors duration-200 flex-shrink-0" />
                        }
                        text="⁠La entrega inmediata del resultado del examen."
                    />
                </div>
            </div>
        </div>
    );
};

export default Benefits;
