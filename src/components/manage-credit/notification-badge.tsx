import React from "react";

interface NotificationBadgeProps {
    count: number;
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({
    count,
    onClick,
}) => {
    if (count === 0) return null;

    return (
        <button
            onClick={onClick}
            className="relative inline-flex items-center justify-center w-6 h-6 rounded-full transition-all duration-200 hover:scale-110"
            aria-label={`${count} nuevas notificaciones`}
            title={`${count} nueva${count > 1 ? 's' : ''} solicitud${count > 1 ? 'es' : ''} de crédito`}
        >
            <span className="absolute inset-0 bg-red-500 rounded-full animate-pulse"></span>
            <span className="relative flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-red-500 rounded-full">
                {count > 99 ? "99+" : count}
            </span>
        </button>
    );
};

export default NotificationBadge;

