import React from "react";
import LoaderSpin from "./loader-spin";

interface buttonFormProps {
    onClick?: () => void;
    text: string;
    disabled?: boolean;
    loading?: boolean;
    colorLoading?: string;
    widthLoading?: number;
    type?: string;
    className?: string;
}

const ButtonForm: React.FC<buttonFormProps> = ({ onClick, text, disabled, loading, colorLoading, widthLoading, type, className }) => {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primarydark transition-colors duration-200 cursor-pointer disabled:bg-neutral disabled:cursor-default ${className}`}
            disabled={disabled}
            type={type as "button" | "submit" | "reset"}
       >
            {loading ? <LoaderSpin className={colorLoading} width={widthLoading} /> : text}
        </button>
    );
};

export default ButtonForm;
