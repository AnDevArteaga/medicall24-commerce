import React from "react";
import Input from "../ui/input";
import SelectInput from "../ui/select-map";
import PasswordInput from "../ui/password-input";
import { usePurchaseContext } from "../../contexts/checkout";
import { useRegister } from "../../hooks/useRegister";
import { AlertCircle } from "lucide-react";
import { getInputClass } from "../../utils/forms";

const StepOne: React.FC = () => {
    const { isRegistered, registerData } = usePurchaseContext();
    const {
        handleInputChange,
        verifyUser,
        typesId,
        togglePasswordVisibility,
        showPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        setShowPassword,
        errors,
        handleValidateDomainEmail
    } = useRegister();

    return (
        <div className="bg-white rounded-lg p-6 w-full">
            <form className="space-y-4" autoComplete="off">
                {/* Fila 1 */}
                <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <SelectInput
                            label="Tipo de Identificación"
                            name="typeId"
                            value={registerData.user.typeId || ""}
                            onChange={handleInputChange}
                            onBlur={verifyUser}
                            obligatory
                            disabled={isRegistered}
                            options={typesId}
                            className={getInputClass(registerData.user, "typeId", "border-2 border-gray-300", "border-2 border-primary")}
                            
                        />

                        <div className="flex flex-row space-x-2">
                            <AlertCircle className="w-4 h-4 text-primary" />
                            <p className="text-xs text-gray-700">
                                La identificación no se puede modificar despues
                                de finalizar el registro.
                            </p>
                        </div>
                    </div>

                    <Input
                        label="Identificación"
                        name="identification"
                        value={registerData.user.identification || ""}
                        onChange={handleInputChange}
                        onBlur={verifyUser}
                        obligatory
                        disabled={isRegistered}
                        type="text"
                        errorMessage={null}
                        className={getInputClass(registerData.user, "identification", "border-2 border-gray-300", "border-2 border-primary")}
                    />
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                        label="Primer Nombre"
                        name="name1"
                        value={registerData.user.name1 || ""}
                        onChange={handleInputChange}
                        obligatory
                        disabled={isRegistered}
                        type="text"
                        errorMessage={null}
                        className={getInputClass(registerData.user, "name1", "border-2 border-gray-300", "border-2 border-primary")}
                    />
                    <Input
                        label="Segundo Nombre"
                        name="name2"
                        value={registerData.user.name2 || ""}
                        onChange={handleInputChange}
                        obligatory={false}
                        disabled={isRegistered}
                        type="text"
                        errorMessage={null}
                        className="border-2 border-gray-300"
                    />
                    <Input
                        label="Primer Apellido"
                        name="lastName1"
                        value={registerData.user.lastName1 || ""}
                        onChange={handleInputChange}
                        obligatory
                        disabled={isRegistered}
                        type="text"
                        errorMessage={null}
                        className={getInputClass(registerData.user, "lastName1", "border-2 border-gray-300", "border-2 border-primary")}
                    />
                    <Input
                        label="Segundo Apellido"
                        name="lastName2"
                        value={registerData.user.lastName2 || ""}
                        onChange={handleInputChange}
                        obligatory={false}
                        disabled={isRegistered}
                        type="text"
                        errorMessage={null}
                        className="border-2 border-gray-300"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <Input
                            label="Correo Electrónico"
                            name="email"
                            value={registerData.user.email || ""}
                            onChange={handleInputChange}
                            obligatory
                            disabled={isRegistered}
                            type="email"
                            errorMessage={errors.email}
                            className={getInputClass(registerData.user, "email", "border-2 border-gray-300", "border-2 border-primary")}
                            onBlur={() => handleValidateDomainEmail(registerData.user.email)}
                        />
                        <div className="flex flex-row space-x-2 mt-2">
                            <AlertCircle className="w-4 h-4 text-primary" />
                            <p className="text-xs text-gray-700">
                                El correo electrónico no se puede modificar
                                despues de finalizar el registro.
                            </p>
                        </div>
                    </div>
                </div>
                {!isRegistered && (
                <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-3">
                    <PasswordInput
                        label="Contraseña"
                        name="password"
                        value={registerData.user.password || ""}
                        onChange={handleInputChange}
                        obligatory
                        disabled={isRegistered}
                        showPassword={showPassword} // Usamos el mismo estado de visibilidad
                        togglePasswordVisibility={() => togglePasswordVisibility("password", showPassword, setShowPassword)}
                        errorMessage={null}
                        className={getInputClass(registerData.user, "password", "border-2 border-gray-300", "border-2 border-primary")}
                    />

                    <PasswordInput
                        label="Confirmar Contraseña"
                        name="confirmPassword"
                        value={registerData.user.confirmPassword || ""}
                        onChange={handleInputChange}
                        obligatory
                        disabled={isRegistered}
                        showPassword={showConfirmPassword}
                        togglePasswordVisibility={() => togglePasswordVisibility("confirmPassword", showConfirmPassword, setShowConfirmPassword)}
                        errorMessage={errors.confirmPassword}
                        className={getInputClass(registerData.user, "confirmPassword", "border-2 border-gray-300", "border-2 border-primary")}
                    />
                </div>
                )}
            </form>

            <p className="mt-5 text-xs">
                <span className="text-red-600 mr-1">*</span>Campos obligatorios
            </p>
        </div>
    );
};

export default StepOne;
