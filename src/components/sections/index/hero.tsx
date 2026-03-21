import React from 'react'
import { Video } from 'lucide-react'
import heroImage from '../../../assets/img/hero.image.png'
import playStore from '../../../assets/img/Google_Play-Logo.wine.png'
import appStore from '../../../assets/img/apple_appstore_logo_icon_168587.png'
import bgHero from '../../../assets/img/bgHero.png'

const Hero: React.FC = () => {
  return (
    <section
      className="flex flex-col min-h-screen lg:flex-row xl:flex-row items-center justify-center gap-12 lg:gap-16 xl:gap-16 px-12 py-16 bg-gray-100"
      style={{
        backgroundImage: `url(${bgHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Columna izquierda */}
      <div className="flex flex-col max-w-xl items-center justify-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-6xl font-bold text-neutral text-center leading-tight mb-4">
          Consultas médicas virtuales
        </h1>
        <p className="text-xl sm:text-2xl font-medium text-primary text-center lg:text-2xl xl:text-3xl mb-8">
          ¡La manera más fácil de encontrar atención médica!
        </p>

        <a
          href="#especialidades"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('especialidades')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
          className="flex items-center gap-3 bg-secondary rounded-2xl px-6 py-2 shadow-lg hover:opacity-95 w-full max-w-md"
        >
          <span className="flex-shrink-0 w-20 h-20 px-2 rounded-xl overflow-hidden bg-green-500 flex items-center justify-center">
            {' '}
            <Video className="w-20 h-20 text-white" />
          </span>
          <div className="flex flex-col text-center">
            <span className="text-white text-lg sm:text-base">
              Ingresa aquí para agendar una consulta médica
            </span>
            <span className="text-white/95 text-sm font-medium">
              ¡Recibe atención sin costo!
            </span>
          </div>
        </a>
      </div>

      {/* Columna derecha */}
      <div className="flex flex-col max-w-2xl">
        <div className="rounded-4xl overflow-hidden border-4 border-primary p-1">
          <img
            src={heroImage}
            alt="Consulta médica virtual"
            className="w-full h-auto object-cover rounded-4xl"
          />
        </div>

        <p className="text-neutral text-center text-lg mt-6">
          Descarga la <strong>App MEDICALL24</strong>
        </p>
        <p className="text-gray-600 text-center text-lg mb-4">Disponible en:</p>

        <div className="flex items-center justify-center gap-4">
          <div className="bg-white p-2 rounded-full shadow-xl w-56 flex items-center justify-center">
            <a
              href="https://apps.apple.com/co/app/medicall24/id6661032000"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={appStore}
                alt="App Store"
                className="h-10 md:h-12 w-auto scale-90"
              />
            </a>
          </div>
          <div className="bg-white p-2 rounded-full shadow-xl w-56">
            <a
              href="https://play.google.com/store/apps/details?id=com.devdvs.medicall.medicall24"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={playStore}
                alt="Play Store"
                className="h-10 md:h-12 w-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
