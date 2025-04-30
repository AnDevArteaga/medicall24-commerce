import React, { createContext, useState, useContext, ReactNode, useRef, useEffect } from 'react';
import { User } from '../interfaces/user.interface';
import { PurchaseData, PaymentMethodData, CreditData, CustomPaymentData, detailsPayment, registerPurchase } from '../interfaces/checkout.interfase';
import { Validations } from '../interfaces/validations.interface';
import { buildFullName } from '../utils/forms';
import Slider from "react-slick";
import { TypeId } from '../interfaces/types-id';
import { Product, CodeXProduct, queryParamsProduct } from '../interfaces/product.interface';
import { OrderStatus } from '../types/status';


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
  detailPayment: detailsPayment;
  setDetailPayment: React.Dispatch<React.SetStateAction<detailsPayment>>;
  registerPurchase: registerPurchase;
  setRegisterPurchase: React.Dispatch<React.SetStateAction<registerPurchase>>;
  startFetchingStatusPayment: boolean;
  setStartFetchingStatusPayment: React.Dispatch<React.SetStateAction<boolean>>;
  order: any;
  setOrder: React.Dispatch<React.SetStateAction<any>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  status: OrderStatus;
  setStatus: React.Dispatch<React.SetStateAction<OrderStatus>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
  registerPurchaseSaved: boolean;
  setRegisterPurchaseSaved: React.Dispatch<React.SetStateAction<boolean>>;
  queryParam: queryParamsProduct
  setQueryParam: React.Dispatch<React.SetStateAction<queryParamsProduct>>
}

const PurchaseContext = createContext<PurchaseContextProps | undefined>(undefined);

export const PurchaseProvider = ({ children }:{ children: ReactNode }) => {
  
  const [userId, setUserId] = useState<number>(0);
  const [product, setProduct] = useState<Product | CodeXProduct | null>(null);
  const [queryParam, setQueryParam] = useState<queryParamsProduct>({ id_producto: "", code: "" });
  const [isRegistered, setIsRegistered] = useState(false); //Estado para controlar si el usuario ya se ha registrado
  const [isValidPaymentMethod, setIsValidPaymentMethod] = useState(true); //Estado para controlar el estado de los campos cuando el tipo de ID no es CC, y el metodo de pago es PSE
  const [typesId, setTypesId] = useState<TypeId[]>([]);
  const  [loading, setLoading] = useState(false);

  const [statusRegister, setStatusRegister] = useState<string | null>(null); //Estado para controlar el estado del registro
  const [currentStep, setCurrentStep] = useState(0); //Estado para controlar el paso actual del Gateway
  //Esta para manejar validaciones booleanas
  const [validations, setValidations] = useState<Validations>({ //Estado para controlar las validaciones
    passwordMatch: false,
    emailValid: true,
    cardNumber: false,
    phoneNumber: false,
    meddipayAuthorizationCode: false,
    emailBillingValid: false,
    termBillingAcept: false,
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
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodData>({ card: { number: "", cvc: "", expMonth: "", expYear: "", cardHolder: "" }, financialInstitutionCode: "0", installments: "0", paymentDescription: "", phoneNumber: "", type: "", userLegalId: "", userLegalIdType: "", userType: "" });
  const [creditData, setCreditData] = useState<CreditData>({ meddipayAuthorizationCode: "" });
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  const [generalPaymentData, setGeneralPaymentData] = useState<CustomPaymentData>({ identification: "", typeId: "", names: "", lastNames: "", email: "", address: "", phone: "", discount: 0, productId: 0, paymentMethod: { card: { number: "", cvc: "", expMonth: "", expYear: "", cardHolder: "" }, financialInstitutionCode: "0", installments: "0", paymentDescription: "", phoneNumber: "", type: "", userLegalId: "", userLegalIdType: "", userType: "" } });
  const [registerPurchase, setRegisterPurchase] = useState<registerPurchase>({ id_transaccion: "", id_usuario_medicall: 0, id_aliado: 0, id_producto: 0, id_cita_medicall: 0, id_codigo_promo: 0, id_gestor: 0, identificacion_comprador: "", nombre_comprador: "", email_comprador: "", direccion_comprador: "", telefono_comprador: "", ciudad_comprador: "", departamento_comprador: "", fecha_compra: "", metodo_pago: "", porcentaje_comision_gestor: 0, subtotal: 0, iva: 0, comision_transaccion: 0, total: 0, total_centavos: 0, fecha_pago: "", descripcion_compra: "", estado_transaccion: "", ip_transaccion: "", compra_cancelada: false, estado_cuenta: false, tipopersona_factura: 0, tipoid_factura: "", numid_factura: "", dv_factura: "", nombre_factura: "", direccion_factura: "", correo_factura: "", pais_factura: "COLOMBIA", num_factura: "", envio_factura: false, producto: "", nombre_institucion: "", telefono_institucio: "", direccion_institucion: "", ciudad_institucion: "", dpto_institucion: "", pais_institucion: "", link_ayuda: "", link_terminos: "", link_pasos: "" });
  const [registerPurchaseSaved, setRegisterPurchaseSaved] = useState(false);


  const [detailPayment, setDetailPayment] = useState<detailsPayment>(
          {
              paymentMethod: "",
              description: null,
              valor: 0,
              descuento: 0,
              subtotal: 0,
              iva: 0,
              commission: 0,
              total: 0,
          },
      );
    const [order, setOrder] = useState({});
    const [startFetchingStatusPayment, setStartFetchingStatusPayment] = useState(false);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<OrderStatus>(null);




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
    <PurchaseContext.Provider value={{ isRegistered, setIsRegistered, registerData, setRegisterData,  currentStep, setCurrentStep, validations, setValidations, handleNext, handlePrevious, sliderRef, statusRegister, setStatusRegister, errors, setErrors, purchaseData, setPurchaseData, paymentMethod, setPaymentMethod, isValidPaymentMethod, setIsValidPaymentMethod, selectedMethod, setSelectedMethod, creditData, setCreditData, typesId, setTypesId, product, setProduct, generalPaymentData, setGeneralPaymentData, detailPayment, setDetailPayment, registerPurchase, setRegisterPurchase, startFetchingStatusPayment, setStartFetchingStatusPayment, message, setMessage, status, setStatus, loading, setLoading, order, setOrder, userId, setUserId, registerPurchaseSaved, setRegisterPurchaseSaved, queryParam, setQueryParam }}>
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
