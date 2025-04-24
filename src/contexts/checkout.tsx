import React, { createContext, useState, useContext, ReactNode, useRef } from 'react';
import { User } from '../interfaces/user.interface';
import { Validations } from '../interfaces/validations.interface';
import Slider from "react-slick";


interface PurchaseContextProps {
  isRegistered: boolean;
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
  registerData: User;
  setRegisterData: React.Dispatch<React.SetStateAction<User>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  validations: Validations;
  setValidations: React.Dispatch<React.SetStateAction<Validations>>;
  handleNext: () => void;
  handlePrevious: () => void;
  sliderRef: React.RefObject<Slider | null>;
  statusRegister: string | null;
  setStatusRegister: React.Dispatch<React.SetStateAction<string | null>>;
  errors: Record<string, string | null>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string | null>>>;
}

const PurchaseContext = createContext<PurchaseContextProps | undefined>(undefined);

export const PurchaseProvider = ({ children }:{ children: ReactNode }) => {
  
  const [isRegistered, setIsRegistered] = useState(false);
  const [statusRegister, setStatusRegister] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  //Esta para manejar validaciones booleanas
  const [validations, setValidations] = useState({
    passwordMatch: false,
    emailValid: false,
  });
  const [errors, setErrors] = useState<Record<string, string | null>>({
    confirmPassword: null,
    email: null,
    statusRegister: null,
  });
  const [registerData, setRegisterData] = useState<User>({ user: { identification: "", typeId: "", name1: "", name2: "", lastName1: "", lastName2: "", email: "", password: "", confirmPassword: "" }, epsId: null, regimenId: null });


      // Referencia del slider para poder controlarlo directamente
      const sliderRef = useRef<Slider>(null);

      // Manejo de cambios de paso
      const handleNext = () => {
          if (sliderRef.current) {
              sliderRef.current.slickNext(); // Avanzar al siguiente paso
              setCurrentStep((prev) => prev + 1); // Actualizar el estado del stepper al cambiar el paso en el slider
          }
      };
  
      const handlePrevious = () => {
          if (sliderRef.current) {
              sliderRef.current.slickPrev(); // Volver al paso anterior
              setCurrentStep((prev) => prev - 1); // Actualizar el estado del stepper al cambiar el paso en el slider
          }
      };
  


  
  return (
    <PurchaseContext.Provider value={{ isRegistered, setIsRegistered, registerData, setRegisterData, currentStep, setCurrentStep, validations, setValidations, handleNext, handlePrevious, sliderRef, statusRegister, setStatusRegister, errors, setErrors }}>
      {children}
    </PurchaseContext.Provider>
  );
};

export const usePurchaseContext = () => {
  const context = useContext(PurchaseContext);
  if (!context) {
    throw new Error("usePurchaseContext must be used within a PurchaseProvider");
  }
  return context;
};
