import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import Layout from '../layouts/layout-secondary'
import bg from '../assets/img/bg-1.webp'
import { usePurchaseContext } from '../contexts/checkout'
import { Appointment } from '../contexts/appoiment'
import { getProductById } from '../services/supabase/products'
import { useCompleteFreeConsultPurchase } from '../hooks/useCompleteFreeConsultPurchase'
import {
  FreeConsultTrialStepper,
  type FreeConsultTrialPhase,
} from '../components/freeConsult/free-consult-trial-stepper'
import { FreeConsultCardVerificationStep } from '../components/freeConsult/free-consult-card-verification-step'
import { FreeConsultBillingInlineStep } from '../components/freeConsult/free-consult-billing-inline-step'
import { FreeConsultPreviewStep } from '../components/freeConsult/free-consult-preview-step'
import { FreeConsultConfirmCitaEmailModal } from '../components/freeConsult/free-consult-confirm-cita-email-modal'
import { FreeConsultAlertModal } from '../components/freeConsult/free-consult-alert-modal'
import {
  tokenizeCardViaSmartResponder,
  CardVerifyNetworkError,
} from '../services/supabase/smart-responder'
import {
  getUsuarioComercioByUsuarioId,
} from '../services/supabase/usuario-comercio'
import { FreeConsultExistingCardModal } from '../components/freeConsult/free-consult-existing-card-modal'
import { useModal } from '../contexts/modals'
import ConsultationResultModal from '../components/modals/paymentGateway/stepThree/consultation-result'

const FREE_PRODUCT_ID =
  import.meta.env.VITE_FREE_CONSULT_PRODUCT_ID?.trim() || '17'

