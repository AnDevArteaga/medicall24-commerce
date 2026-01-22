import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { validateFields, validateStates } from "../../../utils/validate-fields";
import { usePurchaseContext } from "../../../contexts/checkout";
import ButtonForm from "../../ui/button-forms";
import InputText from "../../ui/input";
import SelectInput from "../../ui/select-map";
import { getInputClass } from "../../../utils/forms";
import { validateLength } from "../../../utils/validators";
import { setFieldError } from "../../../utils/forms";
import { useModal } from "../../../contexts/modals";

const CreditCardModal = () => {
    const [loading, setLoading] = useState(false);
    const [cardData, setCardData] = useState({
        number: "",
        cardHolder: "",
        expMonth: "",
        expYear: "",
        cvc: "",
    });
    const { errors, setErrors, validations, setValidations } =
        usePurchaseContext();
    const { openModal, closeModal } = useModal();
    const handleSelectCardData = (
        e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    ) => {
        const { name, value } = e.target;
        let newValue;

        // Validaciones específicas
        if (name === "number") {
            newValue = value.replace(/[^0-9]/g, ""); // Solo permitir números

            const isValidCardNumber = validateLength(newValue, 16, 16);
            if (!isValidCardNumber) {
                setFieldError(
                    name,
                    "El número de tarjeta no es válido",
                    setErrors,
                );
                setValidations((prev) => ({
                    ...prev,
                    cardNumber: false,
                }));
            } else {
                setFieldError(name, null, setErrors);
                setValidations((prev) => ({
                    ...prev,
                    cardNumber: true,
                }));
            }
        }
        setCardData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            openModal("vinculedCompleted");
            closeModal("cardVinculed");
        }, 2000);
        setCardData({
            number: "",
            cardHolder: "",
            expMonth: "",
            expYear: "",
            cvc: "",
        });
    };

    return (
        <div className="flex items-center justify-center ">
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-50"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative"
                    >
                        <h2 className="text-xl font-bold mb-6 text-center text-primary">
                            Vincula una tarjeta de crédito o débito
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <InputText
                                type="text"
                                name="number"
                                maxLength={16}
                                placeholder="XXXXXXXXXXXXXXXX"
                                onChange={handleSelectCardData}
                                value={cardData.number}
                                label="Número de Tarjeta"
                                obligatory
                                errorMessage={errors.number}
                                className={` ${
                                    errors.number
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } ${
                                    getInputClass(
                                        cardData,
                                        "number",
                                        "border-2 border-gray-300",
                                        "border-2 border-primary",
                                    )
                                }`}
                                autoComplete="off"
                            />

                            <InputText
                                type="text"
                                name="cardHolder"
                                onChange={handleSelectCardData}
                                value={cardData.cardHolder || ""}
                                autoComplete="off"
                                obligatory
                                errorMessage={null}
                                label="Nombre de la Tarjeta"
                                className={getInputClass(
                                    cardData,
                                    "cardHolder",
                                    "border-2 border-gray-300",
                                    "border-2 border-primary",
                                )}
                            />
                            <div className="flex flex-row space-x-2 justify-between">
                                <div className="flex flex-col space-x-2 items-center justify-between">
                                    <SelectInput
                                        label="Fecha de Expiración"
                                        name="expMonth"
                                        value={cardData.expMonth || ""}
                                        onChange={handleSelectCardData}
                                        obligatory
                                        options={Array.from(
                                            { length: 12 },
                                            (_, i) => ({
                                                value: String(i + 1).padStart(
                                                    2,
                                                    "0",
                                                ),
                                                label: String(i + 1).padStart(
                                                    2,
                                                    "0",
                                                ),
                                            }),
                                        )}
                                        valueKey="value"
                                        labelKey="label"
                                        className={getInputClass(
                                            cardData,
                                            "expMonth",
                                            "border-2 border-gray-300",
                                            "border-2 border-primary",
                                        )}
                                    />
                                    <SelectInput
                                        label="Fecha de Expiración"
                                        name="expYear"
                                        value={cardData.expYear || ""}
                                        onChange={handleSelectCardData}
                                        obligatory
                                        options={Array.from(
                                            { length: 15 },
                                            (_, i) => {
                                                const year =
                                                    new Date().getFullYear() +
                                                    i;
                                                const yearLastTwoDigits = year
                                                    .toString().slice(-2); // Solo los dos últimos dígitos del año
                                                return {
                                                    value: yearLastTwoDigits,
                                                    label: yearLastTwoDigits,
                                                };
                                            },
                                        )}
                                        valueKey="value"
                                        labelKey="label"
                                        className={getInputClass(
                                            cardData,
                                            "expYear",
                                            "border-2 border-gray-300",
                                            "border-2 border-primary",
                                        )}
                                    />
                                </div>
                                <div className="flex flex-row space-x-2">
                                    <InputText
                                        type="text"
                                        name="cvc"
                                        maxLength={3}
                                        onChange={handleSelectCardData}
                                        placeholder="XXX"
                                        value={cardData.cvc || ""}
                                        autoComplete="off"
                                        obligatory
                                        errorMessage={null}
                                        label="CVC"
                                        className={getInputClass(
                                            cardData,
                                            "cvc",
                                            "border-2 border-gray-300",
                                            "border-2 border-primary",
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <ButtonForm
                                    text="Vincular"
                                    type="submit"
                                    disabled={!validateFields(
                                        cardData,
                                        [
                                            "number",
                                            "cardHolder",
                                            "expMonth",
                                            "expYear",
                                            "cvc",
                                        ],
                                        validateStates(validations, [
                                            "cardNumber",
                                        ]),
                                    )}
                                    loading={loading}
                                />
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default CreditCardModal;
