import React from "react";
import ButtonForm from "../../../ui/button-forms";
import InputText from "../../../ui/input";
import SelectInput from "../../../ui/select-map";
import { getInputClass } from "../../../../utils/forms";
import { Info } from "lucide-react";
import { useBillingForm } from "../../../../hooks/useHandleDataBilling";
import { validateFields, validateStates } from "../../../../utils/validate-fields";
import InputCheck from "../../../ui/checkbox";
import { useModal } from "../../../../contexts/modals";
import { HandleValidateDomainEmail } from "../../../../hooks/useValidateDomainEmail";
import { usePurchaseContext } from "../../../../contexts/checkout";
const Billing: React.FC = () => {
    const { registerPurchase, errors, validations, setValidations } = usePurchaseContext();
    const {
        handleDataBilling,

    } = useBillingForm();
    const { closeModal } = useModal();
    const validateDomain = HandleValidateDomainEmail();

    return (
        <div className="fixed inset-0 bg-gray-600/50 flex justify-center items-center backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-lg w-auto sm:w-full">
                {/* Encabezado */}
                <div className="bg-primary text-white text-lg font-bold py-4 px-6 rounded-t-lg text-center">
                    Solicitud de Factura Electrónica
                </div>

                {/* Contenido */}
                <div className="max-w-2xl mx-auto">
                    <div className="space-y-2 p-6">
                        <div className="sm:overflow-scroll sm:h-[30rem] sm:px-2 space-y-4">
                            {/* Selects */}
                            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-2">
                                <SelectInput
                                    label="Tipo de Persona"
                                    name="tipopersona_factura"
                                    value={registerPurchase.tipopersona_factura}
                                    obligatory
                                    options={[
                                        { value: 0, label: "Persona Natural" },
                                        { value: 1, label: "Persona Jurídica" },
                                    ]}
                                    onChange={handleDataBilling}
                                    valueKey="value"
                                    labelKey="label"
                                    className={getInputClass(
                                        registerPurchase,
                                        "tipopersona_factura",
                                        "border-2 border-gray-300",
                                        "border-2 border-primary",
                                    )}
                                />

                                <SelectInput
                                    label="Tipo de Documento"
                                    name="tipoid_factura"
                                    value={registerPurchase.tipoid_factura}
                                    obligatory
                                    options={[
                                        {
                                            value: "CC",
                                            label: "Cédula de Ciudadanía",
                                        },
                                        {
                                            value: "CE",
                                            label: "Cédula de Extranjería",
                                        },
                                        { value: "NIT", label: "NIT" },
                                        {
                                            value: "NITOP",
                                            label: "NIT de otro país",
                                        },
                                        { value: "NUIP", label: "NUIP" },
                                        {
                                            value: "Pasaporte",
                                            label: "Pasaporte",
                                        },
                                        {
                                            value: "Registro Civil",
                                            label: "Registro Civil",
                                        },
                                        {
                                            value: "Tarjeta de identidad",
                                            label: "Tarjeta de identidad",
                                        },
                                    ]}
                                    onChange={handleDataBilling}
                                    valueKey="value"
                                    labelKey="label"
                                    className={getInputClass(
                                        registerPurchase,
                                        "tipoid_factura",
                                        "border-2 border-gray-300",
                                        "border-2 border-primary",
                                    )}
                                />
                            </div>

                            {/* Inputs */}
                            <div className="flex flex-row items-center gap-2 justify-between">
                                <InputText
                                    label="Número de Documento"
                                    name="numid_factura"
                                    value={registerPurchase.numid_factura}
                                    obligatory
                                    type="text"
                                    errorMessage={null}
                                    className={getInputClass(
                                        registerPurchase,
                                        "numid_factura",
                                        "border-2 border-gray-300",
                                        "border-2 border-primary",
                                    )}
                                    onChange={handleDataBilling}
                                />
                                <InputText
                                    label="DV"
                                    name="dv_factura"
                                    value={registerPurchase.dv_factura}
                                    obligatory
                                    type="text"
                                    errorMessage={null}
                                    className={getInputClass(
                                        registerPurchase,
                                        "dv_factura",
                                        "border-2 border-gray-300",
                                        "border-2 border-primary",
                                    )}
                                    onChange={handleDataBilling}
                                />
                                <InputText
                                    label="Nombre y Apellido / Razón Social"
                                    name="nombre_factura"
                                    value={registerPurchase.nombre_factura}
                                    obligatory
                                    type="text"
                                    errorMessage={null}
                                    className={getInputClass(
                                        registerPurchase,
                                        "nombre_factura",
                                        "border-2 border-gray-300",
                                        "border-2 border-primary",
                                    )}
                                    onChange={handleDataBilling}
                                />
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-2">
                                <InputText
                                    label="País"
                                    name="pais_factura"
                                    value={registerPurchase.pais_factura}
                                    obligatory
                                    placeholder="COLOMBIA"
                                    onChange={handleDataBilling}
                                
                                    className={getInputClass(
                                        registerPurchase,
                                        "pais_factura",
                                        "border-2 border-gray-300",
                                        "border-2 border-primary",
                                    )}
                                    disabled
                                    errorMessage={null}
                                    type="text"
                                />
                                {/* <InputText
                                    label="Ciudad"
                                    name="ciudad_factura"
                                    value={
                                        ""}
                                    obligatory
                                    type="text"
                                    errorMessage={null}
                                    className={getInputClass(
                                        registerPurchase,
                                        "ciudad_factura",
                                        "border-2 border-gray-300",
                                        "border-2 border-primary",
                                    )}
                                    onChange={handleDataBilling}
                                /> */}
                                <InputText
                                    label="Dirección"
                                    name="direccion_factura"
                                    value={registerPurchase.direccion_factura}
                                    obligatory
                                    type="text"
                                    errorMessage={null}
                                    className={getInputClass(
                                        registerPurchase,
                                        "direccion_factura",
                                        "border-2 border-gray-300",
                                        "border-2 border-primary",
                                    )}
                                    onChange={handleDataBilling}
                                />
                            </div>
                                    <div>
                                    <InputText
                                label="Correo Electrónico"
                                name="correo_factura"
                                value={registerPurchase.correo_factura}
                                obligatory
                                type="email"
                                errorMessage={errors.email}
                                onBlur={() =>
                                    validateDomain(registerPurchase.correo_factura)}
                                className={getInputClass(
                                    registerPurchase,
                                    "correo_factura",
                                    "border-2 border-gray-300",
                                    "border-2 border-primary",
                                )}
                                onChange={handleDataBilling}
                            />

                                    </div>
                         
                            {/* Mensaje de Atención */}
                            <div className="flex items-start space-x-1 p-4 bg-yellow-50 rounded-md">
                                <Info className="h-3 w-3 text-yellow-600 mt-0.5" />
                                <p className="text-xs text-yellow-700">
                                    En este correo recibirás el documento
                                    tributario en un plazo máximo de 48 horas
                                </p>
                            </div>

                            {/* Términos */}
                            <div className="flex items-start space-x-1">
                                <span className="text-red-500 text-xs">*</span>
                                <InputCheck
                                    label="Confirmo que los datos son correctos y que coinciden con los reportados ante la Dirección de Impuestos y Aduanas Nacionales (DIAN) de colombia"
                                    onChange={() => setValidations((prev: any) => ({ ...prev, termBillingAcept: !validations.termBillingAcept }))}
                                    checked={validations.termBillingAcept}
                                    id="terms"
                                />
                            </div>

                            <p className="text-xs mt-2">
                                <span className="text-red-500">*</span>{" "}
                                Campos obligatorios
                            </p>
                        </div>

                        {/* Botones */}
                        <div className="px-6 py-4 flex justify-between rounded-b-lg text-center">
                            <ButtonForm
                                onClick={() => closeModal("billingData")}
                                text="Cerrar"
                            />

                            <ButtonForm
                                disabled={!validateFields(registerPurchase, [
                                    "correo_factura",
                                    "pais_factura",
                                    "direccion_factura",
                                    "numid_factura",
                                    "dv_factura",
                                    "nombre_factura",
                                    "tipoid_factura",
                                    "tipopersona_factura",
                            
                                
                                ], validateStates(validations, [
                                    "emailBillingValid",
                                    "termBillingAcept"
                                ]))}
                                onClick={() => close}
                                text="Guardar"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Billing;
