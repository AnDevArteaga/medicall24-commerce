import { usePurchaseContext } from "../contexts/checkout";
import {
    CustomPaymentData,
    PaymentMethodData,
    PurchaseData,
} from "../interfaces/checkout.interfase";
import { DetailPayment } from "../hooks/useDetailPayment";
import { useGenerateTransaction } from "../hooks/useGenerateTransaction";

type ButtonId = "nextStepTwo" | "paidStepThree" | "confirmar" | string;
type PaymentMethod =
    | "BANCOLOMBIA_TRANSFER"
    | "CARD"
    | "PSE"
    | "NEQUI"
    | "MEDDIPAY"
    | string;

type ActionFunction = () => Promise<void>;

type ActionsMap = {
    [method in PaymentMethod]?: {
        [button in ButtonId]?: ActionFunction;
    };
};

export const usePaymentFlow = () => {
    const { handleGetDetailPayment } = DetailPayment();
    const {
        paymentMethod,
        setGeneralPaymentData,
        purchaseData,
        handleNext,
        selectedMethod,
    } = usePurchaseContext();
    const { handleGenerateTransaction, handleCheckAsyncPaymentUrl, redirectToPaymentPage } = useGenerateTransaction();

    const actions: ActionsMap = {
        BANCOLOMBIA_TRANSFER: {
            nextStepTwo: async () => {
                console.log("nextStepTwo");
                fillGeneralPaymentDataFromPurchaseAndPayment(
                    purchaseData,
                    paymentMethod,
                    setGeneralPaymentData,
                );
                const detailPayment = await handleGetDetailPayment();
                console.log("detailPayment", detailPayment);
                handleNext();
            },
            paidStepThree: async () => {
                const transactionId = await handleGenerateTransaction();
                const asyncPaymentUrl = await handleCheckAsyncPaymentUrl(transactionId);
                redirectToPaymentPage(asyncPaymentUrl);
                console.log("transactionId", transactionId);
            },
        },
        CARD: {
            nextStepTwo: async () => {
                console.log("Addi - continuar");
                // lógica Addi continuar
            },
            paidStepThree: async () => {
                console.log("Addi - pagar");
                // lógica Addi pagar
            },
        },
        PSE: {
            nextStepTwo: async () => {
                console.log("Addi - continuar");
                // lógica Addi continuar
            },
            paidStepThree: async () => {
                console.log("Addi - pagar");
                // lógica Addi pagar
            },
        },
        NEQUI: {
            nextStepTwo: async () => {
                console.log("Addi - continuar");
                // lógica Addi continuar
            },
            paidStepThree: async () => {
                console.log("Addi - pagar");
                // lógica Addi pagar
            },
        },
        MEDDIPAY: {
            nextStepTwo: async () => {
                console.log("MediPay - continuar");
                // lógica MediPay continuar
            },
            paidStepThree: async () => {
                console.log("MediPay - pagar");
                // lógica MediPay pagar
            },
        },
    };

    const executeAction = async (buttonId: ButtonId) => {
        if (!paymentMethod) {
            console.warn("No hay método de pago seleccionado");
            return;
        }

        const methodActions = actions[selectedMethod];
        if (!methodActions) {
            console.warn(
                `No hay acciones definidas para el método: ${paymentMethod}`,
            );
            return;
        }

        const action = methodActions[buttonId];
        if (!action) {
            console.warn(
                `No hay acción definida para el botón: ${buttonId} en el método: ${paymentMethod}`,
            );
            return;
        }

        await action();
    };

    return {
        executeAction,
        paymentMethod,
    };
};

function fillGeneralPaymentDataFromPurchaseAndPayment(
    purchaseData: PurchaseData,
    paymentMethod: PaymentMethodData,
    setGeneralPaymentData: React.Dispatch<React.SetStateAction<CustomPaymentData>>,
  ) {
    setGeneralPaymentData((prev) => ({
      ...prev,
      identification: purchaseData.identification,
      typeId: purchaseData.typeId,
      names: purchaseData.names,
      lastNames: purchaseData.lastNames,
      email: purchaseData.email,
      address: purchaseData.address,
      phone: purchaseData.phone,
      paymentMethod: {
        ...paymentMethod,
        userLegalIdType: purchaseData.typeId,
        userLegalId: purchaseData.identification,
      },
    }));
  }
