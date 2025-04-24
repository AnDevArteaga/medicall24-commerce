import React from "react";

interface buttonFormProps {
    onClick?: () => void;
    text: string;
    disabled?: boolean;
}

const ButtonForm: React.FC<buttonFormProps> = ({ onClick, text, disabled }) => {
    return (
        <button
            onClick={onClick}
            className="px-3 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primarydark transition-colors duration-200 cursor-pointer disabled:bg-neutral disabled:cursor-default"
            disabled={disabled}
       >
            {text}
        </button>
    );
};

export default ButtonForm;
