import React from "react";
interface PropsEslogan {
    text: string;
    value: number;
}
const Eslogan: React.FC<PropsEslogan> = ({ text, value }) => (
    <span className="flex items-center w-full">
      <p
        className={value === 1
          ? "text-gray-700 text-xl md:text-2xl sm:text-2xl"
          : "text-gray-700 text-lg md:text-2xl sm:text-lg"}
      >
        {text}
      </p>
    </span>
  );

  export default Eslogan;