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
    <main className="bg-gradient-to-b from-white to-pink-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-3 py-12 sm:py-2 space-y-8">
        {/* Sección de Video Testimonios */}
        <section className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-1 sm:p-2">
            <h2 className="flex items-center justify-center sm:justify-start text-5xl sm:text-4xl font-bold text-gray-700 mb-4">
              <Video className="w-10 h-10 text-yellow-400 mr-3" />
              Testimonios
            </h2>
            <VideoTestimony data={videoTestimonials} />
          </div>
        </section>

        {/* Sección de Gráficos de Encuesta */}
        <section className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-8 sm:p-2">
            <h2 className="flex items-center justify-center text-5xl sm:text-4xl font-bold text-gray-700 mb-4">
              <ChartBar className="w-10 h-10 text-pink-600 mr-3" />
              Encuesta de Satisfacción
            </h2>
            <ChartTestimony data={chartData} />
          </div>
        </section>

        {/* Sección de Comentarios */}
        <section className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-4 sm:p-2">
            <h2 className="flex items-center text-xl sm:text-4xl font-bold text-gray-700 mb-4">
              <MessageCircle className="w-8 h-8 text-green-500 mr-3 flex-shrink-0" />
              Recomendaciones y sugerencias de Clientes
            </h2>
            <ComentaryTestimony data={comments} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default TestimonialsPage;