import { useCallback, useEffect, useState } from 'react'
import { Appointment } from '../contexts/appoiment'
import { usePurchaseContext } from '../contexts/checkout'
import { listInstitutionsByIdComplete } from '../services/azure/institutions'
import {
  getSedesByListSpecialists,
  getProfessionalsByListSpecilists,
  getDaysAvailable,
  getHoursAvailable,
} from '../services/azure/appoiment'
import type {
  Sede,
  Professional,
  DayAvailable,
  HourAvailable,
} from '../interfaces/appoiment.interface'

export function useFreeConsultSchedule() {
  const {
    appointment,
    setAppointment,
    createAppointmentData,
    setCreateAppointmentData,
    institutions,
  } = Appointment()
  const { setRegisterPurchase, setIdMunicipioInstitucion } =
    usePurchaseContext()

  const [sedes, setSedes] = useState<Sede[]>([])
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [days, setDays] = useState<DayAvailable[]>([])
  const [hours, setHours] = useState<HourAvailable[]>([])

  const [loadingSedes, setLoadingSedes] = useState(false)
  const [loadingProfessionals, setLoadingProfessionals] = useState(false)
  const [loadingDays, setLoadingDays] = useState(false)
  const [loadingHours, setLoadingHours] = useState(false)

  const institutionId = appointment.institutionsId?.trim() ?? ''
  const specialtyId = appointment.idSpecialist
  const typeServiceId = appointment.idTypeServices

  const loadSedes = useCallback(async () => {
    if (!institutionId || !specialtyId) return
    setLoadingSedes(true)
    try {
      const data = await getSedesByListSpecialists(
        institutionId,
        specialtyId,
      )
      if (data === 'No se encontraron resultados') {
        setSedes([])
        return
      }
      setSedes(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
      setSedes([])
    } finally {
      setLoadingSedes(false)
    }
  }, [institutionId, specialtyId])

  useEffect(() => {
    void loadSedes()
  }, [loadSedes])

  const loadProfessionals = useCallback(
    async (sedeId: string) => {
      if (!institutionId || !specialtyId) return
      setLoadingProfessionals(true)
      try {
        const data = await getProfessionalsByListSpecilists(
          institutionId,
          specialtyId,
          sedeId,
        )
        setProfessionals(Array.isArray(data) ? data : [])
      } catch (e) {
        console.error(e)
        setProfessionals([])
      } finally {
        setLoadingProfessionals(false)
      }
    },
    [institutionId, specialtyId],
  )

  const loadDays = useCallback(
    async (professionalId: string, sedeId: string) => {
      if (!institutionId || !specialtyId) return
      setLoadingDays(true)
      try {
        const data = await getDaysAvailable(
          institutionId,
          specialtyId,
          professionalId,
          sedeId,
          typeServiceId,
        )
        setDays(Array.isArray(data) ? data : [])
      } catch (e) {
        console.error(e)
        setDays([])
      } finally {
        setLoadingDays(false)
      }
    },
    [institutionId, specialtyId, typeServiceId],
  )

  const loadHours = useCallback(
    async (
      professionalId: string,
      sedeId: string,
      dateIso: string,
    ) => {
      if (!institutionId || !specialtyId) return
      setLoadingHours(true)
      try {
        const data = await getHoursAvailable(
          institutionId,
          specialtyId,
          professionalId,
          sedeId,
          typeServiceId,
          dateIso,
        )
        setHours(Array.isArray(data) ? data : [])
      } catch (e) {
        console.error(e)
        setHours([])
      } finally {
        setLoadingHours(false)
      }
    },
    [institutionId, specialtyId, typeServiceId],
  )

  const selectSede = useCallback(
    async (sedeId: string) => {
      setAppointment((prev) => ({ ...prev, idSede: sedeId }))
      setCreateAppointmentData((prev) => ({
        ...prev,
        sedeId: parseInt(sedeId, 10),
      }))
      setProfessionals([])
      setDays([])
      setHours([])

      const instId = institutionId ? parseInt(institutionId, 10) : NaN
      if (!Number.isNaN(instId)) {
        if (institutions.id_municipio) {
          setIdMunicipioInstitucion(institutions.id_municipio)
        }
        let address = ''
        let phone = ''
        try {
          const data = await listInstitutionsByIdComplete(instId)
          const inst = data?.institution as
            | Record<string, unknown>
            | undefined
          address = String(inst?.address ?? '')
          phone = String(inst?.phone1 ?? '')
        } catch {
          /* usar solo datos del contexto */
        }
        const nombre =
          institutions.nombre_prestador?.trim() ||
          'Prestador de salud'
        setRegisterPurchase((prev) => ({
          ...prev,
          nombre_institucion: nombre,
          direccion_institucion: address || prev.direccion_institucion,
          telefono_institucio: phone || prev.telefono_institucio,
        }))
      }

      await loadProfessionals(sedeId)
    },
    [
      institutionId,
      institutions.id_municipio,
      institutions.nombre_prestador,
      loadProfessionals,
      setAppointment,
      setCreateAppointmentData,
      setIdMunicipioInstitucion,
      setRegisterPurchase,
    ],
  )

  const selectProfessional = useCallback(
    async (professionalId: string, sedeId: string) => {
      const prof = professionals.find((p) => String(p.id) === professionalId)
      const professionalName = prof
        ? [prof.user?.name1, prof.user?.name2, prof.user?.lastname1, prof.user?.lastname2]
            .filter(Boolean)
            .join(' ')
            .trim()
        : ''

      setAppointment((prev) => ({ ...prev, idProfessional: professionalId }))
      setCreateAppointmentData((prev) => ({
        ...prev,
        professionalId: parseInt(professionalId, 10),
        professionalName,
      }))
      setDays([])
      setHours([])
      if (sedeId) await loadDays(professionalId, sedeId)
    },
    [professionals, loadDays, setAppointment, setCreateAppointmentData],
  )

  const selectDay = useCallback(
    async (dateValue: string, professionalId: string, sedeId: string) => {
      setAppointment((prev) => ({ ...prev, date: dateValue }))
      setHours([])
      await loadHours(professionalId, sedeId, dateValue)
    },
    [loadHours, setAppointment],
  )

  const selectHour = useCallback(
    (hourLabel: string) => {
      const apptDate = appointment.date?.trim()
      if (!apptDate) return
      const match = hourLabel.match(/(\d+):(\d+)\s*(AM|PM)/i)
      if (!match) return
      const [, hourPart, minutePart, period] = match
      let hour = parseInt(hourPart!, 10)
      if (period!.toUpperCase() === 'PM' && hour < 12) hour += 12
      if (period!.toUpperCase() === 'AM' && hour === 12) hour = 0
      const dateOnly = apptDate.split('T')[0]!
      const dateTime = new Date(
        `${dateOnly}T${String(hour).padStart(2, '0')}:${minutePart}:00Z`,
      ).toISOString()
      setCreateAppointmentData((prev) => ({
        ...prev,
        fecha: dateTime,
        desiredDate: dateTime,
      }))
    },
    [appointment.date, setCreateAppointmentData],
  )

  const resetFromSede = useCallback(() => {
    setAppointment((prev) => ({
      ...prev,
      idSede: '',
      idProfessional: '',
      date: '',
    }))
    setCreateAppointmentData((prev) => ({
      ...prev,
      sedeId: 0,
      professionalId: 0,
      professionalName: '',
      fecha: '',
      desiredDate: '',
    }))
    setProfessionals([])
    setDays([])
    setHours([])
  }, [setAppointment, setCreateAppointmentData])

  const resetFromProfessional = useCallback(() => {
    setAppointment((prev) => ({
      ...prev,
      idProfessional: '',
      date: '',
    }))
    setCreateAppointmentData((prev) => ({
      ...prev,
      professionalId: 0,
      professionalName: '',
      fecha: '',
      desiredDate: '',
    }))
    setDays([])
    setHours([])
  }, [setAppointment, setCreateAppointmentData])

  const resetFromDay = useCallback(() => {
    setAppointment((prev) => ({ ...prev, date: '' }))
    setCreateAppointmentData((prev) => ({
      ...prev,
      fecha: '',
      desiredDate: '',
    }))
    setHours([])
  }, [setAppointment, setCreateAppointmentData])

  return {
    sedes,
    professionals,
    days,
    hours,
    loadingSedes,
    loadingProfessionals,
    loadingDays,
    loadingHours,
    selectSede,
    selectProfessional,
    selectDay,
    selectHour,
    resetFromSede,
    resetFromProfessional,
    resetFromDay,
    appointment,
    createAppointmentData,
  }
}
