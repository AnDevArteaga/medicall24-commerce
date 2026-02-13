import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Globe } from 'lucide-react'
import medico from '../../../assets/img/medicovir.png'
import { Appointment } from '../../../contexts/appoiment'

// ID del producto "consulta gratuita" en la pasarela de pagos
const PRODUCTO_CONSULTA_GRATUITA = 12

const ESPECIALIDADES = [
  { nombre: 'Medicina General', id: 140 },
  { nombre: 'Medicina Interna', id: 142 },
  { nombre: 'Psiquiatría', id: 221 },
  { nombre: 'Pediatría', id: 210 },
  { nombre: 'Dermatología', id: 69 },
]

const TelemedicinaConsultas: React.FC = () => {
  const navigate = useNavigate()
  const { setAppointment, setCreateAppointmentData } = Appointment()

  const handleSelectEspecialidad = (id: number) => {
    setAppointment((prev) => ({ ...prev, idSpecialist: id }))
    setCreateAppointmentData((prev) => ({ ...prev, specialtyId: id }))
    navigate(`/pagos?p=${PRODUCTO_CONSULTA_GRATUITA}&isFree=true`)
  }
  return (
    <section className="flex flex-col lg:flex-row xl:flex-row items-center justify-center gap-12 lg:gap-16 xl:gap-16 px-8 py-16 bg-white">
      {/* Columna izquierda */}
      <div className="flex flex-col max-w-xl w-full">
        <div className="rounded-4xl overflow-hidden border-2 border-primary">
          <img
            src={medico}
            alt="Médico en videollamada"
            className="w-full h-auto object-cover rounded-4xl"
          />
        </div>

        <p className="text-neutral text-lg sm:text-xl lg:text-xl xl:text-xl mt-6">
          La prestación del servicio se realiza a través de la red de IPS's que
          hacen parte de nuestra Alianza Comercial a nivel nacional.
        </p>

        <div className="flex items-center gap-3 mt-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <Globe className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-neutral text-sm">
            Servicios habilitados por el Ministerio de Salud en el REPS
          </p>
        </div>
      </div>

      {/* Columna derecha */}
      <div className="flex flex-col max-w-xl w-full">
        <h2 className="text-4xl sm:text-5xl lg:text-5xl xl:text-5xl font-semibold text-primary mb-4">
          Consultas disponibles por Telemedicina
        </h2>
        <p className="text-neutral text-lg sm:text-xl lg:text-xl xl:text-xl mb-8">
          Estas son las consultas que brindan los profesionales de la salud y
          médicos especialistas:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3">
          {ESPECIALIDADES.map((especialidad) => (
            <button
              key={especialidad.id}
              type="button"
              onClick={() => handleSelectEspecialidad(especialidad.id)}
              className="flex items-center gap-2 bg-primary text-white px-2 py-2 rounded-xl font-medium hover:bg-primarydark transition-colors text-left"
            >
              <ChevronRight className="w-5 h-5 flex-shrink-0" />
              {especialidad.nombre}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TelemedicinaConsultas
