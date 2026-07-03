import React from 'react'
import { Check } from 'lucide-react'

export type FreeConsultTrialPhase = 'card' | 'billing' | 'preview'

export interface FreeConsultTrialStepperProps {
  phase: FreeConsultTrialPhase
}

const STEPS = [
  { id: 1 as const, label: 'Regístrate en MEDICALL24' },
  { id: 2 as const, label: 'Agrega una tarjeta para la verificación' },
  { id: 3 as const, label: 'Confirma tus datos' },
]

export const FreeConsultTrialStepper: React.FC<
  FreeConsultTrialStepperProps
> = ({ phase }) => {
  const activeIndex = phase === 'preview' ? 3 : 2

  return (
    <div className="w-full max-w-3xl mx-auto px-2">
      <div className="flex flex-col xl:flex-row lg:flex-row sm:flex-row sm:items-start sm:justify-between gap-6 sm:gap-2">
        {STEPS.map((step) => {
          const done = step.id < activeIndex
          const current = step.id === activeIndex
          return (
            <div
              key={step.id}
              className="flex flex-1 flex-col items-center text-center gap-2 min-w-0"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors ${
                  done
                    ? 'border-primary bg-primary text-white'
                    : current
                      ? 'border-primary bg-white text-primary'
                      : 'border-gray-300 bg-white text-gray-400'
                }`}
              >
                {done ? <Check className="h-5 w-5" strokeWidth={3} /> : step.id}
              </div>
              <p
                className={`text-xs sm:text-sm leading-snug max-w-[11rem] ${
                  done || current ? 'text-primary font-medium' : 'text-gray-400'
                }`}
              >
                {step.label}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
