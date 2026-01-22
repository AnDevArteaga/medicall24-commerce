import React from "react";

interface PropsTitle {
    text: string;
}
const Title: React.FC<PropsTitle> = ({ text }) => (
    <h2 className="text-lg md:text-center md:text-3xl sm:text-2xl text-gray-700">
        {text}
</h2>
);

export default Title;