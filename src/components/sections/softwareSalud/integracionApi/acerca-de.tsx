import React from 'react'

import apiMainImage from '../../../../assets/img/api.webp'

const API_ABOUT_TEXT =
  'MEDICALL24 es un software para digitalizar la gestión de los prestadores de salud, que permite interoperar con otros sistemas de información mediante integración vía API. Con este método de conexión sistemática es posible acceder a la información de las historias clínicas de los usuarios que los prestadores de salud requieren para dar continuidad a sus procesos asistenciales y administrativos.'

const IntegracionApiAcercaDe: React.FC = () => {
  return (
    <section className="w-full bg-white px-4 sm:px-6 py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="container mx-auto max-w-4xl xl:max-w-7xl">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] font-bold text-slate-800 leading-tight mb-8 sm:mb-10 lg:mb-12">
          Integración vía API
        </h1>

        <div className="border-b border-slate-200 mb-8 sm:mb-10 lg:mb-12">
          <div className="flex justify-center gap-8 sm:gap-12 lg:gap-16">
            <span className="pb-3 text-sm sm:text-base lg:text-lg xl:text-xl font-medium text-primary border-b-4 border-primary -mb-px cursor-default">
              Acerca de
            </span>
            <span className="pb-3 text-sm sm:text-base lg:text-lg xl:text-xl font-medium text-slate-400 cursor-default">
              Documentación
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed mb-8 sm:mb-10 lg:mb-12 xl:mb-14 max-w-3xl xl:max-w-7xl">
            {API_ABOUT_TEXT}
          </p>

          <img
            src={apiMainImage}
            alt="Integración vía API"
            className="w-full max-w-3xl h-auto"
          />
        </div>
      </div>
    </section>
  )
}

export default IntegracionApiAcercaDe
