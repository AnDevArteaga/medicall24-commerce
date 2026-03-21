import { usePurchaseContext } from "../contexts/checkout";
import { validateEmail } from "../utils/validators";

export const useBillingForm = () => {
  const { registerPurchase, setRegisterPurchase, setErrors, setValidations } = usePurchaseContext();

  const handleDataBilling = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "correo_factura") {
      if (!validateEmail(value)) {
        setErrors((prev: any) => ({
          ...prev,
          email: "El correo no es válido",
        }));
        setValidations((prev: any) => ({
          ...prev,
          emailBillingValid: false,
        }));
      } else {
        setErrors((prev: any) => ({
          ...prev,
          email: null,
        }));
        setValidations((prev: any) => ({
          ...prev,
          emailBillingValid: true,
        }));
      }
    }
    const finalValue = name === "tipopersona_factura" && (value === "0" || value === "1")
      ? parseInt(value, 10)
      : value;
    setRegisterPurchase((prev: any) => ({
      ...prev,
      [name]: finalValue,
    }));
  };



  return {
    handleDataBilling,


    registerPurchase,
  };
};
