import React from 'react'

interface buttonBuyProps {
    text: string
    onClick?: () => void
}
const ButtonBuy: React.FC<buttonBuyProps> = ({text, onClick}) => {
return (
    <button className="bg-primary w-auto md:w-2/4 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-primarydark transition-colors shadow-md hover:shadow-lg mt-2 mb-4 text-sm md:text-3xl cursor-pointer" onClick={onClick}>
    {text}
</button>
)
}

export default ButtonBuy
