import React from "react";

interface SelectInputProps<T> {
    label: string;
    options: T[]; // Array genérico
    value: string | number;
    valueKey: keyof T; // Clave del objeto que se usará como valor
    labelKey: keyof T; // Clave del objeto que se usará como opción (label)
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
    name: string;
    obligatory: boolean;
    disabled?: boolean;
    onBlur?: React.FocusEventHandler<HTMLSelectElement>;
    className?: string;
    selected?: string;
}

const SelectInput = <T extends object>({
    label,
    options,
    value,
    valueKey,
    labelKey,
    onChange,
    name,
    obligatory,
    disabled,
    onBlur,
    className,
    selected,
}: SelectInputProps<T>) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-gray-700 text-xs font-medium">
                {obligatory && <span className="text-red-600">*</span>} {label}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                onBlur={onBlur}
                className={`w-full px-3 py-1.5 text-xs disabled:text-gray-900 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none hover:shadow-md transition-all disabled:bg-gray-200 bg-white ${className}`}
            >
                <option value="">Selecciona</option>
                {options.map((option, index) => (
                    <option key={index} value={String(option[valueKey])} selected={selected === String(option[valueKey])}>
                        {String(option[labelKey])}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectInput;
