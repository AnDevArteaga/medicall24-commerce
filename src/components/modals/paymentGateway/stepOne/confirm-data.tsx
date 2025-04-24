import React from "react";
import { Eye, EyeOff } from "lucide-react"; // Usamos los íconos de Lucide
import { useRegister } from "../../../../hooks/useRegister"; // Importamos la función registrar del hook
import { usePurchaseContext } from "../../../../contexts/checkout";
import ButtonForm from "../../../ui/button-forms";

interface ModalProps {
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
    const { registerUser, showPassword, setShowPassword, loading } =
        useRegister();
    const { registerData } = usePurchaseContext();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Mapeamos el tipo de ID usando el objeto de mapeo
    const typeIdMap: { [key: string]: string } = {
        CC: "Cédula de ciudadanía",
        TI: "Tarjeta de identidad",
        CE: "Cédula de extranjería",
        PA: "Pasaporte",
        RC: "Registro civil",
        AS: "Adulto sin identificación",
        MS: "Menor sin identificación",
        CD: "Carné Diplomático",
        SC: "Salvo Conducto",
        EP: "Permiso Especial de Permanencia",
        PT: "Permiso por Protección Temporal",
        NU: "No. Único de Identificación Personal",
        NV: "Certificado Nacido Vivo",
    };

    const displayType = typeIdMap[registerData.user?.typeId || ""];

    return (
        <div className="fixed inset-0 bg-gray-600/50 flex justify-center items-center backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-lg w-2/3 sm:w-full">
                {/* Encabezado */}
                <div className="bg-primary text-white text-lg font-bold py-4 px-6 rounded-t-lg text-center">
                    Verifica tus datos
                </div>

                {/* Contenido */}
                <div className="p-6">
                    <p className="text-sm text-gray-700 mb-4">
                        Por favor, confirma que los datos ingresados son
                        correctos.
                    </p>

                    {/* Lista de datos con Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                            <h4 className="text-xs font-medium text-gray-800">
                                Tipo de ID:
                            </h4>
                            <p className="text-xs text-gray-600">
                                {displayType || "N/A"}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xs font-medium text-gray-800">
                                Identificación:
                            </h4>
                            <p className="text-xs text-gray-600">
                                {registerData.user?.identification || "N/A"}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xs font-medium text-gray-800">
                                Primer Nombre:
                            </h4>
                            <p className="text-xs text-gray-600">
                                {registerData.user?.name1 || "N/A"}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xs font-medium text-gray-800">
                                Segundo Nombre:
                            </h4>
                            <p className="text-xs text-gray-600">
                                {registerData.user?.name2 || "N/A"}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xs font-medium text-gray-800">
                                Primer Apellido:
                            </h4>
                            <p className="text-xs text-gray-600">
                                {registerData.user?.lastName1 || "N/A"}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xs font-medium text-gray-800">
                                Segundo Apellido:
                            </h4>
                            <p className="text-xs text-gray-600">
                                {registerData.user?.lastName2 || "N/A"}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-gray-800">
                                Correo Electrónico:
                            </h4>
                            <p className="text-xs text-gray-600">
                                {registerData.user?.email || "N/A"}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xs font-medium text-gray-800">
                                Contraseña:
                            </h4>
                            <div className="flex items-center space-x-2">
                                <input
                                    className="text-xs text-gray-600"
                                    disabled
                                    type={showPassword ? "text" : "password"}
                                    value={registerData.user?.password || "N/A"}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="text-gray-600 hover:text-primary focus:outline-none cursor-pointer"
                                >
                                    {showPassword
                                        ? <Eye className="w-4 h-4" />
                                        : <EyeOff className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Botón */}
                <div className="px-6 py-4 bg-gray-100 flex justify-between rounded-b-lg text-center">
                        <ButtonForm onClick={onClose} text="Editar" />
                        <ButtonForm onClick={registerUser} text={loading ? "Registrando..." : "Confirmar"} disabled={loading} />
                </div>
            </div>
        </div>
    );
};

export default Modal;
