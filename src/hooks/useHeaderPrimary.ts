import { useState } from "react";

export const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/Examen-bexa", label: "Examen hexa" },
  { href: "/ecosistema-medico-360", label: "Ecosistema médico 360" },
  { href: "/software-en-salud", label: "Software en salud" },
];

export const useHeaderPrimary = () => {
  const [isCountryVisible, setIsCountryVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return {
    navItems,
    isCountryVisible,
    setIsCountryVisible,
    menuOpen,
    setMenuOpen,
  };
};
