import React from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'

import sectionBg from '../../../../assets/img/fondobg-soft.webp'
import logoDian from '../../../../assets/img/dian.png'
import logoMinsalud from '../../../../assets/img/minsalud.png'
import logoRecibido from '../../../../assets/img/recibido.png'

const procedimientos = [
  {
    logo: logoDian,
    alt: 'DIAN',
    description:
      'Generación y envío automático de la factura electrónica para su validación',
  },
  {
    logo: logoMinsalud,
    alt: 'MinSalud',
    description: 'Generación y envío de archivos RIPS para validación',
  },
  {
    logo: logoRecibido,
    alt: 'Recibido',
    description:
      'Radicación electrónica de la factura ante la Entidad Responsable del pago',
  },
]

const FacturaElectronicaProcedimientos: React.FC = () => {
  return (
    <section
      className="w-full px-4 sm:px-6 py-12 sm:py-16 lg:py-20 xl:py-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${sectionBg})` }}
    >
      <div className="container mx-auto max-w-6xl xl:max-w-7xl">
        <h2 className="text-center text-slate-800 text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-medium mb-10 sm:mb-12 lg:mb-14 xl:mb-20 leading-snug max-w-4xl mx-auto">
          Procedimientos clave de la facturación electrónica
        </h2>

        <div className="max-w-5xl xl:max-w-6xl mx-auto mb-8 sm:mb-10 lg:mb-4 xl:mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 md:gap-6 lg:gap-10 xl:gap-6">
            {procedimientos.map((item) => (
              <div
                key={item.alt}
                className="flex flex-col items-center text-center"
              >
                <div className="bg-white rounded-2xl md:rounded-3xl lg:rounded-3xl xl:rounded-3xl shadow-lg w-full max-w-[200px] md:max-w-none mx-auto flex flex-col items-center justify-center p-3 md:p-4 lg:p-4 xl:p-4 gap-2 md:gap-3 mb-4 md:mb-5">
                  <img
                    src={item.logo}
                    alt={item.alt}
                    className="w-auto h-10 md:h-12 lg:h-14 xl:h-16 object-contain"
                  />
                  <p className="text-slate-700 text-xs sm:text-sm lg:text-base leading-snug max-w-[220px]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-5xl mx-auto mb-10 sm:mb-12 lg:mb-14 xl:mb-14 px-4 py-2">
          <div
            className="absolute top-1/2 left-[16.67%] right-[16.67%] h-2 md:h-2.5 lg:h-3 xl:h-3 bg-teal-400 -translate-y-1/2 hidden md:block lg:block xl:block"
            aria-hidden
          />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-0 lg:gap-0 xl:gap-0">
            {procedimientos.map((item) => (
              <div key={`step-${item.alt}`} className="flex justify-center">
                <div className="w-14 h-14 md:w-16 md:h-16 lg:w-[4.5rem] lg:h-[4.5rem] xl:w-20 xl:h-20 rounded-full bg-teal-500 flex items-center justify-center shadow-md relative z-10">
                  <Check
                    className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-white"
                    strokeWidth={3}
                  />
                </div>
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

export default FacturaElectronicaProcedimientos
