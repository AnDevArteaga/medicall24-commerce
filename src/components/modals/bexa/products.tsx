import React from "react";
import { CodeXProduct, Product } from "../../../interfaces/product.interface";
import { useCodePromo } from "../../../hooks/useCodePromoBexa";
import { CheckCircle } from "lucide-react";
import ButtonForm from "../../ui/button-forms";
import { useModal } from "../../../contexts/modals";
import { termBexaContent, termBexaPackageContent } from "../term&cond/bexa/content-terms";
import { redirectPaid } from "../../../utils/redirect-paid";
import { usePurchaseContext } from "../../../contexts/checkout";

interface ModalProductoProps {
    codeXProduct: CodeXProduct[];
    producto: Product;
    onClose: () => void;
    codigoInicial: string;
}

const ModalProducto: React.FC<ModalProductoProps> = (
    { producto, codeXProduct, onClose, codigoInicial },
) => {
    const {
        isValidCode,
        handleInputChange,
        handleValidate,
        inputCode,
        discount,
        discountValue,
        totalWithDiscount,
    } = useCodePromo(
        producto.id_producto,
        codeXProduct,
        producto.valor_cop,
        codigoInicial,
    );
    const { queryParam } = usePurchaseContext();

    const { openModal, closeModal } = useModal();

    const onNext = () => {
        closeModal("producto");
        if (producto.id_producto === 16) {
            openModal("termCond", {
                next: true,
                onClose: () => closeModal("termCond"),
                content: termBexaPackageContent,
                headerTitle: "Términos y Condiciones del Servicio",
                onClick: () =>{redirectPaid(queryParam); 
                    closeModal("termCond");
                }
});
        } else {
            console.log("queryParam", queryParam);
            openModal("termCond", {
                next: true,
                onClose: () => closeModal("termCond"),
                content: termBexaContent,
                headerTitle: "Términos y Condiciones del Servicio",
                onClick: () =>  {redirectPaid(queryParam); 
                                closeModal("termCond");
                            }
            });
        }
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div
                className="bg-white w-11/12 max-w-xl rounded-lg shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Encabezado */}
                <div className="flex justify-between items-center bg-primary text-white px-6 py-4 rounded-t-lg">
                    <h2 className="text-xl font-semibold">{producto.nombre}</h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-300 transition-colors duration-200"
                    >
                        ✕
                    </button>
                </div>

                {/* Contenido */}
                <div className="p-6 space-y-6">
                    {/* Código promocional */}
                    <div className="w-full sm:w-full">
                        <label
                            htmlFor="promoCode"
                            className="block text-gray-700 text-sm mb-2"
                        >
                            Si tienes un código promocional ingrésalo
                        </label>
                        <div className="w-full">
                            <div className="flex flex-row gap-2">
                                <input
                                    id="promoCode"
                                    type="text"
                                    value={inputCode}
                                    onChange={handleInputChange}
                                    className="w-3/4 sm:w-full px-4 py-2 uppercase border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-shadow duration-200 text-sm"
                                    placeholder="Código promocional"
                                    autoComplete="nope"
                                />
                            
                                <ButtonForm onClick={handleValidate} text="Validar código" />
                            </div>

                            {isValidCode && (
                                <div className="flex flex-row">
                                    <CheckCircle className="text-green-600 w-4 mr-2">
                                    </CheckCircle>
                                    <p className="text-green-600 text-sm mt-1">
                                        Código promocional válido
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Valor del paquete */}
                    <div className="flex justify-between items-center text-lg text-gray-800 font-semibold">
                        <span>
                            {" "}
                            {producto.id_producto === 16
                                ? "Valor del paquete"
                                : "Valor del servicio"}
                        </span>
                        <span>${producto.valor_cop.toLocaleString()}</span>
                    </div>
                        <div className="flex justify-between items-center text-lg text-gray-600">
                            <span>Descuento del {discount}%</span>

                            <span className="text-gray-800 font-semibold">
                                {discount > 0
                                    ? `-$${discountValue.toLocaleString()}`
                                    : discountValue.toLocaleString()}
                            </span>
                        </div>
                    <div className="flex justify-between items-center text-xl font-bold text-primary">
                        <span>Valor a pagar</span>
                        <span className="text-primary">
                            ${totalWithDiscount.toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* Botones */}
                <div className="flex justify-between space-x-4 px-6 py-4 bg-gray-100 rounded-b-lg">
                                        <ButtonForm onClick={onClose} text="Cancelar" />
                    <ButtonForm onClick={onNext} text="Continuar" />
                </div>
            </div>
        </div>
    );
};

export default ModalProducto;
