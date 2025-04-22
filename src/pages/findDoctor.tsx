import DownloadSection from "../components/sections/find-doctor/download";
import Layout from "../layouts/layout-secondary";
import StepSection from "../components/sections/find-doctor/step";
import React from "react";

const FindDoctor: React.FC = () => {
    return (
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
    );
};

export default FindDoctor;
