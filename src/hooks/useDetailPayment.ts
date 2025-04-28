import { useState } from "react";
import { usePurchaseContext } from "../contexts/checkout";
import { getDetailPayment } from "../services/azure/payments";


export const DetailPayment = () => {
    const [loading, setLoading] = useState(false);

    const { generalPaymentData, selectedMethod, setDetailPayment, product } = usePurchaseContext();
    const handleGetDetailPayment = async () => {
        const { productId, discount } = generalPaymentData;
        console.log('productId', productId, 'discount', discount)
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
       setDetailPayment({
           paymentMethod: selectedMethod,
           description: null,
           valor: product!.valor_cop,
           descuento: 0,
           subtotal: product!.valor_cop,
           iva: 0,
           commission: 0,
           total: product!.valor_cop,
       });
   }

    return { loading, handleGetDetailPayment, handleSetterDetailPayment };
};
