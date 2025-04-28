import { Check } from "lucide-react";
import React from "react";

interface InputCheckProps {
    id: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
}

const InputCheck: React.FC<InputCheckProps> = (
    { id, checked, onChange, label },
) => {
    return (
        <label
            htmlFor={id}
            className="flex items-center cursor-pointer select-none"
        >
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={onChange}
                className="sr-only peer"
            />

            {/* Caja del checkbox */}
            <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200
        ${checked ? "bg-primary border-primary" : "border-primary bg-white"}
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
