import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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

const VideoSlider: React.FC<VideoSliderProps> = ({ data }) => {
    const videoEntries = Object.entries(data || {});
    const hasVideos = videoEntries.length > 0;

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
            <p className="text-center text-gray-600">
                No hay videos disponibles
            </p>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto p-4">
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
                {videoEntries.map(([key, { url, name }]) => (
                    <div
                        key={key}
                        className="rounded-lg overflow-hidden flex flex-col items-center"
                    >
                        <video
                            controls
                            className="w-2/3 h-auto sm:w-full"
                            poster={getPoster(name)}
                        >
                            <source src={url} type="video/mp4" />
                            Tu navegador no soporta la reproducción de videos.
                        </video>
                        <p className="text-gray-600 font-semibold mt-2 text-center">
                            {name}
                        </p>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default VideoSlider;
