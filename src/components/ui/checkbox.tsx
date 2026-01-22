import { Check } from "lucide-react";
import React from "react";

interface InputCheckProps {
    id: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    disabled?: boolean;
}

const InputCheck: React.FC<InputCheckProps> = (
    { id, checked, onChange, label, disabled = false },
) => {
    return (
        <label
            htmlFor={id}
            className={`flex items-center select-none ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
        >
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="sr-only peer"
            />

            {/* Caja del checkbox */}
            <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200
        ${checked ? "bg-primary border-primary" : "border-primary bg-white"}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
            >
                {checked && <Check size={16} className="text-white" />}
            </div>

            {/* Etiqueta */}
            <span className="ml-2 text-gray-700 text-xs">{label}</span>
        </label>
    );
};

export default InputCheck;
