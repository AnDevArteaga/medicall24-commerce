import React from 'react'
import { useGenerateTransaction } from '../../hooks/useGenerateTransaction'
import { CheckCircle, Clock, XCircle, Calendar } from 'lucide-react'
import { OrderStatus } from '../../types/status'
import { usePurchaseContext } from '../../contexts/checkout'
import SeeEmail from './tutorials/see-email'
import TutorialNequi from './tutorials/nequi'
import { useModal } from '../../contexts/modals'

const FinalStep: React.FC = () => {
  const { status, message, selectedMethod, consultationResult } = usePurchaseContext()
  const { loading } = useGenerateTransaction()
  const { openModal } = useModal()

  // Verificar si hay una consulta exitosa
  const hasSuccessfulConsultation = consultationResult && 
    (consultationResult.status === 200 || consultationResult.status === 201) &&
    (consultationResult.data?.success === true || consultationResult.data?.data)

  const handleViewConsultation = () => {
    if (consultationResult) {
      openModal("consultationResult", { result: consultationResult })
    }
  }

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

        {/* Botón para ver información de la cita cuando fue asignada correctamente */}
        {isApproved && hasSuccessfulConsultation && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleViewConsultation}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primarydark transition-colors duration-200 flex items-center gap-2 font-medium shadow-md hover:shadow-lg"
            >
              <Calendar className="w-5 h-5" />
              Ver Información de la Cita
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FinalStep
