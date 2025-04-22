import React from "react";
import { ArrowDownFromLine } from "lucide-react";
import DropdownMenu from "../ui/dropdown";

interface Props {
  menuItemsPersonas: any[];
  menuItemsPrestadores: any[];
  isCountryVisible: boolean;
  setIsCountryVisible: (visible: boolean) => void;
}

const DesktopNav: React.FC<Props> = ({
  menuItemsPersonas,
  menuItemsPrestadores,
  isCountryVisible,
  setIsCountryVisible,
}) => {
  return (
    <ul
      className={`$${
        isCountryVisible ? "ml-16 transition-all" : "ml-0 transition-all"
      }  hidden lg:flex items-center gap-14 text-md font-medium text-gray-600`}
    >
      <DropdownMenu label="Personas" menuItems={menuItemsPersonas} />
      <DropdownMenu label="Prestadores de Salud" menuItems={menuItemsPrestadores} />
      <li>
        <a
          href="https://medicall24.com.co/entidades/"
          className="transform transition duration-200 hover:scale-105 flex hover:font-semibold hover:text-pink-600"
          target="_blank"
        >
          Entidades de Salud
        </a>
      </li>
      <li>
        <a
          href="/empresas"
          className="transform transition duration-200 hover:scale-105 flex hover:font-semibold hover:text-pink-600"
          target="_blank"
        >
          Empresas
        </a>
      </li>
      <li
        className={`${
          isCountryVisible
            ? "opacity-0 cursor-auto transition-all duration-500 ease-in-out"
            : "opacity-100 transition-all duration-500 ease-in-out cursor-pointer"
        }`}
      >
        <ArrowDownFromLine
          className="w-6 h-6 text-pink-600 transform transition duration-200 hover:scale-105 flex hover:font-semibold"
          onClick={() => setIsCountryVisible(true)}
        />
      </li>
    </ul>
  );
};

export default DesktopNav;