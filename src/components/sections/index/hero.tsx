import React from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../../../assets/img/hero.image.webp'
import playStore from '../../../assets/img/Google_Play-Logo.wine.png'
import appStore from '../../../assets/img/apple_appstore_logo_icon_168587.png'
import bgHero from '../../../assets/img/bgHero.webp'
import Video from '../../../assets/img/video.png'

const Hero: React.FC = () => {
  return (
    <section
      className="bg-white"
      style={{
        backgroundImage: `url(${bgHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center left',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container mx-auto flex flex-col lg:flex-row xl:flex-row items-center justify-between gap-4 lg:gap-16 px-6 sm:px-10 py-12 lg:py-20">
        {/* Columna izquierda */}
        <div className="flex flex-col w-full lg:w-1/2 xl:w-1/2 items-center lg:items-start xl:items-start text-center lg:text-left xl:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-gray-800 mb-8">
            Consultas por Telemedicina
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-primary mb-12">
            ¡La manera más fácil de encontrar atención médica!
          </p>

          <Link
            to="/prueba-gratuita-especialidades"
            className="flex items-center sm:flex-row xl:flex-row lg:flex-row flex-col gap-2 bg-secondary rounded-4xl px-2 py-3 shadow-lg hover:opacity-95 w-full max-w-2xl transition-opacity mb-12"
          >
            <div className="shrink-0">
              <img
                src={Video}
                alt="Video"
                className="w-auto h-18 sm:w-auto xl:h-32"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-white text-xl sm:text-xl xl:text-3xl text-center sm:text-base leading-snug">
                Ingresa aquí para iniciar tu prueba gratuita
              </span>
              <span className="text-white/90 text-lg sm:text-lg xl:text-xl text-center font-light sm:text-sm font-medium mt-0.5">
                ¡Recibe una consulta médica sin costo!
              </span>
            </div>
          </Link>
          <div className="flex flex-col items-center w-full">
            <Link
              to="/buscar-médico"
              className="mt-4 bg-primary text-white text-2xl sm:text-base px-8 py-3 rounded-full hover:bg-primarydark transition-colors w-full max-w-lg text-center"
            >
              Ver todos los médicos disponibles
            </Link>

            <p className="text-gray-500 text-md sm:text-base mt-8 max-w-xl text-center leading-relaxed">
              Encuentra médicos virtuales y especialistas sin importar la zona
              donde te encuentres. Instala la App MEDICALL24 y solicita tu cita.
            </p>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col w-full lg:w-1/2 xl:w-1/2 items-center">
          <div className="rounded-3xl overflow-hidden shadow-xl w-full max-w-md lg:max-w-xl xl:max-w-2xl">
            <img
              src={heroImage}
              alt="Consulta médica virtual"
              className="w-full h-auto object-cover"
            />
          </div>

          <p className="text-gray-600 text-base mt-5 mb-3">Disponible en:</p>

          <div className="flex items-center justify-center gap-4">
            <div className="bg-white px-4 py-2 rounded-full shadow-md flex items-center justify-center">
              <a
                href="https://apps.apple.com/co/app/medicall24/id6661032000"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={appStore}
                  alt="App Store"
                  className="h-8 sm:h-10 w-auto"
                />
              </a>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-md flex items-center justify-center">
              <a
                href="https://play.google.com/store/apps/details?id=com.devdvs.medicall.medicall24"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={playStore}
                  alt="Play Store"
                  className="h-8 sm:h-10 w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
