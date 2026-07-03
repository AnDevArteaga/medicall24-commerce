import React from 'react'

import heroBg from '../../../../assets/img/factura-bg.webp'

const cards = [
  {
    title: 'Factura Electrónica',
    subtitle: 'Reporte inmediato a la DIAN',
    description:
      'Emisión de facturas que documentan los servicios de salud prestados, cumpliendo con normativas específicas y garantizando la transparencia y eficiencia.',
  },
  {
    title: 'Generación de RIPS',
    subtitle: 'En formato Json',
    description:
      'Generados según la Resolución 2275 de 2023, validando la información de salud junto con la factura electrónica de venta (FEV).',
  },
]

const FacturaElectronicaHero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[520px] sm:min-h-[560px] lg:min-h-[620px] xl:min-h-[680px]">
      <img
        src={heroBg}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 container mx-auto max-w-6xl xl:max-w-7xl px-4 sm:px-6 py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="max-w-3xl xl:max-w-7xl xl:mx-auto mb-10 sm:mb-12 lg:mb-14 xl:mb-32">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] font-bold text-white leading-tight mb-5 sm:mb-6">
            Factura de Venta Electrónica
          </h1>

          <p
            className="text-white text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed"
            style={{ fontSize: '1rem' }}
          >
            Integra los requisitos de la DIAN con los del Ministerio de Salud
            (Resolución 506 de 2021), contemplando los datos del paciente, la
            modalidad de contratación, las autorizaciones (MIPRES), copagos, y
            fechas de atención. Cuenta con la validación mediante el mecanismo
            único del SISPRO para asegurar la trazabilidad, conectando la
            factura con los RIPS, que se generan en formato JSON.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-7xl xl:mx-auto xl:mb-32">
          {cards.map((card) => (
            <article
              key={card.title}
              className="bg-slate-900/50 border border-white rounded-2xl sm:rounded-[1.25rem] px-5 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-8 text-center"
            >
              <h2 className="text-white font-bold text-lg sm:text-xl lg:text-2xl xl:text-3xl mb-4 sm:mb-3">
                {card.title}
              </h2>
              <p className="text-white font-medium text-base sm:text-lg lg:text-xl xl:text-2xl mb-12 sm:mb-5">
                {card.subtitle}
              </p>
              <p className="text-white/95 text-xs sm:text-sm lg:text-base xl:text-base leading-relaxed">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FacturaElectronicaHero
