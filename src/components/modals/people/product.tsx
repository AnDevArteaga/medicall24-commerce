import React from "react";
import { Product } from "../../../interfaces/product.interface";
import ButtonForm from "../../ui/button-forms";
import { useModal } from "../../../contexts/modals";
import { termBexaContent, termBexaPackageContent } from "../term&cond/bexa/content-terms";

interface ModalProductoProps {
    producto: Product;
    onClose: () => void;
}

const ModalProducto: React.FC<ModalProductoProps> = (
    { producto, onClose  }
) => {
    const { openModal, closeModal } = useModal();
    const onNext = () => {
        closeModal("producto");
        if (producto.id_producto === 16) {
            openModal("termCond", {
                next: true,
                onClose: () => closeModal("termCond"),
                content: termBexaPackageContent,
                headerTitle: "Términos y Condiciones del Servicio",
            });
        } else {
            openModal("termCond", {
                next: true,
                onClose: () => closeModal("termCond"),
                content: termBexaContent,
                headerTitle: "Términos y Condiciones del Servicio",
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
                    <div className="flex justify-between items-center text-xl font-bold text-primary">
                        <span>Valor a pagar</span>
                        <span className="text-primary">
                            ${producto.valor_cop.toLocaleString()}
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
