import React from "react";
import { usePurchaseContext } from "../../contexts/checkout";
import { formatNumber } from "../../utils/format";

const StepThree: React.FC = () => {
    const { product, detailPayment, selectedMethod } = usePurchaseContext();
    const getProductName = () => {
        if (!product) return "Sin producto";
        return "nombre" in product ? product.nombre : product.producto;
    };
    return (
        <div className="max-w-md mx-auto mt-12 bg-white p-6 border rounded-lg border-gray-300">
            {/* Título principal */}
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Detalles de la compra
            </h1>

            <div className="flex sm:text-sm justify-center items-center py-3 px-4 bg-gray-100 rounded-lg mb-4 hover:bg-gray-200 transition">
                <span className="text-gray-600">
                    {getProductName()}
                </span>
            </div>

            {/* Método de Pago */}
            <div className="flex sm:text-sm justify-between items-center py-3 px-4 bg-gray-100 rounded-lg mb-4 hover:bg-gray-200 transition">
                <span className="text-gray-700 font-medium">
                    Método de Pago
                </span>
                <span className="text-gray-600">
                    {selectedMethod ===
                            "BANCOLOMBIA_TRANSFER"
                        ? "Bancolombia"
                        : selectedMethod === "CARD"
                        ? "Tarjeta"
                        : selectedMethod || "---"}
                </span>
            </div>

            {/* Subtotal */}
            <div className="flex justify-between bg-gray-100 items-center py-3 px-4 bg-gray-50 rounded-lg mb-2 hover:bg-gray-200 transition">
                <span className="text-gray-700 font-medium">Sub total</span>$
                {
                    <>
                        {detailPayment.subtotal
                            ? formatNumber(detailPayment.subtotal)
                            : "0"} COP
                    </>
                }
            </div>

            {/* IVA */}
            <div className="flex justify-between items-center py-3 px-4 bg-gray-100 rounded-lg mb-2 hover:bg-gray-200 transition">
                <span className="text-gray-700 font-medium">IVA</span>
                <span className="text-gray-600">
                    {detailPayment.iva || "0"}
                </span>
            </div>

            {/* Comisión */}
            <div className="bg-gray-50 rounded-lg mb-2 p-4 bg-gray-100 hover:bg-gray-200 transition">
                {/* Contenedor principal con distribución entre label y valor */}
                <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">
                        Comisión de la transacción
                    </span>
                    <span className="text-gray-700 font-medium">
                        {detailPayment.commission
                            ? formatNumber(detailPayment.commission)
                            : "0"} COP
                    </span>
                </div>

                {/* Texto explicativo debajo */}
                <span className="text-pink-600 text-xs block mt-1">
                    * Corresponde al valor que la Entidad Bancaria cobra por el
                    uso del
                </span>
                <span className="ml-2 text-pink-600 text-xs block">
                    método de pago que seleccionaste.
                </span>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center py-3 px-4 bg-green-50 rounded-lg mt-4 border border-green-200 hover:bg-green-100 transition">
                <span className="text-green-700 font-semibold text-lg">
                    Total
                </span>
                <span className="text-green-700 font-bold text-lg">
                    {
                        <>
                            ${detailPayment.total
                                ? formatNumber(detailPayment.total)
                                : "0"} COP
                        </>
                    }
                </span>
            </div>
        </div>
    );
};

export default StepThree;
