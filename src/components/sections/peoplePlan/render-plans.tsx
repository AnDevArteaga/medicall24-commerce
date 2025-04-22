import React from "react";
import seisMesesImg from "../../../assets/img/6PlanesGeneralPersonas.png";
import doceMesesImg from "../../../assets/img/12PlanesGeneralPersonas.png";
import tresMesesImg from "../../../assets/img/3PlanesGeneralPersonas.png";
import ButtonBuy from "../../ui/button-buy";
import { useModal } from "../../../contexts/modals";
import { termBexaContent } from "../../modals/term&cond/bexa/content-terms";


interface PeoplePlanProps {
    planSelected: (id_producto: number) => void;
}
const Plans: React.FC<PeoplePlanProps> = ({
    planSelected
}) => {
 const {openModal, closeModal } = useModal()

  const renderPlan = (
    imgSrc: string,
    alt: string,
    productoId: number,
    hiddenSm?: boolean,
    extraClasses?: string
  ) => (
    <div
      className={`flex flex-col items-center transform transition-transform duration-300 hover:scale-102 ${
        hiddenSm ? "sm:hidden" : ""
      } ${extraClasses || ""}`}
    >
      <img
        src={imgSrc}
        alt={alt}
        className="w-5/6 sm:w-full h-auto object-cover rounded-lg transform transition-transform duration-300 hover:scale-102"
        style={{ userSelect: "none", pointerEvents: "none" }}
      />
        <ButtonBuy text="Comprar" onClick={() => planSelected(productoId)} />
    </div>
  );

  return (
    <div
      className="flex flex-col items-center py-4 px-8 mb-16 bg-gray-200"
      id="planp"
    >
      <div className="border-t-2 border-gray-200 w-1/2 mb-8" />
      <span className="mb-12 text-gray-600 sm:text-4xl font-semibold text-center text-4xl sm:text-center">
        El Plan Basic brinda cobertura para 4 usuarios
      </span>

      <div className="flex flex-row sm:flex-col justify-center items-center gap-1 sm:gap-20 w-full px-4 sm:px-6">

        {/* 6 meses */}
        {renderPlan(seisMesesImg, "6 meses", 4)}

        {/* Mobile version - 12 meses */}
        {renderPlan(doceMesesImg, "12 meses", 2, true, "relative -mt-6 sm:mt-0")}

        {/* 3 meses */}
        {renderPlan(tresMesesImg, "3 meses", 6)}
      </div>

      <div className="flex flex-col items-center mt-12">
        <span
          className="cursor-pointer text-left mt-4 text-gray-600 text-base underline"
            onClick={() => openModal("termCond", {content: termBexaContent, onClose: () => closeModal("termCond"), headerTitle: "Términos y Condiciones del Servicio"})}        >
          Aplican términos y condiciones.
        </span>
      </div>
    </div>
  );
};

export default Plans;
