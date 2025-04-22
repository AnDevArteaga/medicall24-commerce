import React from 'react'

interface buttonIndexProps {
    link: string
}
const ButtonIndex: React.FC<buttonIndexProps> = ({link}) => {
return (
    <div className="mt-8 w-2/3">
    <a
        href={link}
        className="transition sm:text-xl xs:text-xl ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 hover:font-bold hover:bg-primary hover:text-white hover:border-b-2 hover:border-pink-500 duration-300 block h-10 bg-transparent border-2 border-primary text-2xl text-primary rounded-xl text-center leading-10"
    >
        Más información
    </a>
</div>
)
}

export default ButtonIndex
