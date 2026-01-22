import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Testimony from "../../../charts/pie-chart";
import { BarChartData } from "../../../../interfaces/testimony.interface";
import { ChevronLeft, ChevronRight, BarChart2 as ChartBar } from "lucide-react";

interface DataSliderProps {
  data: Record<string, BarChartData[]>;
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
      <div className="flex flex-col items-center justify-center py-16 px-6">
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <ChartBar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No hay datos disponibles
          </h3>
          <p className="text-gray-500 text-sm">
            Los datos de la encuesta se cargarán próximamente
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
        {dataEntries.map(([key, dataset]) => {
          const titleItem = dataset.find((item) => item.value === 1);
          const filteredData = dataset.filter((item) => item.value !== 1);

          return (
            <div
              key={key}
              className="h-full"
            >
              <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md 
                            border border-gray-100 h-full hover:shadow-xl transition-all duration-300
                            group"
              >
                {titleItem && (
                  <div className="mb-6 text-center">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 transition-colors">
                      {titleItem.name}
                    </h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-secondary to-primary mx-auto rounded-full" />
                  </div>
                )}
                <div className="flex items-center justify-center min-h-[300px]">
                  <Testimony data={filteredData} />
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default DataSlider;
