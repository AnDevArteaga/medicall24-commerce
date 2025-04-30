import React, { lazy } from "react";
import { Stepper } from "../ui/stepper";
import ButtonForm from "../ui/button-forms";
import { usePurchaseContext } from "../../contexts/checkout";
import useNavigationButton from "../../hooks/useButtonNavigationGateway";
import Slider from "react-slick";


const StepOne = lazy(() => import("./step-one"));
const StepTwo = lazy(() => import("./step-two"));
const StepThree = lazy(() => import("./step-three"));
const FinalStep = lazy(() => import("./final-step"));

// Configuración de Slick Slider
const settings = {
    infinite: false,
    speed: 500,
    draggable: false,
};



const PaginacionSlider: React.FC = () => {
        // Estado para el paso actual
    const { currentStep, setCurrentStep, isRegistered, sliderRef, handlePrevious } = usePurchaseContext();
    const { text, disabled, onClick } = useNavigationButton(currentStep, isRegistered, setCurrentStep);


    return (
        <div className="container mx-auto py-10 px-72">
            {/* Título */}
            <div className="flex justify-center items-center">
                <span className="text-center text-4xl text-gray-600 sm:text-2xl mb-4">
                    PASOS PARA REALIZAR LA COMPRA
                </span>
            </div>
            <Stepper currentStep={currentStep} />

            {/* Slider */}
            <Slider
                {...settings}
                ref={sliderRef}
            >
                
                <StepOne />
                <StepTwo />
                <StepThree />
                <FinalStep />
            </Slider>

            {/* Botones de navegación */}
            <div className="flex justify-between px-6">
            {currentStep !== 3 && (
                <>
                <ButtonForm
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    text="Anterior"
                />
                <ButtonForm
                        onClick={onClick}
                        disabled={disabled}
                        text={text}
                />
                                </>

                )} 
            </div>
        </div>
    );
};

export default PaginacionSlider;
