import { useState } from "react";
import { registerPurchaseData } from "../services/supabase/payment";
import { registerPurchase } from "../interfaces/checkout.interfase";

export const useSavePurchaseData = () => {
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const savePurchase = async (purchaseData: registerPurchase) => {
        setIsSaving(true);
        setSaveError(null);
        setSaveSuccess(false);
        try {
            const response = await registerPurchaseData(purchaseData);
            if (response === 201) {
                console.log("Compra guardada exitosamente");
                setSaveSuccess(true);
            } else {
                throw new Error("No se pudo guardar la compra");
            }
        } catch (error: any) {
            console.error("Error guardando compra:", error);
            setSaveError(error.message || "Error desconocido");
        } finally {
            setIsSaving(false);
        }
    };

    return {
        savePurchase,
        isSaving,
        saveError,
        saveSuccess,
    };
};
