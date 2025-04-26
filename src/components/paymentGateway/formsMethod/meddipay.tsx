import React from "react";
import { usePurchaseContext } from "../../../contexts/checkout";
import { useSelectDataPurchase } from "../../../hooks/useSelectDataPurchase";
import { getInputClass } from "../../../utils/forms";
import InputText from "../../ui/input";
import ButtonBuy from "../../ui/button-buy";
import ButtonForm from "../../ui/button-forms";
import {CheckCircle } from "lucide-react";

const Pse: React.FC = () => {
    const { creditData, errors, validations } = usePurchaseContext();
    const { handleSelectDataCredit, handleValidtionAuthorizationCode, Loading } = useSelectDataPurchase();
    return (
        <div>
            <h3 className="text-base font-bold mb-4 text-gray-700">
                Pago con Meddipay
            </h3>
            <div className="flex flex-col items-center justify-center mb-4">
                <a
                    href="https://www.meddipay.com.co/"
                    target="_blank"
                >
                    <ButtonBuy text="Solicitar Cupo" />
                </a>
            </div>
            <div className="space-y-8">
                    <div>
                    <InputText
                        type="text"
                        name="meddipayAuthorizationCode"
                        onChange={handleSelectDataCredit}
                        value={creditData.meddipayAuthorizationCode || ""}
                        obligatory
                        label="Ingresa Numero de autorización"
                        className={getInputClass(
                            creditData,
                            "meddipayAuthorizationCode",
                            "border-2 border-gray-300",
                            "border-2 border-primary",
                        )}
                        errorMessage={errors.meddipayAuthorizationCode}
                    />
                                        {validations.meddipayAuthorizationCode && (
                                <div className="flex flex-row">
                                    <CheckCircle className="text-green-600 w-4 mr-2">
                                    </CheckCircle>
                                    <p className="text-green-600 text-xs mt-1">
                                        Código promocional válido
                                    </p>
                                </div>
                            )}
                    </div>
                
                    <div className="flex items-center justify-center">
                    <ButtonForm
                        onClick={handleValidtionAuthorizationCode}
                        text={Loading ? "Validando..." : "Validar"}
                    />
                    </div>

                
            </div>
        </div>
    );
};

export default Pse;
