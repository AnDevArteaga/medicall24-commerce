import React from 'react'

import heroDoctores from '../../../../assets/img/agenda2.webp'
import appFlujo from '../../../../assets/img/agenda1.webp'

const AgendaCitasHero: React.FC = () => {
  return (
    <section className="w-full bg-[#D1D8DC] px-4 sm:px-6 py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="container mx-auto max-w-6xl xl:max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
          <div className="text-center lg:text-left xl:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.5rem] font-bold text-slate-800 leading-tight mb-5 sm:mb-6">
              Agenda de citas desde la App
            </h1>

            <div className="flex flex-col gap-4 sm:gap-5 text-slate-600 text-sm sm:text-base lg:text-lg xl:text-lg leading-relaxed mb-8 sm:mb-10">
              <p>
                Calendario interactivo que muestra la disponibilidad del
                profesional, permitiendo al paciente seleccionar la fecha y la
                hora de su preferencia para solicitar la cita.
              </p>
              <p>
                Las solicitudes enviadas por los pacientes determinan si la cita
                será virtual o presencial, según la modalidad de atención
                configurada.
              </p>
            </div>

            <img
              src={appFlujo}
              alt="Flujo de agenda de citas en la App"
              className="w-full h-auto"
            />
          </div>

          <div className="flex justify-center lg:justify-end">
            <img
              src={heroDoctores}
              alt="Profesionales de la salud"
              className="w-full max-w-md lg:max-w-lg xl:max-w-2xl h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AgendaCitasHero
