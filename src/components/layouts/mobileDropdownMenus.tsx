import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface MobileDropdownMenuProps {
    label: string;
    menuItems: { label: string; href: string; target: string }[];
}

const MobileDropdownMenu: React.FC<MobileDropdownMenuProps> = ({
    label,
    menuItems,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="relative">
            <button
                onClick={handleClick}
                className="flex items-center gap-2 text-gray-600 text-lg hover:text-pink-600"
            >
                {label}
                <ChevronDown
                    className={`transform transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <ul className="absolute left-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-64">
                    {menuItems.map((item, index) => (
                        <li key={index} className="hover:bg-pink-100">
                            <a
                                href={item.href}
                                className="block px-4 py-2 text-gray-700 text-sm hover:text-pink-600"
                                target={item.target}
                                rel={item.target === "_blank"
                                    ? "noopener noreferrer"
                                    : undefined}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MobileDropdownMenu;
