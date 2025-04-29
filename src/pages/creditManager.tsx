import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  FileText, LogOut, Search, Users } from "lucide-react";
import { toast } from "react-hot-toast";
import {
getAuthorizationData,
registerAuthorizationData,
} from "../services/supabase/manage-credit";
import FormView from "../components/manage-credit/form-view";

import { supabase } from "../services/supabase/client/create-client";

const ITEMS_PER_PAGE = 5;

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("table");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState({
        identificacion_usuario: "",
        id_producto: "",
        codigo_plataforma_credito: "",
        valor_aprobado: "",
        fecha_aprobacion: "",
        codigo_credito: "",
        cod_usua_ingresa: "",
    });
    const navigate = useNavigate();


    const cerrarSesion = async () => {
        const { error } = await supabase.auth.signOut();

        if (!error) {
            toast.success("Sesión cerrada correctamente 👋");
            navigate("/iniciar-sesion");
        } else {
            toast.error("Error al cerrar sesión");
            console.error("Error al cerrar sesión:", error.message);
        }
    };

    useEffect(() => {
        const obtenerUID = async () => {
            const { data } = await supabase.auth.getSession();
            const uid = data?.session?.user?.id;

            if (uid) {
                setFormData((prev) => ({
                    ...prev,
                    cod_usua_ingresa: uid,
                }));
            }
        };

        obtenerUID();
    }, []);

    const getData = async () => {
        setLoadingPage(true);
        const response = await getAuthorizationData(); // tu función para traer datos
        console.log("response", response);
        setData(response!.data || []);
        setLoadingPage(false);
    };

    useEffect(() => {
        getData();
    }, []);

    const filteredData = useMemo(() => {
        console.log("data", data);
        return data?.filter((item) =>
            item.identificacion_usuario?.toLowerCase().includes(
                searchTerm.toLowerCase(),
            ) ||
            item.codigo_credito?.toLowerCase().includes(
                searchTerm.toLowerCase(),
            )
        );
    }, [data, searchTerm]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredData.slice(startIndex, endIndex);
    }, [filteredData, currentPage]);

    useEffect(() => {
        setCurrentPage(1); // Reinicia al buscar
    }, [searchTerm]);

    // Manejador para cambios en el formulario
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const camposRequeridos = [
            "identificacion_usuario",
            "id_producto",
            "codigo_plataforma_credito",
            "valor_aprobado",
            "fecha_aprobacion",
            "codigo_credito",
        ];

        const hayCamposVacios = camposRequeridos.some(
            (campo) => !formData[campo] || formData[campo].trim() === "",
        );

        if (hayCamposVacios) {
            toast.error("Por favor, complete todos los campos obligatorios.");
            setLoading(false);
            return;
        }

        // Validación adicional de número positivo
        if (
            isNaN(formData.valor_aprobado) ||
            Number(formData.valor_aprobado) <= 0
        ) {
            toast.error("El valor aprobado debe ser un número mayor que cero.");
            setLoading(false);
            return;
        }
        const response = await registerAuthorizationData(formData);
        console.log("response", response);
        setLoading(false);
        if (response === 201 || response === 200) {
            setFormData({
                identificacion_usuario: "",
                id_producto: "",
                codigo_plataforma_credito: "",
                valor_aprobado: "",
                fecha_aprobacion: "",
                codigo_credito: "",
                cod_usua_ingresa: "",
            });
            const nuevaConsulta = await getAuthorizationData();
            setData(nuevaConsulta.data || []);
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case "Válido":
                return "bg-green-100 text-green-800";
            case "No válido":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    if (loadingPage) {
        return "Loading...";
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                            <Users className="mr-3 text-pink-600" size={28} />
                            Gestión de créditos aprobados
                        </h1>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={cerrarSesion}
                                className="flex items-center bg-pink-100 text-pink-600 py-1 px-3 rounded-full text-sm font-medium hover:bg-pink-200 transition"
                            >
                                <LogOut size={18} className="mr-1" />
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {/* Tabs */}
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            <button
                                onClick={() => setActiveTab("table")}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                                    activeTab === "table"
                                        ? "border-pink-600 text-pink-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                            >
                                <Users className="inline mr-2" size={18} />
                                Tabla de Usuarios
                            </button>
                            <button
                                onClick={() => setActiveTab("form")}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                                    activeTab === "form"
                                        ? "border-pink-600 text-pink-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                            >
                                <FileText className="inline mr-2" size={18} />
                                Formulario
                            </button>
                        </nav>
                    </div>

                    {/* Table View */}
                    <div
                        className={`p-6 ${
                            activeTab !== "table" ? "hidden" : ""
                        }`}
                    >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
                                Listado de Usuarios
                            </h2>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)}
                                    className="w-1/3 px-3 py-1.5 pl-10 text-sm disabled:bg-gray-200 disabled:text-gray-500 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all border-2"
                                />
                                <Search
                                    size={18}
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="text-sm text-center text-gray-600">
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
                                                    className="hover:bg-gray-50 text-sm text-center text-gray-800"
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
                                                                        ? "Válido"
                                                                        : "No válido",
                                                                )
                                                            }`}
                                                        >
                                                            {row.validado
                                                                ? "Válido"
                                                                : "No válido"}
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
                                                    className="text-center text-sm text-gray-500 py-4"
                                                >
                                                    No se encontraron resultados
                                                    para "{searchTerm}"
                                                </td>
                                            </tr>
                                        )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-between items-center mt-6">
                            <div className="text-sm text-gray-700">
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
                                        setCurrentPage((prev) =>
                                            Math.max(prev - 1, 1)
                                        )}
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

                                    {/* Form View */}
                                    <FormView
                                        activeTab={activeTab}
                                        handleSubmit={handleSubmit}
                                        formData={formData}
                                        setFormData={setFormData}
                                        handleFormChange={handleFormChange}
                                        loading={loading}
                                    />

                </div>
            </div>
        </div>
    );
}
