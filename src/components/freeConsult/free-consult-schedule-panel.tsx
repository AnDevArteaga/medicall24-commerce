import React, { useMemo, useState } from 'react'
import { ChevronRight, Clock, Loader2 } from 'lucide-react'
import { useFreeConsultSchedule } from '../../hooks/useFreeConsultSchedule'
import { capitalize } from '../../utils/forms'
import ButtonForm from '../ui/button-forms'
import { toast } from 'react-hot-toast'

const LIST_MAX_H = 'max-h-[220px]'
const PANEL_BODY = 'flex-1 min-h-[180px] flex flex-col bg-white rounded-xl'
const PANEL_SHELL = 'flex flex-col min-h-[200px]'

function formatDayLabel(dateStr: string): string {
  if (!dateStr?.trim()) return ''
  try {
    const d = new Date(dateStr)
    return capitalize(
      d.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    )
  } catch {
    return dateStr
  }
}

function formatProfessionalName(p: {
  user: {
    name1: string
    name2?: string
    lastname1: string
    lastname2?: string
  }
}): string {
  const raw = [p.user.name1, p.user.name2, p.user.lastname1, p.user.lastname2]
    .filter(Boolean)
    .join(' ')
    .trim()
  if (!raw) return 'Profesional'
  return capitalize(raw)
}

function sedeSummary(sede: {
  name: string
  address: string
  municipality?: { nombre: string }
  department?: { nombre: string }
}): string {
  const loc = [sede.municipality?.nombre, sede.department?.nombre]
    .filter(Boolean)
    .join(' - ')
  return `${sede.address}${loc ? ` / ${loc}` : ''}`
}

function PanelHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-2 text-gray-800 text-sm tracking-wide shrink-0">
      {children}
    </div>
  )
}

export interface FreeConsultSchedulePanelProps {
  specialtyLabel: string
  /** Tras confirmar sede, profesional, día y hora */
  onAfterConfirm?: () => void
}

export const FreeConsultSchedulePanel: React.FC<
  FreeConsultSchedulePanelProps
