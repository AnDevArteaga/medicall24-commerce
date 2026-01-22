import React from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { DayAvailable } from "../../../interfaces/appoiment.interface";

interface DaysListProps {
    days: DayAvailable[];
    loading: boolean;
    onBack: () => void;
    onSelect: (day: DayAvailable) => void;
}

export const DaysList: React.FC<DaysListProps> = (
    { days, loading, onBack, onSelect },
) => (
    <div className="bg-white p-6 w-full mx-auto">
        <button
            className="flex items-center text-primary mb-6 font-medium hover:text-primarydark cursor-pointer"
            onClick={onBack}
        >
            <ArrowLeft className="w-4 h-4 mr-2" /> Volver
        </button>
        <h2 className="text-2xl font-bold mb-6 text-primary border-b pb-2 border-pink-200">
            Días disponibles
        </h2>
        {loading
            ? (
                <div className="flex justify-center items-center h-40">
                    <Loader2 className="animate-spin text-primary w-8 h-8" />
                </div>
            )
            : (
                <ul className="space-y-3">
                    {days.map((day) => (
                        <li
                            key={day.date}
                            className="p-4 border border-pink-100 rounded-lg hover:bg-pink-50 cursor-pointer flex items-center"
                            onClick={() => onSelect(day)}
                        >
                            <div className="flex-1 pr-4 border-r border-pink-200">
                                <p className="text-sm text-primary font-medium mb-1">
                                    Horario
                                </p>
                                <p className="font-semibold text-gray-800">
                                    {day.time?.length > 0
                                        ? day.time.join(" / ")
                                        : "No disponible"}
                                </p>
                            </div>
                            <div className="flex-1 pl-4">
                                <p className="font-semibold text-lg text-gray-800">
                                    {day.fecha}
                                </p>
                                {day.specialty && (
                                    <div className="mt-1 px-2 py-1 bg-pink-100 text-primary rounded-full text-xs inline-block">
                                        {day.specialty}
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
    </div>
);
