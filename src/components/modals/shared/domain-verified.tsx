import React from 'react'
import { Info } from 'lucide-react'
import ButtonForm from '../../ui/button-forms';

interface DomainVerifiedProps {
  onClose: () => void;
}

const DomaninVerified: React.FC<DomainVerifiedProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600/50 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-1/2 sm:w-full md:max-w-md p-6 text-center">
        {/* Icono de Información */}
        <div className="flex justify-center mb-4">
          <Info className="text-primary" size={40} />
        </div>
        
        {/* Mensaje */}
        <p className="text-gray-700 text-sm">
          Hemos detectado un dominio de correo electrónico no común, verifica que el correo esté bien escrito.
        </p>

        {/* Botón de Cerrar */}
        <div className="mt-6">
          <ButtonForm onClick={onClose} text="Aceptar" />
        </div>
      </div>
    </div>
  )
}

export default DomaninVerified
