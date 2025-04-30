import React from "react";
import InputText from "../ui/input";

interface TableViewProps {
    activeTab: string;
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    filteredData: any[];
    paginatedData: any[];
    getStatusColor: (status: string) => string;
}

const ITEMS_PER_PAGE = 5;

const TableView: React.FC<TableViewProps> = (
    {
        activeTab,
        searchTerm,
        setSearchTerm,
        currentPage,
        setCurrentPage,
        filteredData,
        paginatedData,
        getStatusColor,
    },
) => {
    return (
        <div
            className={`p-6 ${activeTab !== "table" ? "hidden" : ""}`}
        >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
                    Listado de Usuarios
                </h2>
                <div className="w-1/2">
                    <InputText
                        label="Buscar..."
                        name="search"
                        value={searchTerm}
                        obligatory={false}
                        type="text"
                        errorMessage={null}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border-2 border-gray-300"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr className="text-xs text-center text-gray-600">
                            <th>Identificación</th>
                            <th>Código de autorización</th>
                            <th>Producto</th>
                            <th>Valor aprobado</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredData.length > 0
                            ? (
                                paginatedData.map((row) => (
                                    <tr
                                        key={row.id}
                                        className="hover:bg-gray-50 text-xs text-center text-gray-800"
                                    >
                                        <td className="px-6 py-4">
                                            {row.identificacion_usuario}
                                        </td>
                                        <td className="px-6 py-4">
                                            {row.codigo_credito}
                                        </td>
                                        <td className="px-6 py-4">
                                            {row.id_producto}
                                        </td>
                                        <td className="px-6 py-4">
                                            ${Number(
                                                row.valor_aprobado,
                                            ).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    getStatusColor(
                                                        row.validado
                                                            ? "validado"
                                                            : "sin validar",
                                                    )
                                                }`}
                                            >
                                                {row.validado
                                                    ? "validado"
                                                    : "sin validar"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {row.fecha_aprobacion}
                                        </td>
                                    </tr>
                                ))
                            )
                            : (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="text-center text-xs text-gray-500 py-4"
                                    >
                                        No se encontraron resultados para
                                        "{searchTerm}"
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-6">
                <div className="text-xs text-gray-700">
                    Mostrando{" "}
                    <span className="font-medium">
                        {paginatedData.length}
                    </span>{" "}
                    de{" "}
                    <span className="font-medium">
                        {filteredData.length}
                    </span>{" "}
                    resultados
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 border rounded-md text-sm font-medium ${
                            currentPage === 1
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                        }`}
                    >
                        Anterior
                    </button>
                    <button
                        onClick={() =>
                            setCurrentPage((prev) =>
                                prev <
                                        Math.ceil(
                                            filteredData.length /
                                                ITEMS_PER_PAGE,
                                        )
                                    ? prev + 1
                                    : prev
                            )}
                        disabled={currentPage ===
                            Math.ceil(
                                filteredData.length /
                                    ITEMS_PER_PAGE,
                            )}
                        className={`px-3 py-1 border rounded-md text-sm font-medium ${
                            currentPage ===
                                    Math.ceil(
                                        filteredData.length /
                                            ITEMS_PER_PAGE,
                                    )
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                        }`}
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TableView;