> = ({ specialtyLabel, onAfterConfirm }) => {
  const {
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
  } = useFreeConsultSchedule()

  const [sedePicking, setSedePicking] = useState(true)
  const [profPicking, setProfPicking] = useState(true)
  const [dayPicking, setDayPicking] = useState(true)
  const [hourDisplay, setHourDisplay] = useState('')

  const selectedSede = useMemo(
    () => sedes.find((s) => String(s.id) === appointment.idSede) ?? null,
    [sedes, appointment.idSede],
  )

  const selectedProf = useMemo(
    () =>
      professionals.find((p) => String(p.id) === appointment.idProfessional) ??
      null,
    [professionals, appointment.idProfessional],
  )

  const hasSede = Boolean(appointment.idSede?.trim())
  const hasProfessional = Boolean(appointment.idProfessional?.trim())
  const hasDay = Boolean(appointment.date?.trim())
  const hasHour = Boolean(createAppointmentData.fecha?.trim())

  const showProfessionalPanel = hasSede
  const showDaysPanel = hasProfessional
  const showHoursPanel = hasDay

  const onPickSede = async (id: string) => {
    await selectSede(id)
    setSedePicking(false)
    setProfPicking(true)
  }

  const onPickProfessional = async (id: string) => {
    const sid = appointment.idSede
    if (!sid) return
    await selectProfessional(id, sid)
    setProfPicking(false)
    setDayPicking(true)
  }

  const onPickDay = async (dateValue: string) => {
    const pid = appointment.idProfessional
    const sid = appointment.idSede
    if (!pid || !sid) return
    await selectDay(dateValue, pid, sid)
    setDayPicking(false)
    setHourDisplay('')
  }

  const onPickHour = (label: string) => {
    selectHour(label)
    setHourDisplay(label)
  }

  const handleConfirm = () => {
    if (!createAppointmentData.fecha || !selectedSede || !selectedProf) {
      toast.error('Completa sede, profesional, día y hora.')
      return
    }
    toast.success('Selección lista. Continúa para finalizar.')
    onAfterConfirm?.()
  }

  const labelToSelected = useMemo(() => {
    if (sedePicking || !hasSede) return 'Selecciona la sede para agendar tu cita'
    if (profPicking || !hasProfessional)
      return 'Selecciona el profesional para agendar tu cita'
    if (dayPicking || !hasDay)
      return 'Selecciona el día en que quieres agendar tu cita'
    if (!hasHour) return 'Selecciona la hora en que quieres agendar tu cita'
    return 'Presiona en confirmar para continuar'
  }, [
    sedePicking,
    profPicking,
    dayPicking,
    hasSede,
    hasProfessional,
    hasDay,
    hasHour,
  ])

  return (
    <div className="space-y-8 text-gray-800">
      <div className="flex justify-center">
        <span className="text-2xl text-primary font-light text-center">
          {labelToSelected}
        </span>
      </div>

      {/* Fila 1: sede + profesional (2 columnas; profesional al elegir sede) */}
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 items-stretch">
          <div className={PANEL_SHELL}>
            <PanelHeader>Sedes disponibles</PanelHeader>
            <div className={PANEL_BODY}>
              {loadingSedes ? (
                <div className="flex flex-1 items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : sedePicking || !selectedSede ? (
                <div
                  className={`${LIST_MAX_H} overflow-y-auto p-2 space-y-2 flex-1`}
                >
                  {sedes.map((sede) => (
                    <button
                      key={sede.id}
                      type="button"
                      onClick={() => void onPickSede(String(sede.id))}
                      className="w-full text-left rounded-xl border border-gray-200 hover:border-primary hover:bg-pink-50/50 p-3 flex items-start gap-2 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-primary uppercase">
                          {sede.name}:
                        </p>
                        <p className="text-xs text-gray-700 mt-1">
                          {sedeSummary(sede)}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    </button>
                  ))}
                  {sedes.length === 0 && (
                    <p className="text-sm text-gray-500 p-3">No hay sedes.</p>
                  )}
                </div>
              ) : (
                <div className="p-3 flex flex-col gap-2 flex-1">
                  <button
                    type="button"
                    onClick={() => {
                      resetFromSede()
                      setSedePicking(true)
                      setProfPicking(true)
                      setDayPicking(true)
                      setHourDisplay('')
                    }}
                    className="text-xs text-primary underline self-end hover:text-primarydark transition-colors cursor-pointer"
                  >
                    Cambiar sede
                  </button>
                  <div>
                    <p className="text-xs font-bold text-primary uppercase">
                      {selectedSede.name}:
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      {sedeSummary(selectedSede)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {showProfessionalPanel && (
            <div className={PANEL_SHELL}>
              <PanelHeader>Profesionales disponibles</PanelHeader>
              <div className={PANEL_BODY}>
                {loadingProfessionals ? (
                  <div className="flex flex-1 items-center justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : profPicking || !selectedProf ? (
                  <div
                    className={`${LIST_MAX_H} overflow-y-auto p-2 space-y-2 flex-1`}
                  >
                    {professionals.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => void onPickProfessional(String(p.id))}
                        className="w-full text-left rounded-xl border border-gray-200 hover:border-primary hover:bg-pink-50/50 p-3 flex items-center gap-3 transition-colors"
                      >
                        {p.user.avatar ? (
                          <img
                            src={p.user.avatar}
                            alt=""
                            className="w-12 h-12 rounded-full object-cover border-2 border-pink-200 shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-pink-100 border-2 border-pink-200 shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800">
                            {formatProfessionalName(p)}
                          </p>
                          <span className="mt-1 inline-block px-2 py-0.5 bg-pink-100 text-primary rounded-full text-xs">
                            {specialtyLabel}
                          </span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-primary shrink-0" />
                      </button>
                    ))}
                    {professionals.length === 0 && (
                      <p className="text-sm text-gray-500 p-3">
                        No hay profesionales en esta sede.
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="p-3 flex flex-col gap-2 flex-1">
                    <button
                      type="button"
                      onClick={() => {
                        resetFromProfessional()
                        setProfPicking(true)
                        setDayPicking(true)
                        setHourDisplay('')
                      }}
                      className="text-xs text-primary underline self-end hover:text-primarydark transition-colors cursor-pointer"
                    >
                      Cambiar profesional
                    </button>
                    <div className="flex items-center gap-3">
                      {selectedProf.user.avatar ? (
                        <img
                          src={selectedProf.user.avatar}
                          alt=""
                          className="w-14 h-14 rounded-full object-cover border-2 border-pink-200"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-pink-100 border-2 border-pink-200" />
                      )}
                      <div>
                        <p className="text-sm font-semibold">
                          {formatProfessionalName(selectedProf)}
                        </p>
                        <span className="mt-1 inline-block px-2 py-0.5 bg-pink-100 text-primary rounded-full text-xs">
                          {specialtyLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fila 2: días + horas (2 columnas; aparece al elegir profesional) */}
      {showDaysPanel && (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 items-stretch">
            <div className={PANEL_SHELL}>
              <PanelHeader>Días disponibles</PanelHeader>
              <div className={PANEL_BODY}>
                {loadingDays ? (
                  <div className="flex flex-1 items-center justify-center py-10">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : dayPicking || !hasDay ? (
                  <div
                    className={`${LIST_MAX_H} min-h-[160px] overflow-y-auto p-2 space-y-2 flex-1`}
                  >
                    {days.map((day) => (
                      <button
                        key={day.date}
                        type="button"
                        onClick={() => void onPickDay(day.date)}
                        className="w-full text-left rounded-xl border border-gray-200 hover:border-primary hover:bg-pink-50/50 p-3 flex flex-col gap-1 transition-colors"
                      >
                        <span className="text-xs text-gray-500">
                          Horario mañana / tarde
                        </span>
                        <span className="text-sm font-medium text-gray-800">
                          {formatDayLabel(day.date)}
                        </span>
                      </button>
                    ))}
                    {days.length === 0 && (
                      <p className="text-sm text-gray-500 p-3">No hay días.</p>
                    )}
                  </div>
                ) : (
                  <div className="p-3 flex flex-col gap-2 flex-1">
                    <button
                      type="button"
                      onClick={() => {
                        resetFromDay()
                        setDayPicking(true)
                        setHourDisplay('')
                      }}
                      className="text-xs text-primary underline self-end hover:text-primarydark transition-colors cursor-pointer"
                    >
                      Cambiar día
                    </button>
                    <span className="text-xs text-gray-500">
                      Horario mañana / tarde
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      {formatDayLabel(appointment.date)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {showHoursPanel && (
              <div className={PANEL_SHELL}>
                <PanelHeader>Horas disponibles</PanelHeader>
                <div className={PANEL_BODY}>
                  {loadingHours ? (
                    <div className="flex flex-1 items-center justify-center py-10">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="p-3 grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[220px] overflow-y-auto flex-1 content-start">
                      {hours.map((h, idx) => {
                        const label = h.fecha
                        const active = hourDisplay === label
                        return (
                          <button
                            key={`${idx}-${label}`}
                            type="button"
                            onClick={() => onPickHour(label)}
                            className={`flex items-center justify-center gap-2 rounded-xl border-2 py-2 px-2 text-sm font-medium transition-colors ${
                              active
                                ? 'border-primary bg-primary text-white'
                                : 'border-gray-200 hover:border-primary text-gray-800'
                            }`}
                          >
                            <Clock className="w-4 h-4 shrink-0" />
                            {label}
                          </button>
                        )
                      })}
                      {hours.length === 0 && (
                        <p className="text-sm text-gray-500 col-span-full text-center py-4">
                          No hay horas para este día.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {hasHour && (
        <div className="flex justify-center pt-2">
          <ButtonForm
            text="Confirmar"
            onClick={handleConfirm}
            className="px-10 py-3 rounded-full text-base font-semibold"
          />
        </div>
      )}
    </div>
  )
}
