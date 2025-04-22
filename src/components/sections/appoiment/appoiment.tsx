import {
  AlertCircle,
  ArrowLeft,
  ChevronRight,
  Clock,
  Loader2,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { useAppointmentFlow } from "../../../hooks/useAppoimentFlow";
import {
  DayAvailable,
  HourAvailable,
  Institution,
  Professional,
  Sede,
} from "../../../interfaces/appoiment.interface";

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const {
    sedes,
    professionals,
    days,
    hours,
    view,
    loading,
    error,
    institutions,
    selectSede,
    selectProfessional,
    selectDay,
    goBack,
    handleClose,
  } = useAppointmentFlow(onClose);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-3xl relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 transition cursor-pointer"
        >
          ✖
        </button>

        {view === "error" && <Error error={error} />}
        {view === "sedes" && sedes && (
          <SedeList
            data={sedes}
            onSelect={selectSede}
            loading={loading}
            institutions={institutions}
          />
        )}
        {view === "professionals" && (
          <ProfessionalList
            professionals={professionals}
            loading={loading}
            onBack={() => goBack("sedes")}
            onSelect={selectProfessional}
          />
        )}
        {view === "days" && (
          <DaysList
            days={days}
            loading={loading}
            onBack={() => goBack("professionals")}
            onSelect={selectDay}
          />
        )}
        {view === "hours" && (
          <HoursList
            hours={hours}
            loading={loading}
            onBack={() => goBack("days")}
          />
        )}
      </div>
    </div>
  );
};

const Error: React.FC<{ error: string | null }> = ({ error }) => (
  <div className="flex justify-center items-center h-40">
    <AlertCircle className="text-primary w-8 h-8" />
    <p className="ml-3 text-primary text-center text-xl">{error}</p>
  </div>
);


interface SedeListProps {
  data: Sede[];
  onSelect: (sede: Sede) => void;
  loading: boolean;
  institutions: Institution;
}

