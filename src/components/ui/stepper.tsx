import { Info } from "lucide-react";

export const Stepper = ({ currentStep }: { currentStep: number }) => {
    const steps = [
        { id: 0, label: "Regístrate en MEDICALL24" },
        { id: 1, label: "Elige el método de pago" },
        { id: 2, label: "Finaliza la compra" },
    ];

    return (
        <ol className="flex sm:flex-col sm:items-start items-center justify-center sm:space-x-4 sm:w-full sm:space-y-4 flex space-x-8 space-y-0 rtl:space-x-reverse">
            {steps.map((step) => {
                const isCompleted = step.id < currentStep;
                const isActive = step.id === currentStep;

                return (
                    <li
                        key={step.id}
                        className={`flex items-center space-x-2.5 rtl:space-x-reverse ${
                            isCompleted
                                ? "text-primary"
                                : isActive
                                ? "text-primary"
                                : "text-gray-500 dark:text-gray-400"
                        }`}
                    >
                        <span
                            className={`flex items-center justify-center w-8 h-8 sm:w-6 sm:h-6 border rounded-full shrink-0 transition-all ${
                                isCompleted
                                    ? "bg-primary border-primary"
                                    : isActive
                                    ? "border-primary"
                                    : "border-gray-500 dark:border-gray-400"
                            }
                ${step.id === 0 ? "ml-4" : "ml-0"}`}
                        >
                            {isCompleted
                                ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="white"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                )
                                : (
                                    step.id + 1
                                )}
                        </span>
                        <span className="relative flex items-center">
                            <h3
                                className={`font-medium sm:text-xs md:text-base leading-tight`}
                            >
                                {step.label}
                            </h3>
                            {step.id === 0 && (
                                <div className="ml-2 group relative flex">
                                    <Info className="w-5 h-5 text-gray-500 hover:text-primary cursor-pointer" />
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 translate-y-[-5px] invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all bg-gray-800 text-white text-sm p-2 rounded-lg shadow-md w-96 sm:text-xs sm:w-48">
                                        <p className="mb-2">
                                            El usuario(a) beneficiario(a) del
                                            producto o servicio que intentas
                                            comprar, deberá registrarse en la
                                            App MEDICALL24, que será la
                                            aplicación a utilizar para solicitar
                                            y gestionar las citas para acceder
                                            al servicio.
                                        </p>
                                        <p>
                                            Si tienes dudas, vuelve a leer los
                                            términos y condiciones que
                                            aceptaste.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </span>
                    </li>
                );
            })}
        </ol>
    );
};
