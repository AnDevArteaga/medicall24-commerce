import React from 'react'

// Reemplazar imagen de iconos API (Directo en la raíz de public)
const API_ICONS_IMAGE = '/iconos.png'

// Creamos el array agregando la ruta de la imagen dinámicamente usando el índice
const funcionalidades = [
  { label: 'Agenda de citas autogestionable' },
  { label: 'Telemedicina según resolución 2654/2019' },
  { label: 'Historias clínicas electrónicas con generación de RDA' },
  { label: 'Asistente de IA para diligenciar HCE' },
  { label: 'Interoperabilidad de la HCE con Ministerio de Salud' },
  { label: 'Facturación Electrónica con RIPS en formato Json' },
  { label: 'Comercio electrónico integrado a Wompi Bancolombia' },
  { label: 'Módulo financiero y contable integrado bajo normas NIIF' },
].map((func, index) => ({
  ...func,
  // Esto generará las rutas directamente de la raíz de public: /1.png, /2.png, etc.
  img: `/${index + 1}.png`,
}))

const API_ABOUT_TEXT =
  'MEDICALL24 es un software para digitalizar la gestión de los prestadores de salud, que permite interoperar con otros sistemas de información mediante integración vía API. Con este método de conexión sistemática es posible acceder a la información de las historias clínicas de los usuarios que los prestadores de salud requieren para dar continuidad a sus procesos asistenciales y administrativos.'

const RespaldoTecnologicoFuncionalidades: React.FC = () => {
  return (
    <section className="w-full bg-slate-100 py-14 sm:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Funcionalidades */}
        <div className="relative border-2 border-gray-600 rounded-3xl lg:rounded-[2rem] xl:rounded-[2.5rem] bg-white/40 pt-12 sm:pt-14 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-6 lg:px-8 xl:px-10 mb-16 sm:mb-20 lg:mb-24">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2">
            <span className="inline-block bg-gray-600 text-white text-sm sm:text-base lg:text-lg xl:text-2xl font-medium px-8 sm:px-10 py-2 rounded-full whitespace-nowrap">
              Funcionalidades
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-4 sm:gap-5 lg:gap-6 mt-4">
            {funcionalidades.map((item, index) => (
              <div
                key={item.label}
                className="flex flex-col items-center text-center gap-2 sm:gap-3"
              >
                {item.img ? (
                  <img
                    src={item.img}
                    alt={item.label}
                    className="w-full aspect-[4/3] object-cover rounded-xl sm:rounded-2xl"
                  />
                ) : (
                  <div className="w-full aspect-[4/3] rounded-xl sm:rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center px-2">
                    <span className="text-slate-400 text-[10px] sm:text-xs leading-tight">
                      Imagen {index + 1}
                    </span>
                  </div>
                )}
                <p className="text-[10px] sm:text-xs lg:text-sm xl:text-sm text-gray-600 leading-snug font-medium">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Integración vía API */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl text-slate-600 font-medium mb-6 sm:mb-8">
            Integración vía API
          </h2>

          <div className="border-b-2 border-primary mb-8 sm:mb-10">
            <div className="flex justify-center gap-8 sm:gap-12 lg:gap-16">
              <span className="pb-3 text-sm sm:text-base lg:text-lg font-medium text-primary border-b-4 border-primary -mb-[2px] cursor-default">
                Acerca de
              </span>
              <span className="pb-3 text-sm sm:text-base lg:text-lg font-medium text-slate-400 cursor-default">
                Documentación
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed mb-8 sm:mb-10 lg:mb-12 xl:text-xs px-2">
              {API_ABOUT_TEXT}
            </p>

            {API_ICONS_IMAGE ? (
              <img
                src={API_ICONS_IMAGE}
                alt="Integración API"
                className="w-full max-w-3xl h-auto mx-auto mb-10 sm:mb-12"
              />
            ) : (
              <div className="w-full max-w-3xl aspect-[5/1] sm:aspect-[6/1] rounded-2xl border-2 border-dashed border-slate-300 bg-white flex items-center justify-center mb-10 sm:mb-12 px-4">
                <span className="text-slate-400 text-sm sm:text-base">
                  Imagen iconos API (Structure, API, Database, Big Data, Cloud)
                </span>
              </div>
            )}

            <button
              type="button"
              className="bg-primary text-white text-base sm:text-lg font-semibold px-12 sm:px-16 py-2.5 sm:py-3 rounded-full hover:bg-primarydark transition-colors shadow-md cursor-pointer"
            >
              Suscríbete
            </button>

            <p className="text-xs sm:text-sm lg:text-base xl:text-sm text-gray-500 mt-4 sm:mt-5">
              Aplican términos y condiciones
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RespaldoTecnologicoFuncionalidades
