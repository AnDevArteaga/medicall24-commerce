//Hook para obtener los datos de la compra, y el metodo de pago, del paso dos del Gateway
import { usePurchaseContext } from "../contexts/checkout";
import { useEffect, useState } from "react";
import { getDepartments, getMunicipalities } from "../services/azure/location";
import { Department, Municipality } from "../interfaces/location.interfaces";
import { loadBankPse } from "../services/azure/banks";
import { BankPse } from "../interfaces/checkout.interfase";
import { validateEmail, validateLength } from "../utils/validators";
import { setFieldError } from "../utils/forms";



const methods = [
    {
        id: "CARD",
        label: "Tarjeta de crédito\no débito",
        activeColor: "bg-white border-2 border-pink-600",
        textColor: "text-gray-700",
    },
    {
        id: "PSE",
        label: "PSE",
        activeColor: "bg-white border-2 border-pink-600",
        textColor: "text-gray-700",
    },
    {
        id: "BANCOLOMBIA_TRANSFER",
        label: "Bancolombia",
        activeColor: "bg-white border-2 border-pink-600",
        textColor: "text-gray-700",
    },
    {
        id: "NEQUI",
        label: "Nequi",
        activeColor: "bg-white border-2 border-pink-600 ",
        textColor: "text-gray-700",
    },
    {
        id: "MEDDIPAY",
        label: "Meddipay",
        activeColor: "bg-white border-2 border-pink-600 ",
        textColor: "text-gray-700",
    },
];

export const useSelectDataPurchase = () => {
    const {
        purchaseData,
        paymentMethod,
        setPurchaseData,
        setPaymentMethod,
        setIsValidPaymentMethod,
        setSelectedMethod,
        setCreditData,
        setErrors,
        setValidations,
    } = usePurchaseContext();
    const [departments, setDepartments] = useState<Department[]>([]);
    const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
    const [banksPse, setBanksPse] = useState<BankPse[]>([]);

    useEffect(() => {
        if (paymentMethod.type === "PSE" && purchaseData.typeId !== "CC") {
            setIsValidPaymentMethod(false);
        } else {
            setIsValidPaymentMethod(true);
        }
    }, [paymentMethod, purchaseData, setIsValidPaymentMethod]);

    const handleSelectDataPurchase = (
        e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    ) => {
        const { name, value } = e.target;
                let newValue
                if (name === "identification" || name === "phone") {
                    newValue = value.replace(/[^0-9]/g, '')
                } else {
                    newValue = value
                }
                if (name === 'email') {
                const emailValidation = validateEmail(value);
                console.log(emailValidation);
                if (!emailValidation) {
                    setFieldError(name, 'El correo electrónico no es válido', setErrors);
                    setValidations((prev) => ({
                        ...prev,
                        emailValid: false,
                    }));
                } else {
                    setFieldError(name, null, setErrors); // Limpiar el error si el correo electrónico es válido
                    setValidations((prev) => ({
                        ...prev,
                        emailValid: true,
                    }));
                }}
        
        
        setPurchaseData((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const handleSelectPaymentMethod = (
        e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    ) => {
        const { name, value } = e.target;
        let newValue
        if (name === "number") {
            newValue = value.replace(/[^0-9]/g, '')
            const numberValidation = validateLength(newValue, 16, 16);
            if (!numberValidation) {
                setFieldError(name, 'El número de tarjeta no es válido', setErrors);
                setValidations((prev) => ({
                    ...prev,
                    cardNumber: false,
                }));
            } else {
                setFieldError(name, null, setErrors); // Limpiar el error si el número de tarjeta es válido
                setValidations((prev) => ({
                    ...prev,
                    cardNumber: true,
                }));
            }
        } else if (name === "phoneNumber") {
            newValue = value.replace(/[^0-9]/g, '')
            const phoneValidation = validateLength(newValue, 10, 10);
            if (!phoneValidation) {
                setFieldError(name, 'El número de teléfono no es válido', setErrors);
                setValidations((prev) => ({
                    ...prev,
                    phoneNumber: false,
                }));
            } else {
                setFieldError(name, null, setErrors); // Limpiar el error si el número de teléfono es válido
                setValidations((prev) => ({
                    ...prev,
                    phoneNumber: true,
                }));
            }
        } else {
            newValue = value
        }
        setPaymentMethod((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };


    const handleSelectDataCredit = (
        e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    ) => {
        const { name, value } = e.target;
        setCreditData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onMethodChange = (method: string) => {
        setSelectedMethod(method);
        setPaymentMethod((prev) => ({
            ...prev,
            type: method,
            number: "",
            cardHolder: "",
            expMonth: "",
            expYear: "",
            installments: 0,
            cvc: "",
            financialInstitutionCode: 0,
            userType: "PERSON",
            phoneNumber: "",
            paymentDescription: "",
            userLegalId: "",
            userLegalIdType: "",

        }));
        setCreditData((prev) => ({
            ...prev,
            meddipayAuthorizationCode: "",
        }));
        setErrors((prev) => ({
            ...prev,
            number: null,
            phoneNumber: null,
        }));
        setValidations((prev) => ({
            ...prev,
            cardNumber: false,
            phoneNumber: false,
        }));
    };

    const handleGetDepartments = async () => {
        try {
            const departments = await getDepartments();
            setDepartments(departments);
        } catch (error) {
            console.error("Error al obtener departamentos:", error);
            setDepartments([]);
        }
    };
    const handleGetMunicipalities = async () => {
        try {
            const municipalities = await getMunicipalities(
                purchaseData.departament,
            );
            setMunicipalities(municipalities);
        } catch (error) {
            console.error("Error al obtener municipios:", error);
            setMunicipalities([]);
        }
    };

    const handleGetBanksPse = async () => {
        try {
            const banksPse = await loadBankPse();
            setBanksPse(banksPse);
        } catch (error) {
            console.error("Error al obtener bancos:", error);
            setBanksPse([]);
        }
    };

    useEffect(() => {
        handleGetDepartments();
        handleGetBanksPse();
    }, []);

    useEffect(() => {
        handleGetMunicipalities();
    }, [purchaseData.departament]);

    return {
        handleSelectDataPurchase,
        handleSelectPaymentMethod,
        handleSelectDataCredit,
        departments,
        municipalities,
        methods,
        onMethodChange,
        banksPse
    };
};
