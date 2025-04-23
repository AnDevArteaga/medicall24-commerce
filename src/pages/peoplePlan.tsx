import React from 'react';
import Layout from '../layouts/layout-secondary';
import InfoPlan from '../components/sections/peoplePlan/plan-info';
import Plans from '../components/sections/peoplePlan/render-plans';
import Simulator from '../components/sections/peoplePlan/simulator'
import TermCondModal from '../components/modals/term&cond/bexa/term-cond';
import { useModal } from '../contexts/modals';
import { useProductData } from '../hooks/useProductData';
import { useProductoSeleccionado } from '../hooks/useSelectedProduct';
import ModalProduct from '../components/modals/people/product';

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


    return (
        <Layout title='Planes de Telemedicina para personas'>
            <main>
                <InfoPlan />
                <Plans planSelected={handlePlanSelected} />
                <Simulator />
            </main>
            {isModalOpen("termCond") && termCondProps?.onClose && (
                <TermCondModal {...termCondProps} />
            )}
            {isModalOpen('product') && producto && <ModalProduct producto={producto} onClose={() => cerrarModal("product")}
            />}
        </Layout>

    )
}

export default PeoplePlan