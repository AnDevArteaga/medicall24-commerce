import React from "react";
import { usePurchaseContext } from "../../../contexts/checkout";
import { useSelectDataPurchase } from "../../../hooks/useSelectDataPurchase";
import { getInputClass } from "../../../utils/forms";
import InputText from "../../ui/input";

const Pse: React.FC = () => {
    const { paymentMethod, errors } = usePurchaseContext();
    const { handleSelectPaymentMethod } = useSelectDataPurchase();
    return (
        <div>
            <h3 className="text-base font-bold mb-4 text-gray-700">
            Pago con Nequi
            </h3>
            <div className="space-y-8">
                <InputText
                        type="text"
                        name="phoneNumber"
                        maxLength={10}
                        onChange={handleSelectPaymentMethod}
                        value={paymentMethod.phoneNumber || ""}
                        autoComplete="off"
                        obligatory
                        label="Número de teléfono asociado a Nequi"
                        className={getInputClass(paymentMethod, "phoneNumber", "border-2 border-gray-300", "border-2 border-primary")}
                        errorMessage={errors.phoneNumber}
                    />
                
            </div>
        </div>
    );
};

export default Pse;
