import React from 'react'
import { Link } from 'react-router-dom'
import heroeco from '../../../assets/img/heroeco.webp'
import alianza from '../../../assets/img/sociendadescien.png'

const serviceButtons = [
  { label: 'Aseguramiento', href: null },
  {
    label: 'Asesoría legal y normativa',
    href: '/ecosistema-medico-360/asesoria-legal',
  },
  { label: 'Respaldo tecnológico', href: '/ecosistema-medico-360/respaldo-tecnologico' },
]

const HeroContent: React.FC = () => (
  <>
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-18 lg:mb-10">
      Ecosistema médico 360
    </h1>

    <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-row xl:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3 lg:gap-12 xl:gap-18 mb-6 sm:mb-8 lg:mb-12 xl:mb-18">
      {serviceButtons.map(({ label, href }) =>
        href ? (
          <Link
            key={label}
            to={href}
            className="border border-white/90 bg-slate-800/50 text-white text-xs sm:text-sm lg:text-lg xl:text-lg font-medium px-4 sm:px-5 lg:px-6 py-2 rounded-full hover:bg-white/10 transition-colors sm:whitespace-nowrap text-center"
          >
            {label}
          </Link>
        ) : (
          <button
            key={label}
            type="button"
            className="border border-white/90 bg-slate-800/50 text-white text-xs sm:text-sm lg:text-lg xl:text-lg font-medium px-4 sm:px-5 lg:px-6 py-2 rounded-full hover:bg-white/10 transition-colors sm:whitespace-nowrap w-xs"
          >
            {label}
          </button>
        ),
      )}
    </div>

    <div className="flex flex-col items-center gap-2 sm:gap-3 mb-6 sm:mb-8 lg:mb-10 xl:mb-18">
      <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-white/15 border border-white/40 flex items-center justify-center">
        <img
          src={alianza}
          alt="Aliados estratégicos"
          className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 object-contain"
        />
      </div>
      <span className="text-sm sm:text-base lg:text-lg xl:text-lg font-medium tracking-wide">
        Aliados estratégicos
      </span>
    </div>

    <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium mb-3 sm:mb-4 lg:mb-10 xl:mb-18">
      Desde $149.900,00 COP / Mes.
    </p>

    <button
      type="button"
      className="text-lg sm:text-xl lg:text-2xl xl:text-3xl underline underline-offset-4 hover:text-white/80 transition-colors mb-4 sm:mb-6"
    >
      Suscríbete
    </button>

    <p className="text-xs sm:text-sm lg:text-lg xl:text-lg text-white/70">
      Aplican términos y condiciones
    </p>
  </>
)

const EcosistemaHero: React.FC = () => {
  return (
    <section className="w-full">
      {/* Móvil y tablet: imagen arriba + contenido abajo */}
      <div className="lg:hidden xl:hidden">
        <img
          src={heroeco}
          alt="Profesionales de la salud Medicall24"
          className="w-full h-auto block"
        />
        <div className="bg-slate-900 text-white text-center px-5 sm:px-8 py-8 sm:py-10 flex flex-col items-center">
          <HeroContent />
        </div>
      </div>

      {/* Desktop: imagen completa con contenido superpuesto */}
      <div className="hidden lg:block xl:block relative w-full">
        <img src={heroeco} alt="" aria-hidden className="w-full h-auto block" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-8 py-10">
          <HeroContent />
        </div>
      </div>
    </section>
  )
}

export default EcosistemaHero
