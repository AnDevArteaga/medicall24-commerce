import React from 'react'
import SelectInput from '../../../ui/select-map'
import { useSelectAllie } from '../../../../hooks/useSelectAllie';
import { getInputClass } from '../../../../utils/forms';
import { usePurchaseContext } from '../../../../contexts/checkout';
import { useModal } from '../../../../contexts/modals';

const SelectAllie: React.FC = () => {
    const { loadingAliado, selectsDisabled, departments, municipalities, handleSelectChange } = useSelectAllie();
    const { registerPurchase } = usePurchaseContext();
    const { closeModal } = useModal();
  return (
    <div className="flex items-center justify-center h-auto">

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
            {/* Encabezado */}
            <div className="px-6 py-4 bg-primary text-white text-lg font-bold rounded-t-lg text-center">
              ¡Ya casi terminas!
            </div>

            {/* Contenido */}
            <div className="px-6 py-2 space-y-4 max-h-96 overflow-y-auto text-gray-700">
              <p className="text-sm text-gray-600">
                Recuerda que la prestación de los servicios de salud se
                realizará en las ciudades de Colombia descritas en los Términos
                y Condiciones que aceptaste. Si no tienes un Prestador de Salud
                asignado, puedes seleccionar uno en la ciudad donde quieres ser
                atendido:
              </p>
              <div className="flex flex-col justify-around bg-white">
                <div className="flex flex-row">
                    <SelectInput 
                        label="Departamento"
                        name="dpto_institucion"
                        value={registerPurchase.dpto_institucion}
                        obligatory
                        options={departments}
                        onChange={handleSelectChange}
                        valueKey="id"
                        labelKey="nombre"
                        className={getInputClass(
                            registerPurchase,
                            "dpto_institucion",
                            "border-2 border-gray-300",
                            "border-2 border-primary",
                        )}
                        disabled={selectsDisabled}
                    />
                    <SelectInput 
                        label="Municipio"
                        name="ciudad_institucion"
                        value={registerPurchase.ciudad_institucion}
                        obligatory
                        options={municipalities}
                        onChange={handleSelectChange}
                        valueKey="id"
                        labelKey="nombre"
                        className={getInputClass(
                            registerPurchase,
                            "ciudad_institucion",
                            "border-2 border-gray-300",
                            "border-2 border-primary",
                        )}
                        disabled={selectsDisabled}
                    />
                    <SelectInput 
                        label="Prestador"
                        name="nombre_institucion"
                        value={registerPurchase.nombre_institucion}
                        obligatory
                        options={[]}
                        onChange={handleSelectChange}
                        valueKey="id"
                        labelKey="nombre"
                        className={getInputClass(
                            registerPurchase,
                            "nombre_institucion",
                            "border-2 border-gray-300",
                            "border-2 border-primary",
                        )}
                        disabled={selectsDisabled}
                    />
                </div>
              </div>
            
              <div>
                <p className="text-gray-500 text-sm font-semibold">
                  Datos del prestador de salud asignado
                </p>
              </div>
              <div className="flex flex-col justify-around bg-white">
                <div className="flex flex-row">
                  <p className="text-sm font-semibold text-gray-500 mr-3">
                    Dirección:
                  </p>
                  <p className="text-sm text-gray-600">
                    {registerPurchase.direccion_institucion
                      ? registerPurchase.direccion_institucion
                      : "Seleccionar prestador de salud"}
                  </p>
                </div>
                <div className="flex flex-row">
                  <p className="text-sm font-semibold text-gray-500 mr-4">
                    Teléfono:
                  </p>
                  <p className="text-sm text-gray-600">
                    {registerPurchase.telefono_institucio
                      ? registerPurchase.telefono_institucio
                      : "Seleccionar prestador de salud"}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Los datos del Prestador de Salud asignado, así como los pasos de
                solicitud de cita, serán enviados al <span className="font-semibold text-primary">correo electrónico</span> que
                registraste en el proceso de compra, una vez el pago sea
                realizado con exitoso.
              </p>
              <p className="text-gray-600 text-sm">
                Para finalizar el pago presiona el botón continuar.
              </p>
            </div>

            {/* Footer con botones */}
            <div className="px-6 py-4 flex justify-between space-x-4 bg-gray-100 rounded-b-lg">
              <button
                onClick={() => closeModal("selectAllie")}
                className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-pink-700 transition-all"
              >
                Cancelar
              </button>
              <button
                // disabled={!accept}
                className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-pink-700 disabled:bg-gray-300 disabled:text-gray-700 transition-all"
                // onClick={handleNext}
                // disabled={!validate}
              >
                {/* {loading ? <Loader /> : "Continuar"} */}a
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default SelectAllie
