import React from 'react'
import { X, AlertTriangle } from 'lucide-react'
import { useModal } from '../../contexts/modals'

interface ConfirmNegarModalProps {
  onConfirm: () => void
  nombreComprador?: string
}

const ConfirmNegarModal: React.FC<ConfirmNegarModalProps> = ({
  onConfirm,
  nombreComprador,
}) => {
  const { closeModal } = useModal()

  const handleConfirm = () => {
    onConfirm()
    closeModal('confirmNegar')
  }

  const handleCancel = () => {
    closeModal('confirmNegar')
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 relative">
        {/* Botón X para cerrar */}
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Cerrar"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Contenido */}
        <div className="p-6">
          {/* Icono de advertencia */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>

          {/* Título */}
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Confirmar Negación
          </h2>

          {/* Mensaje */}
          <div className="text-center mb-6">
            <p className="text-gray-700 mb-2">
              ¿Estás seguro de que deseas negar esta solicitud?
            </p>
            {nombreComprador && (
              <p className="text-sm text-gray-600 font-medium">
                Solicitante: {nombreComprador}
              </p>
            )}
            <p className="text-sm text-gray-500 mt-2">
              Esta acción enviará un correo de negación al solicitante y no se
              podrá deshacer.
            </p>
          </div>

          {/* Botones */}
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
            >
              Confirmar Negación
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmNegarModal
