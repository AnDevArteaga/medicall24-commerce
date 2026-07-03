import React from 'react'

import sectionBg from '../../../assets/img/bg-eco.webp'
import diagramImage from '../../../assets/img/diseño-ecosistema.webp'
const SECTION_BG = sectionBg
const CENTER_IMAGE = diagramImage

const SolucionIntegral: React.FC = () => {
  return (
    <section
      className="w-full py-12 sm:py-16 lg:py-20 xl:py-24 bg-gradient-to-b from-sky-50 to-white bg-cover bg-center bg-no-repeat"
      style={SECTION_BG ? { backgroundImage: `url(${SECTION_BG})` } : undefined}
    >
      <div className="container mx-auto flex flex-col items-center text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-[1.9rem] text-slate-700 leading-snug mb-8 sm:mb-10 lg:mb-12 xl:mb-14 max-w-4xl">
          Una solución integral diseñada para fortalecer la gestión en salud de
          los médicos habilitados como profesionales independientes
        </h2>
      </div>

      <div className="w-full px-1 sm:px-2 md:px-4 lg:px-6 xl:px-8 mb-8 sm:mb-10 lg:mb-12 xl:mb-14">
        {CENTER_IMAGE ? (
          <img
            src={CENTER_IMAGE}
            alt="Ecosistema médico 360"
            className="w-full h-auto mx-auto max-w-[1600px]"
          />
        ) : (
          <div
            className="w-full max-w-[1600px] mx-auto aspect-[4/3] sm:aspect-[16/10] rounded-2xl border-2 border-dashed border-slate-300 bg-white/60 flex items-center justify-center"
            aria-hidden
          >
            <span className="text-slate-400 text-sm sm:text-base px-4">
              Imagen del diagrama
            </span>
          </div>
        )}
      </div>

      <div className="container mx-auto flex flex-col items-center text-center px-4 sm:px-6">
        <button
          type="button"
          className="bg-primary text-white text-base sm:text-lg font-semibold px-10 sm:px-14 py-3 sm:py-3.5 lg:text-lg xl:text-lg lg:px-16 xl:px-16 lg:py-1 xl:py-1 rounded-full hover:bg-primarydark transition-colors shadow-md cursor-pointer"
        >
          Suscríbete
        </button>

        <p className="text-xs sm:text-sm lg:text-lg xl:text-lg text-slate-500 mt-4 sm:mt-5">
          Aplican términos y condiciones
        </p>
      </div>
    </section>
  )
}

export default SolucionIntegral
