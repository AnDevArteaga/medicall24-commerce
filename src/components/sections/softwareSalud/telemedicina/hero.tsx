import React from 'react'
import { Check } from 'lucide-react'

import heroImage from '../../../../assets/img/telemedi.webp'
import videoIcon from '../../../../assets/img/video.png'

const features = [
  'Videollamadas cifradas de extremo a extremo',
  'Calidad del video en HD, full HD y 4k',
  'Confidencialidad de datos de la consulta garantizada',
  'Protección de datos personales según Ley 1581 de 2012',
]

const TelemedicinaHero: React.FC = () => {
  return (
    <section className="w-full bg-[#D1D8DC] px-4 sm:px-6 py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="container mx-auto max-w-6xl xl:max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
          <div className="text-center lg:text-left xl:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.7rem] font-bold text-slate-800 leading-tight mb-3 sm:mb-4">
              Herramienta de Telemedicina
            </h1>

            <p className="text-slate-600 text-base sm:text-lg lg:text-xl xl:text-2xl text-center lg:text-left xl:text-left mb-6 sm:mb-8">
              ¡La manera más fácil de encontrar un médico!
            </p>

            <div className="flex items-center gap-2 sm:gap-3 bg-secondary rounded-4xl px-3 sm:px-4 py-3 sm:py-4 shadow-lg w-full max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-8">
              <div className="shrink-0">
                <img
                  src={videoIcon}
                  alt=""
                  aria-hidden
                  className="w-auto h-14 sm:h-16 lg:h-20 xl:h-24"
                />
              </div>
              <p className="text-white text-sm sm:text-base lg:text-lg xl:text-2xl leading-snug text-left">
                Acceso rápido y seguro desde cualquier zona geográfica.
              </p>
            </div>

            <p className="text-slate-600 text-sm sm:text-base lg:text-lg xl:text-lg text-center lg:text-left xl:text-left leading-relaxed mb-6 sm:mb-8">
              Una aplicación creada para implementar todas las modalidades de
              telemedicina que establece la resolución 2654 de 2019.
            </p>

            <ul className="flex flex-col gap-3 sm:gap-4 items-start max-w-xl mx-auto lg:mx-0">
              {features.map((item) => (
                <li key={item} className="flex items-start gap-3 text-left">
                  <Check
                    className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0 mt-0.5"
                    strokeWidth={2.5}
                  />
                  <span className="text-slate-700 text-sm sm:text-base lg:text-lg leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img
              src={heroImage}
              alt="Consulta de telemedicina"
              className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TelemedicinaHero
