import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Loader2, User } from 'lucide-react'
import Layout from '../layouts/layout-secondary'
import { Appointment } from '../contexts/appoiment'
import type { Institution } from '../interfaces/appoiment.interface'
import bg from '../assets/img/bg-1.webp'
import { fetchCitasFreePrestadorByInstitucion } from '../services/supabase/citasfree-prestadores'
import { listInstitutionsByIdComplete } from '../services/azure/institutions'
import { mergeCitasFreePrestadorWithInstitutionApi } from '../services/free-consult/merge-prestador-institution'

type FreeConsultState = {
  specialtyName?: string
  idInstitucion?: number
}

function isInstitutionReady(i: Institution): boolean {
  const id = i.id_institucion?.trim()
  const name = i.nombre_prestador?.trim()
  const hasMedia = Boolean(
    i.banner?.trim() || i.cover?.trim() || i.avatar?.trim(),
  )
  return Boolean(id && name && hasMedia)
}

const FreeConsult: React.FC = () => {
  const { institutions, setInstitutions, appointment } = Appointment()
  const location = useLocation()
  const state = location.state as FreeConsultState | null

  const idFromAppointment = appointment.institutionsId?.trim() ?? ''
  const idFromLocation =
    state?.idInstitucion != null && state.idInstitucion > 0
      ? String(state.idInstitucion)
      : ''
  const institutionIdToFetch = idFromAppointment || idFromLocation

  const [hydrating, setHydrating] = useState(() => {
    if (isInstitutionReady(institutions)) return false
    return Boolean(institutionIdToFetch)
  })

  useEffect(() => {
    if (isInstitutionReady(institutions)) {
      setHydrating(false)
      return
    }

    if (!institutionIdToFetch) {
      setHydrating(false)
      return
    }

    let cancelled = false
    setHydrating(true)
    ;(async () => {
      try {
        const prestador = await fetchCitasFreePrestadorByInstitucion(
          Number(institutionIdToFetch),
        )
        if (cancelled) return
        if (!prestador) {
          setHydrating(false)
          return
        }
        let apiData = null
        try {
          apiData = await listInstitutionsByIdComplete(
            Number(institutionIdToFetch),
          )
        } catch {
          apiData = null
        }
        const merged = mergeCitasFreePrestadorWithInstitutionApi(
          prestador,
          apiData,
        )
        if (!cancelled) setInstitutions(merged)
      } catch (e) {
        console.error(e)
      } finally {
        if (!cancelled) setHydrating(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [institutionIdToFetch, institutions, setInstitutions])

  const specialtyLabel = useMemo(
    () => state?.specialtyName?.trim() || 'Especialidad seleccionada',
    [state?.specialtyName],
  )

  const bannerUrl =
    institutions.banner?.trim() || institutions.cover?.trim() || bg
  const avatarUrl =
    institutions.avatar?.trim() || institutions.cover?.trim() || null
  const providerName =
    institutions.nombre_prestador?.trim() || 'Prestador no disponible'

  if (hydrating) {
    return (
      <Layout title="Medicall24 | Consulta gratuita">
        <div
          className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center gap-4 px-4"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="rounded-2xl bg-white/90 px-10 py-8 shadow-md flex flex-col items-center gap-4">
            <Loader2
              className="w-12 h-12 animate-spin text-primary"
              aria-hidden
            />
            <p className="text-gray-700 text-center text-base font-medium max-w-sm">
              Cargando datos del prestador…
            </p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Medicall24 | Consulta gratuita">
      <div className="min-h-[calc(100vh-8rem)] bg-cover bg-center bg-no-repeat bg-fixed">
        <div
          className="min-h-[inherit] bg-white/85 backdrop-blur-[2px]"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="container mx-auto px-4 py-10 lg:py-14">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 lg:items-start xl:grid-cols-2 max-w-7xl mx-auto">
              <section className="order-2 lg:order-1 xl:order-1">
                <div className="relative mb-4">
                  <div className="h-auto sm:h-56 rounded-2xl overflow-hidden bg-gray-300 shadow-sm">
                    <img
                      src={bannerUrl}
                      alt="Portada del prestador"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-16 left-0 sm:left-8">
                    <div className="flex-shrink-0">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt={providerName}
                          className="w-32 h-32 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-pink-200 shadow-md bg-white"
                        />
                      ) : (
                        <div className="w-24 h-24 sm:w-28 sm:h-28 bg-pink-100 rounded-full flex items-center justify-center border-4 border-pink-200 shadow-md">
                          <User className="w-12 h-12 sm:w-14 sm:h-14 text-primary" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-12 sm:pt-14 space-y-4">
                  <div className="rounded-4xl border-2 border-pink-200 bg-white p-4 sm:p-4 shadow-sm">
                    <p className="text-sm text-gray-600">
                      Nombre del prestador:
                    </p>
                    <p className="text-xl sm:text-xl text-gray-700 uppercase tracking-tight">
                      {providerName}
                    </p>
                    <div className="text-gray-500 text-sm inline-block">
                      {specialtyLabel}
                    </div>
                  </div>
                </div>
              </section>

              <section className="order-1 lg:order-2 flex flex-col justify-center gap-6 lg:pt-8 space-y-6">
                <h1 className="text-6xl text-center sm:text-4xl text-primary leading-tight">
                  Inicia tu prueba gratuita
                </h1>
                <Link
                  to="/consulta-gratis/acceso"
                  className="inline-flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-800 text-white px-10 py-4 text-3xl transition-colors w-full sm:w-fit shadow-md"
                >
                  Ingresa aquí
                </Link>
                <p className="text-gray-800 text-base max-w-2xl text-center">
                  Tu prueba gratuita inicia tan pronto ingreses un método de
                  pago para que podamos verificar la autenticidad del usuario.{' '}
                  <strong className="text-gray-800">
                    Pero no realizaremos ningún cobro.
                  </strong>{' '}
                  Podrás usar el servicio por el tiempo que dure la prueba
                  gratuita. Al ingresar,{' '}
                  <span className="underline">
                    aceptas los términos y condiciones.
                  </span>
                </p>
                <p className="text-xs text-gray-500 max-w-2xl text-center">
                  Al finalizar tu prueba gratuita, nos autorizas a cobrar en el
                  método de pago ingresado u otro método de pago registrado, la
                  suma de $149.900 COP correspondiente al Paquete SEGUIMIENTO
                  MÉDICO MENSUAL, más el cargo de comisión que cobre la entidad
                  bancaria del método de pago asociado. El cobro se realizará 24
                  horas después de haberse realizado con éxito la prueba
                  gratuita. La suscripción se renovará automáticamente una vez
                  concluya la vigencia del plan, hasta que la canceles. Podrás
                  cancelar tu suscripción en la app MEDICALL24. Cuando hagas
                  clic para ingresar, podremos verificar tu método de pago con
                  tu banco, autorizando y luego cancelando un cargo en tu método
                  de pago. No se te cobrará por tu suscripción hasta que
                  finalices la prueba gratuita.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default FreeConsult
