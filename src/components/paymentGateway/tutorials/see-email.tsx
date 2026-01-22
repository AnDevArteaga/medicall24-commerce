import React from "react";
import { MailCheck } from "lucide-react";
const SeeEmail: React.FC = () => {
    return (                   
         <div className="flex flex-col items-center justify-center p-4 bg-green-100 text-green-800 rounded-lg shadow-md w-full max-w-2xl mx-auto">
        <MailCheck className="w-12 h-12 text-green-800" />
        <p className="text-left ml-6 text-base sm:text-base font-regular">
            En los próximos minutos recibirás un correo
            electrónico con la confirmación de tu compra
        </p>
    </div>
    )
}

export default SeeEmail