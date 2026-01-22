import React, { useState } from 'react'
import { PurchaseData } from '../../../../interfaces/checkout.interfase'
import ButtonForm from '../../../ui/button-forms'
// import { X } from "lucide-react";
import { usePurchaseContext } from '../../../../contexts/checkout'
import meddipayLogo from '../../../../assets/svg/meddipay-logo.svg'

interface ValidateMeddipayCupoModalProps {
  purchaseData: PurchaseData
  onCancel: () => void
  onValidate: (creditoAprobado: string) => void
  loading?: boolean
}

// Función para capitalizar texto
const capitalizeText = (text: string): string => {
  if (!text) return ''
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

const ValidateMeddipayCupoModal: React.FC<ValidateMeddipayCupoModalProps> = ({
  purchaseData,
  onCancel,
  onValidate,
  loading = false,
}) => {
  const { typesId } = usePurchaseContext()
  const [creditoAprobado, setCreditoAprobado] = useState<string>('')
  const [errorCredito, setErrorCredito] = useState<string | null>(null)

  // Función para separar nombres/apellidos, manejando casos sin espacios
  const splitName = (fullName: string | undefined): string[] => {
    if (!fullName) return ['', '']
    // Si ya tiene espacios, dividir por espacios
    if (fullName.includes(' ')) {
      return fullName.split(' ').filter(Boolean)
    }
    // Si no tiene espacios, intentar dividir por mayúsculas (ej: "JorgeMario" -> ["Jorge", "Mario"])
    const matches = fullName.match(/[A-Z][a-z]+/g)
    if (matches && matches.length >= 2) {
      return matches
    }
    // Si no se puede dividir, devolver el nombre completo como primer nombre
    return [fullName, '']
  }

  // Separar nombres y apellidos y capitalizarlos
  const nombres = splitName(purchaseData.names)
  const primerNombre = capitalizeText(nombres[0] || '')
  const segundoNombre = capitalizeText(nombres[1] || '')

  const apellidos = splitName(purchaseData.lastNames)
  const primerApellido = capitalizeText(apellidos[0] || '')
  const segundoApellido = capitalizeText(apellidos[1] || '')

  const handleValidate = () => {
    // Remover separadores de miles antes de validar
    const numericValue = creditoAprobado.replace(/\D/g, '')
    if (!numericValue || numericValue.trim() === '') {
      setErrorCredito('El campo crédito aprobado es obligatorio')
      return
    }
    setErrorCredito(null)
    // Enviar el valor numérico sin formato
    onValidate(numericValue)
  }

  // Obtener nombre del tipo de ID
  const getTypeIdName = (typeId: string): string => {
    if (typesId && typesId.length > 0) {
      const foundType = typesId.find((t) => t.code === typeId)
      if (foundType) {
        return foundType.description
      }
    }
    const typeNames: Record<string, string> = {
      CC: 'Cédula de Ciudadanía',
      CE: 'Cédula de Extranjería',
      PA: 'Pasaporte',
      TI: 'Tarjeta de Identidad',
      NIT: 'NIT',
    }
    return typeNames[typeId] || typeId
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col">
        {/* Contenido scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Título y logo */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Solicitud para validar cupo aprobado
              </h2>
              <img
                src={meddipayLogo}
                alt="Meddipay Logo"
                className="h-12 w-auto"
              />
            </div>

            {/* Texto informativo */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700 mb-2">
                Al solicitar la validación del cupo aprobado por Meddipay, tus
                datos serán enviados a nuestra central para verificar tu
                capacidad de crédito con esta entidad financiera. Una vez tu
                solicitud sea aprobada, enviaremos la invitación a tu cuenta de
                Meddipay para que confirmes el valor a pagar y legalices el
                crédito que vas a recibir.
              </p>
              <p className="text-sm text-gray-700">
                Cuando termines de legalizar tu crédito con Meddipay, recibirás
                el código de autorización con el que podrás finalizar la compra
                en el comercio de MEDICALL24.
              </p>
            </div>

            {/* Título de sección */}
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Datos de comprador para validar cupo en Meddipay
            </h3>

            {/* Formulario con datos bloqueados */}
            <div className="grid grid-cols-2 gap-4">
              {/* Tipo de identificación */}
              <div>
                <label className="block text-gray-700 font-medium text-xs mb-1">
                  Tipo de identificación
                </label>
                <input
                  type="text"
                  value={getTypeIdName(purchaseData.typeId || '')}
                  disabled
                  className="w-full px-3 py-1.5 text-xs bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed border-2 border-gray-300"
                />
              </div>

              {/* Identificación */}
              <div>
                <label className="block text-gray-700 font-medium text-xs mb-1">
                  Identificación
                </label>
                <input
                  type="text"
                  value={purchaseData.identification || ''}
                  disabled
                  className="w-full px-3 py-1.5 text-xs bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed border-2 border-gray-300"
                />
              </div>

              {/* Primer nombre */}
              <div>
                <label className="block text-gray-700 font-medium text-xs mb-1">
                  Primer nombre
                </label>
                <input
                  type="text"
                  value={primerNombre}
                  disabled
                  className="w-full px-3 py-1.5 text-xs bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed border-2 border-gray-300"
                />
              </div>

              {/* Segundo nombre */}
              <div>
                <label className="block text-gray-700 font-medium text-xs mb-1">
                  Segundo nombre
                </label>
                <input
                  type="text"
                  value={segundoNombre}
                  disabled
                  className="w-full px-3 py-1.5 text-xs bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed border-2 border-gray-300"
                />
              </div>

              {/* Primer apellido */}
              <div>
                <label className="block text-gray-700 font-medium text-xs mb-1">
                  Primer apellido
                </label>
                <input
                  type="text"
                  value={primerApellido}
                  disabled
                  className="w-full px-3 py-1.5 text-xs bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed border-2 border-gray-300"
                />
              </div>

              {/* Segundo apellido */}
              <div>
                <label className="block text-gray-700 font-medium text-xs mb-1">
                  Segundo apellido
                </label>
                <input
                  type="text"
                  value={segundoApellido}
                  disabled
                  className="w-full px-3 py-1.5 text-xs bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed border-2 border-gray-300"
                />
              </div>

              {/* Correo electrónico */}
              <div>
                <label className="block text-gray-700 font-medium text-xs mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={purchaseData.email || ''}
                  disabled
                  className="w-full px-3 py-1.5 text-xs bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed border-2 border-gray-300"
                />
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-gray-700 font-medium text-xs mb-1">
                  Teléfono
                </label>
                <input
                  type="text"
                  value={purchaseData.phone || ''}
                  disabled
                  className="w-full px-3 py-1.5 text-xs bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed border-2 border-gray-300"
                />
              </div>

              {/* Crédito Aprobado */}
              <div className="col-span-2">
                <label className="block text-gray-700 font-medium text-xs mb-1">
                  Crédito aprobado en Meddipay{' '}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={creditoAprobado}
                  onChange={(e) => {
                    // Remover todos los caracteres que no sean números
                    const numericValue = e.target.value.replace(/\D/g, '')

                    // Formatear inmediatamente con separadores de miles
                    if (numericValue) {
                      const formattedValue =
                        Number(numericValue).toLocaleString('es-CO')
                      setCreditoAprobado(formattedValue)
                    } else {
                      setCreditoAprobado('')
                    }

                    if (errorCredito) setErrorCredito(null)
                  }}
                  placeholder="Ingrese el monto del crédito aprobado"
                  className={`w-full px-3 py-1.5 text-xs rounded-lg border-2 ${
                    errorCredito
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-primary'
                  } focus:outline-none`}
                  disabled={loading}
                />
                {errorCredito && (
                  <p className="text-red-500 text-xs mt-1">{errorCredito}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer con botones fijos */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50 sticky bottom-0">
          <ButtonForm onClick={onCancel} disabled={loading} text="Cancelar" />
          <ButtonForm
            onClick={handleValidate}
            text="Validar cupo"
            disabled={loading}
            loading={loading}
            colorLoading="text-white"
            widthLoading={20}
          />
        </div>
      </div>
    </div>
  )
}

export default ValidateMeddipayCupoModal
