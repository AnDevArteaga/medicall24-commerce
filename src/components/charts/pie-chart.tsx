import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { BarChartData } from "../../interfaces/testimony.interface";

interface TestimonyProps {
    data: BarChartData[];
}

// Paleta de colores moderna y profesional
const getUniqueColors = (length: number): string[] => {
    const modernColors = [
        "#C2185B",
        "#ee7f09",
        "#4e4e4e",
    ];
    return Array.from({ length }, (_, i) => modernColors[i % modernColors.length]);
};

const Testimony: React.FC<TestimonyProps> = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <p className="text-gray-500 text-sm font-medium">No hay datos para mostrar</p>
            </div>
        );
    }

    const assignedColors = getUniqueColors(data.length);

    const formattedData = data.map((item, index) => ({
        ...item,
        fill: assignedColors[index],
    }));

    // Calcular el total para mostrar porcentajes
    const total = data.reduce((sum, item) => sum + item.value, 0);

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            const percentage = ((data.value / total) * 100).toFixed(1);
            return (
                <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                    <p className="font-semibold text-gray-800">{data.name}</p>
                    <p className="text-sm text-gray-600">
                        <span className="font-bold text-primary">{data.value}</span> respuestas
                    </p>
                    <p className="text-xs text-gray-500">{percentage}% del total</p>
                </div>
            );
        }
        return null;
    };

    const renderLabel = (entry: any) => {
        const percentage = ((entry.value / total) * 100).toFixed(0);
        return `${percentage}%`;
    };

    return (
        <div className="w-full">
            <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                    <Pie
                        dataKey="value"
                        data={formattedData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={40}
                        paddingAngle={2}
                        label={renderLabel}
                        labelLine={false}
                    >
                        {formattedData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        wrapperStyle={{ paddingTop: "20px" }}
                        iconType="circle"
                        formatter={(value, entry: any) => (
                            <span style={{ color: entry.color, fontSize: "14px", fontWeight: 500 }}>
                                {value}
                            </span>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Testimony;
