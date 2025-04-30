import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  FileText, LogOut , Users } from "lucide-react";
import { toast } from "react-hot-toast";
import {
getAuthorizationData,
registerAuthorizationData,
} from "../services/supabase/manage-credit";
import FormView from "../components/manage-credit/form-view";
import TableView from "../components/manage-credit/table-view";
import { supabase } from "../services/supabase/client/create-client";

const ITEMS_PER_PAGE = 5;

interface UsuarioData {
    identificacion_usuario: string;
    codigo_credito: string;
    fecha_aprobacion: string;
  }
  

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("table");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false);
    const [data, setData] = useState<UsuarioData[]>([]);
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
            console.log("uid", uid);
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
        if (!data) return [];
      
        const lowerSearch = searchTerm.toLowerCase();
      
        return data
          .filter((item) =>
            item.identificacion_usuario?.toLowerCase().includes(lowerSearch) ||
            item.codigo_credito?.toLowerCase().includes(lowerSearch)
          )
          .reverse(); 
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
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
            setData(nuevaConsulta!.data || []);
        }
    };
    const getStatusColor = (status: string) => {
        switch (status) {
            case "validado":
                return "bg-green-100 text-green-800";
            case "sin validar":
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
                            <Users className="mr-3 text-primary" size={28} />
                            Gestión de créditos aprobados
                        </h1>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={cerrarSesion}
                                className="flex items-center bg-pink-100 text-primary py-1 px-3 rounded-full text-sm font-medium hover:bg-pink-200 transition"
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
                                className={`py-4 px-6 text-center border-b-2 font-medium text-xs cursor-pointer ${
                                    activeTab === "table"
                                        ? "border-primary text-primary"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                            >
                                <Users className="inline mr-2" size={18} />
                                Tabla de Usuarios
                            </button>
                            <button
                                onClick={() => setActiveTab("form")}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-xs cursor-pointer ${
                                    activeTab === "form"
                                        ? "border-primary text-primary"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                            >
                                <FileText className="inline mr-2" size={18} />
                                Formulario
                            </button>
                        </nav>
                    </div>

                    {/* Table View */}

                                    <TableView
                                        activeTab={activeTab}
                                        searchTerm={searchTerm}
                                        setSearchTerm={setSearchTerm}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        filteredData={filteredData}
                                        paginatedData={paginatedData}
                                        getStatusColor={getStatusColor}
                                    />

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
