import { Loader2 } from "lucide-react";

interface LoaderSpinProps {
    className?: string;
    width?: number;
}
const LoaderSpin = ({ className, width }: LoaderSpinProps) => {
    return (
        <div className={`${className}`}>
            <Loader2 className={`animate-spin`} size={width} />
        </div>
    );
};

export default LoaderSpin;
