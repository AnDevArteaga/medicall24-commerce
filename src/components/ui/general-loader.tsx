import React from "react";
import icon from "../../assets/svg/icoLogo.svg" // importa como componente


const PulsingSvg: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <img src={icon} className="w-24 h-24 animate-pulse-scale" alt="icon" />
    </div>
  );
};

export default PulsingSvg;
