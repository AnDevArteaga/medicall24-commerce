import React from 'react'
import { CreditCard } from 'lucide-react'
import ButtonForm from '../ui/button-forms'

export interface FreeConsultExistingCardModalProps {
  last4: string
  loading?: boolean
  onKeep: () => void
  onChange: () => void
  onCancel: () => void
}

export const FreeConsultExistingCardModal: React.FC<
  FreeConsultExistingCardModalProps
> = ({ last4, loading, onKeep, onChange, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-600/50 z-[60] flex justify-center items-center backdrop-blur-sm px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="bg-primary text-white text-lg font-bold py-4 px-6 rounded-t-lg text-center">
          Tarjeta registrada
        </div>
        <div className="px-6 py-5 text-gray-700 space-y-4">
          <div className="flex items-start gap-3">
            <CreditCard className="text-primary shrink-0 mt-0.5" size={22} />
            <p className="text-sm leading-relaxed">
              Ya tienes una tarjeta registrada terminada en{' '}
              <strong className="text-primary">****{last4}</strong>. Puedes
              continuar con esa tarjeta o registrar una nueva.
            </p>
          </div>
        </div>
        <div className="px-6 py-4 flex flex-col sm:flex-row justify-between gap-3 rounded-b-lg bg-gray-50">
          <ButtonForm onClick={onCancel} text="Cancelar" disabled={loading} />
          <ButtonForm
            onClick={onChange}
            text="Cambiar tarjeta"
            disabled={loading}
          />
          <ButtonForm
            onClick={onKeep}
            text="Usar esta tarjeta"
            loading={loading}
            colorLoading="text-white"
            widthLoading={20}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  )
}
