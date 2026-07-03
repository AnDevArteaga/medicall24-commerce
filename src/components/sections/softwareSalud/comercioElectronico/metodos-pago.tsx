import React from 'react'
import { Link } from 'react-router-dom'

import sectionBg from '../../../../assets/img/fondobg-soft.webp'
import logosImage from '../../../../assets/img/bancos.png'
import bannerImage from '../../../../assets/img/metodos.webp'

const ComercioElectronicoMetodosPago: React.FC = () => {
  return (
    <section
      className="w-full px-4 sm:px-6 py-12 sm:py-16 lg:py-20 xl:py-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${sectionBg})` }}
    >
      <div className="container mx-auto max-w-5xl xl:max-w-6xl flex flex-col items-center text-center">
        <h2 className="text-slate-800 text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-medium mb-8 sm:mb-10 lg:mb-12 xl:mb-20 leading-snug">
          Métodos de pago habilitados por Wompi
        </h2>

        <img
          src={logosImage}
          alt="Métodos de pago: Visa, Mastercard, PSE, Bancolombia y Nequi"
          className="w-full max-w-3xl xl:max-w-2xl h-auto mb-8 sm:mb-10 lg:mb-12 xl:mb-20"
        />

        <img
          src={bannerImage}
          alt="Comercio electrónico integrado"
          className="w-full max-w-4xl xl:max-w-5xl h-auto mb-10 sm:mb-12 lg:mb-14 xl:mb-20"
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

export default ComercioElectronicoMetodosPago
