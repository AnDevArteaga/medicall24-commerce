import React, { createContext, useState, useContext, ReactNode, useRef, useEffect } from 'react';
import { User } from '../interfaces/user.interface';
import { PurchaseData, PaymentMethodData, CreditData, CustomPaymentData } from '../interfaces/checkout.interfase';
import { Validations } from '../interfaces/validations.interface';
import { buildFullName } from '../utils/forms';
import Slider from "react-slick";
import { TypeId } from '../interfaces/types-id';
import { Product, CodeXProduct } from '../interfaces/product.interface';


interface PurchaseContextProps {
  isRegistered: boolean;
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
  registerData: User;
  setRegisterData: React.Dispatch<React.SetStateAction<User>>;
  purchaseData: PurchaseData;
  setPurchaseData: React.Dispatch<React.SetStateAction<PurchaseData>>;
  paymentMethod: PaymentMethodData;
  setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethodData>>;
  creditData: CreditData;
  setCreditData: React.Dispatch<React.SetStateAction<CreditData>>;
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
  isValidPaymentMethod: boolean;
  setIsValidPaymentMethod: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMethod: string;
  setSelectedMethod: React.Dispatch<React.SetStateAction<string>>;
  typesId: TypeId[];
  setTypesId: React.Dispatch<React.SetStateAction<TypeId[]>>;
  product: Product | CodeXProduct | null;
  setProduct: React.Dispatch<React.SetStateAction<Product | CodeXProduct | null>>;
  generalPaymentData: CustomPaymentData;
  setGeneralPaymentData: React.Dispatch<React.SetStateAction<CustomPaymentData>>;
}

const PurchaseContext = createContext<PurchaseContextProps | undefined>(undefined);

export const PurchaseProvider = ({ children }:{ children: ReactNode }) => {
  
  const [product, setProduct] = useState<Product | CodeXProduct | null>(null);
  const [isRegistered, setIsRegistered] = useState(false); //Estado para controlar si el usuario ya se ha registrado
  const [isValidPaymentMethod, setIsValidPaymentMethod] = useState(true); //Estado para controlar el estado de los campos cuando el tipo de ID no es CC, y el metodo de pago es PSE
  const [typesId, setTypesId] = useState<TypeId[]>([]);

  const [statusRegister, setStatusRegister] = useState<string | null>(null); //Estado para controlar el estado del registro
  const [currentStep, setCurrentStep] = useState(0); //Estado para controlar el paso actual del Gateway
  //Esta para manejar validaciones booleanas
  const [validations, setValidations] = useState<Validations>({ //Estado para controlar las validaciones
    passwordMatch: false,
    emailValid: true,
    cardNumber: false,
    phoneNumber: false,
  });
  
  const [errors, setErrors] = useState<Record<string, string | null>>({ //Estado para controlar los errores
    confirmPassword: null,
    email: null,
    statusRegister: null,
    number: null,
    phoneNumber: null,
    meddipayAuthorizationCode: null,
  });
  const [registerData, setRegisterData] = useState<User>({ user: { identification: "", typeId: "", name1: "", name2: "", lastName1: "", lastName2: "", email: "", password: "", confirmPassword: "" }, epsId: null, regimenId: null });
  const [purchaseData, setPurchaseData] = useState<PurchaseData>({ identification: "", typeId: "", names: "", lastNames: "", email: "", address: "", phone: "", departament: "", city: "" });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodData>({ number: "", cvc: "", expMonth: "", expYear: "", cardHolder: "", financialInstitutionCode: 0, installments: 0, paymentDescription: "", phoneNumber: "", type: "", userLegalId: "", userLegalIdType: "", userType: "" });
  const [creditData, setCreditData] = useState<CreditData>({ meddipayAuthorizationCode: "" });
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  const [generalPaymentData, setGeneralPaymentData] = useState<CustomPaymentData>({ identification: "", typeId: "", names: "", lastNames: "", email: "", address: "", phone: "", discount: 0, productId: 0, PaymentMethod: { number: "", cvc: "", expMonth: "", expYear: "", cardHolder: "", financialInstitutionCode: 0, installments: 0, paymentDescription: "", phoneNumber: "", type: "", userLegalId: "", userLegalIdType: "", userType: "" } });


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
  
      useEffect(() => {
        const { fullName, fullLastName } = buildFullName(registerData.user.name1, registerData.user.name2, registerData.user.lastName1, registerData.user.lastName2);
        setPurchaseData(prev => ({
          ...prev,
          identification: registerData.user.identification,
          typeId: registerData.user.typeId,
          names: fullName,
          lastNames: fullLastName,
          email: registerData.user.email,
        }));
      }, [registerData]);

      useEffect(() => {
        console.log('paymentMethod', purchaseData);
      }, [purchaseData]);

  
  return (
    <PurchaseContext.Provider value={{ isRegistered, setIsRegistered, registerData, setRegisterData,  currentStep, setCurrentStep, validations, setValidations, handleNext, handlePrevious, sliderRef, statusRegister, setStatusRegister, errors, setErrors, purchaseData, setPurchaseData, paymentMethod, setPaymentMethod, isValidPaymentMethod, setIsValidPaymentMethod, selectedMethod, setSelectedMethod, creditData, setCreditData, typesId, setTypesId, product, setProduct, generalPaymentData, setGeneralPaymentData }}>
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
