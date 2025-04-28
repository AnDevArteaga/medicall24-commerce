import React from "react";
import InputText from "../ui/input";
import SelectInput from "../ui/select-map";
import { usePurchaseContext } from "../../contexts/checkout";
import { getInputClass } from "../../utils/forms";
import { useRegister } from "../../hooks/useRegister";
import {
    useSelectDataPurchase,
} from "../../hooks/useSelectDataPurchase";
import { useModal } from "../../contexts/modals";

import visa from "../../assets/svg/visa.svg";
import mastercard from "../../assets/svg/mastercard.svg";
import pse from "../../assets/svg/pse.svg";
import ban from "../../assets/svg/ban.svg";
import nequi from "../../assets/svg/nequi.svg";
import meddipay from "../../assets/svg/meddipay-logo.svg";

import Card from "./formsMethod/card";
import Pse from "./formsMethod/pse";
import Bancolombia from "./formsMethod/bancolombia";
import Nequi from "./formsMethod/nequi";
import Meddipay from "./formsMethod/meddipay";


const renderFormMethod = (method: string) => {
    switch (method) {
        case "CARD":
            return <Card />;
        case "PSE":
            return <Pse />;
        case "BANCOLOMBIA_TRANSFER":
            return <Bancolombia />;
        case "NEQUI":
            return <Nequi />;
        case "MEDDIPAY":
            return <Meddipay />;
        default:
            return <div>No se encontró el método de pago</div>;
    }
};

