import React, { useEffect, useState } from 'react'
import { useGenerateTransaction } from '../../hooks/useGenerateTransaction'
import { CheckCircle, Clock, XCircle } from 'lucide-react'
import { OrderStatus } from '../../types/status'
import { usePurchaseContext } from '../../contexts/checkout'
import SeeEmail from './tutorials/see-email'
import ConsultationResultModal from './consultation-result-modal'
import TutorialNequi from './tutorials/nequi'

const FinalStep: React.FC = () => {
  const { status, message, consultationResult, selectedMethod } =
    usePurchaseContext()
  const { loading } = useGenerateTransaction()
  const [showConsultationModal, setShowConsultationModal] = useState(false)

  const getStatusColor = (status: OrderStatus) => {
    const statusLower = status?.toLowerCase()
    switch (statusLower) {
      case 'aprobada':
      case 'approved':
        return 'text-emerald-600'
      case 'rechazada':
      case 'error':
        return 'text-red-600'
      default:
        return 'text-amber-500'
    }
  }

  // Verificar si el estado es aprobado (tanto "aprobada" como "APPROVED")
  const isApproved =
    status?.toLowerCase() === 'aprobada' || status?.toUpperCase() === 'APPROVED'

  // Mostrar modal cuando haya un resultado de consultación
  useEffect(() => {
    if (consultationResult && isApproved) {
      // Esperar un poco para que el usuario vea el cambio de estado
      const timer = setTimeout(() => {
        setShowConsultationModal(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [consultationResult, isApproved])

  const handleCloseModal = () => {
    setShowConsultationModal(false)
    // Opcional: limpiar el resultado después de cerrar
    // setConsultationResult(null);
  }

  const getStatusIcon = (status: OrderStatus) => {
    const statusLower = status?.toLowerCase()
    if (statusLower === 'aprobada' || status?.toUpperCase() === 'APPROVED') {
      return <CheckCircle className="w-12 h-12 text-emerald-600" />
    }

    if (statusLower === 'rechazada' || statusLower === 'error') {
      return <XCircle className="w-12 h-12 text-red-600" />
    }

    // Si no hay status definido, regreso clock
    if (status === null || status === undefined) {
      return <Clock className="w-12 h-12 text-amber-500 animate-spin" />
    }

    // Si status es algo raro, igual muestro error
    return <XCircle className="w-12 h-12 text-red-600" />
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-600" />
      </div>
    )
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
            className={`text-xl font-medium ${getStatusColor(
              status
            )} text-center`}
          >
            {message}
          </p>
          {(status === null || status === undefined) && (
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg max-w-md">
              <p className="text-amber-800 text-center font-medium">
                Para que tu cita sea confirmada permanece en la página hasta
                completar el pago.
              </p>
            </div>
          )}
        </div>
        {status === null && selectedMethod === 'NEQUI' && <TutorialNequi />}

        {isApproved && <SeeEmail />}

        {/* Botón para ver resultado de consultación si existe */}
        {consultationResult && isApproved && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setShowConsultationModal(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              Ver Resultado de Consultación
            </button>
          </div>
        )}
      </div>

      {/* Modal de resultado de consultación */}
      {showConsultationModal && consultationResult && (
        <ConsultationResultModal
          result={consultationResult}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default FinalStep
