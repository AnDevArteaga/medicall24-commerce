import React from 'react'
import { useModal } from '../../../../contexts/modals'
import ButtonForm from '../../../ui/button-forms'

const Error: React.FC = () => {
    const { closeModal } = useModal()
  return (
    <div
    className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 backdrop-blur-sm"
    onClick={() => closeModal('errorPurchase')}
  >
    <div
      className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative flex flex-col items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={() => closeModal('errorPurchase')}
      >
        ✕
      </button>
      <h2 className="text-lg font-bold mb-4">Error en la compra</h2>
      <p className="text-gray-700 text-center mb-4">
        Algo salió mal en la compra. Verifique sus datos y vuelva a
        intentarlo.
      </p>
      <ButtonForm
      text='Cerrar'
      onClick={() => closeModal('errorPurchase')}
      />
    </div>
  </div>
  )
}

export default Error