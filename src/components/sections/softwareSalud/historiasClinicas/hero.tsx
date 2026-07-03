import React from 'react'
import { Check } from 'lucide-react'

import heroImage from '../../../../assets/img/hstorias.webp'

const features = [
  'Registro versatil de la HC desde ambiente web y desde la app móvil, para atenciones presenciales y por telemedicina.',
  'Acceso seguro a la información desde cualquier lugar, mejorando la atención y reduciendo errores.',
  'Interoperabilidad de la HCE en estándar HL7 FHIR para compartir datos de manera segura y estandarizada.',
  'Optimiza el tiempo de consulta con funciones de IA, manteniendo la trazabilidad de los datos y garantizando la gestión administrativa.',
  'Recopila datos demográficos, antecedentes médicos, alergias, pruebas diagnósticas y notas clínicas.',
  'Diagnósticos CIE-10/CIE-10-ES (2025-2026).',
  'Formatos personaliables de acuerdo a la especialidad',
  'Diligenciamiento de la HC con ayuda de la IA',
]

const HistoriasClinicasHero: React.FC = () => {
  return (
    <section className="w-full bg-[#D1D8DC] px-4 sm:px-6 py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="container mx-auto max-w-6xl xl:max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
          <div className="text-center lg:text-left xl:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.7rem] font-bold text-slate-800 leading-tight mb-3 sm:mb-4">
              Historias Clínicas Electrónicas
            </h1>

            <p className="text-slate-700 text-base sm:text-lg lg:text-xl xl:text-2xl font-medium mb-5 sm:mb-6">
              Cumple con las resoluciones 866 y 1888 de 2025
            </p>

            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8">
              Es un registro digital, seguro y cronológico de la información de
              salud de los pacientes, donde se registran datos que hacen parte
              de la consulta realizada, como el motivo de consulta,
              antecedentes, diagnósticos, conducta entre otros. Este formato
              electrónico permite compartir esta información entre diferentes
              proveedores de salud en tiempo real, cumpliendo con los mecanismos
              de seguridad de los datos del paciente.
            </p>

            <ul className="flex flex-col gap-3 sm:gap-4 items-start max-w-xl mx-auto lg:mx-0">
              {features.map((item) => (
                <li key={item} className="flex items-start gap-3 text-left">
                  <Check
                    className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0 mt-0.5"
                    strokeWidth={2.5}
                  />
                  <span className="text-slate-700 text-sm sm:text-base lg:text-lg leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center lg:justify-end xl:justify-end">
            <img
              src={heroImage}
              alt="Historias clínicas electrónicas Medicall24"
              className="w-full max-w-md lg:max-w-lg xl:max-w-2xl h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HistoriasClinicasHero