const FreeConsultFinalize: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { setCreateAppointmentData, createAppointmentData } = Appointment()
  const {
    product,
    setProduct,
    setIsFree,
    setGeneralPaymentData,
    purchaseData,
    setPurchaseData,
    paymentMethod,
    registerPurchase,
    registerData,
    userId,
    status,
  } = usePurchaseContext()
  const { completeFreeConsultPurchase } = useCompleteFreeConsultPurchase()
  const { isModalOpen, getModalProps, closeModal } = useModal()

  const [phase, setPhase] = useState<FreeConsultTrialPhase>('card')
  const [loadingProduct, setLoadingProduct] = useState(!product)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [cardTokenizeError, setCardTokenizeError] = useState<string | null>(
    null,
  )
  const [verifyingCard, setVerifyingCard] = useState(false)
  const [cardViewKey, setCardViewKey] = useState(0)
  const [consentAccepted, setConsentAccepted] = useState(false)
  const [existingCardLast4, setExistingCardLast4] = useState<string | null>(
    null,
  )
  const [checkingExistingCard, setCheckingExistingCard] = useState(true)
  const [skipExistingCardPrompt, setSkipExistingCardPrompt] = useState(false)
  const [showExistingCardModal, setShowExistingCardModal] = useState(false)

  const idQuery = searchParams.get('institucion')?.trim() ?? ''

  useEffect(() => {
    setIsFree(true)
  }, [setIsFree])

  useEffect(() => {
    if (product) {
      setLoadingProduct(false)
      return
    }
    let cancelled = false
    setLoadingProduct(true)
    ;(async () => {
      try {
        const p = await getProductById(FREE_PRODUCT_ID)
        if (cancelled) return
        if (p) {
          setProduct(p)
          setGeneralPaymentData((prev) => ({
            ...prev,
            productId: p.id_producto,
          }))
        } else {
          toast.error('No se pudo cargar el producto de consulta gratuita.')
        }
      } catch {
        if (!cancelled) toast.error('Error al cargar el producto.')
      } finally {
        if (!cancelled) setLoadingProduct(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [product, setGeneralPaymentData, setProduct])

  useEffect(() => {
    if (!userId) return
    setCreateAppointmentData((prev) => ({
      ...prev,
      patientId: userId,
      requestAnotation: 'Consulta prueba gratuita',
    }))
  }, [userId, setCreateAppointmentData])

  useEffect(() => {
    const n = parseInt(idQuery, 10)
    if (!idQuery || Number.isNaN(n)) return
    setCreateAppointmentData((prev) => ({
      ...prev,
      institutionId: n,
    }))
  }, [idQuery, setCreateAppointmentData])

  useEffect(() => {
    if (!userId) {
      setExistingCardLast4(null)
      setCheckingExistingCard(false)
      return
    }
    let cancelled = false
    setCheckingExistingCard(true)
    void getUsuarioComercioByUsuarioId(userId).then((row) => {
      if (cancelled) return
      if (row?.wompi_payment_source_id && row?.tarjeta_ultimos_4) {
        setExistingCardLast4(row.tarjeta_ultimos_4)
      } else {
        setExistingCardLast4(null)
      }
      setCheckingExistingCard(false)
    })
    return () => {
      cancelled = true
    }
  }, [userId])

  const prevPhaseRef = useRef<FreeConsultTrialPhase | null>(null)

  useEffect(() => {
    if (
      phase === 'card' &&
      prevPhaseRef.current !== null &&
      prevPhaseRef.current !== 'card'
    ) {
      setCardViewKey((k) => k + 1)
    }
    prevPhaseRef.current = phase
  }, [phase])

  useEffect(() => {
    if (
      phase === 'card' &&
      !checkingExistingCard &&
      existingCardLast4 &&
      !skipExistingCardPrompt
    ) {
      setShowExistingCardModal(true)
    }
  }, [phase, checkingExistingCard, existingCardLast4, skipExistingCardPrompt])

  const goBilling = () => {
    setPhase('billing')
  }

  const runTokenizeAndSave = async (
    payload: {
      customer_email: string
      acceptance_token: string
      accept_personal_auth: string
    },
    forceReplace: boolean,
  ) => {
    console.log('[CITA] runTokenizeAndSave: inicio', {
      email: payload.customer_email,
      acceptance_token: `${payload.acceptance_token.slice(0, 12)}…`,
    })
    const card = paymentMethod.card
    setVerifyingCard(true)
    let tokenized
    try {
      tokenized = await tokenizeCardViaSmartResponder({
        number: card.number.replace(/\s/g, ''),
        cvc: card.cvc.trim(),
        exp_month: (card.expMonth || '').padStart(2, '0'),
        exp_year: (card.expYear || '').trim(),
        card_holder: (card.cardHolder || '').trim(),
        customer_email: payload.customer_email.trim(),
        acceptance_token: payload.acceptance_token,
        accept_personal_auth: payload.accept_personal_auth,
        id_usuario_medicall: userId,
        id_paciente: userId,
        tipo_identificacion:
          purchaseData.typeId || registerData.user.typeId || undefined,
        identificacion:
          purchaseData.identification ||
          registerData.user.identification ||
          undefined,
      })
      console.log('[CITA] verify OK', tokenized.payment_source_id, tokenized.reason)
    } finally {
      setVerifyingCard(false)
    }

    const last4 =
      tokenized.tarjeta_ultimos_4 ??
      card.number.replace(/\D/g, '').slice(-4)
    setExistingCardLast4(last4)
    if (forceReplace) setShowExistingCardModal(false)
    goBilling()
  }

  const handleCardContinue = async (
    payload: {
      customer_email: string
      acceptance_token: string
      accept_personal_auth: string
    },
    options?: { forceReplace?: boolean },
  ) => {
    setCardTokenizeError(null)
    try {
      await runTokenizeAndSave(payload, Boolean(options?.forceReplace))
    } catch (e: unknown) {
      if (e instanceof CardVerifyNetworkError && userId) {
        const row = await getUsuarioComercioByUsuarioId(userId)
        if (row?.wompi_payment_source_id && row?.tarjeta_ultimos_4) {
          console.warn(
            '[CITA] conexión cerrada pero usuario_comercio ya guardado en servidor',
            row.wompi_payment_source_id,
          )
          setExistingCardLast4(row.tarjeta_ultimos_4)
          if (options?.forceReplace) setShowExistingCardModal(false)
          goBilling()
          return
        }
      }

      let errorMessage =
        'No se pudo verificar la tarjeta. Revisa los datos e intenta de nuevo.'

      if (e instanceof Error && e.message?.trim()) {
        errorMessage = e.message.trim()
      }

      const cleanMessage =
        errorMessage
          .replace(/\.?\s*Luhn check falló\.?/gi, '')
          .replace(/INPUT_VALIDATION_ERROR/gi, '')
          .trim() || errorMessage

      console.error('Error tokenización tarjeta:', errorMessage)
      setCardTokenizeError(cleanMessage)
    }
  }

  const goPreview = () => {
    const buyerEmail =
      registerPurchase.correo_factura?.trim() ||
      purchaseData.email?.trim() ||
      ''
    setPurchaseData((prev) => ({
      ...prev,
      address: registerPurchase.direccion_factura || prev.address,
      email: buyerEmail || prev.email,
    }))
    setPhase('preview')
  }

  const handleFinalSubmit = async () => {
    setSubmitting(true)
    try {
      await completeFreeConsultPurchase()
      setShowEmailModal(false)
    } catch {
      /* toast en el hook */
    } finally {
      setSubmitting(false)
    }
  }

  const stepperPhase = phase

  if (loadingProduct || !product) {
    return (
      <Layout title="Medicall24 | Finalizar consulta gratuita">
        <div
          className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center gap-4"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-gray-700">Preparando tu solicitud…</p>
        </div>
      </Layout>
    )
  }

  if (!createAppointmentData.fecha || !userId) {
    return (
      <Layout title="Medicall24 | Finalizar consulta gratuita">
        <div className="container mx-auto px-4 py-12 text-center space-y-4">
          <p className="text-gray-700">
            {!userId
              ? 'Debes iniciar sesión o registrarte antes de finalizar.'
              : 'Completa la selección de sede, profesional y horario antes de finalizar.'}
          </p>
          <Link to="/consulta-gratis/acceso" className="text-primary underline">
            Ir a acceso
          </Link>
          <Link
            to={
              idQuery
                ? `/consulta-gratis/agendar?institucion=${encodeURIComponent(idQuery)}`
                : '/consulta-gratis/agendar'
            }
            className="block text-primary underline"
          >
            Volver a agendar
          </Link>
        </div>
      </Layout>
    )
  }

  const approved =
    status?.toLowerCase() === 'aprobada' || status?.toUpperCase() === 'APPROVED'

  return (
    <Layout title="Medicall24 | Finalizar consulta gratuita">
      <div
        className="min-h-[calc(100vh-8rem)] py-10 px-4"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-center text-gray-600 text-xl sm:text-2xl font-light mb-6 tracking-wide">
            PASOS PARA INICIAR TU PRUEBA GRATUITA
          </h1>

          <FreeConsultTrialStepper phase={stepperPhase} />

          <div className="mt-6 mb-8 rounded-xl bg-gray-200/80 text-center text-sm text-gray-700 py-3 px-4">
            No realizaremos ningún cobro. Podrás cancelar la suscripción en
            cualquier momento.
          </div>

          {phase === 'card' && checkingExistingCard && (
            <div className="flex flex-col items-center justify-center gap-3 py-16">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="text-gray-600 text-sm">
                Verificando tu método de pago…
              </p>
            </div>
          )}
          {phase === 'card' &&
            !checkingExistingCard &&
            (skipExistingCardPrompt || !existingCardLast4) && (
              <FreeConsultCardVerificationStep
                key={cardViewKey}
                consentAccepted={consentAccepted}
                onConsentAcceptedChange={setConsentAccepted}
                onContinue={handleCardContinue}
                verifying={verifyingCard}
              />
            )}
          {phase === 'billing' && (
            <FreeConsultBillingInlineStep
              onBack={() => {
                setSkipExistingCardPrompt(false)
                setPhase('card')
              }}
              onContinue={goPreview}
            />
          )}
          {phase === 'preview' && (
            <FreeConsultPreviewStep
              savedCardLast4={existingCardLast4}
              onChangePayment={() => {
                setSkipExistingCardPrompt(true)
                setPhase('card')
              }}
              onChangeBilling={() => setPhase('billing')}
              onConfirm={() => setShowEmailModal(true)}
            />
          )}
        </div>
      </div>

      {showExistingCardModal && existingCardLast4 && (
        <FreeConsultExistingCardModal
          last4={existingCardLast4}
          loading={submitting}
          onCancel={() => {
            setShowExistingCardModal(false)
            setSkipExistingCardPrompt(true)
          }}
          onKeep={() => {
            setShowExistingCardModal(false)
            goBilling()
          }}
          onChange={() => {
            setShowExistingCardModal(false)
            setSkipExistingCardPrompt(true)
          }}
        />
      )}

      {cardTokenizeError && (
        <FreeConsultAlertModal
          title="No se pudo verificar la tarjeta"
          message={cardTokenizeError}
          onClose={() => setCardTokenizeError(null)}
        />
      )}

      {showEmailModal && (
        <FreeConsultConfirmCitaEmailModal
          email={
            purchaseData.email?.trim() ||
            registerPurchase.correo_factura?.trim() ||
            ''
          }
          loading={submitting}
          onCancel={() => setShowEmailModal(false)}
          onConfirm={() => void handleFinalSubmit()}
        />
      )}

      {isModalOpen('consultationResult') &&
        (() => {
          const props = getModalProps<{ result: unknown }>('consultationResult')
          return props ? (
            <ConsultationResultModal
              result={props.result}
              onClose={() => {
                closeModal('consultationResult')
                if (approved) navigate('/')
              }}
            />
          ) : null
        })()}
    </Layout>
  )
}

export default FreeConsultFinalize
