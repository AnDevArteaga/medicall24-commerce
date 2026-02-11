import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layouts/layout-secondary";
import SEO from "../components/seo/SEO";
import Input from "../components/ui/input";
import ButtonForm from "../components/ui/button-forms";

const PQRS: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        tipo: "",
        nombre: "",
        identificacion: "",
        email: "",
        telefono: "",
        asunto: "",
        mensaje: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Integrar con backend para envío de PQRS
        console.log("PQRS enviada:", formData);
        alert("Su solicitud PQRS ha sido recibida. Nos pondremos en contacto con usted pronto.");
        navigate("/");
    };

    return (
        <>
            <SEO
                title="PQRS - Peticiones, Quejas, Reclamos y Sugerencias | Medicall24"
                description="Presente sus peticiones, quejas, reclamos o sugerencias a Medicall24. Canal oficial de atención al usuario."
                keywords="PQRS, peticiones, quejas, reclamos, sugerencias, Medicall24, atención al usuario"
                url="https://medicall24.com.co/pqrs"
            />
            <Layout title="PQRS | Medicall24">
                <div className="min-h-screen bg-gray-50 py-12 px-4">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                                PQRS
                            </h1>
                            <p className="text-gray-600 text-center mb-8">
                                Peticiones, Quejas, Reclamos y Sugerencias
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tipo de solicitud <span className="text-primary">*</span>
                                    </label>
                                    <select
                                        name="tipo"
                                        value={formData.tipo}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                                    >
                                        <option value="">Seleccione una opción</option>
                                        <option value="peticion">Petición</option>
                                        <option value="queja">Queja</option>
                                        <option value="reclamo">Reclamo</option>
                                        <option value="sugerencia">Sugerencia</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Input
                                        label="Nombre completo"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleInputChange}
                                        obligatory
                                        type="text"
                                        errorMessage={null}
                                        className="border-2 border-gray-300 focus:border-primary"
                                    />
                                    <Input
                                        label="Identificación"
                                        name="identificacion"
                                        value={formData.identificacion}
                                        onChange={handleInputChange}
                                        obligatory
                                        type="text"
                                        errorMessage={null}
                                        className="border-2 border-gray-300 focus:border-primary"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Input
                                        label="Correo electrónico"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        obligatory
                                        type="email"
                                        errorMessage={null}
                                        className="border-2 border-gray-300 focus:border-primary"
                                    />
                                    <Input
                                        label="Teléfono"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleInputChange}
                                        obligatory={false}
                                        type="tel"
                                        errorMessage={null}
                                        className="border-2 border-gray-300 focus:border-primary"
                                    />
                                </div>

                                <Input
                                    label="Asunto"
                                    name="asunto"
                                    value={formData.asunto}
                                    onChange={handleInputChange}
                                    obligatory
                                    type="text"
                                    errorMessage={null}
                                    className="border-2 border-gray-300 focus:border-primary"
                                />

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Mensaje <span className="text-primary">*</span>
                                    </label>
                                    <textarea
                                        name="mensaje"
                                        value={formData.mensaje}
                                        onChange={handleInputChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none resize-none"
                                        placeholder="Describa su petición, queja, reclamo o sugerencia..."
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <ButtonForm
                                        type="submit"
                                        text="Enviar solicitud"
                                        disabled={false}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => navigate(-1)}
                                        className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                                    >
                                        Volver
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default PQRS;
