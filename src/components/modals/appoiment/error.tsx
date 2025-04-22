import React from "react";
import { AlertCircle } from "lucide-react";

export const Error: React.FC<{ error: string | null }> = ({ error }) => (
    <div className="flex justify-center items-center h-40">
        <AlertCircle className="text-primary w-8 h-8" />
        <p className="ml-3 text-primary text-center text-xl">{error}</p>
    </div>
);
