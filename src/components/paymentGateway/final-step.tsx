import React from "react";
import { useGenerateTransaction } from "../../hooks/useGenerateTransaction";
import { CheckCircle, Clock, MailCheck, XCircle } from "lucide-react";
import { OrderStatus } from "../../types/status";
import { usePurchaseContext } from "../../contexts/checkout";

const FinalStep: React.FC = () => {
    const { status, message } = usePurchaseContext();
    const { loading } = useGenerateTransaction();

    const getStatusColor = (status: OrderStatus) => {
        switch (status?.toLowerCase()) {
            case "aprobada":
                return "text-emerald-600";
            case "rechazada":
            case "error":
                return "text-red-600";
            default:
                return "text-amber-500";
        }
    };

    const getStatusIcon = (status: OrderStatus) => {
        console.log("status", status);
        if (status === "aprobada") {
            return <CheckCircle className="w-12 h-12 text-emerald-600" />;
        }

        if (status === "rechazada" || status === "error") {
            return <XCircle className="w-12 h-12 text-red-600" />;
        }

        // Si no hay status definido, regreso clock
        if (status === null || status === undefined) {
            return <Clock className="w-12 h-12 text-amber-500 animate-spin" />;
        }

        // Si status es algo raro, igual muestro error
        return <XCircle className="w-12 h-12 text-red-600" />;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-600" />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-2 md:p-8 animate-fadeIn">
            <div className="bg-white p-6 md:p-8">
                <div className="flex flex-col items-center mb-4">
                    {getStatusIcon(status)}
                    <h1 className="text-3xl text-center font-bold text-gray-800 mt-4 mb-2">
                        Estado de la Transacción
                    </h1>
                    <p
                        className={`text-xl font-medium ${
                            getStatusColor(status)
                        } text-center`}
                    >
                        {message}
                    </p>
                </div>

                {
                    /* {order.paymentMethod === "NEQUI" && order.status === null && (
              <TutorialNequi />
            )} */
                }

                {status === "aprobada" && (
                    <div className="flex flex-col items-center justify-center p-4 bg-green-100 text-green-800 rounded-lg shadow-md w-full max-w-2xl mx-auto">
                        <MailCheck className="w-12 h-12 text-green-800" />
                        <p className="text-left ml-6 text-base sm:text-base font-regular">
                            En los próximos minutos recibirás un correo
                            electrónico con la confirmación de tu compra
                        </p>
                        <div className="mt-4 p-3 bg-green-200 rounded-lg w-full flex flex-col justify-center">
                            <p className="text-lg font-semibold text-left mb-4">
                                Para conocer cómo puedes acceder al servicio que
                                adquiriste, sigue el paso a paso para solicitar
                                tu cita
                            </p>
                            <a
                                className="underline text-pink-600 font-bold text-3xl text-center"
                                href="/pasos-bexa/4"
                            >
                                Ver paso a paso
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FinalStep;
