import React from 'react'
import { Link } from 'react-router-dom'

import sectionBg from '../../../../assets/img/fondobg-soft.webp'

const API_ICONS_IMAGE = '/iconos.png'

const IntegracionApiIconos: React.FC = () => {
  return (
    <section
      className="w-full px-4 sm:px-6 py-12 sm:py-16 lg:py-20 xl:py-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${sectionBg})` }}
    >
      <div className="container mx-auto max-w-5xl xl:max-w-6xl flex flex-col items-center text-center">
        <img
          src={API_ICONS_IMAGE}
          alt="Structure, API, Database, Big Data y Cloud Computing"
          className="w-full max-w-4xl xl:max-w-3xl h-auto mb-10 sm:mb-12 lg:mb-14 xl:mb-20 "
        />

        <Link
          to="/iniciar-sesion"
          className="bg-primary text-white text-base sm:text-lg lg:text-xl xl:text-2xl font-medium px-10 sm:px-12 lg:px-14 py-2.5 sm:py-3 rounded-full hover:bg-primarydark transition-colors shadow-[0_0_20px_rgba(194,24,91,0.35)]"
        >
          Crear una cuenta
        </Link>
      </div>
    </section>
  )
}

export default IntegracionApiIconos
