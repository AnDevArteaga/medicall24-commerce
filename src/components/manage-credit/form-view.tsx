import React from 'react'
import InputText from '../ui/input'
import SelectInput from '../ui/select-map'
import { getInputClass } from '../../utils/forms'
import { FileText, Trash2, Save } from 'lucide-react'

interface FormData {
  activeTab: string
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  formData: any
  setFormData: React.Dispatch<React.SetStateAction<any>>
  handleFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  loading: boolean
}

const FormView: React.FC<FormData> = ({
  activeTab,
  handleSubmit,
  formData,
  setFormData,
  handleFormChange,
  loading,
}) => {
  // Determinar si el formulario está en modo de gestión (solo cuando se gestiona desde la tabla)
  const isGestionMode = formData.isGestionMode === true
  return (
    <div className={`${activeTab !== 'form' ? 'hidden' : ''}`}>
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-primary/10 p-2 rounded-lg">
            <FileText className="text-primary" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Formulario de Autorización
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Complete los datos para autorizar un crédito
            </p>
          </div>
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {/* Identificación */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Identificación <span className="text-red-500">*</span>
            </label>
            <InputText
              label=""
              name="identificacion_usuario"
              value={formData.identificacion_usuario}
              obligatory
              type="text"
              errorMessage={null}
              disabled={isGestionMode}
              className={getInputClass(
                formData,
                'identificacion_usuario',
                'border-2 border-gray-300 focus:border-primary',
                'border-2 border-primary'
              )}
              onChange={handleFormChange}
            />
          </div>

          {/* Producto */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Producto <span className="text-red-500">*</span>
            </label>
            <SelectInput
              label=""
              name="id_producto"
              value={formData.id_producto}
              obligatory
              disabled={isGestionMode}
              options={[
                { value: 17, label: 'EXAMEN BEXA PARA DETECTAR MASAS EN MAMA' },
              ]}
              className={getInputClass(
                formData,
                'id_producto',
                'border-2 border-gray-300 focus:border-primary',
                'border-2 border-primary'
              )}
              onChange={handleFormChange}
              valueKey="value"
              labelKey="label"
            />
          </div>

          {/* Plataforma */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Plataforma <span className="text-red-500">*</span>
            </label>
            <SelectInput
              label=""
              name="codigo_plataforma_credito"
              value={formData.codigo_plataforma_credito}
              obligatory
              disabled={isGestionMode}
              options={[{ value: 17, label: 'MEDDIPAY' }]}
              className={getInputClass(
                formData,
                'codigo_plataforma_credito',
                'border-2 border-gray-300 focus:border-primary',
                'border-2 border-primary'
              )}
              onChange={handleFormChange}
              valueKey="value"
              labelKey="label"
            />
          </div>

          {/* Valor aprobado */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Valor aprobado <span className="text-red-500">*</span>
            </label>
            <InputText
              label=""
              name="valor_aprobado"
              value={
                formData.valor_aprobado
                  ? typeof formData.valor_aprobado === 'string'
                    ? formData.valor_aprobado
                    : Number(formData.valor_aprobado).toLocaleString('es-CO')
                  : ''
              }
              obligatory
              type="text"
              errorMessage={null}
              disabled={isGestionMode}
              className={getInputClass(
                formData,
                'valor_aprobado',
                'border-2 border-gray-300 focus:border-primary',
                'border-2 border-primary'
              )}
              onChange={(e) => {
                // Remover todos los caracteres que no sean números
                const numericValue = e.target.value.replace(/\D/g, '')

                // Formatear inmediatamente con separadores de miles
                if (numericValue) {
                  const formattedValue =
                    Number(numericValue).toLocaleString('es-CO')
                  setFormData((prev: any) => ({
                    ...prev,
                    valor_aprobado: formattedValue,
                  }))
                } else {
                  setFormData((prev: any) => ({
                    ...prev,
                    valor_aprobado: '',
                  }))
                }
              }}
            />
          </div>

          {/* Fecha de aprobación */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Fecha de aprobación <span className="text-red-500">*</span>
            </label>
            <InputText
              label=""
              name="fecha_aprobacion"
              value={formData.fecha_aprobacion}
              obligatory
              type="date"
              errorMessage={null}
              className={getInputClass(
                formData,
                'fecha_aprobacion',
                'border-2 border-gray-300 focus:border-primary',
                'border-2 border-primary'
              )}
              onChange={handleFormChange}
              disabled={formData.fecha_aprobacion !== ''}
            />
          </div>

          {/* Código autorización */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Código de autorización <span className="text-red-500">*</span>
            </label>
            <InputText
              label=""
              name="codigo_credito"
              value={formData.codigo_credito}
              obligatory
              type="text"
              errorMessage={null}
              className={getInputClass(
                formData,
                'codigo_credito',
                'border-2 border-gray-300 focus:border-primary',
                'border-2 border-primary'
              )}
              onChange={handleFormChange}
            />
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                identificacion_usuario: '',
                id_producto: '',
                codigo_plataforma_credito: '',
                valor_aprobado: '',
                fecha_aprobacion: '',
                codigo_credito: '',
                correo_comprador: '',
                isGestionMode: false, // Desactivar modo gestión al limpiar
                id_gestion: undefined, // Limpiar ID de gestión
              })
            }
            className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all duration-200 hover:scale-105"
          >
            <Trash2 size={18} />
            <span>Limpiar</span>
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 px-6 py-3 bg-primary hover:bg-primarydark text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Guardando...</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>Guardar</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormView
