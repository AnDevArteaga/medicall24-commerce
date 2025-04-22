import React from "react";
import Eslogan from "./slogan";
import Price from "./price";
import Benefits from "./benefits";
import Title from "./title";
import ButtonBuy from "../../ui/button-buy";
import bexa from "../../../assets/img/Logobexa.png";
import videoBexa from "../../../assets/videos/videoDispBexa2.mp4";
import poster from "../../../assets/img/playBexa.png";
import { useModal } from "../../../contexts/modals";
import { termBexaContent } from "../../modals/term&cond/bexa/content-terms";

interface BexaExamProps {
    onVerProducto: (id_producto: number) => void;
}

const BexaExam: React.FC<BexaExamProps> = ({ onVerProducto }) => {
    const { openModal, closeModal } = useModal();
    return (
        <section className="grid grid-cols-2 -mt-12 md:grid-cols-1 sm:grid-cols-1 sm:gap-8 gap-0 items-center px-32 md:px-8 sm:px-8 py-16 h-auto bexa">
            {/* Contenido izquierdo */}
            <div className="space-y-6 sm:space-y-6 md:flex md:flex-col md:items-center sm:flex sm:flex-col">
                <div className="space-y-4 w-3/4 md:w-full sm:w-full">
                    <img src={bexa} alt="Logo BEXA" className="w-3/5" />
                    <Title text="El examen de tamizaje más seguro y preciso que existe para
    detectar masas en la mama." />
                    <Eslogan
                        text="Sin dolor, sin radiación y con resultados inmediatos."
                        value={2}
                    />
                </div>

                {/* Video en versión móvil/tablet */}
                <div className="relative bg-gray-100 hidden sm:block rounded-2xl overflow-hidden max-w-lg md:max-w-xl mx-auto shadow-lg">
                    <video
                        className="w-full h-auto rounded-2xl"
                        src={videoBexa}
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={poster}
                    />
                </div>

                {/* Servicios, precio y botones */}
                <div className="space-y-2">
                    <Benefits />
                    <Price price="$139.900" />

                    {/* Botón de compra */}
                    <div className="flex flex-col w-1/2 sm:w-full">
                        <ButtonBuy
                            text="Comprar"
                            onClick={() => onVerProducto(17)}
                        />

                        <a href="/aliados">
                            <button className="w-auto text-orange-500 text-lg hover:text-orange-600 hover:scale-105 font-semibold transition duration-300 services-bexa md:text-3xl cursor-pointer">
                                Ver disponibilidad de agenda
                            </button>
                        </a>
                    </div>

                    {/* Términos y condiciones */}
                    <div className="flex flex-col w-1/2 sm:w-full">
                        <p // onClick={handleOpenModalTerm}
                         className="cursor-pointer text-left md:text-center mt-2 text-gray-600 text-sm md:text-base underline cursor-pointer" onClick={() => openModal("termCond", {content: termBexaContent, onClose: () => closeModal("termCond"), headerTitle: "Términos y Condiciones del Servicio"})}>
                            Ver Términos y Condiciones
                        </p>
                    </div>
                </div>
            </div>

            {/* Video en versión desktop */}
            <div className="w-full">
                <div className="relative bg-gray-100 sm:hidden rounded-2xl overflow-hidden max-w-full md:max-w-xl shadow-lg">
                    <video
                        className="w-full h-auto rounded-2xl"
                        src={videoBexa}
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={poster}
                    />
                </div>
            </div>
        </section>
    );
};

export default BexaExam;
