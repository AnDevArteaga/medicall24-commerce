import {
    createContext,
    ReactNode,
    useContext,
    useState,
} from "react";

interface ModalState {
    [key: string]: boolean;
}

interface ModalProps {
    [key: string]: any;
}

interface ModalContextProps {
    modals: ModalState;
    modalProps: ModalProps;
    openModal: (name: string, props?: any) => void;
    closeModal: (name: string) => void;
    isModalOpen: (name: string) => boolean;
    getModalProps: <T = any>(name: string) => T | undefined;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modals, setModals] = useState<ModalState>({});
    const [modalProps, setModalProps] = useState<ModalProps>({});

    const openModal = (name: string, props: any = {}) => {
        setModals((prev) => ({ ...prev, [name]: true }));
        setModalProps((prev) => ({ ...prev, [name]: props }));
    };

    const closeModal = (name: string) => {
        setModals((prev) => ({ ...prev, [name]: false }));
        setModalProps((prev) => {
            const newProps = { ...prev };
            delete newProps[name];
            return newProps;
        });
    };

    const isModalOpen = (name: string) => {
        return !!modals[name];
    };

    const getModalProps = <T = any,>(name: string): T | undefined => {
        return modalProps[name];
    };

    return (
        <ModalContext.Provider
            value={{
                modals,
                modalProps,
                openModal,
                closeModal,
                isModalOpen,
                getModalProps,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = (): ModalContextProps => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal debe usarse dentro de un ModalProvider");
    }
    return context;
};
