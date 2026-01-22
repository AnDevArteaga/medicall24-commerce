import React from 'react';
import Layout from '../layouts/layout-secondary';
import InfoPlan from '../components/sections/peoplePlan/plan-info';
import Plans from '../components/sections/peoplePlan/render-plans';
// import Simulator from '../components/sections/peoplePlan/simulator'
import TermCondModal from '../components/modals/term&cond/bexa/term-cond';
import { useModal } from '../contexts/modals';
import { useProductData } from '../hooks/useProductData';
import { useProductoSeleccionado } from '../hooks/useSelectedProduct';
import ModalProduct from '../components/modals/people/product';
import SEO from '../components/seo/SEO';

const PeoplePlan: React.FC = () => {
    const { isModalOpen, openModal, closeModal, getModalProps } = useModal();
    const { productos, loading, error } = useProductData();
    const { seleccionarProducto, producto, limpiarProducto } = useProductoSeleccionado();
    const termCondProps = getModalProps("termCond");
    const handlePlanSelected = (planId: number) => {
        if (!productos) return;
        seleccionarProducto(planId, productos);
        openModal('product');
    }

    const cerrarModal = (modal: string) => {
        closeModal(modal);
        if (modal === "product") {
            limpiarProducto();
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Planes de Telemedicina para Personas",
        "description": "Planes de telemedicina personalizados para personas. Consulta médica virtual sin salir de casa.",
        "category": "Servicios de Salud",
        "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "priceCurrency": "COP"
        }
    };

    return (
        <>
            <SEO
                title="Planes de Telemedicina para Personas | Medicall24"
                description="Planes de telemedicina personalizados para personas. Consulta médica virtual sin salir de casa. Atención médica a domicilio."
                keywords="planes telemedicina, consulta médica virtual, medicina a domicilio, planes de salud, telemedicina personas, salud digital"
                url="https://medicall24.com.co/personas"
                schema={schema}
            />
            <Layout title='Planes de Telemedicina para personas'>
            <main>
                <InfoPlan />
                <Plans planSelected={handlePlanSelected} />
                {/* <Simulator /> */}
            </main>
            {isModalOpen("termCond") && termCondProps?.onClose && (
                <TermCondModal {...termCondProps} />
            )}
            {isModalOpen('product') && producto && <ModalProduct producto={producto} onClose={() => cerrarModal("product")}
            />}
        </Layout>
        </>
    )
}

export default PeoplePlan