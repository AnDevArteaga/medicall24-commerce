import React from "react";
import { X } from "lucide-react";

interface ConsultationResultModalProps {
    result: any;
    onClose: () => void;
}

const ConsultationResultModal: React.FC<ConsultationResultModalProps> = ({
    result,
    onClose,
}) => {
    // Parsear los datos si vienen como string JSON
    const parseData = (data: any): any => {
        if (!data) return null;
        
        // Si es un string, intentar parsearlo como JSON
        if (typeof data === "string") {
            try {
                return JSON.parse(data);
            } catch {
                return data;
            }
        }
        
        return data;
    };

    const formatResult = (data: any): string => {
        if (!data) return "Sin datos";
        
        // Si es un objeto, convertirlo a JSON formateado
        try {
            return JSON.stringify(data, null, 2);
        } catch (error) {
            return String(data);
        }
    };

    // Obtener los datos parseados
    // El result.data puede ser el objeto completo del response o solo el campo data
    const responseData = result?.data;
    const parsedDataField = responseData?.data ? parseData(responseData.data) : null;
    
    // Extraer información relevante si existe
    // Primero intentar desde el campo data parseado, luego desde el objeto principal
    const appointmentData = parsedDataField || responseData;
    const appointmentId = appointmentData?.id || responseData?.id;
    const appointmentDate = appointmentData?.fecha || responseData?.fecha;
    const appointmentState = appointmentData?.state || responseData?.state;
    const successMessage = responseData?.message || result?.message;
    const isSuccess = result?.status === 200 || result?.status === 201 || responseData?.success === true;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Resultado de la Consulta
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Cerrar modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 overflow-y-auto">
                    {/* Success/Error Message */}
                    {successMessage && (
                        <div className={`mb-4 p-3 rounded-lg ${
                            isSuccess 
                                ? "bg-green-50 border border-green-200" 
                                : "bg-red-50 border border-red-200"
                        }`}>
                            <p className={`text-sm font-medium ${
                                isSuccess ? "text-green-800" : "text-red-800"
                            }`}>
                                {successMessage}
                            </p>
                        </div>
                    )}

                    {/* Status */}
                    {result?.status && (
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-600 mb-1">
                                Estado HTTP:
                            </p>
                            <p
                                className={`text-sm font-semibold ${
                                    result.status === 200 || result.status === 201
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                {result.status}
                            </p>
                        </div>
                    )}

                    {/* Appointment Info */}
                    {(appointmentId || parsedDataField) && (
                        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm font-semibold text-blue-800 mb-2">
                                Información de la Cita
                            </p>
                            <div className="space-y-1 text-sm text-blue-700">
                                {appointmentId && (
                                    <p><span className="font-medium">ID de Cita:</span> {appointmentId}</p>
                                )}
                                {appointmentDate && (
                                    <p>
                                        <span className="font-medium">Fecha:</span>{" "}
                                        {new Date(appointmentDate).toLocaleString("es-CO", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                )}
                                {appointmentState && (
                                    <p>
                                        <span className="font-medium">Estado:</span>{" "}
                                        <span className="capitalize">{appointmentState}</span>
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Error indicator */}
                    {result?.error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm font-medium text-red-800">
                                Error en la consulta
                            </p>
                        </div>
                    )}

                    {/* Data */}
                    <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">
                            Datos completos de respuesta:
                        </p>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 max-h-64 overflow-y-auto">
                            <pre className="text-xs text-gray-700 whitespace-pre-wrap break-words">
                                {formatResult(responseData || result?.data || result)}
                            </pre>
                        </div>
                    </div>

                    {/* Full result (for debugging) */}
                    {process.env.NODE_ENV === "development" && (
                        <div className="mt-4">
                            <p className="text-xs font-medium text-gray-500 mb-1">
                                Resultado completo (debug):
                            </p>
                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                <pre className="text-xs text-gray-600 whitespace-pre-wrap break-words">
                                    {formatResult(result)}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end p-4 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConsultationResultModal;

