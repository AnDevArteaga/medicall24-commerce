import React, { useEffect, useMemo, useState } from 'react'
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { Loader2 } from 'lucide-react'
import Layout from '../layouts/layout-secondary'
import { Appointment } from '../contexts/appoiment'
import type { Institution } from '../interfaces/appoiment.interface'
import bg from '../assets/img/bg-1.webp'
import { fetchCitasFreePrestadorByInstitucion } from '../services/supabase/citasfree-prestadores'
import { listInstitutionsByIdComplete } from '../services/azure/institutions'
import { mergeCitasFreePrestadorWithInstitutionApi } from '../services/free-consult/merge-prestador-institution'
import { FreeConsultProviderCard } from '../components/freeConsult/free-consult-provider-card'
import { FreeConsultSchedulePanel } from '../components/freeConsult/free-consult-schedule-panel'

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

const FreeConsultSchedule: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const state = location.state as FreeConsultState | null

  const {
    institutions,
    setInstitutions,
    appointment,
    setAppointment,
    setCreateAppointmentData,
  } = Appointment()

  const idFromQuery = searchParams.get('institucion')?.trim() ?? ''
  const idFromAppointment = appointment.institutionsId?.trim() ?? ''
  const idFromLocation =
    state?.idInstitucion != null && state.idInstitucion > 0
      ? String(state.idInstitucion)
      : ''
  const institutionIdToFetch =
    idFromQuery || idFromAppointment || idFromLocation

  useEffect(() => {
    if (!idFromQuery) return
    const n = parseInt(idFromQuery, 10)
    if (Number.isNaN(n)) return
    if (idFromQuery !== appointment.institutionsId) {
      setAppointment((prev) => ({
        ...prev,
        institutionsId: idFromQuery,
      }))
      setCreateAppointmentData((prev) => ({
        ...prev,
        institutionId: n,
      }))
    }
  }, [
    idFromQuery,
    appointment.institutionsId,
    setAppointment,
    setCreateAppointmentData,
  ])

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

  if (!institutionIdToFetch && !isInstitutionReady(institutions)) {
    return (
      <Layout title="Medicall24 | Agendar consulta gratuita">
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-gray-700 mb-4">
            No se encontró la institución. Vuelve al inicio del flujo de
            consulta gratuita.
          </p>
          <Link
            to="/consulta-gratis"
            className="text-primary font-semibold underline"
          >
            Ir a consulta gratuita
          </Link>
        </div>
      </Layout>
    )
  }

  if (hydrating) {
    return (
      <Layout title="Medicall24 | Agendar consulta gratuita">
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
    <Layout title="Medicall24 | Agendar consulta gratuita">
      <div
        className="min-h-[calc(100vh-8rem)] py-12"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="min-h-[inherit]">
          <div className="container mx-auto py-4 max-w-full">
            <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-2 lg:gap-12 xl:gap-12 items-start pb-12 lg:px-12 xl:px-60">
              <FreeConsultProviderCard
                className="order-2 lg:order-1 xl:order-1"
                bannerUrl={bannerUrl}
                avatarUrl={avatarUrl}
                providerName={providerName}
                specialtyLabel={specialtyLabel}
              />
              <div className="order-1 lg:order-2 xl:order-2 p-4 sm:p-6">
                <FreeConsultSchedulePanel
                  specialtyLabel={specialtyLabel}
                  onAfterConfirm={() => {
                    const id =
                      idFromQuery ||
                      appointment.institutionsId?.trim() ||
                      ''
                    if (!id) {
                      toast.error('Falta el identificador de la institución.')
                      return
                    }
                    navigate(
                      `/consulta-gratis/finalizar?institucion=${encodeURIComponent(id)}`,
                      { state: location.state },
                    )
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default FreeConsultSchedule
