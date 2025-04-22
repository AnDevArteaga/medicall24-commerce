import React from "react";
import { ArrowLeft, Loader2, User } from "lucide-react";
import { Professional } from "../../../interfaces/appoiment.interface";

interface ProfessionalListProps {
    professionals: Professional[];
    loading: boolean;
    onBack: () => void;
    onSelect: (professional: Professional) => void;
}

export const ProfessionalList: React.FC<ProfessionalListProps> = (
    { professionals, loading, onBack, onSelect },
) => (
    <div className="bg-white p-6">
        <button
            onClick={onBack}
            className="flex items-center text-primary mb-6 font-medium cursor-pointer hover:text-primarydark"
        >
            <ArrowLeft className="w-4 h-4 mr-2" /> Volver
        </button>
        <h2 className="text-2xl font-bold mb-6 text-primary border-b pb-2 border-pink-200">
            Profesionales disponibles
        </h2>
        {loading
            ? (
                <div className="flex justify-center items-center h-40">
                    <Loader2 className="animate-spin text-primary w-8 h-8" />
                </div>
            )
            : (
                <ul className="space-y-3">
                    {professionals.map((prof) => (
                        <li
                            key={prof.id}
                            className="p-4 border border-pink-100 rounded-lg hover:bg-pink-50 cursor-pointer flex gap-4"
                            onClick={() => onSelect(prof)}
                        >
                            <div className="flex-shrink-0">
                                {prof.user.avatar
                                    ? (
                                        <img
                                            src={prof.user.avatar}
                                            alt={`${prof.user.name1} ${prof.user.lastname1}`}
                                            className="w-16 h-16 rounded-full object-cover border-2 border-pink-200"
                                        />
                                    )
                                    : (
                                        <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
                                            <User className="w-8 h-8 text-primary" />
                                        </div>
                                    )}
                            </div>
                            <div className="flex-1 text-gray-800">
                                <div className="font-semibold text-lg">
                                    {[
                                        prof.user.name1,
                                        prof.user.name2,
                                        prof.user.lastname1,
                                        prof.user.lastname2,
                                    ]
                                        .filter(Boolean)
                                        .map((name) =>
                                            name.charAt(0).toUpperCase() +
                                            name.slice(1).toLowerCase()
                                        )
                                        .join(" ")}
                                </div>
                                <div className="mt-1 px-2 py-1 bg-pink-100 text-primary rounded-full text-sm inline-block">
                                    MEDICINA GENERAL
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
    </div>
);
