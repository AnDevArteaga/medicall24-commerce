import React, { useState, useEffect } from 'react'
import SelectInput from '../../../ui/select-map'
import ButtonForm from '../../../ui/button-forms'
import { useSelectAllieExtended } from '../../../../hooks/useSellectAppoiment'
import { getInputClass } from '../../../../utils/forms'
import { useModal } from '../../../../contexts/modals'
// import { validateFields } from '../../../../utils/validate-fields';
// import { usePaymentFlow } from '../../../../hooks/usePaymentFlow';
import { capitalize } from '../../../../utils/forms'
// import { useNavigate } from 'react-router-dom'
import InputCheck from '../../../ui/checkbox'
import ConsentModal from './consent-modal'
import { getConsent } from '../../../../services/azure/consents'
import { usePurchaseContext } from '../../../../contexts/checkout'
import { isProductPromo } from '../../../../guard/type-product'

const SelectAllie: React.FC = () => {
  const {
    departments,
    municipalities,
    allyProvider,
    loadingAliado,
    selectsDisabled,
    sedes,
    professionals,
    days,
    hours,
    loadingSedes,
    loadingProfessionals,
    loadingDays,
    loadingHours,
    selectedValues,
    handleSelectChange,
    reset,
    createAppointmentData,
    registerPurchase,
    cover,
  } = useSelectAllieExtended()

  const { closeModal, openModal, isModalOpen, getModalProps } = useModal()
  const { product } = usePurchaseContext()
  // const { executeAction } = usePaymentFlow();
  // const navigate = useNavigate()
  const [consentAccepted, setConsentAccepted] = useState(false)
  const [loadingConsent, setLoadingConsent] = useState(false)

  // Obtener las props del modal de consentimiento
  const consentProps = getModalProps('consentModal')

  // Verificar si hay producto promocional y aún no se ha cargado el prestador
  const isPromoProduct = product && isProductPromo(product)
  const isWaitingForPromoLoad =
    isPromoProduct && !selectedValues.nombre_institucion
  const shouldShowLoader = loadingAliado || isWaitingForPromoLoad

  const handleContinue = () => {
    // executeAction("nextStepTwo");
    closeModal('selectAllieBexa')
  }
  const handleClose = () => {
    reset()
    setConsentAccepted(false)
    closeModal('selectAllieBexa')
    window.location.href = '/Examen-bexa'
  }

  const handleConsentCheckboxChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Si el checkbox está siendo desmarcado, simplemente desmarcarlo
    if (!e.target.checked) {
      setConsentAccepted(false)
      return
    }

    // Si no hay prestador seleccionado, no hacer nada
    if (!selectedValues.nombre_institucion) {
      e.target.checked = false
      return
    }

    // Si el checkbox está siendo marcado, obtener el consentimiento
    if (e.target.checked && !consentAccepted) {
      setLoadingConsent(true)
      try {
        const consentData = await getConsent({
          typeServiceId: 3,
          institutionId: parseInt(selectedValues.nombre_institucion),
        })

        // Abrir el modal con los datos del consentimiento
        openModal('consentModal', {
          name: consentData.name,
          description: consentData.description,
        })
      } catch (error) {
        console.error('Error al obtener el consentimiento:', error)
        // Si hay error, no marcar el checkbox
        e.target.checked = false
      } finally {
        setLoadingConsent(false)
      }
    }
  }

  const handleConsentAccept = () => {
    setConsentAccepted(true)
    closeModal('consentModal')
  }

  const handleConsentCancel = () => {
    closeModal('consentModal')
    // No marcar el checkbox si se cancela
  }

  // Resetear el consentimiento cuando cambie el prestador
  useEffect(() => {
    setConsentAccepted(false)
  }, [selectedValues.nombre_institucion])

  const fecha = new Date(createAppointmentData.fecha.replace('Z', ''))

  console.log(fecha)
  const fechaFormateada = fecha.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const horaFormateada = fecha.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

  // Validar que todos los campos necesarios estén llenos
  const isFormValid =
    selectedValues.dpto_institucion &&
    selectedValues.ciudad_institucion &&
    selectedValues.nombre_institucion &&
    selectedValues.sede &&
    selectedValues.professional &&
    selectedValues.day &&
    selectedValues.hour &&
    registerPurchase.direccion_institucion &&
    registerPurchase.telefono_institucio &&
    consentAccepted

  // Validar si todos los campos están llenos para habilitar el checkbox
  const areAllFieldsFilled =
    selectedValues.dpto_institucion &&
    selectedValues.ciudad_institucion &&
    selectedValues.nombre_institucion &&
    selectedValues.sede &&
    selectedValues.professional &&
    selectedValues.day &&
    selectedValues.hour &&
    registerPurchase.direccion_institucion &&
    registerPurchase.telefono_institucio

  return (
    <div className="flex items-center justify-center h-auto">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] flex flex-col relative">
          {/* Loader que cubre todo el modal mientras carga el prestador */}
          {shouldShowLoader && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-lg z-50 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 border-4 border-t-[#c2185b] border-gray-300 rounded-full animate-spin"></div>
                <p className="text-gray-600 text-sm font-medium">
                  Cargando prestador...
                </p>
              </div>
            </div>
          )}

          {/* Encabezado */}
          <div className="px-6 py-4 bg-primary text-white text-lg font-bold rounded-t-lg text-center shrink-0">
            Selecciona tu ubicación y agenda tu cita
          </div>

          {/* Contenido */}
          <div className="px-6 py-4 space-y-2 overflow-y-auto text-gray-700 flex-1">
            <p className="text-sm text-gray-600">
              Selecciona la ciudad y el prestador de salud donde quieres recibir
              la atención:
            </p>

            {/* Selects de ubicación */}
            <div className="space-y-3">
              {/* <p className="text-sm font-semibold text-gray-700">Ubicación del Prestador</p> */}
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 w-1/2 md:w-full lg:w-full xl:w-full place-self-center">
                <SelectInput
                  label="Departamento"
                  name="dpto_institucion"
                  value={selectedValues.dpto_institucion}
                  obligatory
                  options={departments}
                  onChange={handleSelectChange}
                  valueKey="id"
                  labelKey="nombre"
                  className={getInputClass(
                    registerPurchase,
                    'dpto_institucion',
                    'border-2 border-gray-300',
                    'border-2 border-primary'
                  )}
                  disabled={selectsDisabled}
                  loading={loadingAliado}
                />
                <SelectInput
                  label="Municipio"
                  name="ciudad_institucion"
                  value={selectedValues.ciudad_institucion}
                  obligatory
                  options={municipalities}
                  onChange={handleSelectChange}
                  valueKey="id"
                  labelKey="nombre"
                  className={getInputClass(
                    registerPurchase,
                    'ciudad_institucion',
                    'border-2 border-gray-300',
                    'border-2 border-primary'
                  )}
                  disabled={selectsDisabled || !selectedValues.dpto_institucion}
                  loading={loadingAliado}
                />
                <SelectInput
                  label="Prestadores de salud"
                  name="nombre_institucion"
                  value={selectedValues.nombre_institucion}
                  obligatory
                  options={allyProvider || []}
                  onChange={handleSelectChange}
                  valueKey="id"
                  labelKey="nombre"
                  className={getInputClass(
                    registerPurchase,
                    'nombre_institucion',
                    'border-2 border-gray-300',
                    'border-2 border-primary'
                  )}
                  disabled={
                    selectsDisabled || !selectedValues.ciudad_institucion
                  }
                  loading={loadingAliado}
                />
              </div>
            </div>

            {/* Datos del prestador */}
            {registerPurchase.direccion_institucion && (
              <div className="grid grid-cols-2 xs:px-0 xs:grid-cols-1 sm:px-0 sm:grid-cols-1 px-32 items-center">
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-3">
                    Datos del prestador de salud seleccionado
                  </p>

                  <div className="flex gap-4 items-center">
                    <div className="space-y-2 flex-1">
                      <div className="flex gap-2">
                        <p className="text-sm font-semibold text-gray-500 w-20">
                          Dirección:
                        </p>
                        <p className="text-sm text-gray-600 flex-1">
                          {registerPurchase.direccion_institucion}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <p className="text-sm font-semibold text-gray-500 w-20">
                          Teléfono:
                        </p>
                        <p className="text-sm text-gray-600 flex-1">
                          {registerPurchase.telefono_institucio}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <img
                    src={cover}
                    alt="Imagen del prestador de salud"
                    className="w-auto h-48 object-cover rounded flex-shrink-0"
                  />
                </div>
              </div>
            )}

            {/* Selects de agendamiento */}
            {selectedValues.nombre_institucion && (
              <div className="space-y-3 border-t pt-4">
                <p className="text-sm font-semibold text-gray-700">
                  Agenda tu cita
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <SelectInput
                    label="Sede"
                    name="sede"
                    value={selectedValues.sede}
                    obligatory
                    options={sedes}
                    onChange={handleSelectChange}
                    valueKey="id"
                    labelKey="name"
                    className="border-2 border-gray-300 focus:border-primary"
                    disabled={!selectedValues.nombre_institucion}
                    loading={loadingSedes}
                  />
                  <SelectInput
                    label="Profesional"
                    name="professional"
                    value={selectedValues.professional}
                    obligatory
                    options={professionals.map((p) => ({
                      ...p,
                      displayName: capitalize(
                        `${p.user.name1} ${p.user.name2} ${p.user.lastname1} ${p.user.lastname2}`
                      ),
                    }))}
                    onChange={handleSelectChange}
                    valueKey="id"
                    labelKey="displayName"
                    className="border-2 border-gray-300 focus:border-primary"
                    disabled={!selectedValues.sede}
                    loading={loadingProfessionals}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <SelectInput
                    label="Día"
                    name="day"
                    value={selectedValues.day}
                    obligatory
                    options={days.map((d) => ({
                      ...d,
                      displayDate: capitalize(
                        new Date(d.date).toLocaleDateString('es-ES', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })
                      ),
                    }))}
                    onChange={handleSelectChange}
                    valueKey="date"
                    labelKey="displayDate"
                    className="border-2 border-gray-300 focus:border-primary"
                    disabled={!selectedValues.professional}
                    loading={loadingDays}
                  />
                  <SelectInput
                    label="Hora"
                    name="hour"
                    value={selectedValues.hour}
                    obligatory
                    options={hours}
                    onChange={handleSelectChange}
                    valueKey="fecha"
                    labelKey="fecha"
                    className="border-2 border-gray-300 focus:border-primary"
                    disabled={!selectedValues.day}
                    loading={loadingHours}
                  />
                </div>
              </div>
            )}

            {/* Información final */}
            {selectedValues.hour && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-green-900 mb-1">
                      Cita pre-agendada
                    </p>
                    <div className="flex items-center gap-2 text-xs text-green-700">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{capitalize(fechaFormateada)}</span>
                      <span className="text-green-400">•</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{capitalize(horaFormateada)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <p className="text-gray-600 text-sm">
              La confirmación de la cita será enviada al correo electrónico que
              registraste, una vez finalices tu compra.
            </p>
            {/* <p className="text-gray-600 text-sm">
              Para finalizar el pago presiona el botón continuar.
            </p> */}
          </div>

          {/* Footer con botones */}
          <div className="px-6 py-4 flex justify-between space-x-4 bg-gray-100 rounded-b-lg shrink-0">
            <div className="flex items-center gap-2">
              <ButtonForm onClick={handleClose} text="Cancelar" />
              <InputCheck
                id="accept"
                checked={consentAccepted}
                onChange={handleConsentCheckboxChange}
                label="Consentimiento informado"
                disabled={!areAllFieldsFilled || loadingConsent}
              />
            </div>
            <div>
              <ButtonForm
                onClick={handleContinue}
                text="Continuar"
                disabled={!isFormValid}
                loading={false}
                colorLoading="text-white"
                widthLoading={20}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal de consentimiento */}
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

export default SelectAllie
