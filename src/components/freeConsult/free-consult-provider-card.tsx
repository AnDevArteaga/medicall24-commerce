import React from 'react'
import { User } from 'lucide-react'

export interface FreeConsultProviderCardProps {
  bannerUrl: string
  avatarUrl: string | null
  providerName: string
  specialtyLabel: string
  className?: string
}

export const FreeConsultProviderCard: React.FC<FreeConsultProviderCardProps> = ({
  bannerUrl,
  avatarUrl,
  providerName,
  specialtyLabel,
  className = '',
}) => {
  return (
    <section className={className}>
      <div className="relative mb-4">
        <div className="h-auto sm:h-56 rounded-2xl overflow-hidden bg-gray-300 shadow-sm">
          <img
            src={bannerUrl}
            alt="Portada del prestador"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute -bottom-16 left-0 sm:left-8">
          <div className="flex-shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={providerName}
                className="w-32 h-32 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-pink-200 shadow-md bg-white"
              />
            ) : (
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-pink-100 rounded-full flex items-center justify-center border-4 border-pink-200 shadow-md">
                <User className="w-12 h-12 sm:w-14 sm:h-14 text-primary" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-12 sm:pt-14 space-y-4">
        <div className="rounded-4xl border-2 border-pink-200 bg-white p-4 sm:p-4 shadow-sm">
          <p className="text-sm text-gray-600">Nombre del prestador:</p>
          <p className="text-xl sm:text-xl text-gray-700 uppercase tracking-tight">
            {providerName}
          </p>
          <div className="text-gray-500 text-sm inline-block mt-1">
            {specialtyLabel}
          </div>
        </div>
      </div>
    </section>
  )
}
