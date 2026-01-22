import React from "react";
import ButtonForm from "../../../ui/button-forms";
import meddipayLogo from "../../../../assets/svg/meddipay-logo.svg";

export interface Paso {
    numero: number;
    texto: string;
    imagen: string;
}

interface SolicitarCupoMeddipayModalProps {
    pasos: Paso[];
    onCancel: () => void;
    onGoToMeddipay: () => void;
}

const SolicitarCupoMeddipayModal: React.FC<SolicitarCupoMeddipayModalProps> = ({
    pasos,
    onCancel,
    onGoToMeddipay,
}) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl mx-4 max-h-[90vh] flex flex-col">
                {/* Contenido scrollable */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-6">
                        {/* Título y logo */}
                        <div className="flex justify-center items-center gap-4 mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                                ¿Cómo solicitar tu cupo?
                            </h2>
                            <img
                                src={meddipayLogo}
                                alt="Meddipay Logo"
                                className="h-16 md:h-24 w-auto"
                            />
                        </div>

                        {/* Pasos */}
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 md:gap-6 lg:gap-4 mt-8">
                            {pasos.map((paso) => (
                                <div 
                                    key={paso.numero} 
                                    className="flex flex-col items-center text-center h-full"
                                >
                                    {/* Número del paso */}
                                    <div className="flex flex-row items-center justify-center">
                                    <div className="mb-5">
                                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto shadow-md">
                                            <span className="text-white text-2xl font-bold">
                                                {paso.numero}
                                            </span>
                                        </div>
                                    </div>
                                    

                                    {/* Texto del paso */}
                                    <p className="text-gray-700 text-left mb-5 text-sm md:text-base leading-relaxed min-h-[60px] px-2" dangerouslySetInnerHTML={{ __html: paso.texto }} />
                                    </div>
                                 
                                    {/* Imagen del paso - Vertical */}
                                    <div className="w-full flex justify-center flex-1">
                                        <div className="w-full max-w-[220px] aspect-[3/4] rounded-lg overflow-hidden border-2 border-gray-300 bg-gray-100 shadow-sm">
                                            {paso.imagen ? (
                                                <img
                                                    src={paso.imagen}
                                                    alt={`Paso ${paso.numero}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <p className="text-gray-500 text-xs text-center px-2">
                                                        Captura del paso {paso.numero}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer con botones fijos */}
                <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50 sticky bottom-0">
                    <ButtonForm
                        onClick={onCancel}
                        text="Cancelar"
                    />
                    <ButtonForm
                        onClick={onGoToMeddipay}
                        text="Ir a Meddipay"
                    />
                </div>
            </div>
        </div>
    );
};

export default SolicitarCupoMeddipayModal;

