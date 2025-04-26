import React from "react";
import SelectInput from "../../ui/select-map";
import { usePurchaseContext } from "../../../contexts/checkout";
import { useSelectDataPurchase } from "../../../hooks/useSelectDataPurchase";
import { getInputClass } from "../../../utils/forms";

const Pse: React.FC = () => {
    const { paymentMethod } = usePurchaseContext();
    const { handleSelectPaymentMethod, banksPse } = useSelectDataPurchase();
    return (
        <div>
            <h3 className="text-base font-bold mb-4 text-gray-700">
            Pago con PSE
            </h3>
            <form className="space-y-12">
            <SelectInput
                        label="Tipo de persona"
                        name="userType"
                        value={paymentMethod.userType || "PERSON"}
                        onChange={handleSelectPaymentMethod}
                        obligatory
                        options={[{
                            value: "0",
                            label: "Natural",}]}
                        valueKey="value"
                        labelKey="label"
                        className={getInputClass(paymentMethod, "userType", "border-2 border-gray-300", "border-2 border-primary")}

                    />
                    <SelectInput
                        label="Lista de Bancos"
                        name="financialInstitutionCode"
                        value={paymentMethod.financialInstitutionCode || ""}
                        onChange={handleSelectPaymentMethod}
                        obligatory
                        options={banksPse}
                        valueKey="financial_institution_code"
                        labelKey="financial_institution_name"
                        className={getInputClass(paymentMethod, "financialInstitutionCode", "border-2 border-gray-300", "border-2 border-primary")}
                    />
             

            </form>
        </div>
    );
};

export default Pse;
