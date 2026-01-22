import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Quote, User2, Star, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";

interface CommentaryItem {
    columna3: string;
    columna13: string;
}

interface ComentarySliderProps {
    data: CommentaryItem[];
}

const CustomArrow = ({ onClick, direction }: { onClick?: () => void; direction: "left" | "right" }) => {
    if (!onClick) return null;
    
    return (
        <button
            onClick={onClick}
            className={`absolute ${direction === "left" ? "left-0" : "right-0"} top-1/2 -translate-y-1/2 z-10 
                        bg-white/30 hover:bg-gray-50 p-3 rounded-full shadow-lg cursor-pointer
                        transition-all duration-200 hover:scale-110 active:scale-95
                        ${direction === "left" ? "ml-4" : "mr-4"}`}
            aria-label={direction === "left" ? "Anterior" : "Siguiente"}
        >
            {direction === "left" ? (
                <ChevronLeft className="w-6 h-6 text-gray-700/30 hover:text-gray-700" />
            ) : (
                <ChevronRight className="w-6 h-6 text-gray-700/30 hover:text-gray-700" />
            )}
        </button>
    );
};

const ComentarySlider: React.FC<ComentarySliderProps> = ({ data }) => {
    const dataEntries = data.filter(item => item.columna13 !== undefined && item.columna13.trim() !== "");
    const hasData = dataEntries.length > 0;

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1280 },
            items: 3,
        },
        desktop: {
            breakpoint: { max: 1280, min: 1024 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1024, min: 640 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 640, min: 0 },
            items: 1,
        },
    };

    if (!hasData) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-6">
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        No hay comentarios disponibles
                    </h3>
                    <p className="text-gray-500 text-sm">
                        Los comentarios de los clientes se mostrarán aquí
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full">
            <Carousel
                responsive={responsive}
                infinite={false}
                autoPlay={false}
                keyBoardControl={true}
                customTransition="transform 500ms ease-in-out"
                transitionDuration={500}
                containerClass="carousel-container"
                itemClass="px-3"
                arrows={true}
                draggable={true}
                swipeable={true}
                customLeftArrow={<CustomArrow direction="left" />}
                customRightArrow={<CustomArrow direction="right" />}
            >
                {dataEntries.map((dataset, index) => (
                    <div
                        key={index}
                        className="h-full"
                    >
                        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl 
                                      shadow-md border border-gray-100 h-full hover:shadow-xl 
                                      transition-all duration-300 group relative
                                      flex flex-col"
                        >
                            {/* Quote icon top */}

                            
                            {/* Header con avatar */}
                            <div className="flex items-center gap-4 mb-4 relative z-10">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primarydark 
                                              rounded-full flex items-center justify-center flex-shrink-0
                                              shadow-md group-hover:shadow-lg transition-shadow">
                                    {dataset.columna3 ? (
                                        <span className="text-white font-bold text-lg">
                                            {dataset.columna3.charAt(0).toUpperCase()}
                                        </span>
                                    ) : (
                                        <User2 className="w-6 h-6 text-white" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-bold text-gray-800 truncate 
                                                  group-hover:text-primary transition-colors">
                                        {dataset.columna3 || "Cliente"}
                                    </h3>
                                    <div className="flex items-center gap-1 mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                className="w-4 h-4 fill-yellow-400 text-yellow-400" 
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Comentario */}
                            <div className="flex-1 relative z-10">
                                <p className="text-gray-700 leading-relaxed line-clamp-6 
                                            group-hover:text-gray-800 transition-colors">
                                    {dataset.columna13}
                                </p>
                            </div>

                            {/* Quote icon bottom */}
                            <Quote className="absolute bottom-4 right-4 w-6 h-6 text-secondary 
                                            group-hover:text-secondary transition-colors" />
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default ComentarySlider;
