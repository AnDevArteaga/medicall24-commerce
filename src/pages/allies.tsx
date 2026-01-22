import React from "react";
import LayoutSecondary from "../layouts/layout-secondary";
import Allylist from "../components/allies/allies-list";
import AppoimentModal from "../components/modals/appoiment/appoiment";
import { useAllies } from "../hooks/useAllies";
import SEO from "../components/seo/SEO";

const AlliesPage: React.FC = () => {    
    const { allies, loading, error, handleSelectAlly, isModalOpen, closeModal } = useAllies();
    return (
        <>
            <SEO
                title="Aliados Comerciales | Prestadores de Salud | Medicall24"
                description="Consulta nuestra red de aliados comerciales y prestadores de salud en toda Colombia. Encuentra el centro médico más cercano para tu atención."
                keywords="aliados comerciales, prestadores de salud, centros médicos, clínicas, IPS, red de prestadores, servicios médicos"
                url="https://medicall24.com.co/aliados"
            />
            <LayoutSecondary title="Medicall24 | Aliados">
      <main className="min-h-auto">
        {error && <p className="text-center text-red-500">Ocurrió un error al cargar los aliados.</p>}
        <Allylist items={allies} onSelect={handleSelectAlly} loading={loading} />
        </main>
        {isModalOpen("appoiment") && allies.length > 0 && (
            <AppoimentModal
                onClose={() => closeModal("appoiment")}
            />
        )}
        </LayoutSecondary>
        </>
    );
};

export default AlliesPage;
