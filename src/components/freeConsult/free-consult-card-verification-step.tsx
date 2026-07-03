import React, { useCallback, useEffect, useState } from 'react'
import { RotateCw } from 'lucide-react'
import InputText from '../ui/input'
import SelectInput from '../ui/select-map'
import ButtonForm from '../ui/button-forms'
import InputCheck from '../ui/checkbox'
import { usePurchaseContext } from '../../contexts/checkout'
import { useSelectDataPurchase } from '../../hooks/useSelectDataPurchase'
import { buildFullName, getInputClass } from '../../utils/forms'
import { fetchWompiAcceptanceTokens } from '../../services/wompi/acceptance-tokens'
import type { WompiAcceptancePair } from '../../services/wompi/acceptance-tokens'
import { useModal } from '../../contexts/modals'
import { getConsent } from '../../services/azure/consents'
import ConsentModal from '../modals/paymentGateway/stepTwo/consent-modal'
import { Appointment } from '../../contexts/appoiment'

export interface FreeConsultCardVerificationSubmitPayload {
  customer_email: string
  acceptance_token: string
  accept_personal_auth: string
}

export interface FreeConsultCardVerificationStepProps {
  onContinue: (
    payload: FreeConsultCardVerificationSubmitPayload,
    options?: { forceReplace?: boolean },
  ) => void | Promise<void>
  consentAccepted: boolean
  onConsentAcceptedChange: (accepted: boolean) => void
  verifying?: boolean
}

export const FreeConsultCardVerificationStep: React.FC<
  FreeConsultCardVerificationStepProps
