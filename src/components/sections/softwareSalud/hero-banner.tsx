import React from 'react'
import bannerBg from '../../../assets/img/herosoftware.webp'

const SoftwareSaludHero: React.FC = () => {
  return (
    <section className="relative w-full">
      {/* Móvil: imagen arriba + contenido abajo */}
      <div className="lg:hidden xl:hidden">
        <img
          src={bannerBg}
          alt="Software esencial en salud Medicall24"
          className="w-full h-auto block"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="bg-[#D1D8DC] px-5 sm:px-8 py-8 sm:py-10">
          <div
            className="inline-block bg-slate-700 text-white text-xs sm:text-sm font-medium px-4 sm:px-5 py-2 sm:py-2.5 shadow-lg mb-4 sm:mb-5"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)',
            }}
          >
            Software esencial en salud
          </div>

          <p className="text-slate-700 text-lg sm:text-xl mb-2 sm:mb-3">
            ideal para
          </p>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 leading-tight">
            Sistematizar la atención en salud
          </h1>
        </div>
      </div>

      {/* Desktop: sin cambios */}
      <div className="hidden lg:block xl:block relative w-full">
        <img
          src={bannerBg}
          alt=""
          aria-hidden
          className="w-full h-auto block"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />

        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div className="container mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pointer-events-auto">
            <div className="w-full sm:w-3/5 lg:w-1/2 xl:w-[60%]">
              <div
                className="inline-block bg-slate-700 text-white text-xs sm:text-sm lg:text-2xl xl:text-6xl font-medium px-12 sm:px-7 py-4 sm:py-2.5 shadow-lg mb-6 sm:mb-4"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)',
                }}
              >
                Software esencial en salud
              </div>

              <p
                className="text-slate-700 text-sm sm:text-base lg:text-lg xl:text-5xl mb-12 sm:mb-2"
                style={{ fontSize: '2.5rem' }}
              >
                ideal para
              </p>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.95rem] font-bold text-slate-800 leading-tight">
                Sistematizar la atención en salud
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SoftwareSaludHero
