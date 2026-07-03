import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Layout from '../layouts/layout-secondary'
import { FreeConsultLogin } from '../components/freeConsult/free-consult-login'
import { FreeConsultRegister } from '../components/freeConsult/free-consult-register'
import { Appointment } from '../contexts/appoiment'
import { usePurchaseContext } from '../contexts/checkout'
import { useModal } from '../contexts/modals'
import { getProductById } from '../services/supabase/products'
import TermCondModal from '../components/modals/term&cond/bexa/term-cond'
import ConfirmData from '../components/modals/paymentGateway/stepOne/confirm-data'
import NewUser from '../components/modals/paymentGateway/stepOne/new-user-register'
import DomaninVerified from '../components/modals/shared/domain-verified'
import UserRegistered from '../components/modals/paymentGateway/stepOne/user-registered'
import img from '../assets/img/telemedicina.webp'
import bg from '../assets/img/bg-2.webp'

const FREE_PRODUCT_ID =
  import.meta.env.VITE_FREE_CONSULT_PRODUCT_ID?.trim() || '17'

const FreeConsultAccess: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { appointment } = Appointment()
  const { setProduct, setGeneralPaymentData, setIsFree } = usePurchaseContext()
  const { isModalOpen, closeModal, getModalProps } = useModal()
  const [view, setView] = useState<'login' | 'register'>('login')
  const termCondProps = getModalProps('termCond')

  useEffect(() => {
    setIsFree(true)
  }, [setIsFree])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const p = await getProductById(FREE_PRODUCT_ID)
        if (cancelled || !p) return
        setProduct(p)
        setGeneralPaymentData((prev) => ({
          ...prev,
          productId: p.id_producto,
        }))
      } catch {
        if (!cancelled) {
          toast.error('No se pudo cargar el producto de consulta gratuita.')
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [setGeneralPaymentData, setProduct])

  const goToSchedule = () => {
    const id = appointment.institutionsId?.trim()
    if (!id) {
      toast.error(
        'No hay institución en el flujo. Entra desde la selección de especialidad.',
      )
      return
    }
    navigate(`/consulta-gratis/agendar?institucion=${encodeURIComponent(id)}`, {
      state: location.state,
    })
  }

  const newUserProps = getModalProps<{
    flow?: string
    onRegisterContinue?: () => void
  }>('newUserRegister')

  return (
    <Layout title="Medicall24 | Acceso consulta gratuita">
      <div
        className="min-h-[calc(100vh-8rem)] bg-gradient-to-b from-gray-100 to-gray-50"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="container mx-auto px-4 py-8 lg:py-12 xl:py-16 max-w-7xl">
          <h1 className="text-center text-gray-500 text-3xl sm:text-xl mb-10 max-w-7xl mx-auto leading-snug">
            Se requiere que registres una cuenta de usuario en MEDICALL24 para
            utilizar el servicio
          </h1>

          <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-2 lg:gap-14 items-stretch">
            <section className="order-2 lg:order-1 xl:order-1 flex items-center">
              <div className="w-full rounded-3xl overflow-hidden shadow-md bg-gray-200">
                <img
                  src={img}
                  alt="Consulta médica en línea"
                  className="w-full h-full min-h-[280px] object-cover"
                />
              </div>
            </section>

            <div className="order-1 lg:order-2 xl:order-2 flex flex-col gap-4">
              {view === 'login' ? (
                <FreeConsultLogin
                  onContinueAfterLogin={goToSchedule}
                  onGoToRegister={() => setView('register')}
                />
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setView('login')}
                    className="self-start text-sm text-primary underline hover:text-primarydark"
                  >
                    ← Volver al inicio de sesión
                  </button>
                  <FreeConsultRegister onRegisterComplete={goToSchedule} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen('termCond') && termCondProps?.onClose && (
        <TermCondModal {...termCondProps} />
      )}
      {isModalOpen('confirmData') && (
        <ConfirmData onClose={() => closeModal('confirmData')} />
      )}
      {isModalOpen('newUserRegister') && (
        <NewUser
          onClose={() => closeModal('newUserRegister')}
          flow={newUserProps?.flow ?? 'freeConsult'}
        />
      )}
      {isModalOpen('userRegistered') && <UserRegistered />}
      {isModalOpen('domainVerified') && (
        <DomaninVerified onClose={() => closeModal('domainVerified')} />
      )}
    </Layout>
  )
}

export default FreeConsultAccess
