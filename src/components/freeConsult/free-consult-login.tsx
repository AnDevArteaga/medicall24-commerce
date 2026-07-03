import React, { FormEvent, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import SelectInput from '../ui/select-map'
import Input from '../ui/input'
import PasswordInput from '../ui/password-input'
import ButtonForm from '../ui/button-forms'
import RecoveryPassword from '../modals/paymentGateway/stepOne/recovery-password'
import { useModal } from '../../contexts/modals'
import { fetchTypeId, checkUserRegistrationService } from '../../services/azure/user'
import { simpleLogin } from '../../services/azure/auth'
import { ensureUsuarioComercio } from '../../services/supabase/usuario-comercio'
import { TypeId } from '../../interfaces/types-id'
import { togglePasswordVisibility } from '../../utils/handle-password'
import { usePurchaseContext } from '../../contexts/checkout'
import { buildFullName } from '../../utils/forms'

function toNum(v: unknown): number | undefined {
  if (typeof v === 'number' && !Number.isNaN(v)) return v
  if (typeof v === 'string' && v.trim() !== '') {
    const n = parseInt(v, 10)
    return Number.isNaN(n) ? undefined : n
  }
  return undefined
}

function mapSimpleLoginUser(data: Record<string, unknown>) {
  const u =
    (data.user as Record<string, unknown> | undefined) ??
    (data.data as Record<string, unknown> | undefined) ??
    data
  const id =
    toNum(u.id) ??
    toNum(data.userId) ??
    toNum(data.id) ??
    toNum(u.userId) ??
    0
  return {
    id,
    email: String(u.email ?? data.email ?? ''),
    identification: String(u.identification ?? ''),
    typeId: String(u.typeId ?? u.type_id ?? ''),
    name1: String(u.name1 ?? ''),
    name2: String(u.name2 ?? ''),
    lastname1: String(u.lastname1 ?? u.lastName1 ?? ''),
    lastname2: String(u.lastname2 ?? u.lastName2 ?? ''),
    phone: String(u.phone ?? ''),
  }
}

export interface FreeConsultLoginProps {
  className?: string
  /**
   * Se llama tras autenticación correcta.
   */
  onContinueAfterLogin?: () => void
  /** Ir al formulario de registro (crear cuenta) */
  onGoToRegister?: () => void
}

export const FreeConsultLogin: React.FC<FreeConsultLoginProps> = ({
  className = '',
  onContinueAfterLogin,
  onGoToRegister,
}) => {
  const { isModalOpen, getModalProps, openModal } = useModal()
  const { setUserId, setPurchaseData, setRegisterData } = usePurchaseContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [authLoading, setAuthLoading] = useState(false)

  const [typesId, setTypesId] = useState<TypeId[]>([])
  const [typesLoading, setTypesLoading] = useState(true)
  const [showRecoveryFields, setShowRecoveryFields] = useState(false)
  const [recoveryTypeId, setRecoveryTypeId] = useState('')
  const [recoveryIdentification, setRecoveryIdentification] = useState('')
  const [forgotLoading, setForgotLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const list = await fetchTypeId()
        if (!cancelled) setTypesId(list)
      } finally {
        if (!cancelled) setTypesLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const handleRecoverySelectChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (e.target.name === 'recoveryTypeId') setRecoveryTypeId(e.target.value)
    },
    [],
  )

  const handleRecoveryIdentificationChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRecoveryIdentification(e.target.value.replace(/[^0-9]/g, ''))
    },
    [],
  )

  const handleForgotPassword = useCallback(async () => {
    if (!recoveryTypeId || !recoveryIdentification.trim()) {
      toast.error(
        'Selecciona tu tipo de identificación e ingresa el número de documento para buscar tu cuenta.',
      )
      return
    }
    setForgotLoading(true)
    try {
      const data = await checkUserRegistrationService(
        recoveryTypeId,
        recoveryIdentification.trim(),
      )
      const user = data?.user
      if (user?.email) {
        openModal('recoveryPassword', {
          email: user.email,
          typeId: user.typeId ?? recoveryTypeId,
          identification: String(user.identification ?? recoveryIdentification),
        })
        setShowRecoveryFields(false)
      } else {
        toast.error('No encontramos una cuenta con esos datos.')
      }
    } catch {
      toast.error('No encontramos una cuenta con esos datos.')
    } finally {
      setForgotLoading(false)
    }
  }, [recoveryTypeId, recoveryIdentification, openModal])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const emailTrim = email.trim().toLowerCase()
    if (!emailTrim || !password.trim()) {
      toast.error('Ingresa correo electrónico y contraseña.')
      return
    }
    setAuthLoading(true)
    try {
      const data = await simpleLogin({
        email: emailTrim,
        password: password,
      })
      const user = mapSimpleLoginUser(data as Record<string, unknown>)
      if (!user.id) {
        toast.error(
          'Inicio de sesión correcto pero no recibimos el identificador de usuario. Contacta a soporte.',
        )
        return
      }
      setUserId(user.id)
      const { fullName, fullLastName } = buildFullName(
        user.name1,
        user.name2,
        user.lastname1,
        user.lastname2,
      )
      setPurchaseData((prev) => ({
        ...prev,
        identification: user.identification || prev.identification,
        typeId: user.typeId || prev.typeId,
        names: fullName || prev.names,
        lastNames: fullLastName || prev.lastNames,
        email: user.email || emailTrim,
        phone: user.phone || prev.phone,
      }))
      setRegisterData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          typeId: user.typeId || prev.user.typeId,
          identification: user.identification || prev.user.identification,
          name1: user.name1 || prev.user.name1,
          name2: user.name2 || prev.user.name2,
          lastName1: user.lastname1 || prev.user.lastName1,
          lastName2: user.lastname2 || prev.user.lastName2,
          email: user.email || emailTrim,
        },
      }))
      await ensureUsuarioComercio({
        id_usuario_medicall: user.id,
        tipo_identificacion: user.typeId,
        identificacion: user.identification,
        email: user.email || emailTrim,
      })
      toast.success('Bienvenido.')
      onContinueAfterLogin?.()
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const msg =
          (err.response?.data as { message?: string })?.message ??
          (err.response?.data as { title?: string })?.title ??
          err.message
        toast.error(
          typeof msg === 'string' && msg
            ? msg
            : 'Credenciales incorrectas o no pudimos iniciar sesión.',
        )
      } else {
        toast.error('No pudimos validar tu cuenta. Intenta de nuevo.')
      }
    } finally {
      setAuthLoading(false)
    }
  }

  return (
    <>
      <section
        className={`relative flex flex-col justify-center ${className}`.trim()}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_center,_#9ca3af_1px,_transparent_1px)] bg-size-[24px_24px]"
          aria-hidden
        />
        <div className="relative z-[1] max-w-md mx-auto w-full">
          <p className="text-gray-600 text-lg mb-6 text-center sm:text-left">
            Si ya tienes una cuenta autentica tu usuario.
          </p>

          <form
            className="space-y-4"
            onSubmit={handleSubmit}
            autoComplete="on"
          >
            <Input
              label="Correo electrónico"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              obligatory
              type="email"
              errorMessage={null}
              className="border-2 border-gray-300"
              autoComplete="username"
            />
            <PasswordInput
              label="Contraseña"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              obligatory
              showPassword={showPassword}
              togglePasswordVisibility={() =>
                togglePasswordVisibility(
                  'password',
                  showPassword,
                  setShowPassword,
                )
              }
              errorMessage={null}
              className="border-2 border-gray-300 pr-10 bg-white"
            />

            <div className="pt-2 flex justify-center">
              <ButtonForm
                type="submit"
                text={authLoading ? 'Validando…' : 'Autenticar'}
                className="w-auto px-10 py-1 text-xl"
                disabled={authLoading}
              />
            </div>
          </form>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={() => setShowRecoveryFields((v) => !v)}
              className="w-full text-center text-gray-600 hover:text-primary underline cursor-pointer text-sm transition-colors"
            >
              {showRecoveryFields
                ? 'Ocultar recuperación de contraseña'
                : 'Olvidé mi contraseña'}
            </button>

            {showRecoveryFields && (
              <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-4 space-y-3">
                <p className="text-xs text-gray-700 leading-relaxed">
                  Para recuperar tu contraseña, ingresa{' '}
                  <strong>tu tipo de identificación</strong> y el{' '}
                  <strong>número de documento</strong> con los que estás
                  registrado; buscaremos tu cuenta y te enviaremos el enlace al
                  correo asociado.
                </p>
                <SelectInput
                  label="Tipo de identificación"
                  name="recoveryTypeId"
                  value={recoveryTypeId}
                  onChange={handleRecoverySelectChange}
                  obligatory
                  options={typesId}
                  loading={typesLoading}
                  className="border-2 border-gray-300"
                  valueKey="code"
                  labelKey="description"
                />
                <Input
                  label="Número de identificación"
                  name="recoveryIdentification"
                  value={recoveryIdentification}
                  onChange={handleRecoveryIdentificationChange}
                  obligatory
                  type="text"
                  errorMessage={null}
                  className="border-2 border-gray-300"
                />
                <div className="flex justify-center pt-1">
                  <ButtonForm
                    type="button"
                    text={forgotLoading ? 'Buscando…' : 'Buscar mi cuenta'}
                    onClick={() => void handleForgotPassword()}
                    disabled={forgotLoading}
                    className="w-auto px-6"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 flex flex-col items-center gap-2">
            {onGoToRegister ? (
              <button
                type="button"
                onClick={onGoToRegister}
                className="text-gray-600 text-primary cursor-pointer text-2xl hover:underline transition-colors bg-transparent border-0"
              >
                Crear una cuenta
              </button>
            ) : (
              <a
                href="/registro"
                className="text-gray-600 text-primary cursor-pointer text-2xl hover:underline transition-colors"
              >
                Crear una cuenta
              </a>
            )}
          </div>
        </div>
      </section>

      {isModalOpen('recoveryPassword') &&
        (() => {
          const recoveryProps = getModalProps<{
            email: string
            typeId: string
            identification: string
          }>('recoveryPassword')
          return recoveryProps ? (
            <RecoveryPassword
              email={recoveryProps.email}
              typeId={recoveryProps.typeId}
              identification={recoveryProps.identification}
              onSuccessContinue={() =>
                toast.success(
                  'Contraseña actualizada. Ya puedes autenticarte con tu nueva contraseña.',
                )
              }
            />
          ) : null
        })()}
    </>
  )
}
