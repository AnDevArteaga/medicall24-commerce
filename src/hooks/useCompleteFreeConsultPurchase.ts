import { toast } from 'react-hot-toast'
import { Appointment } from '../contexts/appoiment'
import { usePurchaseContext } from '../contexts/checkout'
import { fillRegisterPurchase } from './usePaymentFlow'
import { createConsultation } from '../services/supabase/payment'
import { useSavePurchaseData } from './useSavePurchaseData'
import { useModal } from '../contexts/modals'

function isConsultationAssigned(
  consultation: {
    error?: boolean
    status?: number
  },
): boolean {
  if (consultation.error) return false
  const status = consultation.status ?? 0
  return status === 200 || status === 201 || status === 204
}

/**
 * Finaliza la prueba gratuita: guarda compra + cita y asigna vía create-consultation.
 * El correo de confirmación de cita lo envía la Edge create-consultation al asignar bien
 * (igual que en compra con pago). No se llama sendConfirmationEmail (correo de compra).
 */
export function useCompleteFreeConsultPurchase() {
  const {
    userId,
    purchaseData,
    registerPurchase,
    registerData,
    product,
    setStatus,
    setMessage,
    setConsultationResult,
    setCurrentStep,
    idMunicipioInstitucion,
  } = usePurchaseContext()
  const { createAppointmentData } = Appointment()
  const { savePurchase } = useSavePurchaseData()
  const { openModal } = useModal()

  const completeFreeConsultPurchase = async () => {
    if (!createAppointmentData.fecha?.trim()) {
      throw new Error(
        'No hay cita seleccionada. Vuelve a agendar sede, profesional y horario.',
      )
    }
    if (!createAppointmentData.institutionId || !createAppointmentData.sedeId) {
      throw new Error(
        'Faltan datos de la sede. Vuelve a agendar antes de finalizar.',
      )
    }
    if (!createAppointmentData.professionalId) {
      throw new Error(
        'Falta el profesional. Vuelve a agendar antes de finalizar.',
      )
    }
    if (!idMunicipioInstitucion) {
      throw new Error(
        'Falta el municipio del prestador. Vuelve a seleccionar la sede al agendar.',
      )
    }

    const buyerEmail =
      purchaseData.email?.trim() ||
      registerPurchase.correo_factura?.trim() ||
      registerData.user?.email?.trim() ||
      ''

    if (!buyerEmail) {
      throw new Error(
        'No hay correo registrado para enviar la confirmación de la cita.',
      )
    }

    const appointmentPayload = {
      ...createAppointmentData,
      patientId: createAppointmentData.patientId || userId,
      institutionId: createAppointmentData.institutionId,
      requestAnotation:
        createAppointmentData.requestAnotation?.trim() ||
        'Consulta prueba gratuita',
    }

    const purchaseDataForSave = { ...purchaseData, email: buyerEmail }
    const freeIdTransaction = `FREE_${Date.now()}`
    const freeOrder = {
      id_transaccion: freeIdTransaction,
      estado_transaccion: 'aprobada',
      fecha_compra: new Date().toISOString(),
      fecha_pago: new Date().toISOString(),
      ip_transaccion: '0',
    }
    const freeDetailPayment = {
      paymentMethod: 'FREE',
      description: null,
      valor: 0,
      descuento: 0,
      subtotal: 0,
      iva: 0,
      commission: 0,
      total: 0,
    }
    const freePaymentMethod = {
      card: {
        number: '',
        cvc: '',
        expMonth: '',
        expYear: '',
        cardHolder: '',
      },
      financialInstitutionCode: '0',
      installments: '0',
      paymentDescription: '',
      phoneNumber: '',
      type: 'FREE',
      userLegalId: purchaseData.identification || '',
      userLegalIdType: purchaseData.typeId || '',
      userType: '',
    }
    const registerPurchaseFree = await fillRegisterPurchase(
      userId,
      purchaseDataForSave,
      freePaymentMethod,
      freeDetailPayment,
      product,
      registerPurchase,
      freeOrder,
    )
    const saveResult = await savePurchase(
      registerPurchaseFree,
      idMunicipioInstitucion,
      appointmentPayload,
    )
    if (!saveResult?.id_compra) {
      throw new Error('No se pudo guardar la compra')
    }

    console.log(
      '[FREE] Asignando cita vía create-consultation →',
      registerPurchaseFree.id_transaccion,
      'id_compra:',
      saveResult.id_compra,
    )

    const consultation = await createConsultation(
      registerPurchaseFree.id_transaccion,
      saveResult.id_compra,
    )

    if (!isConsultationAssigned(consultation)) {
      const errorMessage =
        consultation.data?.error ??
        (typeof consultation.data === 'object' &&
        consultation.data !== null &&
        'error' in consultation.data
          ? String((consultation.data as { error?: string }).error)
          : 'No se pudo asignar la cita. Intenta de nuevo o contacta soporte.')

      setConsultationResult({
        ...consultation,
        error: true,
        data: { ...consultation.data, error: errorMessage },
      })
      openModal('consultationResult', { result: consultation })
      throw new Error(errorMessage)
    }

    setConsultationResult(consultation)
    setStatus('aprobada')
    setMessage('Transacción aprobada')
    setCurrentStep(3)
    openModal('consultationResult', { result: consultation })
    return { consultation, id_compra: saveResult.id_compra, freeIdTransaction }
  }

  return {
    completeFreeConsultPurchase: async () => {
      try {
        return await completeFreeConsultPurchase()
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Error al procesar la consulta gratuita'
        toast.error(message)
        throw err
      }
    },
  }
}
