import React from 'react'
import { useModal } from '../../../contexts/modals'
import { usePurchaseContext } from '../../../contexts/checkout'
import ButtonForm from '../../ui/button-forms'

const Efectivo: React.FC = () => {
  const { openModal } = useModal()
  const { creditData } = usePurchaseContext()

  const handleOpenAuthModal = () => {
    openModal('authAgenteRecaudador')
  }

  return (
    <div className="text-left">
      <h3 className="text-base font-bold mb-2 text-gray-700">
        Pago en efectivo
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        Autentícate como agente recaudador del prestador seleccionado para continuar con el pago en efectivo.
      </p>
      <ButtonForm
        text="Autenticar agente recaudador"
        onClick={handleOpenAuthModal}
      />
      <p className="mt-3 text-sm">
        <span className="font-semibold">Estado: </span>
        {creditData.efectivoAuthenticated ? (
          <span className="text-green-600 font-semibold">autenticado</span>
        ) : (
          <span className="text-red-600 font-semibold">no autenticado</span>
        )}
      </p>
    </div>
  )
}

export default Efectivo
