import { useAppointmentFlow } from "../../../hooks/useAppoimentFlow";

import { SedeList } from "./sede-list";
import { ProfessionalList } from "./professional-list";
import { DaysList } from "./days-list";
import { HoursList } from "./hour-list";
import { Error } from "./error";

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

export default Modal;
