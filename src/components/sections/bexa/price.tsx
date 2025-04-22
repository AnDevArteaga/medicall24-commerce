import React from "react";

interface PropsPrice {
    price: string;
}

const Price: React.FC<PropsPrice> = ({ price }) => (
    <p className="text-xl sm:text-lg md:text-2xl text-gray-700 flex items-center space-x-2">
        Por solo
        <span className="text-6xl sm:text-4xl md:text-7xl font-semibold ml-2">
            {price}
        </span>
        <span>COP</span>
    </p>
);

export default Price;
