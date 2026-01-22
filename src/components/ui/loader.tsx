// Loader.tsx
import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="w-12 h-12 border-4 border-t-[#c2185b] border-gray-300 rounded-full animate-spin"
      ></div>
    </div>
  );
};

export default Loader;
