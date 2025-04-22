import { useCallback, useState } from "react";

type ModalStates = Record<string, boolean>;

export const useMultiModal = () => {
    const [modals, setModals] = useState<ModalStates>({});

    const openModal = useCallback((id: string) => {
        setModals((prev) => ({ ...prev, [id]: true }));
    }, []);

    const closeModal = useCallback((id: string) => {
        setModals((prev) => ({ ...prev, [id]: false }));
    }, []);

    const toggleModal = useCallback((id: string) => {
        setModals((prev) => ({ ...prev, [id]: !prev[id] }));
    }, []);

    const isOpen = useCallback((id: string) => {
        return !!modals[id];
    }, [modals]);

    return {
        isOpen,
        openModal,
        closeModal,
        toggleModal,
    };
};
