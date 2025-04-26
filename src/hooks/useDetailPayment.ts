import { useEffect, useState } from "react";
import { usePurchaseContext } from "../contexts/checkout";
import { getDetailPayment } from "../services/azure/payments";
import { detailsPayment } from "../interfaces/checkout.interfase";

export const DetailPayment = () => {
    const [loading, setLoading] = useState(false);
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
    const { generalPaymentData, selectedMethod } = usePurchaseContext();
    const handleGetDetailPayment = async () => {
        const { productId, discount } = generalPaymentData;
        setLoading(true);
        try {
            const detailPayment = await getDetailPayment(
                productId,
                selectedMethod,
                discount,
            );
            setDetailPayment(detailPayment);
        } catch (error) {
            console.error("Error al obtener el método de pago:", error);
            setDetailPayment({
                paymentMethod: "",
                description: null,
                valor: 0,
                descuento: 0,
                subtotal: 0,
                iva: 0,
                commission: 0,
                total: 0,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetDetailPayment();
    }, []);

    return { loading, detailPayment };
};
