import React from "react";
import InputText from "../../ui/input";
import SelectInput from "../../ui/select-map";
import { usePurchaseContext } from "../../../contexts/checkout";
import { useSelectDataPurchase } from "../../../hooks/useSelectDataPurchase";
import { getInputClass } from "../../../utils/forms";

const Card: React.FC = () => {
    const { paymentMethod, errors } = usePurchaseContext();
    const { handleSelectPaymentMethod } = useSelectDataPurchase();
    return (
        <div>
            <h3 className="text-base font-bold mb-4 text-gray-700">
                Pago con Tarjeta
            </h3>
            <form className="space-y-8">
                <InputText
                    type="text"
                    name="number"
                    maxLength={16}
                    placeholder="XXXXXXXXXXXXXXXX"
                    onChange={handleSelectPaymentMethod}
                    value={paymentMethod.card.number}
                    label="Número de Tarjeta"
                    obligatory
                    errorMessage={errors.number}
                    className={` ${
                        errors.number ? "border-red-500" : "border-gray-300"
                    } ${getInputClass(paymentMethod.card, "number", "border-2 border-gray-300", "border-2 border-primary")}`}
                    autoComplete="off"
                />

                <InputText
                    type="text"
                    name="cardHolder"
                    onChange={handleSelectPaymentMethod}
                    value={paymentMethod.card.cardHolder || ""}
                    autoComplete="off"
                    obligatory
                    errorMessage={null}
                    label="Nombre de la Tarjeta"
                    className={getInputClass(paymentMethod.card, "cardHolder", "border-2 border-gray-300", "border-2 border-primary")}
                />
                <div className="flex flex-row space-x-2 justify-between">
                <div className="flex flex-col space-x-2 items-center justify-between">
                    <SelectInput
                        label="Fecha de Expiración"
                        name="expMonth"
                        value={paymentMethod.card.expMonth || ""}
                        onChange={handleSelectPaymentMethod}
                        obligatory
                        options={Array.from({ length: 12 }, (_, i) => ({
                            value: String(i + 1).padStart(2, "0"),
                            label: String(i + 1).padStart(2, "0"),
                        }))}
                        valueKey="value"
                        labelKey="label"
                        className={getInputClass(paymentMethod.card, "expMonth", "border-2 border-gray-300", "border-2 border-primary")}

                    />
                    <SelectInput
                        label="Fecha de Expiración"
                        name="expYear"
                        value={paymentMethod.card.expYear || ""}
                        onChange={handleSelectPaymentMethod}
                        obligatory
                        options={Array.from({ length: 15 }, (_, i) => {
                            const year = new Date().getFullYear() + i;
                            const yearLastTwoDigits = year.toString().slice(-2); // Solo los dos últimos dígitos del año
                            return {
                                value: yearLastTwoDigits,
                                label: yearLastTwoDigits,
                            };
                        })}
                        valueKey="value"
                        labelKey="label"
                        className={getInputClass(paymentMethod.card, "expYear", "border-2 border-gray-300", "border-2 border-primary")}
                    />
                </div>
                <div className="flex flex-row space-x-2">  
                    <SelectInput
                        label="Cuotas"
                        name="installments"
                        value={paymentMethod.installments || 0}
                        onChange={handleSelectPaymentMethod}
                        obligatory
                        options={Array.from({ length: 12 }, (_, i) => {
                            const installments = i + 1;
                            return {
                                value: installments,
                                label: installments,
                            };
                        })}
                        valueKey="value"
                        labelKey="label"
                        className={getInputClass(paymentMethod, "installments", "border-2 border-gray-300", "border-2 border-primary")}
                    />

                    <InputText
                        type="text"
                        name="cvc"
                        maxLength={3}
                        onChange={handleSelectPaymentMethod}
                        placeholder="XXX"
                        value={paymentMethod.card.cvc || ""}
                        autoComplete="off"
                        obligatory
                        errorMessage={null}
                        label="CVC"
                        className={getInputClass(paymentMethod.card, "cvc", "border-2 border-gray-300", "border-2 border-primary")}
                    />
                </div>
                </div>


            </form>
        </div>
    );
};

export default Card;
