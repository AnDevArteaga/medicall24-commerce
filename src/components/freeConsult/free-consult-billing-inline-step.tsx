import React, { useEffect, useState } from 'react'
import InputText from '../ui/input'
import SelectInput from '../ui/select-map'
import ButtonForm from '../ui/button-forms'
import InputCheck from '../ui/checkbox'
import { usePurchaseContext } from '../../contexts/checkout'
import { useBillingForm } from '../../hooks/useHandleDataBilling'
import {
  getDepartments,
  getMunicipalities,
} from '../../services/azure/location'
import type {
  Department,
  Municipality,
} from '../../interfaces/location.interfaces'
import { getInputClass, buildFullName } from '../../utils/forms'
import { validateFields, validateStates } from '../../utils/validate-fields'
import type { Validations } from '../../interfaces/validations.interface'
import { HandleValidateDomainEmail } from '../../hooks/useValidateDomainEmail'
import { validateEmail } from '../../utils/validators'
import type { PurchaseData } from '../../interfaces/checkout.interfase'
import type { User } from '../../interfaces/user.interface'

function resolvePatientBillingFields(
  registerData: User,
  purchaseData: PurchaseData,
) {
  const u = registerData.user
  const { fullName, fullLastName } = buildFullName(
    u.name1,
    u.name2,
    u.lastName1,
    u.lastName2,
  )
  const nombreRegistro = `${fullName} ${fullLastName}`.trim()
  const nombreCompra =
    `${purchaseData.names ?? ''} ${purchaseData.lastNames ?? ''}`.trim()

  return {
    identification: u.identification?.trim() || purchaseData.identification?.trim() || '',
    typeId: u.typeId?.trim() || purchaseData.typeId?.trim() || 'CC',
    nombre: nombreRegistro || nombreCompra,
    email: u.email?.trim() || purchaseData.email?.trim() || '',
    address: purchaseData.address?.trim() || '',
    phone: u.phone?.trim() || purchaseData.phone?.trim() || '',
    departament: purchaseData.departament || '',
    city: purchaseData.city || '',
  }
}

export interface FreeConsultBillingInlineStepProps {
  onBack: () => void
  onContinue: () => void
}

export const FreeConsultBillingInlineStep: React.FC<
  FreeConsultBillingInlineStepProps
