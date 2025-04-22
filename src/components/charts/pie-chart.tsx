import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { BarChartData } from "../../interfaces/testimony.interface";

interface TestimonyProps {
    data: BarChartData[];
}

const getUniqueColors = (length: number): string[] => {
    const colors = ["#C2185D", "#E8870C", "#555555"]; // Magenta, Naranja, Gris
    return Array.from({ length }, (_, i) => colors[i % colors.length]);
};

const Testimony: React.FC<TestimonyProps> = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <p className="text-center text-gray-500">
                No hay datos para mostrar
            </p>
        );
    }

    const assignedColors = getUniqueColors(data.length);

    const formattedData = data.map((item, index) => ({
        ...item,
        fill: assignedColors[index],
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    dataKey="value"
                    data={formattedData}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label
                />
                <Tooltip
                    wrapperStyle={{
                        backgroundColor: "white",
                        borderRadius: "3px",
                        fontSize: "11px",
                    }}
                />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default Testimony;
