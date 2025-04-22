import React from 'react'

interface buttonSecondaryProps {
    link: string
    color: string
    text: string
}
const ButtonSecondary: React.FC<buttonSecondaryProps> = ({link, color, text}) => {
return (
    <a href={link}>
    <button className={`${color} group-hover:${color}/50 md:text-4xl cursor-pointer sm:text-sm xs:text-sm text-2xl text-white py-2 px-16 rounded-3xl shadow-md transition-all duration-300 hover:scale-105 mb-8`}>
    {text}
    </button>
    </a>
)
}

export default ButtonSecondary