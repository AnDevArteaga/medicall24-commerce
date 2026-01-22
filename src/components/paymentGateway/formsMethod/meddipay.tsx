import React from "react";
import { usePurchaseContext } from "../../../contexts/checkout";
import { useSelectDataPurchase } from "../../../hooks/useSelectDataPurchase";
import { getInputClass } from "../../../utils/forms";
import InputText from "../../ui/input";
import ButtonForm from "../../ui/button-forms";
import { CheckCircle } from "lucide-react";
import { useModal } from "../../../contexts/modals";

const Pse: React.FC = () => {
    const { creditData, errors, validations } = usePurchaseContext();
    const { handleSelectDataCredit } = useSelectDataPurchase();
    const { openModal } = useModal();

    const handleOpenValidateModal = () => {
        openModal("validateMeddipayCupo");
    };

    const handleOpenSolicitarCupoModal = () => {
        openModal("solicitarCupoMeddipay");
    };

    return (
        <div className="text-left">
            <h3 className="text-base font-bold mb-2 text-gray-700">
                Pago con Meddipay
            </h3>
            
            {/* Botón Solicitar Cupo */}
            <div className="mb-2">
                <ButtonForm 
                    text="Solicitar cupo" 
                    onClick={handleOpenSolicitarCupoModal}
                />
            </div>

            {/* Primera descripción */}
            <p className="text-gray-600 text-sm mb-2">
                Si ya tienes un cupo aprobado en <strong>Meddipay</strong> solicita la validación para obtener el código de autorización con que podrás finalizar tu compra.
            </p>

            {/* Botón Validar cupo */}
            <div className="mb-2">
                <ButtonForm
                    onClick={handleOpenValidateModal}
                    text="Validar cupo"
                    loading={false}
                    colorLoading="text-white"
                    widthLoading={20}
                />
            </div>

            {/* Segunda descripción */}
            <p className="text-gray-600 text-sm mb-4">
                Si terminaste la validación de tu cupo en <strong>Meddipay</strong> y cuentas con el número de autorización, ingrésalo aquí para finalizar tu compra.
            </p>

            {/* Input de autorización */}
            <div className="mb-4">
                <InputText
                    type="text"
                    name="meddipayAuthorizationCode"
                    onChange={handleSelectDataCredit}
                    value={creditData.meddipayAuthorizationCode || ""}
                    obligatory
                    label="Número de autorización"
                    placeholder="Ingresa el numero de autorizacion"
                    className={getInputClass(
                        creditData,
                        "meddipayAuthorizationCode",
                        "border-2 border-gray-300",
                        "border-2 border-primary",
                    )}
                    errorMessage={errors.meddipayAuthorizationCode}
                />
                {validations.meddipayAuthorizationCode && (
                    <div className="flex flex-row mt-2">
                        <CheckCircle className="text-green-600 w-4 mr-2">
                        </CheckCircle>
                        <p className="text-green-600 text-xs">
                            Código de autorización válido
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Pse;
