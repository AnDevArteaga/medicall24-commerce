import React from "react";

interface InputTextProps {
    label: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    type: string;
    name: string;
    obligatory: boolean;
    disabled?: boolean;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    className?: string;
    errorMessage: string | null;
}

const InputText: React.FC<InputTextProps> = (
    { label, value, onChange, type, name, obligatory, disabled, onBlur, className, errorMessage },
) => {
    return (
        <div>
            <label htmlFor={name} className="block text-gray-700 font-medium text-xs mb-1">
            {obligatory && <span className="text-red-600">*</span>} {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                onBlur={onBlur}
                className={`w-full px-3 py-1.5 text-xs disabled:bg-gray-200 disabled:text-gray-500 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none hover:shadow-md transition-all ${className}`}
            />
                        {errorMessage && <span className="text-red-500 text-xs mt-1">{errorMessage}</span>}

        </div>
    );
};

export default InputText;
