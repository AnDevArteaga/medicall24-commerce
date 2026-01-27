import { useState } from "react";
import { registerPurchaseData } from "../services/supabase/payment";
import { registerPurchase } from "../interfaces/checkout.interfase";
import { CreateAppointmentDataProps, Appointment } from "../contexts/appoiment";
import { registerAppointmentData } from "../services/supabase/payment";
import { usePurchaseContext } from "../contexts/checkout";
import { checkUserRegistrationService } from "../services/azure/user";




export const useSavePurchaseData = () => {
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const createAppointmentData = Appointment();
    const { userId, purchaseData } = usePurchaseContext();
    
    const savePurchase = async (purchaseDataToSave: registerPurchase, idMunicipio?: number | string) => {
        setIsSaving(true);
        setSaveError(null);
        setSaveSuccess(false);
        try {
            // Obtener el ID del paciente desde userCompleteData
            let patientId: number | undefined = undefined;
            try {
                if (purchaseData?.typeId && purchaseData?.identification) {
                    const userCompleteData = await checkUserRegistrationService(
                        purchaseData.typeId,
                        purchaseData.identification
                    );
                    patientId = userCompleteData?.id;
                    console.log("ID del paciente obtenido:", patientId);
                }
            } catch (error) {
                console.warn("No se pudo obtener el ID del paciente, se usará undefined:", error);
            }

            // Agregar id_paciente al purchaseData si está disponible
            const purchaseDataWithPatientId = {
                ...purchaseDataToSave,
                ...(patientId && { id_paciente: patientId }),
            };

            const response = await registerPurchaseData(purchaseDataWithPatientId);
            if (response.status === 201 || response.status === 200) {
                console.log("Compra guardada exitosamente");
                // Obtener el ID de la compra guardada
                // Si response.data es un array, tomar el primer elemento, si es un objeto, usarlo directamente
                const purchaseId = Array.isArray(response.data) 
                    ? response.data[0]?.id_compra 
                    : response.data?.id_compra;
                
                console.log("ID de compra guardada:", purchaseId);
                
                // Usar el ID del municipio pasado como parámetro (debe ser el ID, no el nombre)
                if (!idMunicipio) {
                    console.warn("No se proporcionó el ID del municipio, se usará 0 como valor por defecto");
                }
                await saveAppointment(
                    purchaseDataToSave.id_transaccion, 
                    createAppointmentData.createAppointmentData, 
                    patientId || userId, // Usar patientId si está disponible, sino userId como fallback
                    idMunicipio || 0, // Pasar el ID del municipio (número)
                    purchaseId // Pasar el ID de la compra
                );
                setSaveSuccess(true);
                // Retornar el ID de la compra para que pueda ser usado después
                return {
                    success: true,
                    id_compra: purchaseId,
                    id_transaccion: purchaseDataToSave.id_transaccion
                };
            } else {
                throw new Error("No se pudo guardar la compra");
            }
        } catch (error: unknown) {
            console.error("Error guardando compra:", error);
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            setSaveError(errorMessage);
            throw error;
        } finally {
            setIsSaving(false);
        }
    };

    const saveAppointment = async (id_transaccion: string, appointment: CreateAppointmentDataProps, patientId: number, id_municipio: number | string, id_compra?: number) => {
        setIsSaving(true);
        setSaveError(null);
        setSaveSuccess(false);
        try {
            const response = await registerAppointmentData(id_transaccion, appointment, patientId, id_municipio, id_compra);
            if (response === 201 || response === 200) {
                console.log("Datos insertados correctamente");
                setSaveSuccess(true);
            } else {
                throw new Error("No se pudo guardar la cita");
            }
        } catch (error: unknown) {
            console.error("Error guardando cita:", error);
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            setSaveError(errorMessage);
        } finally {
            setIsSaving(false);
        }
    }

    return {
        savePurchase,
        isSaving,
        saveError,
        saveSuccess,
    };
};
