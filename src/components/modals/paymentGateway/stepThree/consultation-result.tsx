import React from 'react'
import {
  X,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  Building2,
} from 'lucide-react'
import ButtonForm from '../../../ui/button-forms'

interface ConsultationResultModalProps {
  result: any
  onClose: () => void
}

const ConsultationResultModal: React.FC<ConsultationResultModalProps> = ({
  result,
  onClose,
}) => {
  // Parsear los datos si vienen como string JSON
  const parseData = (data: any): any => {
    if (!data) return null

    // Si es un string, intentar parsearlo como JSON
    if (typeof data === 'string') {
      try {
        return JSON.parse(data)
      } catch {
        return data
      }
    }

    return data
  }

  // Obtener los datos parseados
  const responseData = result?.data
  const parsedDataField = responseData?.data
    ? parseData(responseData.data)
    : null

  // Soporte para API que devuelve la cita en result.data.cita
  const citaFromApi = responseData?.cita ? parseData(responseData.cita) : null

  // create-consultation Edge devuelve la cita en apiResponse como string JSON
  const citaFromApiResponse = responseData?.apiResponse
    ? parseData(responseData.apiResponse)
    : null

  // Extraer información relevante (incluir cita si viene en data, cita o apiResponse)
  const appointmentData =
    parsedDataField || citaFromApi || citaFromApiResponse || responseData
  const appointmentId =
    appointmentData?.id ??
    appointmentData?.id_cita ??
    responseData?.id ??
    citaFromApi?.id
  const appointmentDate =
    appointmentData?.fecha ||
    appointmentData?.desiredDate ||
    appointmentData?.fecha_cita ||
    responseData?.fecha ||
    citaFromApi?.fecha
  const appointmentState =
    appointmentData?.state ??
    appointmentData?.estado ??
    responseData?.state ??
    citaFromApi?.state
  const successMessage = responseData?.message || result?.message

  // Depuración: ver qué llega al modal y por qué no se muestra la info
  console.log('[CONSULTATION MODAL] result:', result)
  console.log('[CONSULTATION MODAL] responseData (result.data):', responseData)
  console.log(
    '[CONSULTATION MODAL] parsedDataField (responseData.data):',
    parsedDataField,
  )
  console.log(
    '[CONSULTATION MODAL] citaFromApi (responseData.cita):',
    citaFromApi,
  )
  console.log(
    '[CONSULTATION MODAL] appointmentData (origen usado):',
    appointmentData,
  )
  console.log('[CONSULTATION MODAL] appointmentId:', appointmentId)
  console.log('[CONSULTATION MODAL] appointmentDate:', appointmentDate)
  console.log('[CONSULTATION MODAL] appointmentState:', appointmentState)
  console.log(
    '[CONSULTATION MODAL] ¿éxito HTTP? (status 200/201):',
    result?.status === 200 || result?.status === 201,
  )

  // Extraer mensaje de error y normalizarlo (evitar mostrar "Error API: Bad Request - {...}")
  const rawError =
    responseData?.error ||
    (typeof responseData === 'object' &&
    responseData !== null &&
    'error' in responseData
      ? String(responseData.error)
      : null)

  const normalizeErrorMessage = (err: string | null): string | null => {
    if (!err || typeof err !== 'string') return err ?? null
    // Si el texto contiene JSON con "message", extraerlo para mostrarlo limpio
    const jsonMatch = err.match(/\{"name"[^}]*"message"\s*:\s*"([^"]+)"/)
    if (jsonMatch?.[1]) return jsonMatch[1]
    try {
      const parsed = JSON.parse(err)
      if (parsed?.message) return String(parsed.message)
    } catch {
      // no es JSON
    }
    return err
  }

  const errorMessage = normalizeErrorMessage(rawError)

  const isSuccess =
    (result?.status === 200 ||
      result?.status === 201 ||
      responseData?.success === true) &&
    !result?.error &&
    !errorMessage

  // Extraer información del paciente, institución, etc.
  const patient = appointmentData?.patient
  const institution = appointmentData?.institution
  const specialty = appointmentData?.specialty

  const formatDate = (dateString: string) => {
    if (!dateString) return 'No disponible'
    try {
      return new Date(dateString).toLocaleString('es-CO', {
        timeZone: 'America/Bogota',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return dateString
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header con estilo de la marca */}
        <div className="flex justify-between items-center bg-primary text-white px-6 py-4 rounded-t-lg">
          <div className="flex items-center gap-3">
            {isSuccess ? (
              <CheckCircle className="w-6 h-6 text-white" />
            ) : (
              <XCircle className="w-6 h-6 text-white" />
            )}
            <h2 className="text-xl font-semibold">
              {isSuccess
                ? 'Cita Creada Exitosamente'
                : 'Error al Crear la Cita'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors duration-200"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 flex-1 overflow-y-auto text-gray-700">
          {/* Success/Error Message */}
          {(successMessage || errorMessage) && (
            <div
              className={`mb-4 p-3 rounded-lg ${
                isSuccess
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  isSuccess ? 'text-green-800' : 'text-red-800'
                }`}
              >
                {errorMessage || successMessage}
              </p>
              {errorMessage && (
                <p className="text-xs text-red-600 mt-2">
                  Por favor comparte este error con soporte si el problema
                  persiste.
                </p>
              )}
            </div>
          )}

          {/* Información de la Cita */}
          {isSuccess && appointmentData && (
            <div className="space-y-4">
              {/* ID y Estado */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <p className="text-sm font-semibold text-gray-800">
                    Información de la Cita
                  </p>
                </div>
                <div className="space-y-2 text-sm text-gray-700 ml-7">
                  {appointmentId && (
                    <p>
                      <span className="font-medium text-gray-800">
                        ID de Cita:
                      </span>{' '}
                      <span className="text-primary font-semibold">
                        {appointmentId}
                      </span>
                    </p>
                  )}
                  {appointmentDate && (
                    <p>
                      <span className="font-medium text-gray-800">
                        Fecha y Hora:
                      </span>{' '}
                      {formatDate(appointmentDate.split('Z')[0])}
                    </p>
                  )}
                  {appointmentState && (
                    <p>
                      <span className="font-medium text-gray-800">Estado:</span>{' '}
                      <span className="capitalize font-semibold text-primary">
                        {appointmentState}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              {/* Información del Paciente */}
              {patient?.user && (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-5 h-5 text-primary" />
                    <p className="text-sm font-semibold text-gray-800">
                      Paciente
                    </p>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700 ml-7">
                    <p>
                      <span className="font-medium text-gray-800">Nombre:</span>{' '}
                      {[
                        patient.user.name1,
                        patient.user.name2,
                        patient.user.lastname1,
                        patient.user.lastname2,
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">
                        Identificación:
                      </span>{' '}
                      {patient.user.identification}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">Email:</span>{' '}
                      {patient.user.email}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">
                        Teléfono:
                      </span>{' '}
                      {patient.user.phone}
                    </p>
                  </div>
                </div>
              )}

              {/* Información de la Institución */}
              {institution && (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-5 h-5 text-primary" />
                    <p className="text-sm font-semibold text-gray-800">
                      Institución
                    </p>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700 ml-7">
                    <p>
                      <span className="font-medium text-gray-800">Nombre:</span>{' '}
                      {institution.name}
                    </p>
                    {institution.phone1 && (
                      <p>
                        <span className="font-medium text-gray-800">
                          Teléfono:
                        </span>{' '}
                        {institution.phone1}
                      </p>
                    )}
                    {institution.address && (
                      <p>
                        <span className="font-medium text-gray-800">
                          Dirección:
                        </span>{' '}
                        {institution.address}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Especialidad */}
              {specialty && (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-sm font-semibold text-gray-800 mb-2">
                    Especialidad
                  </p>
                  <p className="text-sm text-gray-700">{specialty.name}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex justify-end space-x-4 bg-gray-100 rounded-b-lg shrink-0">
          <ButtonForm onClick={onClose} text="Cerrar" />
        </div>
      </div>
    </div>
  )
}

export default ConsultationResultModal
