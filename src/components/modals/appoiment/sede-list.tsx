import { Loader2, MapPin, Phone, User } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Institution, Sede } from "../../../interfaces/appoiment.interface";

interface SedeListProps {
    data: Sede[];
    onSelect: (sede: Sede) => void;
    loading: boolean;
    institutions: Institution;
}

export const SedeList: React.FC<SedeListProps> = (
    { data, onSelect, loading, institutions },
) => (
    <div className="bg-white w-full mx-auto">
        <div className="px-4 py-2 sm:px-1 bg-gray-200 flex items-center gap-4">
            <div className="flex-shrink-0">
                {institutions.cover
                    ? (
                        <img
                            src={institutions.cover}
                            alt="Prestador"
                            className="w-20 h-20 rounded-full object-cover border-2 border-pink-200"
                        />
                    )
                    : (
                        <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
                            <User className="text-primary w-8 h-8" />
                        </div>
                    )}
            </div>
            <div className="flex-1 font-semibold text-lg text-gray-800">
                {institutions.nombre_prestador}
            </div>
        </div>

        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-primary border-b pb-2 border-pink-200">
                Selecciona una sede
            </h2>

            {/* Primero mostrar el loading */}
            {loading
                ? (
                    <div className="flex justify-center items-center h-40">
                        <Loader2 className="animate-spin text-primary w-8 h-8" />
                    </div>
                )
                : data.length > 0
                ? (
                    <ul className="space-y-3">
                        {data.map((sede) => (
                            <li
                                key={sede.id}
                                className="p-4 border border-pink-100 rounded-lg hover:bg-pink-50 cursor-pointer flex items-center justify-between"
                                onClick={() => onSelect(sede)}
                            >
                                <div className="flex-1">
                                    <p className="font-semibold text-lg text-gray-800">
                                        {sede.name}
                                    </p>
                                    <p className="text-sm text-gray-600 flex items-center">
                                        <MapPin className="w-4 h-4 mr-2 text-primary" />
                                        {sede.address},{" "}
                                        {sede.municipality?.nombre}{" "}
                                        {sede.department?.nombre}
                                    </p>
                                    <p className="text-sm text-gray-600 flex items-center">
                                        <Phone className="w-4 h-4 mr-2 text-primary" />
                                        {sede.phone}
                                    </p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-pink-400" />
                            </li>
                        ))}
                    </ul>
                )
                : (
                    <p className="text-center text-lg text-gray-500">
                        No hay sedes disponibles
                    </p>
                )}
        </div>
    </div>
);
