import React from "react";
import { useModal } from "../../../contexts/modals";
import ButtonForm from "../../ui/button-forms";
import { usePurchaseContext } from "../../../contexts/checkout";

const VinculedCompleted: React.FC = () => {
    const { setRegisterData, setIsRegistered } = usePurchaseContext();
    const { closeModal } = useModal();
    return (
        <div className="fixed inset-0 bg-gray-600/50 flex justify-center items-center backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Tarjeta vinculada exitosamente
                    </h3>
                    <p className="mt-4 text-gray-600">
                        Tu tarjeta ha sido vinculada correctamente. en los
                        proximos minutos recibirás un correo con los pasos para
                        acceder a tu consulta gratuita.
                    </p>

                    <div className="mt-6 text-center">
                        <ButtonForm
                            text="Cerrar"
                            onClick={() => {closeModal("vinculedCompleted");
                                setRegisterData((prev) => ({
                                    ...prev,
                                    user: {
                                        identification: "",
                                        typeId: "",
                                        name1: "",
                                        name2: "",
                                        lastName1: "",
                                        lastName2: "",
                                        email: "",
                                        password: "",
                                        confirmPassword: "",
                                    },
                                    epsId: null,
                                    regimenId: null,
                                }));
                                setIsRegistered(false);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VinculedCompleted;
