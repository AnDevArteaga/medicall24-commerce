import React from "react";
import Loader from "../ui/loader-spin";
import InputText from "../ui/input";
import SelectInput from "../ui/select-map";
import { getInputClass } from "../../utils/forms";
import ButtonForm from "../ui/button-forms";

interface FormData {
    activeTab: string;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    handleFormChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => void;
    loading: boolean;
}

const FormView: React.FC<FormData> = (
    {
        activeTab,
        handleSubmit,
        formData,
        setFormData,
        handleFormChange,
        loading,
    },
) => {
    return (
        <div
            className={`p-6 ${activeTab !== "form" ? "hidden" : ""}`}
        >
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                    Formulario de Autorización
                </h2>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Identificación */}
                    <div>
                        <InputText 
                            label="Identificación"
                            name="identificacion_usuario"
                            value={formData.identificacion_usuario}
                            obligatory
                            type="text"
                            errorMessage={null}
                            className={getInputClass(
                                formData,
                                "identificacion_usuario",
                                "border-2 border-gray-300",
                                "border-2 border-primary",
                            )}
                            onChange={handleFormChange}
                        />
                    </div>

                    {/* Producto */}
                    <div>
                    <SelectInput 
                            label="Producto"
                            name="id_producto"
                            value={formData.id_producto}
                            obligatory
                            options={[
                                { value: 17, label: "EXAMEN BEXA PARA DETECTAR MASAS EN MAMA" },
                            ]}
                            className={getInputClass(
                                formData,
                                "id_producto",
                                "border-2 border-gray-300",
                                "border-2 border-primary",
                            )}
                            onChange={handleFormChange}
                            valueKey="value"
                            labelKey="label"
                        />
                    </div>

                    {/* Plataforma */}
                    <div>
                    <SelectInput 
                            label="Plataforma"
                            name="codigo_plataforma_credito"
                            value={formData.codigo_plataforma_credito}
                            obligatory
                            options={[
                                { value: 17, label: "MEDDIPAY" },
                            ]}
                            className={getInputClass(
                                formData,
                                "codigo_plataforma_credito",
                                "border-2 border-gray-300",
                                "border-2 border-primary",
                            )}
                            onChange={handleFormChange}
                            valueKey="value"
                            labelKey="label"
                        />
                    </div>

                    {/* Valor aprobado */}
                    <div>
                    <InputText 
                            label="Valor aprobado"
                            name="valor_aprobado"
                            value={formData.valor_aprobado}
                            obligatory
                            type="text"
                            errorMessage={null}
                            className={getInputClass(
                                formData,
                                "valor_aprobado",
                                "border-2 border-gray-300",
                                "border-2 border-primary",
                            )}
                            onChange={handleFormChange}
                        />
                    </div>

                    {/* Fecha de aprobación */}
                    <div>
                          
                            <InputText 
                            label="Fecha de aprobación"
                            name="fecha_aprobacion"
                            value={formData.fecha_aprobacion}
                            obligatory
                            type="date"
                            errorMessage={null}
                            className={getInputClass(
                                formData,
                                "fecha_aprobacion",
                                "border-2 border-gray-300",
                                "border-2 border-primary",
                            )}
                            onChange={handleFormChange}
                        />
                        
                    </div>

                    {/* Código autorización */}
                    <div>
                    <InputText 
                            label="Código de autorización"
                            name="codigo_credito"
                            value={formData.codigo_credito}
                            obligatory
                            type="text"
                            errorMessage={null}
                            className={getInputClass(
                                formData,
                                "codigo_credito",
                                "border-2 border-gray-300",
                                "border-2 border-primary",
                            )}
                            onChange={handleFormChange}
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    <ButtonForm
                        text="Limpiar"
                        onClick={() =>
                            setFormData({
                                identificacion_usuario: "",
                                id_producto: "",
                                codigo_plataforma_credito: "",
                                valor_aprobado: "",
                                fecha_aprobacion: "",
                                codigo_credito: "",
                                cod_usua_ingresa: "",
                            })}/>

                        <ButtonForm
                            text="Guardar"
                            loading={loading}
                            colorLoading="text-white"
                            widthLoading={20}
                            type="submit"
                        />
                </div>
            </form>
        </div>
    );
};

export default FormView;