const StepTwo: React.FC = () => {
    const { openModal } = useModal();
    const {
        errors,
        purchaseData,
        isValidPaymentMethod,
        selectedMethod,
        typesId,
    } = usePurchaseContext();
    usePurchaseContext();
    const { handleValidateDomainEmail } = useRegister(); //Para reutilizar la funcion de validación de correo
    const {
        handleSelectDataPurchase,
        departments,
        municipalities,
        methods,
        onMethodChange,
    } = useSelectDataPurchase();
    return (
        <div className="bg-white rounded-lg p-6 sm:p-2 w-full grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 gap-6">
            {/* Columna izquierda */}
            <div>
                <form className="space-y-2" autoComplete="off">
                    <h2 className="text-2xl font-bold text-gray-700 text-center mb-12 mt-6">
                        Datos del comprador
                    </h2>
                    {/* Fila 1 */}
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                        <div>
                            <SelectInput
                                label="Tipo de Identificación"
                                name="typeId"
                                value={purchaseData.typeId || ""}
                                obligatory
                                disabled={isValidPaymentMethod}
                                options={typesId}
                                onChange={handleSelectDataPurchase}
                                valueKey={"code"}
                                labelKey={"description"}
                                className={getInputClass(purchaseData, "typeId", "border-2 border-gray-300", "border-2 border-primary")}
                            />
                            <p className="text-xs text-gray-700">
                                Para métodos de pago PSE, el tipo de
                                identificación debe ser Cédula de Ciudadanía.
                            </p>
                        </div>
                        <InputText
                            label="Identificación"
                            name="identification"
                            value={purchaseData.identification || ""}
                            obligatory
                            disabled={isValidPaymentMethod}
                            type="text"
                            errorMessage={null}
                            className={getInputClass(
                                purchaseData,
                                "identification",
                                "border-2 border-gray-300",
                                "border-2 border-primary",
                            )}
                            onChange={handleSelectDataPurchase}
                        />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                        <InputText
                            label="Nombres"
                            name="names"
                            value={purchaseData.names || ""}
                            obligatory
                            disabled={isValidPaymentMethod}
                            type="text"
                            errorMessage={null}
                            className={getInputClass(
                                purchaseData,
                                "names",
                                "border-2 border-gray-300",
                                "border-2 border-primary",
                            )}
                            onChange={handleSelectDataPurchase}
                        />
                        <InputText
                            label="Apellidos"
                            name="lastNames"
                            value={purchaseData.lastNames || ""}
                            obligatory
                            disabled={isValidPaymentMethod}
                            type="text"
                            errorMessage={null}
                            className={getInputClass(
                                purchaseData,
                                "lastNames",
                                "border-2 border-gray-300",
                                "border-2 border-primary",
                            )}
                            onChange={handleSelectDataPurchase}
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <InputText
                                label="Correo Electrónico"
                                name="email"
                                value={purchaseData.email || ""}
                                obligatory
                                type="email"
                                errorMessage={errors.email}
                                className={getInputClass(
                                    purchaseData,
                                    "email",
                                    "border-2 border-gray-300",
                                    "border-2 border-primary",
                                )}
                                onBlur={() =>
                                    handleValidateDomainEmail(
                                        purchaseData.email,
                                    )}
                                onChange={handleSelectDataPurchase}
                            />
                            <div className="flex flex-row space-x-2 mt-2">
                                <p className="text-xs text-gray-700">
                                    El correo electrónico no se puede modificar
                                    despues de finalizar el registro.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                        <InputText
                            label="Dirección"
                            name="address"
                            value={purchaseData.address || ""}
                            obligatory
                            type="text"
                            errorMessage={null}
                            className={getInputClass(
                                purchaseData,
                                "address",
                                "border-2 border-gray-300",
                                "border-2 border-primary",
                            )}
                            onChange={handleSelectDataPurchase}
                        />
                        <InputText
                            label="Telefono"
                            name="phone"
                            value={purchaseData.phone || ""}
                            obligatory
                            type="text"
                            errorMessage={null}
                            className={getInputClass(
                                purchaseData,
                                "phone",
                                "border-2 border-gray-300",
                                "border-2 border-primary",
                            )}
                            onChange={handleSelectDataPurchase}
                        />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                        <SelectInput
                            label="Departamentos"
                            options={departments}
                            name="departament"
                            value={purchaseData.departament || ""}
                            obligatory
                            valueKey={"id"}
                            labelKey={"nombre"}
                            onChange={handleSelectDataPurchase}
                            className={getInputClass(
                                purchaseData,
                                "departament",
                                "border-2 border-gray-300",
                                "border-2 border-primary",
                            )}
                        />{" "}
                        <SelectInput
                            label="Municipio"
                            name="city"
                            value={purchaseData.city || ""}
                            obligatory
                            disabled={purchaseData.departament === "" ||
                                purchaseData.departament === "Selecciona"}
                            options={municipalities}
                            onChange={handleSelectDataPurchase}
                            valueKey={"id"}
                            labelKey={"nombre"}
                            className={getInputClass(
                                purchaseData,
                                "city",
                                "border-2 border-gray-300",
                                "border-2 border-primary",
                            )}
                        />
                    </div>

                    {/* Fila 2 */}
                </form>
                <p className="text-xs mt-4">
                    <span className="text-red-600">*</span>{" "}
                    Campos obligatorios{" "}
                </p>
                <p className="text-xs text-gray-800 mt-4">
                    ¿Necesitas factura?
                </p>

                <div className="flex items-center space-x-3 p-0 bg-gray-50 mt-4">
                    {/* Ícono a la izquierda */}
                    <div className="text-gray-700">
                        {/* <FileText className="w-5 h-5" /> */}
                    </div>

                    {/* Texto descriptivo */}
                    <p className="text-xs text-gray-700">
                        Para solicitar documento tributario a nombre de quién
                        paga o compra,{" "}
                        <span className="text-primary underline cursor-pointer hover:text-primarydark font-semibold" onClick={() => openModal("billingData")}
                        >
                            click aquí
                        </span>
                    </p>
                </div>
            </div>

            {/* Columna derecha */}
            <div className="flex justify-center w-full bg-gray-100 rounded-xl px-4 py-2 mt-2">
                <div className="w-full mx-auto flex flex-col">
                    <h2
                        className={`text-2xl font-bold text-gray-700 text-center`}
                    >
                        Selecciona un Método de Pago
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-2 p-1 w-full gap-2 place-items-center rounded-lg mb-2">
                        {methods.map((method) => (
                            <div key={method.id} className="w-full">
                                <button
                                    onClick={() =>
                                        onMethodChange(method.id)}
                                    className={`flex flex-col items-center justify-center w-full h-20 transition-all duration-300 ease-in-out group rounded-xl cursor-pointer
          ${
                                        selectedMethod === ""
                                            ? "border-2 border-pink-600"
                                            : selectedMethod === method.id
                                            ? "bg-white border-2 border-pink-600 shadow-lg"
                                            : "border-none"
                                    }
          transform transition-transform duration-300 fade-in`}
                                >
                                    <div className="mb-2">
                                        <div className="flex items-center justify-center">
                                            {/* Condicional para imágenes de métodos */}
                                            {method.id === "CARD" && (
                                                <>
                                                    <img
                                                        src={visa}
                                                        alt="visa"
                                                        className="w-10 h-10"
                                                    />
                                                    <img
                                                        src={mastercard}
                                                        alt="mastercard"
                                                        className="w-10 h-10"
                                                    />
                                                </>
                                            )}
                                            {method.id === "PSE" && (
                                                <img
                                                    src={pse}
                                                    alt="pse"
                                                    className="w-10 h-10"
                                                />
                                            )}
                                            {method.id ===
                                                    "BANCOLOMBIA_TRANSFER" && (
                                                <img
                                                    src={ban}
                                                    alt="bancolombia"
                                                    className="w-10 h-10"
                                                />
                                            )}
                                            {method.id === "NEQUI" && (
                                                <img
                                                    src={nequi}
                                                    alt="nequi"
                                                    className="w-10 h-10"
                                                />
                                            )}
                                            {method.id === "MEDDIPAY" && (
                                                <img
                                                    src={meddipay}
                                                    alt="meddipay"
                                                    className="w-20 h-auto"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <span
                                        className={`text-center font-semibold text-xs
            ${
                                            selectedMethod === method.id
                                                ? method.textColor
                                                : "text-gray-500"
                                        } 
            group-hover:text-opacity-100 transition-all`}
                                    >
                                        {method.label}
                                    </span>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="animate-fade-in">
                        {renderFormMethod(selectedMethod)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepTwo;
