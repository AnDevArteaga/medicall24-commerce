import React from "react";

interface Props {
    isCountryVisible: boolean;
    setIsCountryVisible: (visible: boolean) => void;
}

const CountrySelector: React.FC<Props> = (
    { isCountryVisible, setIsCountryVisible },
) => {
    return (
        <div
            className={` hidden lg:flex ${
                isCountryVisible
                    ? "max-h-96 opacity-100 bg-gray-200 text-white flex items-center justify-between px-36 py-4 shadow-md overflow-hidden transition-all duration-500 ease-in-out"
                    : "max-h-0 opacity-0 py-0 px-0 shadow-none transition-all flex items-center justify-between duration-500 ease-in-out"
            }`}
        >
            <div className="flex items-center gap-4">
                <span className="text-lg font-medium text-gray-600">
                    Elige tu país:
                </span>
                <select className="bg-orange-600 text-black px-16 py-1 rounded-xl text-white">
                    <option value="Colombia">Colombia</option>
                    <option value="México" disabled>Panamá</option>
                    <option value="Argentina" disabled>EE.UU.</option>
                    <option value="Chile" disabled>Otros Países</option>
                </select>
                <button className="bg-white text-gray-700 px-12 py-1 rounded-xl font-semibold hover:bg-gray-100 transform transition">
                    Continuar
                </button>
                <button
                    className="text-gray-600 text-xl hover:scale-110 transform transition cursor-pointer"
                    onClick={() => setIsCountryVisible(false)}
                >
                    ✕
                </button>
            </div>
            <div>
                <img
                    src="https://medicall24.com.co/wp-content/uploads/2024/12/lettermarkoriginal.png"
                    alt="logo"
                    className="w-40 h-auto"
                />
            </div>
        </div>
    );
};

export default CountrySelector;
