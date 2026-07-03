import React from 'react'
import { FileText, Activity, Database, ChevronsRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import heroImage from '../../../../assets/img/heropred.webp'

interface FeatureItem {
  icon: LucideIcon
  label: string
  href?: string
}

const features: FeatureItem[] = [
  {
    icon: FileText,
    label: 'Encuestas de predicción de riesgo en salud',
    href: '#encuestas-riesgo',
  },
  {
    icon: Activity,
    label: 'Medición complementaria de signos vitales por scan face',
  },
  {
    icon: Database,
    label: 'Segmentación de pacientes según su riesgo',
  },
]

const FeaturePill: React.FC<{ item: FeatureItem }> = ({ item }) => {
  const Icon = item.icon
  const content = (
    <>
      <Icon
        className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 shrink-0"
        strokeWidth={1.75}
      />
      <span className="flex-1 text-slate-700 text-xs sm:text-sm lg:text-base xl:text-base text-left leading-snug">
        {item.label}
      </span>
      <ChevronsRight
        className="w-5 h-5 text-slate-500 shrink-0"
        strokeWidth={1.75}
      />
    </>
  )

  const className =
    'flex items-center gap-3 sm:gap-4 w-full border border-slate-300 rounded-full px-4 sm:px-5 py-3 sm:py-3.5 hover:bg-slate-200 transition-colors border border-slate-700'

  if (item.href) {
    return (
      <a href={item.href} className={className}>
        {content}
      </a>
    )
  }

  return <div className={className}>{content}</div>
}

const PrediccionRiesgoHero: React.FC = () => {
  return (
    <section className="w-full bg-[#D1D8DC] px-4 sm:px-6 py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="container mx-auto max-w-6xl xl:max-w-7xl">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.5rem] font-bold text-slate-800 leading-tight mb-3 sm:mb-4">
          Herramienta de predicción de riesgo en salud con IA
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-center">
          <div className="text-center lg:text-left xl:text-left">
            <p className="text-slate-700 text-base sm:text-lg lg:text-xl xl:text-2xl font-medium mb-5 sm:mb-6 leading-snug">
              Identifica, evalúa y predice el riesgo en salud de la población
            </p>

            <div
              className="flex flex-col gap-4 sm:gap-5 text-slate-600 text-sm sm:text-base lg:text-lg xl:text-lg leading-relaxed mb-8 sm:mb-10"
              style={{ fontSize: '1rem' }}
            >
              <p>
                Funcionalidad para predecir los riesgos asociados a la calidad
                de vida, hábitos y antecedentes de la población, con el fin de
                anticipar enfermedades.
              </p>
              <p>
                La IA procesa la información del usuario con base en algoritmos
                de escala de riesgo aceptados en Colombia.
              </p>
              <p>
                Permite clasificar a la población según su nivel de riesgo:
                bajo, moderado o alto.
              </p>
            </div>

            <p className="text-slate-800 text-sm sm:text-base lg:text-lg xl:text-lg mb-4 sm:mb-5 text-left">
              Funcionalidades de la predicción del riesgo:
            </p>

            <div className="flex flex-col gap-3 sm:gap-4 ">
              {features.map((item) => (
                <FeaturePill key={item.label} item={item} />
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img
              src={heroImage}
              alt="Predicción de riesgo en salud con IA"
              className="w-full max-w-lg lg:max-w-xl xl:max-w-2xl h-auto rounded-[2rem] shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default PrediccionRiesgoHero