> = ({ onBack, onContinue }) => {
  const {
    registerPurchase,
    registerData,
    purchaseData,
    setPurchaseData,
    setRegisterPurchase,
    errors,
    validations,
    setValidations,
    setErrors,
  } = usePurchaseContext()
  const { handleDataBilling } = useBillingForm()
  const validateDomain = HandleValidateDomainEmail()
  const [departments, setDepartments] = useState<Department[]>([])
  const [municipalities, setMunicipalities] = useState<Municipality[]>([])
  const [usePatient, setUsePatient] = useState(false)

  useEffect(() => {
    setRegisterPurchase((prev) => ({
      ...prev,
      tipopersona_factura:
        prev.tipopersona_factura === '' ||
        prev.tipopersona_factura === undefined
          ? 0
          : prev.tipopersona_factura,
      tipoid_factura: prev.tipoid_factura || 'CC',
      dv_factura: prev.dv_factura === '' ? '0' : prev.dv_factura,
      pais_factura: prev.pais_factura || 'COLOMBIA',
    }))
  }, [setRegisterPurchase])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const d = await getDepartments()
        if (!cancelled) setDepartments(d || [])
      } catch {
        if (!cancelled) setDepartments([])
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const dep = purchaseData.departament
    if (!dep) {
      setMunicipalities([])
      return
    }
    let cancelled = false
    ;(async () => {
      try {
        const m = await getMunicipalities(dep)
        if (!cancelled) setMunicipalities(m || [])
      } catch {
        if (!cancelled) setMunicipalities([])
      }
    })()
    return () => {
      cancelled = true
    }
  }, [purchaseData.departament])

  const applyPatient = (checked: boolean) => {
    setUsePatient(checked)
    if (!checked) return

    const p = resolvePatientBillingFields(registerData, purchaseData)

    setRegisterPurchase((prev) => ({
      ...prev,
      tipopersona_factura: 0,
      tipoid_factura: p.typeId || prev.tipoid_factura || 'CC',
      numid_factura: p.identification || prev.numid_factura,
      nombre_factura: p.nombre || prev.nombre_factura,
      correo_factura: p.email || prev.correo_factura,
      direccion_factura: p.address || prev.direccion_factura,
      telefono_comprador: p.phone || prev.telefono_comprador,
    }))

    setPurchaseData((prev) => ({
      ...prev,
      identification: p.identification || prev.identification,
      typeId: p.typeId || prev.typeId,
      names: prev.names || registerData.user.name1,
      lastNames: prev.lastNames || registerData.user.lastName1,
      email: p.email || prev.email,
      address: p.address || prev.address,
      phone: p.phone || prev.phone,
      departament: p.departament || prev.departament,
      city: p.city || prev.city,
    }))

    if (p.email && validateEmail(p.email)) {
      setErrors((prev) => ({ ...prev, email: null }))
      setValidations((prev) => ({ ...prev, emailBillingValid: true }))
    }
  }

  const handleDeptChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value
    setPurchaseData((prev) => ({
      ...prev,
      departament: v,
      city: '',
    }))
  }

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value
    setPurchaseData((prev) => ({ ...prev, city: v }))
  }

  const tipopersonaOk =
    registerPurchase.tipopersona_factura === 0 ||
    registerPurchase.tipopersona_factura === 1

  const canContinue =
    tipopersonaOk &&
    validateFields(
      registerPurchase,
      [
        'correo_factura',
        'pais_factura',
        'direccion_factura',
        'numid_factura',
        'dv_factura',
        'nombre_factura',
        'tipoid_factura',
      ],
      validateStates(validations as Validations, [
        'emailBillingValid',
        'termBillingAcept',
      ]),
    ) &&
    Boolean(purchaseData.departament && purchaseData.city)

  return (
    <div className="bg-white rounded-2xl shadow-md py-12 px-20 max-w-xl mx-auto w-full space-y-4">
      <h2 className="text-gray-700 text-sm text-center">
        Agrega los datos de facturación
      </h2>
      <InputCheck
        id="use-patient-billing"
        label="Usar la información del paciente (documento, nombre y correo)"
        checked={usePatient}
        onChange={(e) => applyPatient(e.target.checked)}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3">
        <InputText
          label="Identificación / NIT"
          name="numid_factura"
          value={registerPurchase.numid_factura}
          obligatory
          type="text"
          errorMessage={null}
          placeholder="Ingresa los datos"
          className={getInputClass(
            registerPurchase,
            'numid_factura',
            'border-2 border-gray-300',
            'border-2 border-primary',
          )}
          onChange={handleDataBilling}
        />

        <InputText
          label="Nombre o razón social"
          name="nombre_factura"
          value={registerPurchase.nombre_factura}
          obligatory
          type="text"
          errorMessage={null}
          placeholder="Ingresa los datos"
          className={getInputClass(
            registerPurchase,
            'nombre_factura',
            'border-2 border-gray-300',
            'border-2 border-primary',
          )}
          onChange={handleDataBilling}
        />
      </div>

      <InputText
        label="Correo electrónico"
        name="correo_factura"
        value={registerPurchase.correo_factura}
        obligatory
        type="email"
        errorMessage={errors.email}
        onBlur={() => validateDomain(registerPurchase.correo_factura)}
        placeholder="Ingresa los datos"
        className={getInputClass(
          registerPurchase,
          'correo_factura',
          'border-2 border-gray-300',
          'border-2 border-primary',
        )}
        onChange={handleDataBilling}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3">
        <InputText
          label="Dirección"
          name="direccion_factura"
          value={registerPurchase.direccion_factura}
          obligatory
          type="text"
          errorMessage={null}
          placeholder="Ingresa los datos"
          className={getInputClass(
            registerPurchase,
            'direccion_factura',
            'border-2 border-gray-300',
            'border-2 border-primary',
          )}
          onChange={handleDataBilling}
        />

        <SelectInput
          label="País"
          name="pais_factura"
          value={registerPurchase.pais_factura}
          obligatory
          options={[{ value: 'COLOMBIA', label: 'Colombia' }]}
          onChange={handleDataBilling}
          valueKey="value"
          labelKey="label"
          className="border-2 border-gray-300"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3">
        <SelectInput
          label="Departamento"
          name="departamento_comprador_ui"
          value={purchaseData.departament || ''}
          obligatory
          options={departments}
          onChange={handleDeptChange}
          valueKey="id"
          labelKey="nombre"
          className="border-2 border-gray-300"
        />
        <SelectInput
          label="Ciudad"
          name="ciudad_comprador_ui"
          value={purchaseData.city || ''}
          obligatory
          options={municipalities}
          onChange={handleCityChange}
          valueKey="id"
          labelKey="nombre"
          className="border-2 border-gray-300"
          disabled={!purchaseData.departament}
        />
      </div>

      <div className="flex items-start space-x-1">
        <span className="text-red-500 text-xs">*</span>
        <InputCheck
          label="Confirmo que los datos de facturación son correctos"
          id="term-billing-free"
          checked={validations.termBillingAcept}
          onChange={() =>
            setValidations((prev) => ({
              ...prev,
              termBillingAcept: !prev.termBillingAcept,
            }))
          }
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
        <ButtonForm text="Atrás" onClick={onBack} className="rounded-full" />
        <ButtonForm
          text="Confirmar"
          onClick={onContinue}
          disabled={!canContinue}
          className="rounded-full"
        />
      </div>
    </div>
  )
}
