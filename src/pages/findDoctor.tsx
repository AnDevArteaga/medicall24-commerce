import DownloadSection from "../components/sections/find-doctor/download";
import Layout from "../layouts/layout-secondary";
import StepSection from "../components/sections/find-doctor/step";
import React from "react";
import SEO from "../components/seo/SEO";

const FindDoctor: React.FC = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "Cómo encontrar un médico en Medicall24",
        "description": "Guía para encontrar y contactar médicos en la plataforma de telemedicina Medicall24",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Consulta por EPS",
                "text": "Usa la red de prestadores de salud de tu EPS y consulta con el médico de tu elección."
            },
            {
                "@type": "HowToStep",
                "name": "Consulta Particular",
                "text": "Contacta un médico y paga de forma particular."
            }
        ]
    };

    return (
        <>
            <SEO
                title="¿Cómo encontrar un médico? | Guía de Telemedicina | Medicall24"
                description="Aprende cómo encontrar y contactar médicos en Medicall24. Consulta médica virtual por EPS o particular desde la comodidad de tu hogar."
                keywords="cómo encontrar médico, telemedicina EPS, consulta médica virtual, médicos online, atención médica a domicilio, salud digital"
                url="https://medicall24.com.co/buscar-médico"
                schema={schema}
            />
            <Layout title="Medicall24 | ¿Cómo encontrar un médico?">
            <main>
                <DownloadSection />
                <section className=" rounded-lg p-12 text-center bg-gray-100">
                    <StepSection
                        sec="1"
                        title="Consulta por EPS"
                        description="Usa la red de prestadores de salud de tu EPS y consulta con el médico de tu elección."
                        videoUrl="https://medicall24.com.co/wp-content/uploads/2024/07/PASOS-EPS-WEB-PACIENTES-1.mp4"
                    />

                    <StepSection
                        sec="2"
                        title="Consulta Particular"
                        description="Contacta un médico y paga de forma particular."
                        videoUrl="https://medicall24.com.co/wp-content/uploads/2024/07/PASOS-PARTICULAR-WEB-PACIENTES-1.mp4"
                    />
                </section>
            </main>
        </Layout>
        </>
    );
};

export default FindDoctor;
