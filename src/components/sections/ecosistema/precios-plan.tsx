import React from 'react'
import { Link } from 'react-router-dom'
import { Check, ChevronRight } from 'lucide-react'

// Reemplazar con tus assets:
import sectionBg from '../../../assets/img/bg-eco2.png'
import cardHeaderImage from '../../../assets/img/hrader-eco.webp'
import cruz from '../../../assets/img/cruz.png'
const SECTION_BG = sectionBg
const CARD_HEADER_IMAGE = cardHeaderImage

const legalFeatures = [
  'Componente de asesorías legales y normativas',
  'Capacitaciones en aspectos legales y de la norma vigente en salud',
  'Talleres en temas legales y de la norma vigente en salud',
]

const techFeatures = [
  'Agenda de citas autogestionable a través de la app y la web',
  'Módulo de historias clínicas electrónicas interoperables con Minsalud y RDA.',
  'Asistente de IA para diligenciar historias clínicas electrónicas.',
  'Herramienta de telemedicina según resolución 2654/2019.',
  'Módulo de facturación electrónica en salud con generación de RIPS en formato Json.',
  'Comercio electrónico integrado a Wompi Bancolombia.',
]

const FeatureItem: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-start gap-2 text-left text-xs">
    <Check
      className="w-4 h-4 lg:w-5 lg:h-5 shrink-0 text-primary mt-0.5"
      strokeWidth={2.5}
    />
    <span className="text-xs sm:text-sm lg:text-sm xl:text-xs text-slate-700 leading-snug">
      {text}
    </span>
  </li>
)

const CategoryTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <h3 className="flex items-start gap-1.5 text-base sm:text-lg lg:text-lg xl:text-lg text-slate-800 mb-3">
    <ChevronRight
      className="w-5 h-5 shrink-0 text-slate-700 mt-0.5"
      strokeWidth={2.5}
    />
    <span>{children}</span>
  </h3>
)

const crossDecorations = [
  { className: 'top-6 left-4 w-14 sm:w-16 opacity-[0.12] rotate-12' },
  { className: 'top-24 right-6 w-20 sm:w-24 opacity-[0.1] -rotate-6' },
  {
    className:
      'top-1/2 left-8 w-16 sm:w-20 opacity-[0.08] -translate-y-1/2 rotate-45',
  },
  {
    className: 'top-[58%] right-10 w-12 sm:w-14 opacity-[0.1] rotate-[-20deg]',
  },
  { className: 'bottom-16 left-1/4 w-16 sm:w-20 opacity-[0.09] rotate-6' },
]

const PreciosPlan: React.FC = () => {
  return (
    <section
      className="w-full py-8 sm:py-10 lg:py-10 xl:py-12 px-4 sm:px-6 bg-slate-800 bg-cover bg-center bg-no-repeat lg:min-h-screen lg:flex lg:items-center lg:justify-center"
      style={SECTION_BG ? { backgroundImage: `url(${SECTION_BG})` } : undefined}
    >
      <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-6xl text-white text-center mb-5 sm:mb-6 lg:mb-6 xl:mb-10 shrink-0">
        Precios increíbles para todas las especialidades
      </h2>
      <div className="container mx-auto flex flex-col items-center w-full max-w-3xl lg:max-w-4xl xl:max-w-4xl">
        <div className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[calc(100vh-6rem)] lg:max-h-[calc(100vh-8rem)]">
          {CARD_HEADER_IMAGE ? (
            <img
              src={CARD_HEADER_IMAGE}
              alt="Profesionales de la salud"
              className="w-full h-auto block shrink-0"
            />
          ) : (
            <div className="w-full h-28 sm:h-32 lg:h-36 bg-slate-200 flex items-center justify-center border-b border-slate-200 shrink-0">
              <span className="text-slate-500 text-sm sm:text-base px-4 text-center">
                Imagen encabezado del plan
              </span>
            </div>
          )}

          <div className="relative px-6 sm:px-8 lg:px-10 xl:px-12 py-5 sm:py-6 lg:py-8 overflow-y-auto">
            {crossDecorations.map((cross, index) => (
              <img
                key={index}
                src={cruz}
                alt=""
                aria-hidden
                className={`absolute pointer-events-none select-none ${cross.className}`}
              />
            ))}

            <div className="relative z-10">
              <div className="mb-4">
                <Link
                  to="/ecosistema-medico-360/asesoria-legal"
                  className="block hover:opacity-80 transition-opacity"
                >
                  <CategoryTitle>
                    Plataforma interactiva de asesorías legales y normativas
                  </CategoryTitle>
                </Link>
                <div className="border border-slate-200 rounded-3xl p-5 sm:p-6 lg:p-4 xl:p-4">
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                    {legalFeatures.map((item) => (
                      <FeatureItem key={item} text={item} />
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-3 sm:p-4 lg:p-5 mb-5">
                <Link
                  to="/ecosistema-medico-360/respaldo-tecnologico"
                  className="block hover:opacity-80 transition-opacity"
                >
                  <CategoryTitle>
                    Plataforma tecnológica para la gestión en salud
                  </CategoryTitle>
                </Link>
                <div className="border border-slate-200 rounded-3xl p-5 sm:p-6 lg:p-4 xl:p-4">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                    {techFeatures.map((item) => (
                      <FeatureItem key={item} text={item} />
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col items-center text-center">
                <h4 className="text-2xl sm:text-3xl lg:text-3xl xl:text-3xl font-bold text-slate-800 mb-4">
                  Plan Esencial
                </h4>

                <button
                  type="button"
                  className="w-auto max-w-xl bg-primary text-white text-base sm:text-lg lg:text-lg xl:text-xl px-12 py-2 rounded-full hover:bg-primarydark transition-colors shadow-lg cursor-pointer mb-4"
                >
                  Suscríbete desde $149.900 COP / mes
                </button>

                <p className="text-xs sm:text-sm lg:text-base xl:text-sm text-slate-700 mt-3 sm:mt-4">
                  <span className="text-slate-700 mr-2">
                    Vigencia por 12 meses
                  </span>{' '}
                  |{' '}
                  <span className="text-slate-700 ml-2">
                    Aplican términos y condiciones
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PreciosPlan
