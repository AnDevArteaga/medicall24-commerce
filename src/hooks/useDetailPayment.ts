import { useState } from "react";
import { usePurchaseContext } from "../contexts/checkout";
import { getDetailPayment } from "../services/azure/payments";


export const DetailPayment = () => {
    const [loading, setLoading] = useState(false);

    const { generalPaymentData, selectedMethod, setDetailPayment, product } =
        usePurchaseContext();

    /** Mismo cálculo que useCodePromoBexa: % sobre valor COP */
    const computeDiscountAmount = (
        valorCop: number,
        discountPercent: number,
    ): number => {
        const pct = Math.min(100, Math.max(0, Number(discountPercent) || 0));
        return Math.floor((valorCop * pct) / 100);
    };
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
            return detailPayment;
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

    const handleSetterDetailPayment = () => {
        if (!product) return;
        const baseValor = Number(product.valor_cop);
        const discountPct = Number(generalPaymentData.discount) || 0;
        const discountAmount = computeDiscountAmount(baseValor, discountPct);
        const netTotal = baseValor - discountAmount;

        setDetailPayment({
            paymentMethod: selectedMethod,
            description: null,
            valor: baseValor,
            descuento: discountAmount,
            subtotal: netTotal,
            iva: 0,
            commission: 0,
            total: netTotal,
        });
    };

    return { loading, handleGetDetailPayment, handleSetterDetailPayment };
};
