import React from "react";

interface PropsServiceItem {
    icon: React.ReactNode;
    text: string;
}
const ServiceItem: React.FC<PropsServiceItem> = ({ icon, text }) => (
    <div className="flex items-start space-x-2 hover:translate-x-2 transition-transform duration-200 w-4/5 sm:w-full md:w-full">
        {icon}
        <p className="text-gray-700 text-sm md:text-xl sm:text-base hover:text-gray-800">
            {text}
        </p>
    </div>
);

export default ServiceItem;