> = ({ onContinue, consentAccepted, onConsentAcceptedChange, verifying }) => {
  const {
    paymentMethod,
    registerData,
    setPaymentMethod,
    purchaseData,
    setPurchaseData,
  } = usePurchaseContext()
  const { createAppointmentData } = Appointment()
  const { isModalOpen, getModalProps, closeModal, openModal } = useModal()
  const { handleSelectPaymentMethod } = useSelectDataPurchase()
  // const [notDefault, setNotDefault] = useState(false)
  const [usePatient, setUsePatient] = useState(false)
  const [busy, setBusy] = useState(false)
  const [payerEmail, setPayerEmail] = useState(
    () => purchaseData.email?.trim() ?? '',
  )
  /** Un solo check visible; controla política de privacidad y habeas data (Wompi). */
  const [acceptWompiTerms, setAcceptWompiTerms] = useState(true)
  const [acceptTokens, setAcceptTokens] = useState<WompiAcceptancePair | null>(
    null,
  )
  const [acceptLoading, setAcceptLoading] = useState(false)
  const [acceptError, setAcceptError] = useState<string | null>(null)
  const [loadingConsent, setLoadingConsent] = useState(false)

  const consentProps = getModalProps<{
    name?: string
    description?: string
  }>('consentModal')

  const wompiPublicKey =
    (import.meta.env.VITE_WOMPI_PUBLIC_KEY as string | undefined)?.trim() ?? ''

  const loadAcceptanceTokens = useCallback(async (): Promise<
    WompiAcceptancePair | null
  > => {
    if (!wompiPublicKey) {
      setAcceptTokens(null)
      setAcceptError(
        'Falta configurar VITE_WOMPI_PUBLIC_KEY para obtener las aceptaciones de Wompi.',
      )
      return null
    }
    setAcceptLoading(true)
    setAcceptError(null)
    console.log('[Wompi] Recargando tokens de aceptación…')
    try {
      const tokens = await fetchWompiAcceptanceTokens(wompiPublicKey)
      setAcceptTokens(tokens)
      setAcceptError(null)
      console.log('[Wompi] Tokens de aceptación OK', {
        acceptance_token: `${tokens.acceptance_token.slice(0, 12)}…`,
        accept_personal_auth: `${tokens.accept_personal_auth.slice(0, 12)}…`,
      })
      return tokens
    } catch (e: unknown) {
      setAcceptTokens(null)
      const msg =
        e instanceof Error
          ? e.message
          : 'No se pudieron cargar las aceptaciones de Wompi.'
      console.error('[Wompi] Error cargando tokens de aceptación:', msg, e)
      setAcceptError(msg)
      return null
    } finally {
      setAcceptLoading(false)
    }
  }, [wompiPublicKey])

  useEffect(() => {
    void loadAcceptanceTokens()
  }, [loadAcceptanceTokens])

  const applyPatientInfo = (checked: boolean) => {
    setUsePatient(checked)
    if (!checked) return
    const { fullName, fullLastName } = buildFullName(
      registerData.user.name1,
      registerData.user.name2,
      registerData.user.lastName1,
      registerData.user.lastName2,
    )
    const holder = `${fullName} ${fullLastName}`.trim()
    const email = registerData.user.email?.trim() ?? ''
    setPaymentMethod((prev) => ({
      ...prev,
      card: {
        ...prev.card,
        cardHolder: holder,
      },
    }))
    setPayerEmail(email)
    setPurchaseData((prev) => ({
      ...prev,
      email: email || prev.email,
    }))
  }

  const onEmailChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const v = e.target.value
    setPayerEmail(v)
    setPurchaseData((prev) => ({ ...prev, email: v }))
  }

  const holderTrim = (paymentMethod.card.cardHolder ?? '').trim()
  const holderOk = holderTrim.length >= 5
  const cardOk =
    holderOk &&
    paymentMethod.card.number?.replace(/\s/g, '').length >= 14 &&
    paymentMethod.card.cvc?.trim() &&
    paymentMethod.card.expMonth &&
    paymentMethod.card.expYear

  const emailOk = payerEmail.trim().length > 3 && payerEmail.includes('@')
  const acceptOk =
    acceptWompiTerms && !!acceptTokens && !acceptError && !acceptLoading

  const canContinue = cardOk && emailOk && acceptOk && consentAccepted

  const handleConsentCheckbox = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!e.target.checked) {
      onConsentAcceptedChange(false)
      return
    }
    const institutionId = createAppointmentData.institutionId
    if (!institutionId) {
      e.target.checked = false
      return
    }
    setLoadingConsent(true)
    try {
      const consentData = await getConsent({
        typeServiceId: 3,
        institutionId,
      })
      openModal('consentModal', {
        name: consentData.name,
        description: consentData.description,
      })
    } catch (err) {
      console.error(err)
      e.target.checked = false
    } finally {
      setLoadingConsent(false)
    }
  }

  const handleConsentAccept = () => {
    onConsentAcceptedChange(true)
    closeModal('consentModal')
  }

  const handleConsentCancel = () => {
    closeModal('consentModal')
  }

  return (
    <div className="bg-white rounded-2xl shadow-md py-12 px-20 max-w-xl mx-auto w-full space-y-4">
      <h2 className="text-gray-700 text-sm text-center">
        Agrega una tarjeta crédito o débito
      </h2>

      <InputCheck
        id="use-patient-card"
        label="Usar la información del paciente (nombre y correo)"
        checked={usePatient}
        onChange={(e) => {
          const c = e.target.checked
          if (c) applyPatientInfo(true)
          else setUsePatient(false)
        }}
      />

      <InputText
        type="email"
        name="payerEmail"
        placeholder="Correo del pagador (Wompi)"
        onChange={onEmailChange}
        value={payerEmail}
        obligatory
        errorMessage={null}
        label="Correo electrónico"
        className="border-2 border-gray-300 focus:border-primary"
        autoComplete="email"
      />

      <InputText
        type="text"
        name="cardHolder"
        placeholder="Nombre en la tarjeta (mín. 5 caracteres)"
        onChange={handleSelectPaymentMethod}
        value={paymentMethod.card.cardHolder || ''}
        obligatory
        errorMessage={null}
        label="Nombre en la tarjeta"
        className={getInputClass(
          paymentMethod.card,
          'cardHolder',
          'border-2 border-gray-300',
          'border-2 border-primary',
        )}
        autoComplete="off"
      />
      <InputText
        type="text"
        name="number"
        maxLength={19}
        placeholder="Número de la tarjeta"
        onChange={handleSelectPaymentMethod}
        value={paymentMethod.card.number}
        obligatory
        errorMessage={null}
        label="Número de la tarjeta"
        className={getInputClass(
          paymentMethod.card,
          'number',
          'border-2 border-gray-300',
          'border-2 border-primary',
        )}
        autoComplete="off"
      />

      <div className="grid grid-cols-2 gap-3">
        <SelectInput
          label="Mes"
          name="expMonth"
          value={paymentMethod.card.expMonth || ''}
          onChange={handleSelectPaymentMethod}
          obligatory
          options={Array.from({ length: 12 }, (_, i) => ({
            value: String(i + 1).padStart(2, '0'),
            label: String(i + 1).padStart(2, '0'),
          }))}
          valueKey="value"
          labelKey="label"
          className={getInputClass(
            paymentMethod.card,
            'expMonth',
            'border-2 border-gray-300',
            'border-2 border-primary',
          )}
        />
        <SelectInput
          label="Año"
          name="expYear"
          obligatory
          value={paymentMethod.card.expYear || ''}
          onChange={handleSelectPaymentMethod}
          options={Array.from({ length: 15 }, (_, i) => {
            const year = new Date().getFullYear() + i
            const y = year.toString().slice(-2)
            return { value: y, label: y }
          })}
          valueKey="value"
          labelKey="label"
          className={getInputClass(
            paymentMethod.card,
            'expYear',
            'border-2 border-gray-300',
            'border-2 border-primary',
          )}
        />
      </div>
      <div className="grid grid-cols-2">
        <InputText
          type="text"
          name="cvc"
          maxLength={4}
          placeholder="CVV"
          onChange={handleSelectPaymentMethod}
          value={paymentMethod.card.cvc}
          obligatory
          errorMessage={null}
          label="CVV"
          className={getInputClass(
            paymentMethod.card,
            'cvc',
            'border-2 border-gray-300',
            'border-2 border-primary',
          )}
          autoComplete="off"
        />
      </div>

      <div className="space-y-2 pt-2 border-t border-gray-100">
        <p className="text-xs text-gray-600 font-medium">
          Aceptaciones requeridas por Wompi
        </p>
        <div className="flex items-start gap-2">
          <div className="flex-1 min-w-0">
            <InputCheck
              id="accept-wompi-terms"
              label="He leído y acepto la política de privacidad y autorizo el tratamiento de mis datos personales"
              checked={acceptWompiTerms}
              onChange={(e) => setAcceptWompiTerms(e.target.checked)}
            />
          </div>
          <button
            type="button"
            title="Recargar tokens de aceptación Wompi"
            aria-label="Recargar tokens de aceptación Wompi"
            disabled={acceptLoading || verifying}
            onClick={() => void loadAcceptanceTokens()}
            className="mt-0.5 shrink-0 rounded-full p-2 text-primary hover:bg-primary/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <RotateCw
              className={`w-5 h-5 ${acceptLoading ? 'animate-spin' : ''}`}
            />
          </button>
        </div>
        {acceptTokens?.privacyPermalink ? (
          <a
            href={acceptTokens.privacyPermalink}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xs text-primary underline ml-7"
          >
            Ver política de privacidad
          </a>
        ) : null}
        {acceptTokens?.personalDataPermalink ? (
          <a
            href={acceptTokens.personalDataPermalink}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xs text-primary underline ml-7"
          >
            Ver autorización de datos personales
          </a>
        ) : null}
        {acceptLoading ? (
          <p className="text-xs text-gray-500 ml-7">Cargando aceptaciones…</p>
        ) : null}
        {acceptError ? (
          <p className="text-xs text-red-600 ml-7">{acceptError}</p>
        ) : null}
      </div>

      <div className="flex items-start gap-2 pt-1">
        <InputCheck
          id="consent-free-card"
          label="Acepto el consentimiento informado para esta atención"
          checked={consentAccepted}
          onChange={handleConsentCheckbox}
          disabled={loadingConsent}
        />
      </div>

      {/* <InputCheck
        id="not-default-pm"
        label="Marca si no deseas dejar este método de pago predeterminado"
        checked={notDefault}
        onChange={() => setNotDefault((v) => !v)}
      /> */}

      <div className="flex flex-col items-center pt-2">
        {verifying && (
          <p className="text-sm text-gray-600 text-center mb-4 max-w-md">
            Verificando tu tarjeta con un cargo temporal de $1.500 COP. Si se
            aprueba, lo anulamos de inmediato. Puede tardar hasta 25 segundos.
          </p>
        )}
        <ButtonForm
          text={verifying ? 'Verificando tarjeta…' : 'Continuar'}
          onClick={() => {
            void (async () => {
              if (!canContinue || busy || verifying || !acceptTokens) return
              setBusy(true)
              try {
                await onContinue({
                  customer_email: payerEmail.trim(),
                  acceptance_token: acceptTokens.acceptance_token,
                  accept_personal_auth: acceptTokens.accept_personal_auth,
                })
              } finally {
                setBusy(false)
              }
            })()
          }}
          disabled={!canContinue || busy || verifying || acceptLoading}
          loading={busy || verifying || acceptLoading}
          colorLoading="text-white"
          widthLoading={20}
          className="rounded-full px-12"
        />
      </div>

      {isModalOpen('consentModal') && consentProps && (
        <ConsentModal
          onClose={handleConsentCancel}
          onAccept={handleConsentAccept}
          name={consentProps.name || ''}
          description={consentProps.description || ''}
        />
      )}
    </div>
  )
}
