import React from 'react'
import { Link } from 'react-router-dom'

import sectionBg from '../../../../assets/img/fondobg-soft.webp'
import modalidadImg1 from '../../../../assets/img/tele1.webp'
import modalidadImg2 from '../../../../assets/img/tele2.webp'
import modalidadImg3 from '../../../../assets/img/teñe3.webp'
import modalidadImg4 from '../../../../assets/img/tele4.webp'

interface ModalidadCard {
  image: string
  title: string
  description: string
}

const modalidades: ModalidadCard[] = [
  {
    image: modalidadImg1,
    title: 'Telemedicina interactiva',
    description:
      'Comunicación en tiempo real entre profesionales de la salud y sus pacientes por una videollamada segura y confiable.',
  },
  {
    image: modalidadImg2,
    title: 'Telemedicina no interactiva',
    description:
      'Los usuarios envían sus datos de salud de forma asincrónica para que profesionales de la salud puedan evaluar y generar respuestas.',
  },
  {
    image: modalidadImg3,
    title: 'Telexperticia',
    description:
      'Comunicación en tiempo real entre varios profesionales de la salud por una videollamada segura y confiable para atender a un paciente.',
  },
  {
    image: modalidadImg4,
    title: 'Telemonitoreo',
    description:
      'Transferencia de datos de salud que permite a profesionales de la salud monitorear a distancia a sus pacientes.',
  },
]

const ModalidadCardItem: React.FC<{ card: ModalidadCard }> = ({ card }) => (
  <article className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg flex flex-col h-full">
    <img
      src={card.image}
      alt={card.title}
      className="w-full h-auto block object-cover"
    />
    <div className="bg-slate-700 flex flex-col gap-3 sm:gap-4 px-4 sm:px-5 lg:px-6 py-5 sm:py-6 text-center flex-1">
      <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg xl:text-xl leading-snug">
        {card.title}
      </h3>
      <p
        className="text-white/90 text-xs sm:text-sm lg:text-base xl:text-base"
        style={{ fontSize: '0.9rem' }}
      >
        {card.description}
      </p>
    </div>
  </article>
)

const TelemedicinaModalidades: React.FC = () => {
  return (
    <section
      className="w-full px-4 sm:px-6 py-12 sm:py-16 lg:py-20 xl:py-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${sectionBg})` }}
    >
      <div className="container mx-auto max-w-6xl xl:max-w-7xl">
        <h2 className="text-center text-slate-800 text-lg sm:text-xl lg:text-2xl xl:text-5xl mb-10 sm:mb-12 lg:mb-14 leading-snug max-w-6xl mx-auto mb-20">
          Implementa todas las modalidades de telemedicina establecidas en la
          resolución 2654/19
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mb-10 sm:mb-12 lg:mb-14 xl:mb-32">
          {modalidades.map((card) => (
            <ModalidadCardItem key={card.title} card={card} />
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

export default TelemedicinaModalidades
