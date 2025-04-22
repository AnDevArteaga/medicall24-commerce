import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Handshake } from "lucide-react";
import { Ally } from "../../interfaces/allies-supabase.interface";

interface AllyCarouselProps {
    items: Ally[];
    onSelect: (item: Ally) => void;
    type?: "page" | "carousel";
}

const AllyCarousel: React.FC<AllyCarouselProps> = (
    { items, onSelect, type = "page" },
) => {
    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 1280 }, items: 3 },
        desktop: { breakpoint: { max: 1280, min: 1024 }, items: 3 },
        tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
        mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
    };

    const renderCard = (item: Ally, index: number) => (
        <div
            key={index}
            className="bg-gray-200 w-full h-[26rem] sm:h-auto rounded-xl flex flex-col items-center shadow-lg space-y-8 mx-auto"
            style={{ maxWidth: "350px" }}
        >
            <div className="w-full h-[12rem] sm:h-[12rem] relative overflow-hidden rounded-t-xl">
                <img
                    src={item.cover || undefined}
                    alt="Prestadores de salud"
                    className="w-full h-full object-cover pointer-events-none select-none"
                />
            </div>
            <div className="flex flex-1 items-center px-4">
                <p className="text-center text-xl font-semibold text-gray-700">
                    {item.nombre_prestador}
                </p>
            </div>
            <div className="mt-auto pb-12">
                <button
                    className="mt-4 px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primarydark transition-colors duration-300 cursor-pointer"
                    onClick={() => onSelect(item)}
                >
                    Ver días disponibles
                </button>
            </div>
        </div>
    );

    const renderPageItems = () => (
        <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4 w-full px-4 place-items-center">
            {items.length > 0
                ? (
                    items.map((item, index) => renderCard(item, index))
                )
                : (
                    <p className="text-center text-gray-500">
                        Cargando elementos...
                    </p>
                )}
        </div>
    );

    const renderCarouselItems = () => (
        <div className="w-full relative">
            {items.length > 0
                ? (
                    <Carousel
                        responsive={responsive}
                        infinite={false}
                        autoPlay={false}
                        keyBoardControl={true}
                        customTransition="transform 500ms ease-in-out"
                        transitionDuration={500}
                        containerClass="carousel-container"
                        arrows={true}
                        itemClass="px-2 py-4 flex justify-center"
                    >
                        {items.map((item, index) => renderCard(item, index))}
                    </Carousel>
                )
                : (
                    <p className="text-center text-gray-500">
                        Cargando elementos...
                    </p>
                )}
        </div>
    );

    return (
        <div className="p-8 sm:p-2 bg-gradient-to-b from-gray-100 to-pink-200 rounded-lg shadow-md min-h-auto flex items-center flex-col space-y-12">
            <div className="text-center space-y-2">
                <div className="flex justify-center items-center sm:flex-col space-x-4 sm:space-x-0">
                    <Handshake className="text-pink-600" size={36} />
                    <h2 className="text-4xl font-extrabold text-gray-700 tracking-tight">
                        Aliados Comerciales
                    </h2>
                </div>
            </div>
            {type === "page" ? renderPageItems() : renderCarouselItems()}
        </div>
    );
};

export default AllyCarousel;
