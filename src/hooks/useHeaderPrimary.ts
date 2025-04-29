import { useState } from "react";

export const useHeaderPrimary = () => {
  const menuItemsPersonas = [
    {
      href: "/buscar-médico",
      label: "¿Cómo encontrar un médico?",
      target: "_blank",
    },
    {
      href: "/bexa",
      label: "Examen BEXA",
      target: "_blank",
    },
    {
      href: "/personas",
      label: "Planes de Telemedicina",
      target: "_blank",
    },
  ];

  const menuItemsPrestadores = [
    {
      href: "https://medicall24.com.co/profesionalesindependientes/",
      label: "Profesionales Independientes",
      target: "_blank",
    },
    {
      href: "https://medicall24.com.co/instituciones-ips/",
      label: "Instituciones Ips",
      target: "_blank",
    },
  ];

  // Estados para gestionar visibilidad y aperturas
  const [isCountryVisible, setIsCountryVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdown2Open, setDropdown2Open] = useState(false);

  // Retorno de las propiedades y funciones necesarias
  return {
    menuItemsPersonas,
    menuItemsPrestadores,
    isCountryVisible,
    setIsCountryVisible,
    menuOpen,
    setMenuOpen,
    dropdownOpen,
    setDropdownOpen,
    dropdown2Open,
    setDropdown2Open,
  };
};
