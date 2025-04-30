import React from "react";
import Layout from "../layouts/layout-secondary";
import BexaExam from "../components/sections/bexa/bexa-exam";
import BexaPackage from "../components/sections/bexa/bexa-package";
import Allies from "../components/allies/allies-list";
import Testimonials from "../components/sections/bexa/testimonies/testimonies-container";
import { useProductData } from "../hooks/useProductData";
// import { useMultiModal } from "../hooks/useMultiModal";
import { useProductoSeleccionado } from "../hooks/useSelectedProduct";
import ModalProducto from "../components/modals/bexa/products";
import CodeInvalid from "../components/modals/bexa/code-invalid";
import TermCond from "../components/modals/term&cond/bexa/term-cond";
import Appoiment from "../components/modals/appoiment/appoiment";
import { useModal } from "../contexts/modals";
import { usePromoQueryEffect } from "../hooks/useQrBexa";
import { useSearchParams } from "react-router-dom";
import { useAllies } from "../hooks/useAllies";
import { usePurchaseContext } from "../contexts/checkout";

const Bexa: React.FC = () => {
    const [searchParams] = useSearchParams();
    const promo = searchParams.get("promo") ?? "";
    const { codigos, productos, loading, error } = useProductData();
    const { isModalOpen, openModal, closeModal, getModalProps } = useModal();
    const { producto, seleccionarProducto, limpiarProducto } =
        useProductoSeleccionado();
    usePromoQueryEffect({
        productos: productos ?? [],
        codigos: codigos ?? [],
        openModal,
        seleccionarProducto,
    });
    const { allies, handleSelectAlly } = useAllies();
    const termCondProps = getModalProps("termCond");
    const { setQueryParam } = usePurchaseContext();

    const openModalProduct = (id_producto: number) => {
        if (!productos) return;
        seleccionarProducto(id_producto, productos);
        setQueryParam({ id_producto: id_producto.toString(), code: "" });
        openModal("producto");
    };

    const cerrarModal = (modal: string) => {
        closeModal(modal);
        if (modal === "producto") {
            limpiarProducto();
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Layout title="Medicall24 | Examen Bexa">
            <main className="flex flex-col min-h-screen">
                <BexaExam onVerProducto={openModalProduct} />
                <BexaPackage onVerProducto={openModalProduct} />
                <Allies items={allies} onSelect={handleSelectAlly} />
                <Testimonials />
            </main>

            {isModalOpen("producto") && producto && (
                <ModalProducto
                    producto={producto}
                    codeXProduct={codigos ?? []}
                    onClose={() => cerrarModal("producto")}
                    codigoInicial={promo}
                />
            )}
            {isModalOpen("codeInvalid") && producto && (
                <CodeInvalid onClose={() => cerrarModal("codeInvalid")} />
            )}
            {isModalOpen("termCond") && termCondProps?.onClose && (
                <TermCond {...termCondProps} />
            )}
            {isModalOpen("appoiment") && (
                <Appoiment onClose={() => cerrarModal("appoiment")} />
            )}
        </Layout>
    );
};

export default Bexa;
