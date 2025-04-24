import React from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
    label: string;
    name: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    showPassword: boolean; // Recibimos el estado como prop
    togglePasswordVisibility: () => void; // Recibimos la función para alternar la visibilidad
    obligatory: boolean,
    disabled?: boolean;
    errorMessage: string | null;
    className?: string;

}

const PasswordInput: React.FC<PasswordInputProps> = ({
    label,
    name,
    value,
    onChange,
    showPassword,
    togglePasswordVisibility,
    obligatory,
    disabled,
    errorMessage,
    className

}) => {
    return (
        <div>
                     <label htmlFor={name} className="block text-gray-700 font-medium text-xs mb-1">
            {obligatory && <span className="text-red-600">*</span>} {label}
            </label>

            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={`w-full px-3 py-1.5 text-xs disabled:bg-gray-200 disabled:text-gray-500 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none hover:shadow-md transition-all ${className}`}
                />

                <span
                    onClick={togglePasswordVisibility} // Usamos la función pasada como prop
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                    {showPassword
                        ? <EyeOff className="text-gray-600" />
                        : <Eye className="text-gray-600" />}
                </span>
            </div>
            {errorMessage && <span className="text-red-500 text-xs mt-1">{errorMessage}</span>}

        </div>
    );
};

export default PasswordInput;
