import React from 'react'
import { X, CheckCircle, Mail, KeyRound } from 'lucide-react'
import ButtonForm from '../../../ui/button-forms'
import { useModal } from '../../../../contexts/modals'
import { usePurchaseContext } from '../../../../contexts/checkout'
import { useRecoveryPassword } from '../../../../hooks/useRecoveryPassword'
import PasswordInput from '../../../ui/password-input'
import InputText from '../../../ui/input'
import { togglePasswordVisibility } from '../../../../utils/handle-password'

interface RecoveryPasswordModalProps {
  email: string
  typeId: string
  identification: string
}

const RecoveryPasswordModal: React.FC<RecoveryPasswordModalProps> = ({
  email,
  typeId,
  identification,
}) => {
  const { closeModal, openModal } = useModal()
  const { handleNext } = usePurchaseContext()
  const {
    step,
    loading,
    error,
    formData,
    showPassword,
    showConfirmPassword,
    passwordError,
    canResend,
    resendTimer,
    setShowPassword,
    setShowConfirmPassword,
    sendRecoveryCode,
    handleChangePassword,
    // handleResendCode,
    resetToStepOne,
    handleInputChange,
    reset,
  } = useRecoveryPassword(email)

  const handleClose = () => {
    reset()
    closeModal('recoveryPassword')
  }

  const handleSuccessContinue = () => {
    reset()
    closeModal('recoveryPassword')
    closeModal('userRegistered')
    handleNext()
    openModal('selectAllieBexa')
  }

  // Obtener el nombre del tipo de ID
  const getTypeIdName = (typeId: string): string => {
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-30">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 relative">
        {/* Botón X para cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Cerrar"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Recuperar Contraseña
          </h2>
        </div>

        {/* Stepper */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-center gap-4">
            {/* Paso 1 */}
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  step >= 1
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step > 1 ? <CheckCircle className="w-5 h-5" /> : 1}
              </div>
              <span
                className={`text-sm font-medium ${
                  step >= 1 ? 'text-primary' : 'text-gray-500'
                }`}
              >
                Solicita el código
              </span>
            </div>

            {/* Línea conectora */}
            <div
              className={`h-0.5 w-12 ${
                step >= 2 ? 'bg-primary' : 'bg-gray-300'
              }`}
            />

            {/* Paso 2 */}
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  step >= 2
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step > 2 ? <CheckCircle className="w-5 h-5" /> : 2}
              </div>
              <span
                className={`text-sm font-medium ${
                  step >= 2 ? 'text-primary' : 'text-gray-500'
                }`}
              >
                Cambiar Contraseña
              </span>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="px-6 py-6">
          {/* Paso 1: Enviar código */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <Mail className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Verifica tus datos
                </h3>
                <p className="text-sm text-gray-600">
                  Revisa que la información sea correcta antes de solicitar el
                  código de recuperación.
                </p>
              </div>

              <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <label className="text-xs font-medium text-gray-500">
                    Tipo de Identificación
                  </label>
                  <p className="text-sm font-semibold text-gray-800 mt-1">
                    {getTypeIdName(typeId)}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500">
                    Número de Identificación
                  </label>
                  <p className="text-sm font-semibold text-gray-800 mt-1">
                    {identification}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500">
                    Correo Electrónico
                  </label>
                  <p className="text-sm font-semibold text-gray-800 mt-1">
                    {email}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">
                    Si no tienes acceso a tu correo electrónico, puedes
                    solicitar una pqr para actualizarlo{' '}
                    <a
                      href="https://www.medicall24.com/pqr"
                      target="_blank"
                      className="text-primary font-semibold underline"
                    >
                      aquí
                    </a>
                    .
                  </span>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <ButtonForm
                onClick={sendRecoveryCode}
                text={loading ? 'Enviando...' : 'Solicitar código'}
                disabled={loading}
              />
            </div>
          )}

          {/* Paso 2: Cambiar contraseña */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center">
                <KeyRound className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Ingresa el código y nueva contraseña
                </h3>
                <p className="text-sm text-gray-600">
                  Hemos enviado un código a <strong>{email}</strong>
                </p>
              </div>

              {/* Input código */}
              <InputText
                label="Código de Recuperación"
                name="validationCode"
                value={formData.validationCode}
                onChange={handleInputChange}
                type="text"
                obligatory
                placeholder="Ingresa el código de 6 dígitos"
                maxLength={6}
                errorMessage={error && error.includes('código') ? error : null}
                className="text-center text-lg tracking-widest uppercase"
              />

              {/* Input nueva contraseña */}
              <PasswordInput
                label="Nueva Contraseña"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                obligatory
                showPassword={showPassword}
                togglePasswordVisibility={() =>
                  togglePasswordVisibility(
                    'password',
                    showPassword,
                    setShowPassword
                  )
                }
                errorMessage={passwordError}
                className="border-2 border-gray-300 focus:border-primary"
              />

              {/* Input confirmar contraseña */}
              <PasswordInput
                label="Confirmar Nueva Contraseña"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                obligatory
                showPassword={showConfirmPassword}
                togglePasswordVisibility={() =>
                  togglePasswordVisibility(
                    'confirmPassword',
                    showConfirmPassword,
                    setShowConfirmPassword
                  )
                }
                errorMessage={passwordError}
                className="border-2 border-gray-300 focus:border-primary"
              />

              {/* Error general */}
              {error && !error.includes('código') && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Botón no llegó código */}
              <div className="text-center pt-2">
                <button
                  onClick={canResend ? resetToStepOne : undefined}
                  disabled={!canResend}
                  className={`text-sm font-medium transition-colors ${
                    canResend
                      ? 'text-primary hover:underline cursor-pointer'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {canResend
                    ? 'No me llegó el código'
                    : `No me llegó el código (${resendTimer}s)`}
                </button>
              </div>

              {/* Botón cambiar contraseña */}
              <ButtonForm
                onClick={handleChangePassword}
                text={loading ? 'Cambiando...' : 'Cambiar Contraseña'}
                disabled={
                  loading ||
                  !formData.validationCode ||
                  formData.validationCode.length < 6 ||
                  !formData.password ||
                  !formData.confirmPassword
                }
              />
            </div>
          )}

          {/* Paso 3: Éxito */}
          {step === 3 && (
            <div className="space-y-6 text-center">
              <div>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  ¡Contraseña Actualizada!
                </h3>
                <p className="text-sm text-gray-600">
                  Tu contraseña ha sido cambiada exitosamente. Ya puedes
                  continuar con tu compra.
                </p>
              </div>

              <ButtonForm onClick={handleSuccessContinue} text="Continuar" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RecoveryPasswordModal
