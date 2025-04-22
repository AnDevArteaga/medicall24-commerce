import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface MenuItem {
    href: string;
    label: string;
    target: string;
}

interface DropdownMenuProps {
    label: string;
    menuItems: MenuItem[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ label, menuItems }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLLIElement>(null);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <li className="relative group z-10" ref={dropdownRef}>
            <p
                className="transform transition duration-200 hover:scale-105 flex hover:font-semibold text-center hover:text-pink-600 cursor-pointer"
                onClick={handleClick}
            >
                {label}
                <span>
                    <ChevronDown
                        className={`transform transition-transform ${
                            isOpen ? "rotate-180" : ""
                        }`}
                    />
                </span>
            </p>

            {isOpen && (
                <ul className="absolute left-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-64">
                    {menuItems.map((item, index) => (
                        <li className="hover:bg-pink-100" key={index}>
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
        </li>
    );
};

export default DropdownMenu;
