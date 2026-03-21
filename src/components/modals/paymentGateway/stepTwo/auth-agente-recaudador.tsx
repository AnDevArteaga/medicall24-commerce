import React, { useState } from 'react'
import { X } from 'lucide-react'
import { usePurchaseContext } from '../../../../contexts/checkout'
import { useModal } from '../../../../contexts/modals'
import { loginAdmin } from '../../../../services/azure/auth'
import ButtonForm from '../../../ui/button-forms'
import InputText from '../../../ui/input'
import PasswordInput from '../../../ui/password-input'
import { togglePasswordVisibility } from '../../../../utils/handle-password'

const MODAL_NAME = 'authAgenteRecaudador'

export interface AuthAgenteRecaudadorModalProps {
  onSuccess?: () => void
}

const AuthAgenteRecaudadorModal: React.FC<AuthAgenteRecaudadorModalProps> = ({
  onSuccess,
}) => {
  const { registerPurchase, setCreditData, setValidations, setRegisterPurchase } =
    usePurchaseContext()
  const { closeModal, openModal } = useModal()
  const [showPassword, setShowPassword] = useState(false)
  const nit = registerPurchase?.identificacion_prestador ?? ''
  const nombrePrestador = registerPurchase?.nombre_institucion ?? ''

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [authenticated, setAuthenticated] = useState(false)

  const handleValidar = async () => {
    if (!nit?.trim()) {
      setError('Falta la identificación del prestador.')
      return
    }
    if (!email?.trim()) {
      setError('El correo electrónico es obligatorio.')
      return
    }
    if (!password?.trim()) {
      setError('La contraseña es obligatoria.')
      return
    }
    setError(null)
    setLoading(true)
    try {
      await loginAdmin({ nit, email, password })
      setAuthenticated(true)
      setCreditData((prev) => ({ ...prev, efectivoAuthenticated: true }))
      setRegisterPurchase((prev) => ({ ...prev, agente_efectivo_email: email }))
    } catch (err: unknown) {
      const axiosError = err as {
        response?: { data?: { message?: string }; status?: number }
      }
      const message =
        axiosError.response?.data?.message ??
        (axiosError.response?.status === 400
          ? 'Verifica los datos e intenta nuevamente.'
          : 'Error al autenticar. Intenta de nuevo.')
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleContinuar = () => {
    onSuccess?.()
    // Marcar facturación como pendiente (obligatoria) hasta que guarden en el modal
    setValidations((prev: any) => ({
      ...prev,
      billingCompleted: false,
    }))
    closeModal(MODAL_NAME)
    openModal('billingData')
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-[60] p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            Autenticación del agente recaudador
          </h2>
          <button
            type="button"
            onClick={() => closeModal(MODAL_NAME)}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Identificación del prestador (bloqueado) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Identificación del prestador
            </label>
            <input
              type="text"
              value={nit}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
            />
          </div>

          {/* Nombre del prestador (bloqueado) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del prestador
            </label>
            <input
              type="text"
              value={nombrePrestador}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
            />
          </div>

          {/* Correo electrónico */}
          <div>
            <InputText
              label="Correo electrónico"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError(null)
              }}
              type="email"
              obligatory
              placeholder="Ingresa tu correo electrónico"
              className="border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              errorMessage={null}
            />
          </div>

          {/* Contraseña */}
          <div>
            <PasswordInput
              label="Ingresa tu contraseña"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(null)
              }}
              showPassword={showPassword}
              togglePasswordVisibility={() =>
                togglePasswordVisibility(
                  'password',
                  showPassword,
                  setShowPassword,
                )
              }
              obligatory
              disabled={false}
              errorMessage={null}
              className="border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}

          {authenticated && (
            <div className="p-3 rounded-lg bg-green-50 text-green-700 text-sm font-medium">
              Autenticado correctamente
            </div>
          )}

          {!authenticated ? (
            <ButtonForm
              text={loading ? 'Validando…' : 'Validar'}
              onClick={handleValidar}
              disabled={loading}
              loading={loading}
            />
          ) : (
            <ButtonForm text="Continuar" onClick={handleContinuar} />
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthAgenteRecaudadorModal
