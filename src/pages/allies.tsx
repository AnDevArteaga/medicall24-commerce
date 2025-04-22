import React from "react";
import LayoutSecondary from "../layouts/layout-secondary";
import Allylist from "../components/allies/allies-list";
import AppoimentModal from "../components/modals/appoiment/appoiment";
import { useAllies } from "../hooks/useAllies";

const AlliesPage: React.FC = () => {    
    const { allies, loading, error, handleSelectAlly, isModalOpen, closeModal } = useAllies();
    return (
        <LayoutSecondary title="Medicall24 | Aliados">
      <main className="min-h-auto">
        {loading && <p className="text-center text-gray-500">Cargando aliados...</p>}
        {error && <p className="text-center text-red-500">Ocurrió un error al cargar los aliados.</p>}
        <Allylist items={allies} onSelect={handleSelectAlly} />
        </main>
        {isModalOpen("appoiment") && allies.length > 0 && (
            <AppoimentModal
                onClose={() => closeModal("appoiment")}
            />
        )}
        </LayoutSecondary>
    );
};

export default AlliesPage;
