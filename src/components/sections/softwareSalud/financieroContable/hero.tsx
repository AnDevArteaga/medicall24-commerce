import React from 'react'

import heroImage from '../../../../assets/img/financiero.webp'

const rowOneFeatures = [
  'Causación de gastos',
  'Cuentas por pagar',
  'Comprobante egreso',
  'Cuentas por cobrar',
  'Informes contables',
]

const rowTwoFeatures = [
  'Notas débito',
  'Notas crédito',
  'Información exógena',
  'Conciliación bancaria',
]

const FeatureCard: React.FC<{ label: string; className?: string }> = ({
  label,
  className = '',
}) => (
  <div
    className={`bg-gray-600 text-white border-2 border-white text-[10px] sm:text-xs lg:text-sm xl:text-base text-center px-2 sm:px-3 py-6 sm:py-3 rounded-xl sm:rounded-2xl shadow-md flex items-center justify-center leading-snug min-w-0 ${className}`}
  >
    {label}
  </div>
)

const FinancieroContableHero: React.FC = () => {
  return (
    <section className="w-full bg-[#D1D8DC] px-4 sm:px-6 py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="container mx-auto max-w-6xl xl:max-w-7xl">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[3rem] font-bold text-slate-800 leading-tight mb-3 sm:mb-4">
          Módulo financiero y contable
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
          <div className="text-center lg:text-left xl:text-left">
            <p className="text-slate-600 text-base sm:text-lg lg:text-xl mb-5 sm:mb-6">
              Centraliza y automatiza la gestión financiera.
            </p>

            <p
              className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 sm:mb-10"
              style={{ fontSize: '1rem' }}
            >
              Es vital porque consolida el registro de todas las transacciones,
              garantizando el cumplimiento normativo. Además, proporciona
              información en tiempo real para optimizar costos, controlar
              presupuestos y asegurar la sostenibilidad a largo plazo.
            </p>

            <div className="flex flex-col gap-4 sm:gap-5">
              <div className="flex flex-nowrap gap-2 sm:gap-3 lg:gap-2 xl:gap-3">
                {rowOneFeatures.map((label) => (
                  <FeatureCard key={label} label={label} className="flex-1" />
                ))}
              </div>

              <div className="flex flex-nowrap gap-2 sm:gap-3 lg:gap-2 xl:gap-3">
                {rowTwoFeatures.map((label) => (
                  <FeatureCard key={label} label={label} className="flex-1" />
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end xl:justify-end">
            <img
              src={heroImage}
              alt="Módulo financiero y contable"
              className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto rounded-[1.75rem] sm:rounded-[2rem] lg:rounded-[2.25rem] shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinancieroContableHero
