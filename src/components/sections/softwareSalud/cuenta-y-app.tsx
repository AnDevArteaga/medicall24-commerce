import React from 'react'
import { Link } from 'react-router-dom'

import loginImage from '../../../assets/img/login.webp'
import appMovilImage from '../../../assets/img/mano.webp'
import appStore from '../../../assets/img/apple_appstore_logo_icon_168587.png'
import playStore from '../../../assets/img/Google_Play-Logo.wine.png'

const cuentaFeatures = [
  'Con infraestructura tecnológica escalable en la nube.',
  'Sin restricciones de acceso a tu información.',
  'Incluye espacio de almacenamiento de archivos (100 GB por año).',
]

const appParagraphs = [
  'Utiliza la App MEDICALL24 para brindar consultas por telemedicina; los pacientes podrán recibir la atención desde cualquier lugar del mundo a través de su dispositivo móvil.',
  'El registro de las historias clínicas de las atenciones presenciales o por telemedicina, lo podrás hacer utilizando la App o a través del portal web.',
  'Las agenda de citas presenciales o por telemedicina, se pueden manejar desde la App recibiendo notificaciones en tiempo real, sobre citas confirmadas, canceladas, y de los pagos realizados por tus pacientes.',
]

const MagentaBullet: React.FC = () => (
  <span className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 shrink-0 rounded-full bg-primary mt-0.5">
    <span className="w-1.5 h-1.5 rounded-full bg-white" />
  </span>
)

const CuentaYApp: React.FC = () => {
  return (
    <section className="w-full bg-gradient-to-b from-white via-slate-100/80 to-slate-300/70 px-4 sm:px-6 py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="container mx-auto max-w-6xl xl:max-w-7xl">
        <h2 className="text-center text-slate-700 text-lg sm:text-xl lg:text-2xl xl:text-4xl leading-snug max-w-7xl mx-auto mb-12 sm:mb-16 lg:mb-20 xl:mb-24 px-2">
          Un software que cumple los requerimientos de la norma vigente en
          Colombia y se adapta a tus necesidades
        </h2>

        {/* Parte 1: login (imagen) + crear cuenta */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-12 items-center mb-16 sm:mb-20 lg:mb-24 xl:mb-28">
          <div className="flex justify-center lg:justify-start">
            <img
              src={loginImage}
              alt="Portal web para prestadores de salud"
              className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto"
            />
          </div>

          <div className="text-center lg:text-left xl:text-left">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[3rem] text-slate-800 mb-4 sm:mb-5 leading-tight">
              Crea tu cuenta en minutos
            </h3>

            <p className="text-slate-600 text-sm sm:text-base lg:text-lg xl:text-lg mb-6 sm:mb-8 leading-relaxed">
              Al configurar tu cuenta podrás abrir tu agenda y comenzar a
              atender pacientes de inmediato.
            </p>

            <ul className="flex flex-col items-start gap-3 sm:gap-4 mb-8 sm:mb-10">
              {cuentaFeatures.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-left justify-center lg:justify-start"
                >
                  <MagentaBullet />
                  <span className="text-slate-700 text-sm sm:text-base lg:text-lg leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex justify-center lg:justify-start xl:justify-start">
              <Link
                to="/iniciar-sesion"
                className="bg-primary text-white text-base sm:text-lg lg:text-xl xl:text-2xl font-medium px-10 sm:px-12 lg:px-14 py-2.5 sm:py-3 rounded-full hover:bg-primarydark transition-colors shadow-[0_0_20px_rgba(190,24,93,0.35)]"
              >
                Crear una cuenta
              </Link>
            </div>
          </div>
        </div>

        {/* Parte 2: app móvil + mano (imagen) */}
        <div className="relative lg:min-h-[520px] xl:min-h-[580px] overflow-hidden">
          {/* Mano: arriba en móvil, anclada abajo-derecha en desktop */}
          <div className="flex items-end justify-center lg:absolute lg:bottom-0 lg:right-0 xl:absolute xl:bottom-0 xl:right-0 xl:-right-2 lg:w-[55%] xl:w-[52%] lg:justify-end xl:justify-end mb-2 sm:mb-4 lg:mb-0 pointer-events-none">
            <img
              src={appMovilImage}
              alt="App MEDICALL24 en dispositivo móvil"
              className="h-[280px] sm:h-[360px] md:h-[420px] lg:h-[500px] xl:h-[580px] w-auto max-w-none object-contain object-bottom lg:translate-x-6 xl:translate-x-10 select-none"
            />
          </div>

          <div className="relative z-10 lg:w-1/2 lg:max-w-xl xl:max-w-3xl flex flex-col justify-center py-6 sm:py-8 lg:py-10 xl:py-12 text-center lg:text-left xl:text-left">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[3rem] text-slate-800 mb-5 sm:mb-6 leading-tight">
              App para dispositivo móvil
            </h3>

            <div className="flex flex-col gap-4 sm:gap-5 mb-8 sm:mb-10">
              {appParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed"
                  style={{ fontSize: '1rem' }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex flex-col items-center lg:items-start">
              <p className="text-slate-600 text-sm sm:text-base mb-4 w-full text-center lg:text-center xl:text-center">
                Disponible en:
              </p>

              <div className="flex items-center justify-center lg:justify-start xl:justify-start gap-4 sm:gap-5">
                <a
                  href="https://apps.apple.com/co/app/medicall24/id6661032000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white px-4 sm:px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-shadow pointer-events-auto"
                >
                  <img
                    src={appStore}
                    alt="App Store"
                    className="h-8 sm:h-9 lg:h-10 w-auto"
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.devdvs.medicall.medicall24"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white px-4 sm:px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-shadow pointer-events-auto"
                >
                  <img
                    src={playStore}
                    alt="Google Play"
                    className="h-8 sm:h-9 lg:h-10 w-auto"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CuentaYApp
