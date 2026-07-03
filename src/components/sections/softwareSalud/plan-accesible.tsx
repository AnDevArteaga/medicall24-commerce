import React from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'

// Reemplazar con tu asset de fondo:
import sectionBg from '../../../assets/img/aceesiblebg.webp'

const leftFeatures = [
  'Infraestructura tecnológica escalable en la nube (Azure / AWS / Google).',
  'Acceso seguro y sin restricciones a la información del usuario.',
  'Incluye espacio de almacenamiento de archivos (100 GB por año).',
  'Transacciones bancarias seguras a través del comercio electrónico.',
]

const rightFeatures = [
  'Uso correcto y ético de la IA para apoyar al médico.',
  'Interoperabilidad de la historia clínica con el Ministerio de Salud.',
  'Integración vía API.',
]

const FeatureItem: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-start gap-2.5 text-left">
    <span className="flex items-center justify-center w-5 h-5 shrink-0 rounded-full border border-white/80 mt-0.5">
      <Check className="w-3 h-3 text-white" strokeWidth={3} />
    </span>
    <span className="text-xs sm:text-sm lg:text-base text-white/95 leading-snug">
      {text}
    </span>
  </li>
)

const PlanAccesible: React.FC = () => {
  return (
    <section
      className="w-full py-12 sm:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 bg-slate-800 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${sectionBg})` }}
    >
      <div className="container mx-auto max-w-5xl xl:max-w-6xl flex flex-col items-center text-center">
        <h2 className="text-white mb-2 sm:mb-3">
          <span className="block text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-light leading-tight">
            Adquiere la versatilidad de un software
          </span>
          <span className="block text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-bold leading-tight mt-1">
            ¡A un costo accesible!
          </span>
        </h2>

        <p className="text-white text-base sm:text-lg lg:text-xl xl:text-3xl font-normal mb-8 sm:mb-10 lg:mb-12">
          Por solo $459.900 COP / mes
        </p>

        <div className="w-full border border-white/40 rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] px-5 sm:px-8 lg:px-12 xl:px-14 py-6 sm:py-8 lg:py-10 mb-10 sm:mb-12 lg:mb-14">
          <div className="grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-x-6 lg:gap-x-10 xl:gap-x-12 gap-y-3 sm:gap-y-4">
            <ul className="flex flex-col gap-3 sm:gap-4">
              {leftFeatures.map((item) => (
                <FeatureItem key={item} text={item} />
              ))}
            </ul>
            <ul className="flex flex-col gap-3 sm:gap-4">
              {rightFeatures.map((item) => (
                <FeatureItem key={item} text={item} />
              ))}
            </ul>
          </div>
        </div>

        <Link
          to="/iniciar-sesion"
          className="bg-white text-slate-900 text-base sm:text-lg lg:text-xl font-medium px-10 sm:px-12 lg:px-14 py-2.5 sm:py-3 rounded-full hover:bg-white/90 transition-colors shadow-lg"
        >
          Crear cuenta
        </Link>
      </div>
    </section>
  )
}

export default PlanAccesible
