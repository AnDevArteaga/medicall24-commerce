import React from 'react'
import imgBexa from '../../../assets/img/bexaimg.webp'
import Radiacion from '../../../assets/img/rad.png'
import File from '../../../assets/img/file.png'
import Dolor from '../../../assets/img/dolor.png'
import { ChevronRight } from 'lucide-react'
import ButtonSecondary from '../../ui/button-secondary'

const ServiciosBexa: React.FC = () => {
  const FEATURES = [
    { nombre: 'Sin dolor', imagen: Dolor },
    { nombre: 'Sin radiación', imagen: Radiacion },
    { nombre: 'Resultado inmediato', imagen: File },
  ]
  return (
    <section
      id="especialidades"
      className="flex flex-col lg:flex-row xl:flex-row items-center justify-center gap-12 lg:gap-16 xl:gap-16 px-8 py-16 bg-white"
    >
      {/* Columna izquierda */}
      <div className="flex flex-col max-w-2xl w-full">
        <div className="w-full h-auto">
          <img
            src={imgBexa}
            alt="Médico en videollamada"
            className="w-full h-auto object-cover rounded-4xl"
          />
        </div>
      </div>

      {/* Columna derecha */}
      <div className="flex flex-col max-w-xl w-full">
        <h2 className="text-4xl sm:text-5xl lg:text-5xl xl:text-5xl font-light text-gray-800 mb-4 leading-tight">
          Hazte el examen de mama con Bexa
        </h2>
        <p className="text-gray-800 text-lg sm:text-xl lg:text-lg xl:text-lg mb-8">
          El examen Bexa es el método de tamizaje más preciso que existe para
          detectar masas sólidas en las mamas. Es un suave rastreo en los senos
          realizado por un médico experto, quien interpreta las imágenes para
          identificar las lesiones.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.nombre}
              className="flex items-center gap-2 text-gray-800 px-2 py-2 font-medium text-left flex-col"
            >
              <img
                src={feature.imagen}
                alt={feature.nombre}
                className="w-auto h-24"
              />
              {feature.nombre}
            </div>
          ))}
        </div>
        <div className="ml-4 mt-8 mb-8">
          <div className="flex items-center gap-2 text-gray-800 px-2 py-2 font-medium text-left flex-row">
            {' '}
            <ChevronRight className="w-8 h-8 text-primary" />{' '}
            <span>Apto para mujeres de cualquier edad</span>
          </div>
          <div className="flex items-center gap-2 text-gray-800 px-2 py-2 font-medium text-left flex-row">
            {' '}
            <ChevronRight className="w-8 h-8 text-primary" />{' '}
            <span>Indicado en embarazadas y lactantes</span>
          </div>
        </div>

        <ButtonSecondary
          link="/Examen-bexa"
          text="Quiero hacerme el examen"
          color="bg-primary"
        />
      </div>
    </section>
  )
}

export default ServiciosBexa
