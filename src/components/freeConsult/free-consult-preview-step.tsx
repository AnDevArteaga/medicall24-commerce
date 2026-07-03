import React from 'react'

import { ChevronRight } from 'lucide-react'

import ButtonForm from '../ui/button-forms'

import { usePurchaseContext } from '../../contexts/checkout'



function maskCardNumber(raw: string): string {

  const digits = raw.replace(/\D/g, '')

  if (digits.length < 4) return '••••'

  return `•••• •••• •••• ${digits.slice(-4)}`

}



export interface FreeConsultPreviewStepProps {
  onChangePayment: () => void
  onChangeBilling: () => void
  onConfirm: () => void
  /** Últimos 4 dígitos cuando se usa tarjeta ya guardada (sin pasar por el formulario). */
  savedCardLast4?: string | null
}



export const FreeConsultPreviewStep: React.FC<FreeConsultPreviewStepProps> = ({
  onChangePayment,
  onChangeBilling,
  onConfirm,
  savedCardLast4,
}) => {
  const { paymentMethod, registerPurchase } = usePurchaseContext()

  const cardDigits = paymentMethod.card.number.replace(/\D/g, '')
  const cardMasked =
    cardDigits.length >= 4
      ? maskCardNumber(paymentMethod.card.number)
      : savedCardLast4
        ? `•••• •••• •••• ${savedCardLast4}`
        : '•••• •••• •••• ••••'

  const exp =

    paymentMethod.card.expMonth && paymentMethod.card.expYear

      ? `${paymentMethod.card.expMonth}/${paymentMethod.card.expYear}`

      : '—'



  return (

    <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 max-w-xl mx-auto w-full space-y-6">

      <h2 className="text-primary text-lg font-semibold text-center">

        Confirma los datos registrados

      </h2>



      <div className="rounded-xl border border-gray-200 p-4 space-y-2">

        <p className="text-sm font-medium text-gray-800">

          Tarjeta (verificación)

        </p>

        <p className="text-sm text-gray-700">
          Débito / crédito {cardMasked}
        </p>
        <p className="text-sm text-gray-700">
          {paymentMethod.card.cardHolder?.trim() ||
            (savedCardLast4 && !paymentMethod.card.cardHolder?.trim()
              ? 'Tarjeta registrada'
              : '—')}
        </p>
        <p className="text-xs text-gray-500">
          {paymentMethod.card.expMonth && paymentMethod.card.expYear
            ? `Vence el ${exp}`
            : savedCardLast4
              ? 'Tarjeta verificada previamente'
              : `Vence el ${exp}`}
        </p>

        <button

          type="button"

          onClick={onChangePayment}

          className="text-primary text-sm font-medium inline-flex items-center gap-1 hover:underline mt-2"

        >

          Cambiar el método de pago <ChevronRight className="w-4 h-4" />

        </button>

      </div>



      <div>

        <p className="text-sm font-medium text-gray-800 mb-2">

          Datos de facturación

        </p>

        <div className="rounded-xl bg-gray-100 p-4 text-sm text-gray-800 space-y-1">

          <p>{registerPurchase.nombre_factura || '—'}</p>

          <p>{registerPurchase.direccion_factura || '—'}</p>

          <p>{registerPurchase.correo_factura || '—'}</p>

        </div>

        <button

          type="button"

          onClick={onChangeBilling}

          className="text-primary text-sm font-medium inline-flex items-center gap-1 hover:underline mt-2"

        >

          Cambiar datos de facturación <ChevronRight className="w-4 h-4" />

        </button>

      </div>



      <div className="flex justify-center pt-2">

        <ButtonForm

          text="Confirmar"

          onClick={onConfirm}

          className="rounded-full px-12"

        />

      </div>

    </div>

  )

}


