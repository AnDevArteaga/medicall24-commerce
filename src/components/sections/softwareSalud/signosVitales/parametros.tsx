import React from 'react'
import { Link } from 'react-router-dom'

import sectionBg from '../../../../assets/img/fondobg-soft.webp'

const parametros = [
  'Frecuencia cardíaca',
  'Temperatura corporal',
  'Composición corporal',
  'Presión arterial',
  'Frecuencia respiratoria',
  'Nivel de bienestar',
  'Saturación de oxígeno',
  'Variabilidad de la FC',
  'Nivel de estrés',
]

const SignosVitalesParametros: React.FC = () => {
  return (
    <section
      className="w-full px-4 sm:px-6 py-12 sm:py-16 lg:py-20 xl:py-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${sectionBg})` }}
    >
      <div className="container mx-auto max-w-5xl xl:max-w-4xl">
        <h2 className="text-center text-slate-800 text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-medium mb-10 sm:mb-12 lg:mb-14 xl:mb-20">
          Parámetros de signos vitales medibles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-10 sm:mb-12 lg:mb-14 xl:mb-32">
          {parametros.map((label) => (
            <div
              key={label}
              className="bg-white/70 border border-slate-300/80 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-4 sm:py-5 text-slate-700 text-sm sm:text-base lg:text-lg text-left shadow-sm"
            >
              {label}
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            to="/iniciar-sesion"
            className="bg-primary text-white text-base sm:text-lg lg:text-xl xl:text-2xl font-medium px-10 sm:px-12 lg:px-14 py-2.5 sm:py-3 rounded-full hover:bg-primarydark transition-colors shadow-[0_0_20px_rgba(194,24,91,0.35)]"
          >
            Crear una cuenta
          </Link>
        </div>
      </div>
    </section>
  )
}

export default SignosVitalesParametros
