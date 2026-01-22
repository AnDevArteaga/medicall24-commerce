import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import gabriela from "../../../../assets/img/posterGabrielaLobo.jpg";
import thelmira from "../../../../assets/img/posterThelmiraVa.jpg";
import miriam from "../../../../assets/img/posterMirian.jpg";
import glenys from "../../../../assets/img/posterGlenys.jpg";
import miguelina from "../../../../assets/img/posterMiguelina.jpg";
import poster from "../../../../assets/img/poster.jpg";
import poster2 from "../../../../assets/img/poster2.jpg";

interface VideoData {
    [key: string]: {
        url: string;
        name: string;
    };
}

interface VideoSliderProps {
    data: VideoData;
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

const VideoSlider: React.FC<VideoSliderProps> = ({ data }) => {
    const videoEntries = Object.entries(data || {});
    const hasVideos = videoEntries.length > 0;
    const [playingIndex, setPlayingIndex] = useState<number | null>(null);

    const getPoster = (name: string): string => {
        switch (name) {
            case "Gabriela Lobo":
                return gabriela;
            case "Thelmira Vanegas":
                return thelmira;
            case "Glenys Ramos":
                return glenys;
            case "Ana Rojas":
                return poster;
            case "Miguelina Padilla":
                return miguelina;
            case "Miriam Estrada":
                return miriam;
            default:
                return poster2;
        }
    };

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

    if (!hasVideos) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-6">
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Play className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        No hay videos disponibles
                    </h3>
                    <p className="text-gray-500 text-sm">
                        Los testimonios en video se cargarán próximamente
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
                {videoEntries.map(([key, { url, name }], index) => (
                    <div
                        key={key}
                        className="h-full"
                        onMouseEnter={() => setPlayingIndex(index)}
                        onMouseLeave={() => setPlayingIndex(null)}
                    >
                        <div className="bg-white rounded-xl shadow-md border border-gray-100 
                                      overflow-hidden h-full hover:shadow-xl transition-all duration-300
                                       group flex flex-col"
                        >
                            <div className="relative bg-gray-200 overflow-hidden flex items-center justify-center flex-1 min-h-[400px] sm:min-h-[350px]">
                                <video
                                    controls
                                    className="w-auto max-w-full h-full max-h-[600px] object-contain"
                                    poster={getPoster(name)}
                                    preload="metadata"
                                >
                                    <source src={url} type="video/mp4" />
                                    Tu navegador no soporta la reproducción de videos.
                                </video>
                                {playingIndex !== index && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent 
                                                  flex items-center justify-center opacity-0 group-hover:opacity-100 
                                                  transition-opacity duration-300 pointer-events-none">
                                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-4">
                                            <Play className="w-8 h-8 text-pink-600 fill-pink-600" />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="p-5 bg-gradient-to-br from-gray-50 to-white">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primarydark 
                                                  rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-sm">
                                            {name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-lg group-hover:text-primary 
                                                      transition-colors">
                                            {name}
                                        </h3>
                                        <p className="text-sm text-gray-500">Testimonio</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default VideoSlider;