const SedeList: React.FC<SedeListProps> = ({ data, onSelect, loading, institutions }) => (
  <div className="bg-white w-full mx-auto">
    <div className="px-4 py-2 sm:px-1 bg-gray-200 flex items-center gap-4">
      <div className="flex-shrink-0">
        {institutions.cover ? (
          <img
            src={institutions.cover}
            alt="Prestador"
            className="w-20 h-20 rounded-full object-cover border-2 border-pink-200"
          />
        ) : (
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
            <User className="text-primary w-8 h-8" />
          </div>
        )}
      </div>
      <div className="flex-1 font-semibold text-lg text-gray-800">
        {institutions.nombre_prestador}
      </div>
    </div>

    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-primary border-b pb-2 border-pink-200">
        Selecciona una sede
      </h2>

      {/* Primero mostrar el loading */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin text-primary w-8 h-8" />
        </div>
      ) : data.length > 0 ? (
        <ul className="space-y-3">
          {data.map((sede) => (
            <li
              key={sede.id}
              className="p-4 border border-pink-100 rounded-lg hover:bg-pink-50 cursor-pointer flex items-center justify-between"
              onClick={() => onSelect(sede)}
            >
              <div className="flex-1">
                <p className="font-semibold text-lg text-gray-800">{sede.name}</p>
                <p className="text-sm text-gray-600 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-primary" />
                  {sede.address}, {sede.municipality?.nombre} {sede.department?.nombre}
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-primary" />
                  {sede.phone}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-pink-400" />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-lg text-gray-500">
          No hay sedes disponibles
        </p>
      )}
    </div>
  </div>
);
interface ProfessionalListProps {
  professionals: Professional[];
  loading: boolean;
  onBack: () => void;
  onSelect: (professional: Professional) => void;
}

const ProfessionalList: React.FC<ProfessionalListProps> = ({ professionals, loading, onBack, onSelect }) => (
  <div className="bg-white p-6">
    <button onClick={onBack} className="flex items-center text-primary mb-6 font-medium cursor-pointer hover:text-primarydark">
      <ArrowLeft className="w-4 h-4 mr-2" /> Volver
    </button>
    <h2 className="text-2xl font-bold mb-6 text-primary border-b pb-2 border-pink-200">Profesionales disponibles</h2>
    {loading ? (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin text-primary w-8 h-8" />
      </div>
    ) : (
      <ul className="space-y-3">
        {professionals.map((prof) => (
          <li
            key={prof.id}
            className="p-4 border border-pink-100 rounded-lg hover:bg-pink-50 cursor-pointer flex gap-4"
            onClick={() => onSelect(prof)}
          >
            <div className="flex-shrink-0">
              {prof.user.avatar ? (
                <img
                  src={prof.user.avatar}
                  alt={`${prof.user.name1} ${prof.user.lastname1}`}
                  className="w-16 h-16 rounded-full object-cover border-2 border-pink-200"
                />
              ) : (
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
              )}
            </div>
            <div className="flex-1 text-gray-800">
              <div className="font-semibold text-lg">
                {[prof.user.name1, prof.user.name2, prof.user.lastname1, prof.user.lastname2]
                  .filter(Boolean)
                  .map((name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
                  .join(" ")}
              </div>
              <div className="mt-1 px-2 py-1 bg-pink-100 text-primary rounded-full text-sm inline-block">
                MEDICINA GENERAL
              </div>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

interface DaysListProps {
  days: DayAvailable[];
  loading: boolean;
  onBack: () => void;
  onSelect: (day: DayAvailable) => void;
}

const DaysList: React.FC<DaysListProps> = ({ days, loading, onBack, onSelect }) => (
  <div className="bg-white p-6 w-full mx-auto">
    <button
      className="flex items-center text-primary mb-6 font-medium hover:text-primarydark cursor-pointer"
      onClick={onBack}
    >
      <ArrowLeft className="w-4 h-4 mr-2" /> Volver
    </button>
    <h2 className="text-2xl font-bold mb-6 text-primary border-b pb-2 border-pink-200">
      Días disponibles
    </h2>
    {loading ? (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin text-primary w-8 h-8" />
      </div>
    ) : (
      <ul className="space-y-3">
        {days.map((day) => (
          <li
            key={day.date}
            className="p-4 border border-pink-100 rounded-lg hover:bg-pink-50 cursor-pointer flex items-center"
            onClick={() => onSelect(day)}
          >
            <div className="flex-1 pr-4 border-r border-pink-200">
              <p className="text-sm text-primary font-medium mb-1">Horario</p>
              <p className="font-semibold text-gray-800">
                {day.time?.length > 0 ? day.time.join(" / ") : "No disponible"}
              </p>
            </div>
            <div className="flex-1 pl-4">
              <p className="font-semibold text-lg text-gray-800">{day.fecha}</p>
              {day.specialty && (
                <div className="mt-1 px-2 py-1 bg-pink-100 text-primary rounded-full text-xs inline-block">
                  {day.specialty}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);


interface HoursListProps {
  hours: HourAvailable[];
  loading: boolean;
  onBack: () => void;
}

export const HoursList: React.FC<HoursListProps> = ({ hours, loading, onBack }) => (
  <div className="bg-white p-6 w-full mx-auto">
    <button
      className="flex items-center text-primary mb-6 font-medium hover:text-primarydark cursor-pointer"
      onClick={onBack}
    >
      <ArrowLeft className="w-4 h-4 mr-2" /> Volver
    </button>
    <h2 className="text-2xl font-bold mb-6 text-primary border-b pb-2 border-pink-200">
      Horas disponibles
    </h2>
    {loading ? (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin text-primary w-8 h-8" />
      </div>
    ) : hours.length > 0 ? (
      <ul className="grid grid-cols-2 gap-3">
        {hours.map((hour, index) => (
          <li
            key={index}
            className="p-3 border border-pink-100 rounded-lg hover:bg-pink-50 cursor-pointer flex items-center justify-center"
          >
            <Clock className="w-4 h-4 mr-2 text-primary" />
            <span className="font-medium">{hour.fecha}</span>
          </li>
        ))}
      </ul>
    ) : (
      <div className="p-4 bg-pink-50 rounded-lg text-center text-gray-700">
        <p className="mb-2 font-medium">No hay horas disponibles</p>
        <p className="text-sm text-gray-600">
          Por favor selecciona otra fecha u otro profesional.
        </p>
      </div>
    )}
  </div>
);


export default Modal;
