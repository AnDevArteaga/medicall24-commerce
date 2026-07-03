import React from 'react'
import { Link } from 'react-router-dom'

import sectionBg from '../../../../assets/img/fondobg-soft.webp'
import iconIa from '../../../../assets/img/ia.png'
import iconUploadCloud from '../../../../assets/img/Upload cloud.png'
import iconShare from '../../../../assets/img/Share.png'
import iconLogOut from '../../../../assets/img/Log out.png'
import iconDownload from '../../../../assets/img/Download.png'

const CARD_WIDTH =
  'w-full max-w-[200px] mx-auto sm:max-w-none sm:w-[calc((100%-1.5rem)/2)] md:w-[calc((100%-2*1.5rem)/3)] lg:w-[calc((100%-4*2.5rem)/5)] xl:w-[calc((100%-4*3rem)/5)] shrink-0'

interface TecnologiaCard {
  icon: string
  label: string
}

const tecnologiaCards: TecnologiaCard[] = [
  {
    icon: iconIa,
    label:
      'Funciones de conversión de texto y audio por IA para diligenciar la HC',
  },
  {
    icon: iconUploadCloud,
    label: 'Almacenamiento multimedia en la nube',
  },
  {
    icon: iconShare,
    label: 'Carga de archivos en formatos pdf, png y jpg a la HC del paciente',
  },
  {
    icon: iconLogOut,
    label:
      'Generación y envío automático del RDA de la HCE al Ministerio de Salud',
  },
  {
    icon: iconDownload,
    label: 'Descarga de la HC en formatos pdf',
  },
]

const TecnologiaCardItem: React.FC<{ card: TecnologiaCard }> = ({ card }) => (
  <div
    className={`${CARD_WIDTH} aspect-square bg-gray-600 border-4 border-white rounded-[2rem] sm:rounded-[2.25rem] lg:rounded-[2.5rem] xl:rounded-[2.75rem] shadow-2xl flex flex-col items-center justify-between py-6 sm:py-8 px-3 sm:px-4`}
  >
    <div className="flex-1 flex items-center justify-center">
      <img
        src={card.icon}
        alt=""
        aria-hidden
        className="w-12 h-12 sm:h-14 lg:h-16 xl:h-24 xl:w-24 mb-6"
      />
    </div>
    <p className="text-white text-xs sm:text-sm lg:text-base text-center leading-snug">
      {card.label}
    </p>
  </div>
)

const HistoriasClinicasTecnologia: React.FC = () => {
  return (
    <section
      className="w-full px-4 sm:px-6 py-12 sm:py-16 lg:py-20 xl:py-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${sectionBg})` }}
    >
      <div className="container mx-auto max-w-6xl xl:max-w-7xl">
        <h2 className="text-center text-slate-800 text-xl sm:text-2xl lg:text-3xl xl:text-5xl mb-10 sm:mb-12 lg:mb-14 mb-20 leading-snug max-w-5xl mx-auto">
          Tecnología de vanguardia al servicio del médico
        </h2>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-10 xl:gap-12 mb-10 sm:mb-12 lg:mb-14 xl:mb-32">
          {tecnologiaCards.map((card) => (
            <TecnologiaCardItem key={card.label} card={card} />
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

export default HistoriasClinicasTecnologia
