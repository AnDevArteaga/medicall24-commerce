import React from 'react'
import { Link } from 'react-router-dom'

import sectionBg from '../../../../assets/img/fondobg-soft.webp'
import calendarioImg from '../../../../assets/img/Calendar.png'
import horarioImg from '../../../../assets/img/doctor.png'
import detalleImg from '../../../../assets/img/info.png'

const ecommercePanels = [
  {
    src: calendarioImg,
    alt: 'Agenda de citas — calendario',
    text: 'Agenda de citas',
  },
  { src: horarioImg, alt: 'Selección de horario disponible' },
  { src: detalleImg, alt: 'Detalles de la cita', text: 'Detalles de la cita' },
]

const AgendaCitasEcommerce: React.FC = () => {
  return (
    <section
      className="w-full px-4 sm:px-6 py-12 sm:py-16 lg:py-20 xl:py-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${sectionBg})` }}
    >
      <div className="container mx-auto max-w-6xl xl:max-w-7xl">
        <h2 className="text-center text-slate-800 text-xl sm:text-2xl lg:text-3xl xl:text-5xl mb-8 sm:mb-10 lg:mb-12 leading-snug">
          Autogestión de citas desde el{' '}
          <span className="font-extrabold">ecommerce</span>
        </h2>

        <div className="rounded-2xl sm:rounded-3xl bg-white border-2 border-primary p-4 sm:p-6 lg:p-8 xl:p-10 mb-10 sm:mb-12 lg:mb-14 xl:mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-24">
            {ecommercePanels.map((panel) => (
              <div key={panel.alt} className="flex flex-col items-center">
                {panel.text && (
                  <span className="text-slate-800 text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-center block w-full mb-4 sm:mb-5 lg:mb-6">
                    {panel.text}
                  </span>
                )}
                <img
                  src={panel.src}
                  alt={panel.alt}
                  className={`w-full h-auto ${
                    panel.text === 'Detalles de la cita'
                      ? 'scale-110 sm:scale-100 xs:scale-100 lg:scale-100 xl:scale-120'
                      : ''
                  }`}
                />
              </div>
            ))}
          </div>
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

export default AgendaCitasEcommerce
