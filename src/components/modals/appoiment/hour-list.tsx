import React from "react";
import { ArrowLeft, Clock, Loader2 } from "lucide-react";
import { HourAvailable } from "../../../interfaces/appoiment.interface";

interface HoursListProps {
    hours: HourAvailable[];
    loading: boolean;
    onBack: () => void;
}

export const HoursList: React.FC<HoursListProps> = (
    { hours, loading, onBack },
) => (
    <div className="bg-white p-6 w-full mx-auto">
        <button
            className="flex items-center text-primary mb-6 font-medium hover:text-primarydark cursor-pointer"
            onClick={onBack}
        >
            <ArrowLeft className="w-4 h-4 mr-2" /> Volver
        </button>
        <h2 className="text-2xl font-bold mb-6 text-primary border-b pb-2 border-pink-200">
            Horas disponibles
        </h2>
        {loading
            ? (
                <div className="flex justify-center items-center h-40">
                    <Loader2 className="animate-spin text-primary w-8 h-8" />
                </div>
            )
            : hours.length > 0
            ? (
                <ul className="grid grid-cols-2 gap-3">
                    {hours.map((hour, index) => (
                        <li
                            key={index}
                            className="p-3 border border-pink-100 rounded-lg hover:bg-pink-50 cursor-pointer flex items-center justify-center"
                        >
                            <Clock className="w-4 h-4 mr-2 text-primary" />
                            <span className="font-medium">{hour.fecha}</span>
                        </li>
                    ))}
                </ul>
            )
            : (
                <div className="p-4 bg-pink-50 rounded-lg text-center text-gray-700">
                    <p className="mb-2 font-medium">No hay horas disponibles</p>
                    <p className="text-sm text-gray-600">
                        Por favor selecciona otra fecha u otro profesional.
                    </p>
                </div>
            )}
    </div>
);
