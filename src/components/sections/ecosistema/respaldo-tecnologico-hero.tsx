import React from 'react'
import { Check } from 'lucide-react'

// Reemplazar con tu asset:
import heroBg from '../../../assets/img/soporte.webp'
const HERO_BG = heroBg
const features = [
  'Infraestructura tecnológica escalable en la nube (Azure / AWS / Google)',
  'Acceso seguro y sin restricciones a la información del usuario',
  'Incluye espacio de almacenamiento de archivos (100 GB por año)',
  'App para dispositivos móviles y acceso a portal web',
]

const RespaldoTecnologicoHero: React.FC = () => {
  return (
    <section
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
      style={HERO_BG ? { backgroundImage: `url(${HERO_BG})` } : undefined}
    >
      <div className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-10 xl:px-16 py-12 sm:py-16 lg:py-20 xl:py-24 min-h-screen flex items-center">
        <div className="w-full max-w-xl lg:max-w-2xl xl:max-w-4xl text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl leading-tight mb-4 lg:mb-5 xl:mb-6">
            Plataforma tecnológica de gestión en salud
          </h1>

          <p className="text-base sm:text-lg lg:text-xl xl:text-xl leading-relaxed mb-6 lg:mb-8 xl:mb-10">
            Cumple con la normativa vigente del sector salud en Colombia
          </p>

          <ul className="flex flex-col gap-3 sm:gap-4 lg:gap-4 xl:gap-5 mb-10 lg:mb-12 xl:mb-14">
            {features.map((item) => (
              <li key={item} className="flex items-start gap-3 text-left">
                <Check
                  className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 mt-0.5"
                  strokeWidth={2.5}
                />
                <span
                  className="text-sm sm:text-base lg:text-lg xl:text-lg leading-snug"
                  style={{ fontSize: '1rem' }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <button
              type="button"
              className="bg-white text-slate-900 text-base sm:text-lg lg:text-xl px-12 sm:px-14 py-1 sm:py-3.5 rounded-full hover:bg-white/90 transition-colors shadow-lg cursor-pointer"
            >
              Suscríbete
            </button>

            <p className="text-sm sm:text-base text-white/70 mt-4 sm:mt-5">
              Aplican términos y condiciones
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RespaldoTecnologicoHero
