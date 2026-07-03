import React from 'react'
import { AlertCircle } from 'lucide-react'
import ButtonForm from '../ui/button-forms'

export interface FreeConsultAlertModalProps {
  title: string
  message: string
  onClose: () => void
  closeLabel?: string
}

export const FreeConsultAlertModal: React.FC<FreeConsultAlertModalProps> = ({
  title,
  message,
  onClose,
  closeLabel = 'Entendido',
}) => {
  return (
    <div className="fixed inset-0 bg-gray-600/50 z-[60] flex justify-center items-center backdrop-blur-sm px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="bg-primary text-white text-lg font-bold py-4 px-6 rounded-t-lg text-center">
          {title}
        </div>
        <div className="px-6 py-4 text-gray-700 space-y-3">
          <div className="flex items-start gap-2 text-sm">
            <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={20} />
            <p className="whitespace-pre-wrap">{message}</p>
          </div>
        </div>
        <div className="px-6 py-4 flex justify-center rounded-b-lg bg-gray-50">
          <ButtonForm onClick={onClose} text={closeLabel} />
        </div>
      </div>
    </div>
  )
}
