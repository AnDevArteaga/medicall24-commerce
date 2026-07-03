import React from 'react'
import { Check, ChevronDown } from 'lucide-react'

// Reemplazar con tu asset:
import loginBgImage from '../../../assets/img/asesoria-2.webp'
const LOGIN_BG_IMAGE = loginBgImage

const benefits = [
  'Agenda una asesoría legal y normativa',
  'Recibe formación a través de capacitaciones en salud',
  'Completa talleres virtuales certificados',
]

const AsesoriaLegalLogin: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <section className="w-full overflow-x-hidden py-12 sm:py-16 lg:py-20 xl:py-24 pl-3 pr-4 sm:pl-4 sm:pr-6 lg:px-6 xl:pl-8 xl:pr-16 bg-gradient-to-br from-cyan-950 via-slate-900 to-cyan-900">
      <div className="w-full max-w-full xl:max-w-[1020px] xl:ml-52 xl:mr-auto">
        {/* Apilado: móvil, tablet y desktop pequeño (< 1280px) */}
        <div className="flex flex-col gap-8 xl:hidden items-center">
          <div className="w-1/2 min-w-[280px] max-w-md mx-auto">
            <LoginCard onSubmit={handleSubmit} />
          </div>
          <ContentCard className="w-full" />
        </div>

        {/* Superpuesto: solo pantallas xl en adelante */}
        <div className="hidden xl:block relative h-[560px] w-full">
          <ContentCard className="absolute top-0 right-0 bottom-0 left-[180px]" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-[380px]">
            <LoginCard onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </section>
  )
}

const LoginCard: React.FC<{ onSubmit: (e: React.FormEvent) => void }> = ({
  onSubmit,
}) => (
  <div className="bg-white rounded-[2rem] xl:rounded-[2.5rem] shadow-2xl p-5 sm:p-6 xl:p-16">
    <h2 className="text-xl sm:text-base font-bold text-slate-800 mb-1.5">
      Plataforma interactiva
    </h2>
    <p className="text-xs sm:text-sm text-slate-500 mb-5 sm:mb-6">
      Si ya tienes una cuenta autentica tu usuario.
    </p>

    <form onSubmit={onSubmit} className="flex flex-col gap-2.5 sm:gap-3">
      <div className="relative">
        <select
          defaultValue=""
          className="w-full appearance-none border border-slate-200 rounded-lg px-3 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
          aria-label="Tipo de identificación"
        >
          <option value="" disabled>
            Tipo de identificación
          </option>
          <option value="cc">Cédula de ciudadanía</option>
          <option value="ce">Cédula de extranjería</option>
          <option value="pasaporte">Pasaporte</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>

      <input
        type="text"
        placeholder="Ingresa tu identificación"
        className="w-full border border-slate-200 rounded-lg px-3 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
      />

      <input
        type="password"
        placeholder="Ingresa tu contraseña"
        className="w-full border border-slate-200 rounded-lg px-3 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
      />

      <button
        type="submit"
        className="w-full bg-slate-900 text-white text-xs sm:text-sm font-semibold py-2 sm:py-2.5 rounded-full hover:bg-slate-800 transition-colors shadow-md cursor-pointer mt-0.5"
      >
        Autenticar
      </button>
    </form>

    <button
      type="button"
      className="w-full text-center text-xs text-slate-500 hover:text-slate-700 mt-3 cursor-pointer"
    >
      Olvidé mi contraseña
    </button>

    <button
      type="button"
      className="w-full text-center text-sm sm:text-base font-bold text-slate-800 hover:text-primary mt-5 sm:mt-6 cursor-pointer"
    >
      Crear una cuenta
    </button>
  </div>
)

const ContentCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`relative rounded-[2rem] xl:rounded-[2.5rem] overflow-hidden min-h-[400px] sm:min-h-[480px] xl:min-h-[560px] ${className}`}
  >
    {LOGIN_BG_IMAGE ? (
      <img
        src={LOGIN_BG_IMAGE}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-right-top"
      />
    ) : (
      <div className="absolute inset-0 bg-slate-700 flex items-center justify-end pr-10">
        <span className="text-white/40 text-base px-6 text-center">
          Imagen de fondo login
        </span>
      </div>
    )}

    <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-slate-950/95 via-slate-900/70 to-transparent" />

    <div className="absolute bottom-0 left-0 xl:left-48 z-10 p-6 sm:p-8 xl:p-10 pb-8 xl:pb-10 text-white max-w-md sm:max-w-lg xl:max-w-xl">
      <h3 className="text-lg xl:text-3xl leading-snug mb-6 xl:mb-8">
        Acceso exclusivo al mejor contenido legal y normativo
      </h3>

      <ul className="flex flex-col gap-4 xl:gap-5">
        {benefits.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Check
              className="w-5 h-5 xl:w-6 xl:h-6 shrink-0 mt-0.5"
              strokeWidth={2.5}
            />
            <span
              className="text-base xl:text-lg leading-snug "
              style={{ fontSize: '1rem' }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

export default AsesoriaLegalLogin
