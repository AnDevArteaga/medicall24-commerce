import React from 'react'

import metodoImg1 from '../../../../assets/img/medicion1.webp'
import metodoImg2 from '../../../../assets/img/medicion2.webp'
import metodoImg3 from '../../../../assets/img/medicion3.webp'

interface MetodoCard {
  image: string
  title: string
  description: string
}

const metodos: MetodoCard[] = [
  {
    image: metodoImg1,
    title: 'La fotopletismografía (PPG) con IA',
    description:
      'Es un método no invasivo que utiliza cámaras convencionales para detectar cambios sutiles de color en la piel facial, permitiendo la medición sin contacto de signos vitales. A través de inteligencia artificial, analiza la luz reflejada para monitorear ritmo cardíaco, presión arterial y estrés en tiempo real sin sensores físicos.',
  },
  {
    image: metodoImg2,
    title: 'Dispositivos wearables',
    description:
      'Son equipos electrónicos compactos que se llevan puestos en el cuerpo, integrando sensores y conectividad inalámbrica para monitorear datos en tiempo real (salud, actividad física, ubicación). Funcionan frecuentemente sincronizados con smartphones, destacando por su comodidad y uso cotidiano en relojes inteligentes, pulseras y anillos.',
  },
  {
    image: metodoImg3,
    title: 'Equipos biomédicos',
    description:
      'Son dispositivos de monitoreo remoto de pacientes con conectividad independiente, diseñados para simplificar la captura de datos de signos vitales. Incluyendo tensiómetros, glucómetros, básculas, pulsioxímetros y pastilleros inteligentes que se conectan automáticamente al sistema.',
  },
]

const EcgWave: React.FC = () => (
  <svg
    viewBox="0 0 1200 40"
    preserveAspectRatio="none"
    className="absolute bottom-0 left-0 w-full h-8 sm:h-10 lg:h-12 text-slate-500/40 pointer-events-none"
    aria-hidden
  >
    <path
      d="M0 20 H80 L100 20 L115 5 L130 35 L145 20 L160 20 L175 8 L190 32 L205 20 H280 L300 20 L315 5 L330 35 L345 20 H420 L440 20 L455 8 L470 32 L485 20 H560 L580 20 L595 5 L610 35 L625 20 H700 L720 20 L735 8 L750 32 L765 20 H840 L860 20 L875 5 L890 35 L905 20 H980 L1000 20 L1015 8 L1030 32 L1045 20 H1200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
)

const MetodoCardItem: React.FC<{ card: MetodoCard }> = ({ card }) => (
  <article className="bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden flex flex-col h-full">
    <img
      src={card.image}
      alt={card.title}
      className="w-full h-auto block object-cover"
    />
    <div className="flex flex-col gap-3 sm:gap-4 px-4 sm:px-5 lg:px-6 py-5 sm:py-6 text-center flex-1">
      <h3 className="text-slate-800 font-bold text-sm sm:text-base lg:text-lg xl:text-xl leading-snug">
        {card.title}
      </h3>
      <p
        className="text-slate-600 text-xs sm:text-sm lg:text-base xl:text-base leading-relaxed"
        style={{ fontSize: '0.9rem' }}
      >
        {card.description}
      </p>
    </div>
  </article>
)

const SignosVitalesMetodosHero: React.FC = () => {
  return (
    <section className="relative w-full bg-[#D1D8DC] px-4 sm:px-6 pt-12 sm:pt-16 lg:pt-20 xl:pt-24 pb-14 sm:pb-16 lg:pb-20 xl:pb-24 overflow-hidden">
      <div className="container mx-auto max-w-6xl xl:max-w-7xl relative z-10">
        <h1 className="text-center text-slate-800 text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-bold mb-10 sm:mb-12 lg:mb-14 xl:mb-20 leading-snug max-w-4xl mx-auto">
          Métodos para medir los signos vitales de los usuarios
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
          {metodos.map((card) => (
            <MetodoCardItem key={card.title} card={card} />
          ))}
        </div>
      </div>

      <EcgWave />
    </section>
  )
}

export default SignosVitalesMetodosHero
