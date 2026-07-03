import React from 'react'
import { Info } from 'lucide-react'
import ButtonForm from '../ui/button-forms'

export interface FreeConsultConfirmCitaEmailModalProps {
  email: string
  onCancel: () => void
  onConfirm: () => void
  loading?: boolean
}

export const FreeConsultConfirmCitaEmailModal: React.FC<
  FreeConsultConfirmCitaEmailModalProps
> = ({ email, onCancel, onConfirm, loading }) => {
  return (
    <div className="fixed inset-0 bg-gray-600/50 z-[60] flex justify-center items-center backdrop-blur-sm px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="bg-primary text-white text-lg font-bold py-4 px-6 rounded-t-lg text-center">
          Confirmar cita
        </div>
        <div className="px-6 py-4 text-gray-700 space-y-4">
          <div className="flex items-start gap-2 text-sm">
            <Info className="text-primary shrink-0 mt-0.5" size={20} />
            <p>
              La confirmación de tu cita se enviará al siguiente correo
              electrónico:
            </p>
          </div>
          {email ? (
            <div className="pt-2 border-t border-gray-200">
              <p className="text-base font-bold text-primary text-center break-all">
                {email}
              </p>
            </div>
          ) : (
            <p className="text-sm text-red-600">
              No hay correo registrado. Vuelve atrás y completa tus datos.
            </p>
          )}
        </div>
        <div className="px-6 py-4 flex justify-between gap-3 rounded-b-lg bg-gray-50">
          <ButtonForm onClick={onCancel} text="Cancelar" />
          <ButtonForm
            onClick={onConfirm}
            text="Confirmar y agendar"
            loading={loading}
            colorLoading="text-white"
            widthLoading={20}
            disabled={!email?.trim()}
          />
        </div>
      </div>
    </div>
  )
}
