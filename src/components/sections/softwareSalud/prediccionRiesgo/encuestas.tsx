import React from 'react'
import { Link } from 'react-router-dom'

import icon1 from '../../../../assets/img/corazon.png'
import icon2 from '../../../../assets/img/cancer.png'
import icon3 from '../../../../assets/img/estomago.png'
import icon4 from '../../../../assets/img/estilo.png'
import icon5 from '../../../../assets/img/mental.png'
import icon6 from '../../../../assets/img/social.png'
import icon7 from '../../../../assets/img/pastilla.png'
import sectionBg from '../../../../assets/img/fondobg-soft.webp'

const CARD_WIDTH =
  'w-full max-w-[200px] mx-auto sm:max-w-none sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-7.5rem)/4)] xl:w-[calc((100%-9rem)/4)] shrink-0'

interface EncuestaCard {
  icon: string
  label: string
}

const encuestaCards: EncuestaCard[] = [
  { icon: icon1, label: 'Riesgo cardiovascular' },
  { icon: icon2, label: 'Riesgo de cáncer' },
  { icon: icon3, label: 'Riesgo metabólico' },
  { icon: icon4, label: 'Estilo de vida' },
  { icon: icon5, label: 'Salud mental' },
  { icon: icon6, label: 'Determinantes sociales' },
  { icon: icon7, label: 'Adherencia a medicamentos' },
]

const EncuestaCardItem: React.FC<{ card: EncuestaCard }> = ({ card }) => {
  const Icon = card.icon

  return (
    <div
      className={`${CARD_WIDTH} aspect-square bg-gray-600 border-4 border-white rounded-3xl shadow-2xl flex flex-col items-center justify-between py-6 sm:py-8 px-3 sm:px-4`}
    >
      <div className="flex-1 flex items-center justify-center">
        <img
          src={Icon}
          alt={card.label}
          className="w-12 h-12 sm:w-auto sm:h-14 lg:w-auto lg:h-16 xl:w-auto xl:h-32"
        />
      </div>
      <p className="text-white text-xs sm:text-sm lg:text-base xl:text-base text-center leading-snug">
        {card.label}
      </p>
    </div>
  )
}

const PrediccionRiesgoEncuestas: React.FC = () => {
  return (
    <section
      id="encuestas-riesgo"
      className="w-full px-4 sm:px-6 py-12 sm:py-16 lg:py-20 xl:py-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${sectionBg})` }}
    >
      <div className="container mx-auto max-w-6xl xl:max-w-5xl">
        <h2 className="text-center text-slate-800 text-xl sm:text-2xl lg:text-3xl xl:text-5xl mb-10 sm:mb-12 lg:mb-14 xl:mb-20">
          Encuestas de predicción de riesgo en salud
        </h2>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-10 xl:gap-12 mb-10 sm:mb-12 lg:mb-14 xl:mb-20">
          {encuestaCards.map((card) => (
            <EncuestaCardItem key={card.label} card={card} />
          ))}
        </div>

        <div className="flex justify-center mb-10 sm:mb-12 lg:mb-14 xl:mb-20">
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

export default PrediccionRiesgoEncuestas
