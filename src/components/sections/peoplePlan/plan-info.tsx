import React from "react";
import cam from "../../../assets/img/camitemverde.png";
import ButtonIndex from "../../ui/button-index";

const InfoPlan: React.FC = () => {
  const scrollToPlan = (): void => {
    const element = document.getElementById("planp");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="mx-auto flex flex-row md:flex-col sm:flex-col items-center justify-center gap-8 py-16 sm:py-4">
      <div className="flex flex-row sm:flex-col items-center mt-5 gap-16">
        {/* Texto e imagen de video */}
        <div>
          <div className="space-y-2 mb-12 flex flex-col items-center">
            <p className="text-5xl sm:text-4xl font-regular text-center text-primary">
              Planes de
            </p>
            <p className="text-6xl sm:text-5xl font-extrabold text-center text-primary">
              Telemedicina
            </p>
            <p className="text-5xl sm:text-5xl font-regular text-center text-primary">
              para personas
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-full sm:w-96 flex flex-col items-center bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative w-full h-60 overflow-hidden rounded-3xl">
                <video
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                >
                  <source
                    src="https://medicall24.com.co/wp-content/uploads/2025/01/Jornada-de-telemedicina.mp4"
                    type="video/mp4"
                  />
                  Tu navegador no soporta la etiqueta de video.
                </video>
              </div>
            </div>
          </div>
        </div>

        {/* Información del plan */}
        <div className="flex flex-col items-center">
          <div>
            <div className="flex justify-center items-center mb-4">
              <img
                src="https://medicall24.com.co/wp-content/uploads/2025/01/camplan.png"
                alt="cámara"
                className="w-12 h-auto mb-0 mr-4"
              />
              <span className="text-gray-600 text-3xl font-bold">
                Plan Basic
              </span>
            </div>
            <p className="text-2xl text-center mt-2 sm:text-3xl font-semibold text-primary">
              Consultas Ilimitadas
            </p>
            <div className="flex justify-center sm:flex-col gap-6 mt-2 sm:mt-6 sm:gap-2">
              {["Medicina General", "Psicología", "Pediatría"].map(
                (item, index) => (
                  <div className="flex items-center" key={index}>
                    <img src={cam} alt="cam" className="w-5 h-auto" />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {item}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Precio y botón */}
          <div className="flex flex-row items-center mt-6">
            <p className="text-lg text-center text-gray-600 font-semibold mt-6 mr-2">
              Desde
            </p>
            <p className="text-6xl text-center text-primary font-extrabold">
              $15.990
            </p>
            <span className="text-3xl text-primary font-semibold ml-4">
              COP
            </span>
          </div>
          <span className="text-gray-700 text-sm mt-2">
            Valor promedio por usuario al mes
          </span>

          {/* Botón de compra */}
          <div className="flex flex-col w-full mb-8 sm:mb-0 cursor-pointer justify-center items-center">
              <ButtonIndex label="Comprar" onClick={scrollToPlan} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default InfoPlan;
