import React from 'react'

const Bancolombia: React.FC = () => {
  return (
    <div className="animate-fade-in flex flex-col items-center justify-center">
    <h3 className="text-xl text-gray-700 font-bold mb-4 text-center">
      Pagarás con Bancolombia
    </h3>
    <span className="flex items-center justify-center w-20 h-20 rounded-full shrink-0 transition-all bg-green-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12"
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
    </span>
  </div>
  )
}

export default Bancolombia
