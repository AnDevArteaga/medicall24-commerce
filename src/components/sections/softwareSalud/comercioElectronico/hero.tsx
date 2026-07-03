import React from 'react'
import { Check } from 'lucide-react'

import heroImage from '../../../../assets/img/comer.webp'
import pesoIcon from '../../../../assets/img/comercio.png'

const steps = [
  'Crea y configura una cuenta en MEDICALL24 como Prestador de Salud',
  'Crea un perfil médico para que tus pacientes puedan identificarte con facilidad',
  'Crea los servicios que vas a prestar, incluyendo paquetes o suscripciones de pago mensual',
  'Asocia tus llaves de autenticación de Wompi a tu cuenta de MEDICALL24',
  'No manejamos tu dinero; el paciente paga y lo recibes en tu cuenta.',
]

const ComercioElectronicoHero: React.FC = () => {
  return (
    <section className="w-full bg-[#D1D8DC] px-4 sm:px-6 py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="container mx-auto max-w-6xl xl:max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
          <div className="text-center lg:text-left xl:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.5rem] font-bold text-slate-800 leading-tight mb-3 sm:mb-4">
              Comercio electrónico integrado
            </h1>

            <p className="text-slate-600 text-base sm:text-lg lg:text-xl mb-5 sm:mb-6">
              Monetiza tus servicios en línea desde cualquier lugar...{' '}
            </p>

            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8">
              Para realizar transacciones por todos los métodos de pago
              habilitados por Wompi Bancolombia, las cuales son realizadas por
              los pacientes y llegan directamente a la cuenta de banco del
              Prestador de Salud.
            </p>

            <ul className="flex flex-col gap-3 sm:gap-4 items-start max-w-xl mx-auto lg:mx-0 mb-8 sm:mb-10">
              {steps.map((item) => (
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

            <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-5">
              <div>
                <img
                  src={pesoIcon}
                  alt=""
                  aria-hidden
                  className="w-auto h-auto object-contain"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img
              src={heroImage}
              alt="Comercio electrónico integrado"
              className="w-full max-w-md lg:max-w-lg xl:max-w-2xl h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComercioElectronicoHero
