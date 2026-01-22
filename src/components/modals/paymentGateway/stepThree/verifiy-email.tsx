import React from 'react'
import { usePurchaseContext } from '../../../../contexts/checkout'
import ButtonForm from '../../../ui/button-forms'
import { Info } from 'lucide-react'
import { useModal } from '../../../../contexts/modals'
import { usePaymentFlow } from '../../../../hooks/usePaymentFlow'
import { validateFields } from '../../../../utils/validate-fields'

const VerifiyEmail: React.FC = () => {
  const { executeAction } = usePaymentFlow()
  const { closeModal } = useModal()
  const { loading, purchaseData } = usePurchaseContext()
  const email = purchaseData.email
  return (
    <div className="fixed inset-0 bg-gray-600/50 z-20 flex justify-center items-center backdrop-blur-sm">
    <div className="bg-white rounded-lg shadow-lg w-auto md:max-w-md">
      {/* Header */}
      <div className="bg-primary text-white text-lg font-bold py-4 sm:py-2 px-6 rounded-t-lg text-center">
        Confirmar compra
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-4 text-gray-700 space-y-4">
        {/* Información arriba */}
        <div className="flex items-start gap-2 text-sm">
          <Info className="text-primary flex-shrink-0 mt-0.5" size={20} />
          <p>
            {email 
              ? "La información de tu compra será enviada al siguiente correo electrónico:"
              : "No hay correo electrónico asociado a tu compra, por favor regresa y escribe un correo electrónico."}
          </p>
        </div>

        {/* Correo abajo separado */}
        {email && (
          <div className="pt-4 border-t border-gray-200">
            <p className="text-base font-bold text-primary text-center">{email}</p>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="px-6 py-4 flex justify-between rounded-b-lg text-center">
        <ButtonForm
          onClick={() => closeModal("verifiyEmail")}
          text="Cancelar"
        />
        <ButtonForm 
        onClick={() => executeAction("paidStepThree")}
        text="Confirmar y pagar"
        loading={loading}
        colorLoading="text-white"
        widthLoading={20}
        disabled={!email || !validateFields(purchaseData, ["email"], true)}
      />
      </div>
    </div>
  </div>
  )
}

export default VerifiyEmail
