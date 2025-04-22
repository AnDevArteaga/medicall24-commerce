import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Testimony from "../../../charts/pie-chart";
import { BarChartData } from "../../interfaces/testimony.interface";

interface DataSliderProps {
  data: Record<string, BarChartData[]>;
}

const DataSlider: React.FC<DataSliderProps> = ({ data }) => {
  const dataEntries = Object.entries(data || {});
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
      <div className="max-w-7xl mx-auto p-6 sm:p-2 bg-white">
        <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Gráficos de Testimonios
        </h3>
        <div className="text-center text-gray-600">
          No hay datos disponibles para mostrar
        </div>
      </div>
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
        arrows
        itemClass="px-4"
      >
        {dataEntries.map(([key, dataset]) => {
          const titleItem = dataset.find((item) => item.value === 1);
          const filteredData = dataset.filter((item) => item.value !== 1);

          return (
            <div
              key={key}
              className="bg-white p-6 sm:p-2 rounded-lg shadow-md h-full"
            >
              {titleItem && (
                <h2 className="text-base font-semibold text-gray-600 text-center mb-4">
                  {titleItem.name}
                </h2>
              )}
              <Testimony data={filteredData} />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default DataSlider;
