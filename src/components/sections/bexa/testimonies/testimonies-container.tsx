import { Video, BarChart2 as ChartBar, MessageCircle } from "lucide-react";
import useExcelData from "../../../../hooks/useBexaTestimoniesFromExcel";
import ChartTestimony from "./chart";
import VideoTestimony from "./videos";
import ComentaryTestimony from "./commentay";

const TestimonialsPage: React.FC = () => {
  const { chartData, comments } = useExcelData();

  const videoTestimonials: Record<number, { url: string; name: string }> = {
    1: {
      url: "https://medicall24.com.co/wp-content/uploads/2025/02/testimonio1.mp4",
      name: "Miriam Estrada",
    },
    2: {
      url: "https://medicall24.com.co/wp-content/uploads/2025/02/testimonio2.mp4",
      name: "Gabriela Lobo",
    },
    3: {
      url: "https://medicall24.com.co/wp-content/uploads/2025/02/testimonio3.mp4",
      name: "Thelmira Vanegas",
    },
    4: {
      url: "https://medicall24.com.co/wp-content/uploads/2025/03/testimonio4.mp4",
      name: "Ana Rojas",
    },
    6: {
      url: "https://medicall24.com.co/wp-content/uploads/2025/03/testimonio6.mp4",
      name: "Glenys Ramos",
    },
    7: {
      url: "https://medicall24.com.co/wp-content/uploads/2025/03/testimonio7.mp4",
      name: "Miguelina Padilla",
    },
  };

  return (
    <section className="container mx-auto px-4 lg:px-4 xl:px-4 md:px-2 py-16 lg:py-16 xl:py-16 md:py-8 border-l-2 border-r-2 border-gray-300 border-opacity-50 bg-gray-100">
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-12">
        {/* Sección de Video Testimonios */}
        <div className="space-y-8">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
              <Video className="text-primary w-10 h-10 sm:w-12 sm:h-12" />
              <h2 className="text-4xl md:text-3xl sm:text-2xl font-bold text-gray-800">
                Testimonios
              </h2>
            </div>
          </div>
          <div className="bg-white rounded-lg p-8 sm:p-6">
            <VideoTestimony data={videoTestimonials} />
          </div>
        </div>

        {/* Sección de Gráficos de Encuesta */}
        <div className="space-y-8">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
              <ChartBar className="text-secondary w-10 h-10 sm:w-12 sm:h-12" />
              <h2 className="text-4xl md:text-3xl sm:text-2xl font-bold text-gray-800">
                Encuesta de Satisfacción
              </h2>
            </div>
          </div>
          <div className="bg-white rounded-lg p-8 sm:p-6">
            <ChartTestimony data={chartData} />
          </div>
        </div>

        {/* Sección de Comentarios */}
        <div className="space-y-8">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
              <MessageCircle className="text-secondary w-10 h-10 sm:w-12 sm:h-12" />
              <h2 className="text-4xl md:text-3xl sm:text-2xl font-bold text-gray-800">
              Recomendaciones y sugerencias de Clientes
              </h2>
            </div>

          </div>
          <div className="bg-white rounded-lg p-8 sm:p-6">
            <ComentaryTestimony data={comments} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPage;
