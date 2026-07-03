import React from 'react'
import { Check } from 'lucide-react'

// Reemplazar con tus assets:
// import sectionBg from '../../../assets/img/bg-asesoria-legal.png'
import heroImage from '../../../assets/img/asesoria-img.webp'
const SECTION_BG = ''
const HERO_IMAGE = heroImage

const topics = [
  'Prevención del riesgo legal por el acto médico; relación médico-paciente y consentimiento informado.',
  'La bioética y las nuevas tecnologías sobre la vida (inteligencia artificial y telemedicina).',
  'Responsabilidad profesional civil contractual y extracontractual en la prestación de los servicios de salud.',
  'Actuaciones legales ante discriminación, acoso y degradación del trato profesional, defensa de la integridad moral, y manejo de conflictos y agresiones de pacientes.',
  'Quejas ante Tribunales de Ética Médica.',
  'Registro obligatorio de historias clínicas electrónicas, interoperabilidad y el reporte del Resumen Digital de Atención (RDA) al Ministerio de Salud.',
  'Formas de vinculación: contratación laboral y por prestación de servicios.',
  'Contratación con EPS, IPS y terceros, negociación de tarifas y condiciones contractuales.',
  'Generación de RIPS, facturación electrónica con reporte a la DIAN y gestión de glosas.',
  'Cumplimiento de estándares de habilitación y reporte de informes a entes de control.',
]

const AsesoriaLegalHero: React.FC = () => {
  return (
    <section
      className="w-full min-h-screen bg-gradient-to-br from-cyan-900 via-cyan-slate-700 to-cyan-950 bg-cover bg-center bg-no-repeat"
      style={SECTION_BG ? { backgroundImage: `url(${SECTION_BG})` } : undefined}
    >
      <div className="container mx-auto px-5 sm:px-8 xl:px-0 py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="flex flex-col lg:flex-row xl:flex-row items-center gap-10 lg:gap-14 xl:gap-12">
          {/* Imagen — reemplazar */}
          <div className="w-full lg:w-4/12 xl:w-4/12 shrink-0">
            {HERO_IMAGE ? (
              <img
                src={HERO_IMAGE}
                alt="Asesoría legal y normativa"
                className="w-full h-auto rounded-[2rem] lg:rounded-[2.5rem] xl:rounded-[3rem] shadow-2xl"
              />
            ) : (
              <div className="w-full aspect-[4/5] sm:aspect-[3/4] rounded-[2rem] lg:rounded-[2.5rem] xl:rounded-[3rem] bg-slate-700/50 border-2 border-dashed border-white/30 flex items-center justify-center">
                <span className="text-white/60 text-base sm:text-lg lg:text-xl px-6 text-center">
                  Imagen asesoría legal
                </span>
              </div>
            )}
          </div>

          {/* Contenido */}
          <div className="w-full lg:w-8/12 xl:w-8/12 text-white">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl leading-tight mb-5 lg:mb-6 xl:mb-8">
              Plataforma interactiva de asesorías legales y normativas
            </h1>

            <p className="text-base sm:text-lg lg:text-xl xl:text-xl leading-relaxed mb-6 lg:mb-8 xl:mb-10">
              Un programa de asesorías que incluye capacitaciones y talleres
              virtuales en los siguientes temas:
            </p>

            <ul className="flex flex-col gap-3 sm:gap-4 lg:gap-4 xl:gap-5 mb-10 lg:mb-12 xl:mb-14">
              {topics.map((topic) => (
                <li key={topic} className="flex items-start gap-3 text-left">
                  <Check
                    className="w-5 h-5 sm:w-6 sm:h-6 lg:w-6 lg:h-6 shrink-0 mt-0.5"
                    strokeWidth={2.5}
                  />
                  <span
                    className="text-sm sm:text-base lg:text-lg xl:text-lg leading-snug"
                    style={{ fontSize: '1rem' }}
                  >
                    {topic}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <button
                type="button"
                className="bg-white text-slate-900 text-base sm:text-lg lg:text-xl xl:text-xl font-semibold px-12 sm:px-14 py-3 sm:py-3.5 rounded-full hover:bg-white/90 transition-colors shadow-lg cursor-pointer"
              >
                Suscríbete
              </button>

              <p className="text-sm sm:text-base lg:text-lg text-white/70 mt-4 sm:mt-5">
                Aplican términos y condiciones
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AsesoriaLegalHero
