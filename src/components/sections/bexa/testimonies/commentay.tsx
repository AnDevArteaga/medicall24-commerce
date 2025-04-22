import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Quote, User2 } from "lucide-react";

interface CommentaryItem {
    columna3: string;
    columna13: string;
}

interface ComentarySliderProps {
    data: CommentaryItem[];
}

const ComentarySlider: React.FC<ComentarySliderProps> = ({ data }) => {
    const dataEntries = data.filter(item => item.columna13 !== undefined);

    const hasData = dataEntries.length > 0;
    console.log("commentaries", dataEntries)
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
            <div className="max-w-7xl mx-auto p-6 bg-gray-100">
                <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
                    Comentarios
                </h3>
                <div className="text-center text-gray-600">
                    No hay datos disponibles para mostrar
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-full mx-auto p-4">
            <Carousel
                responsive={responsive}
                infinite={false}
                autoPlay={false}
                keyBoardControl={true}
                customTransition="transform 500ms ease-in-out"
                transitionDuration={500}
                containerClass="carousel-container"
                itemClass="px-2 py-4 flex justify-center"
                arrows
            >
                {dataEntries.map((dataset, index) => (
                    <div
                        className="bg-white shadow-lg rounded-lg p-6 relative h-[240px] w-full border-2 border-gray-200 mx-2"
                        key={index}
                    >
                        <div className="flex items-center mb-4">
                            <div className="bg-purple-100 rounded-full p-2 mr-3">
                                <User2 className="w-6 h-6 text-pink-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                {dataset.columna3}
                            </h3>
                        </div>
                        <Quote className="absolute top-4 right-4 w-6 h-6 text-pink-300 transform rotate-180" />
                        <p className="text-gray-600 mb-4 relative z-10">
                            {dataset.columna13}
                        </p>
                        <Quote className="absolute bottom-4 right-4 w-6 h-6 text-pink-300" />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default ComentarySlider;
