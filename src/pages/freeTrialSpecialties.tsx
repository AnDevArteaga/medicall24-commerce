import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Loader2 } from 'lucide-react'
import Layout from '../layouts/layout-secondary'
import medico from '../assets/img/doctorconsultas.webp'
import logoReps from '../assets/img/reps.png'
import { Appointment } from '../contexts/appoiment'
import {
  getSpecialties,
  type SpecialtyDto,
} from '../services/azure/specialties'
import {
  fetchCitasFreeEspecialidadRows,
  mapEspecialidadToInstitucion,
} from '../services/supabase/citasfree-especialidades'
import { fetchCitasFreePrestadorByInstitucion } from '../services/supabase/citasfree-prestadores'
import { listInstitutionsByIdComplete } from '../services/azure/institutions'
import { mergeCitasFreePrestadorWithInstitutionApi } from '../services/free-consult/merge-prestador-institution'
import bg from '../assets/img/bg-1.webp'

export type SpecialtyWithInstitution = SpecialtyDto & { idInstitucion: number }

const FreeTrialSpecialties: React.FC = () => {
  const navigate = useNavigate()
  const { setAppointment, setCreateAppointmentData, setInstitutions } =
    Appointment()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<SpecialtyWithInstitution[]>([])
  const [selectingId, setSelectingId] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      setLoading(true)
      setError(null)
      try {
        const [specialties, espRows] = await Promise.all([
          getSpecialties(),
          fetchCitasFreeEspecialidadRows(),
        ])
        if (cancelled) return
        const instBySpec = mapEspecialidadToInstitucion(espRows)
        const allowed = new Set(instBySpec.keys())
        const filtered: SpecialtyWithInstitution[] = specialties
          .filter((s) => allowed.has(Number(s.id)))
          .map((s) => ({
            ...s,
            idInstitucion: instBySpec.get(Number(s.id))!,
          }))
        setItems(filtered)
      } catch (e) {
        if (!cancelled) {
          setError(
            'No se pudieron cargar las especialidades. Intenta de nuevo más tarde.',
          )
          console.error(e)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  const handleSelectEspecialidad = async (row: SpecialtyWithInstitution) => {
    setSelectingId(row.id)
    try {
      const prestador = await fetchCitasFreePrestadorByInstitucion(
        row.idInstitucion,
      )
      if (!prestador) {
        window.alert(
          'No se encontró un prestador activo para esta especialidad.',
        )
        return
      }

      let apiData = null
      try {
        apiData = await listInstitutionsByIdComplete(row.idInstitucion)
      } catch {
        apiData = null
      }

      const institution = mergeCitasFreePrestadorWithInstitutionApi(
        prestador,
        apiData,
      )

      setInstitutions(institution)
      setAppointment((prev) => ({
        ...prev,
        institutionsId: String(row.idInstitucion),
        idSpecialist: row.id,
        idSede: '',
        idProfessional: '',
        idTypeServices: 3,
        date: '',
      }))
      setCreateAppointmentData((prev) => ({
        ...prev,
        specialtyId: row.id,
        institutionId: row.idInstitucion,
      }))

      navigate('/consulta-gratis', {
        state: {
          specialtyName: row.name,
          idInstitucion: row.idInstitucion,
        },
      })
    } catch (e) {
      console.error(e)
      window.alert('No se pudo cargar la información del prestador.')
    } finally {
      setSelectingId(null)
    }
  }

  return (
    <Layout title="Medicall24 | Prueba gratuita — especialidades">
      <main>
        <section
          id="especialidades"
          className="flex flex-col lg:flex-row xl:flex-row items-center justify-center gap-12 lg:gap-16 xl:gap-16 px-8 py-16 bg-white h-screen"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="flex flex-col max-w-2xl w-full">
            <div className="rounded-4xl overflow-hidden border-2 border-primary">
              <img
                src={medico}
                alt="Médico en videollamada"
                className="w-full h-auto object-cover rounded-4xl"
              />
            </div>
          </div>

          <div className="flex flex-col max-w-xl w-full">
            <h2 className="text-4xl sm:text-5xl lg:text-5xl xl:text-5xl font-light text-gray-800 mb-4 leading-tight">
              Consultas médicas por Telemedicina disponibles
            </h2>
            <p className="text-gray-800 text-lg sm:text-xl lg:text-lg xl:text-lg mb-8">
              Estas son las opciones de prueba gratuita que brindan los
              profesionales de la salud y médicos especialistas en el dia de
              hoy:
            </p>

            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 min-h-[120px] place-items-center">
                <div className="col-span-full flex items-center gap-2 text-gray-600">
                  <Loader2 className="w-8 h-8 animate-spin" />
                  <span>Cargando especialidades…</span>
                </div>
              </div>
            )}

            {!loading && error && (
              <p className="text-red-600 text-lg">{error}</p>
            )}

            {!loading && !error && items.length === 0 && (
              <p className="text-gray-600 text-lg">
                No hay especialidades disponibles en este momento.
              </p>
            )}

            {!loading && !error && items.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3">
                {items.map((especialidad) => (
                  <button
                    key={especialidad.id}
                    type="button"
                    disabled={selectingId !== null}
                    onClick={() => handleSelectEspecialidad(especialidad)}
                    className="flex items-center gap-2 bg-primary text-white px-2 py-2 rounded-3xl font-medium hover:bg-primarydark transition-colors text-left disabled:opacity-60"
                  >
                    <div className="flex items-center gap-2 justify-between w-full px-4">
                      {especialidad.name}
                      {selectingId === especialidad.id ? (
                        <Loader2 className="w-8 h-8 flex-shrink-0 animate-spin" />
                      ) : (
                        <ChevronRight className="w-8 h-8 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3 mt-4">
              <img src={logoReps} alt="REPS" className="w-20 h-20" />
              <p className="text-neutral text-lg">
                Todos los servicios se encuentranhabilitados por el Ministerio
                de Salud en el REPS
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}

export default FreeTrialSpecialties
