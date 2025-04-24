import React from "react";

interface SelectInputProps {
    label: string;
    options: { code: string; description: string }[];
    value: string;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    name: string;
    obligatory: boolean;
    disabled?: boolean;
    onBlur?: React.FocusEventHandler<HTMLSelectElement>;
    className?: string;
}

const SelectInput: React.FC<SelectInputProps> = (
    { label, options, value, onChange, name, obligatory, disabled, onBlur, className },
) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-gray-700 text-xs">
            {obligatory && <span className="text-red-600">*</span>} {label}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                onBlur={onBlur}
                className={`w-full px-3 py-1.5 text-xs disabled:text-gray-900 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none hover:shadow-md transition-all disabled:bg-gray-200 ${className}`}
            >
                <option value="">Selecciona</option>
                {options.map((option, index) => (
                    <option key={index} value={option.code}>
                        {option.description}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectInput;
