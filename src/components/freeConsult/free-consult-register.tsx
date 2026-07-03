import React from 'react'
import { AlertCircle } from 'lucide-react'
import Input from '../ui/input'
import SelectInput from '../ui/select-map'
import PasswordInput from '../ui/password-input'
import ButtonForm from '../ui/button-forms'
import { usePurchaseContext } from '../../contexts/checkout'
import { useRegister } from '../../hooks/useRegister'
import { useModal } from '../../contexts/modals'
import { getInputClass } from '../../utils/forms'
import {
  validateFields,
  validateStates,
} from '../../utils/validate-fields'
import { togglePasswordVisibility } from '../../utils/handle-password'
import { termBexaPackageContent } from '../modals/term&cond/bexa/content-terms'
import type { Validations } from '../../interfaces/validations.interface'

export interface FreeConsultRegisterProps {
  className?: string
  /** Tras confirmar datos y registro exitoso (modal Siguiente) */
  onRegisterComplete: () => void
}

export const FreeConsultRegister: React.FC<FreeConsultRegisterProps> = ({
  className = '',
  onRegisterComplete,
}) => {
  const { isRegistered, registerData, setRegisterData, validations } =
    usePurchaseContext()
  const {
    handleInputChange,
    verifyUser,
    typesId,
    showPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    setShowPassword,
    errors,
    handleValidateDomainEmail,
  } = useRegister()
  const { openModal, closeModal } = useModal()

  const setGender = (g: 'F' | 'M') => {
    setRegisterData((prev) => ({
      ...prev,
      user: { ...prev.user, gender: g },
    }))
  }

  const canSubmit = validateFields(
    registerData,
    [
      'user.identification',
      'user.typeId',
      'user.name1',
      'user.lastName1',
      'user.email',
      'user.password',
      'user.confirmPassword',
      'user.birthDate',
      'user.phone',
      'user.gender',
    ],
    validateStates(validations as Validations, [
      'emailValid',
      'passwordMatch',
    ]),
  )

  return (
    <div className={`bg-white rounded-2xl shadow-md p-6 sm:p-8 w-full max-w-5xl mx-auto ${className}`.trim()}>
      <div className="text-center mb-6">
        <h2 className="text-primary text-lg sm:text-xl font-semibold tracking-wide uppercase">
          Completa el registro del usuario
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Ingresa tus datos personales para crear tu usuario en MEDICALL24
        </p>
      </div>

      <h3 className="text-primary font-semibold text-center mb-6">
        Crea una cuenta en MEDICALL24
      </h3>

      <form className="space-y-4" autoComplete="off" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <SelectInput
            label="Tipo de identificación"
            name="typeId"
            value={registerData.user.typeId || ''}
            onChange={handleInputChange}
            onBlur={verifyUser}
            obligatory
            disabled={isRegistered}
            options={typesId}
            className={getInputClass(
              registerData.user,
              'typeId',
              'border-2 border-gray-300',
              'border-2 border-primary',
            )}
            valueKey="code"
            labelKey="description"
          />
          <div>
            <Input
              label="Número de identificación"
              name="identification"
              value={registerData.user.identification || ''}
              onChange={handleInputChange}
              onBlur={verifyUser}
              obligatory
              disabled={isRegistered}
              type="text"
              errorMessage={null}
              placeholder="Ingresa los datos"
              className={getInputClass(
                registerData.user,
                'identification',
                'border-2 border-gray-300',
                'border-2 border-primary',
              )}
            />
            <div className="flex flex-row space-x-2 mt-1">
              <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-gray-700">
                La identificación no se puede modificar al finalizar el registro
              </p>
            </div>
          </div>
          <Input
            label="Primer nombre"
            name="name1"
            value={registerData.user.name1 || ''}
            onChange={handleInputChange}
            obligatory
            disabled={isRegistered}
            type="text"
            errorMessage={null}
            placeholder="Ingresa los datos"
            className={getInputClass(
              registerData.user,
              'name1',
              'border-2 border-gray-300',
              'border-2 border-primary',
            )}
          />
          <Input
            label="Segundo nombre"
            name="name2"
            value={registerData.user.name2 || ''}
            onChange={handleInputChange}
            obligatory={false}
            disabled={isRegistered}
            type="text"
            errorMessage={null}
            placeholder="Ingresa los datos"
            className="border-2 border-gray-300"
          />
          <Input
            label="Primer apellido"
            name="lastName1"
            value={registerData.user.lastName1 || ''}
            onChange={handleInputChange}
            obligatory
            disabled={isRegistered}
            type="text"
            errorMessage={null}
            placeholder="Ingresa los datos"
            className={getInputClass(
              registerData.user,
              'lastName1',
              'border-2 border-gray-300',
              'border-2 border-primary',
            )}
          />
          <Input
            label="Segundo apellido"
            name="lastName2"
            value={registerData.user.lastName2 || ''}
            onChange={handleInputChange}
            obligatory={false}
            disabled={isRegistered}
            type="text"
            errorMessage={null}
            placeholder="Ingresa los datos"
            className="border-2 border-gray-300"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            label="Correo electrónico"
            name="email"
            value={registerData.user.email || ''}
            onChange={handleInputChange}
            obligatory
            disabled={isRegistered}
            type="email"
            errorMessage={errors.email}
            placeholder="Ingresa los datos"
            className={getInputClass(
              registerData.user,
              'email',
              'border-2 border-gray-300',
              'border-2 border-primary',
            )}
            onBlur={() =>
              handleValidateDomainEmail(registerData.user.email || '')
            }
          />
          <Input
            label="Fecha de nacimiento"
            name="birthDate"
            value={registerData.user.birthDate || ''}
            onChange={handleInputChange}
            obligatory
            disabled={isRegistered}
            type="text"
            errorMessage={null}
            placeholder="DD/MM/AAAA"
            className="border-2 border-gray-300"
          />
          <Input
            label="Teléfono"
            name="phone"
            value={registerData.user.phone || ''}
            onChange={handleInputChange}
            obligatory
            disabled={isRegistered}
            type="text"
            errorMessage={null}
            placeholder="Ingresa los datos"
            className="border-2 border-gray-300"
          />
          <div>
            <p className="text-sm font-medium text-gray-800 mb-2">
              Género biológico <span className="text-red-600">*</span>
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                disabled={isRegistered}
                onClick={() => setGender('F')}
                className={`rounded-full px-6 py-2 text-sm border-2 transition-colors ${
                  registerData.user.gender === 'F'
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 text-gray-700 hover:border-primary'
                }`}
              >
                Femenino
              </button>
              <button
                type="button"
                disabled={isRegistered}
                onClick={() => setGender('M')}
                className={`rounded-full px-6 py-2 text-sm border-2 transition-colors ${
                  registerData.user.gender === 'M'
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 text-gray-700 hover:border-primary'
                }`}
              >
                Masculino
              </button>
            </div>
          </div>
        </div>

        {!isRegistered && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <PasswordInput
              label="Contraseña"
              name="password"
              value={registerData.user.password || ''}
              onChange={handleInputChange}
              obligatory
              disabled={isRegistered}
              showPassword={showPassword}
              togglePasswordVisibility={() =>
                togglePasswordVisibility('password', showPassword, setShowPassword)
              }
              errorMessage={null}
              className={getInputClass(
                registerData.user,
                'password',
                'border-2 border-gray-300',
                'border-2 border-primary',
              )}
            />
            <PasswordInput
              label="Confirmar contraseña"
              name="confirmPassword"
              value={registerData.user.confirmPassword || ''}
              onChange={handleInputChange}
              obligatory
              disabled={isRegistered}
              showPassword={showConfirmPassword}
              togglePasswordVisibility={() =>
                togglePasswordVisibility(
                  'confirmPassword',
                  showConfirmPassword,
                  setShowConfirmPassword,
                )
              }
              errorMessage={errors.confirmPassword}
              className={getInputClass(
                registerData.user,
                'confirmPassword',
                'border-2 border-gray-300',
                'border-2 border-primary',
              )}
            />
          </div>
        )}
      </form>

      <p className="mt-4 text-xs">
        <span className="text-red-600 mr-1">*</span>Campos obligatorios
      </p>

      <div className="flex justify-center mt-6">
        <ButtonForm
          onClick={() => {
            openModal('termCond', {
              next: true,
              onClose: () => closeModal('termCond'),
              content: termBexaPackageContent,
              headerTitle:
                'TÉRMINOS Y CONDICIONES DE USO Y POLÍTICA DE PRIVACIDAD DE LOS CANALES VIRTUALES DE MEDICALL24 SAS',
              onClick: () => {
                closeModal('termCond')
                openModal('confirmData', {
                  registerExtras: {
                    newUserModalProps: {
                      flow: 'freeConsult',
                      onRegisterContinue: onRegisterComplete,
                    },
                  },
                })
              },
            })
          }}
          text="Registrarse"
          disabled={!canSubmit}
          className="rounded-full px-12 py-2"
        />
      </div>
    </div>
  )
}
