import React from "react";
import { useSelectSpecialitys } from "../../../hooks/useSelectSpecialitys";

const SimulatorPeople: React.FC = () => {
  const {
    especialidadesDisponibles,
    especialidadesSeleccionadas,
    toggleEspecialidad,
    // valores,
    // formatNumber,
    openModalCotize,
    handleOpenModalTerm,
  } = useSelectSpecialitys();

  return (
    <div className="p-6 md:p-12 sm:p-0 flex flex-col items-center">
      <h1 className="text-6xl md:text-5xl sm:text-4xl font-bold text-center mb-8 text-gray-700">
        Arma tu plan de Telemedicina
      </h1>

      <div className="max-h-96 overflow-y-auto pr-2 custom-scrollbar w-1/2">
        {especialidadesDisponibles.length > 0 ? (
          <ul className="flex flex-wrap justify-center gap-2 w-full mb-8">
            {especialidadesDisponibles.map((esp) => {
              const selected = especialidadesSeleccionadas.some(
                (e) => e.id === esp.id
              );
              return (
                <li
                  key={esp.id}
                  onClick={() => toggleEspecialidad(esp.id, "personas")}
                  className={`flex items-center w-40 sm:w-36 gap-1 p-1 sm:p-0 rounded-xl cursor-pointer transition-all duration-300 
                    ${
                      selected
                        ? "bg-pink-50 border-pink-200 border shadow-sm"
                        : "bg-transparent hover:bg-gray-100 border border-gray-300"
                    }`}
                >
                  <div className="relative">
                    <div
                      className={`w-6 h-6 sm:w-4 sm:h-4 rounded-full flex items-center justify-center transition-transform duration-300 
                        ${selected ? "scale-110" : "scale-100"}`}
                    >
                      {selected ? (
                        <div className="w-4 h-4 sm:w-3 sm:h-3 rounded-full bg-pink-500 border-4 border-pink-300" />
                      ) : (
                        <div className="w-4 h-4 sm:w-3 sm:h-3 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                  <span className="text-gray-800 font-regular text-sm sm:text-xs">
                    {esp.nombre}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="bg-gray-50 flex min-h-72 justify-center items-center rounded-xl text-center p-8">
            <span className="text-gray-500 text-lg">
              No hay especialidades disponibles
            </span>
          </div>
        )}

        <div className="flex justify-center items-center">
          {especialidadesSeleccionadas.length >= 3 && (
            <span className="text-sm text-center text-gray-600 sm:text-xs">
              El plan de telemedicina brinda cobertura para 4 usuarios
            </span>
          )}
        </div>
      </div>

      {especialidadesSeleccionadas.length >= 3 ? (
        <div className="flex sm:flex-col space-x-2 justify-center transition-all duration-500 animate-fade-in">
          {/* <PlanSimulated ... /> */}
        </div>
      ) : (
        <div className="bg-pink-600 rounded-xl py-1 px-4 text-center text-sm sm:text-xs text-white font-semibold mt-12">
          <span>Selecciona al menos 3 especialidades</span>
        </div>
      )}

      {especialidadesSeleccionadas.length >= 3 && (
        <span
          className="cursor-pointer text-left mt-8 text-gray-600 text-sm underline"
          onClick={handleOpenModalTerm}
        >
          Aplican términos y condiciones.
        </span>
      )}

      <div className="flex items-center justify-center"></div>
    </div>
  );
};


export default SimulatorPeople;