import React, { useEffect, useState } from "react";
import Layout from "../layouts/layout-secondary";
import Gateway from "../components/paymentGateway/gateway";
import DomaninVerified from "../components/modals/shared/domain-verified";
import UserRegistered from "../components/modals/paymentGateway/stepOne/user-registered";
import TermCond from "../components/modals/term&cond/bexa/term-cond";
import ConfirmData from "../components/modals/paymentGateway/stepOne/confirm-data";
import NewUser from "../components/modals/paymentGateway/stepOne/new-user-register";
import Billing from "../components/modals/paymentGateway/stepTwo/billing";
import SelectAllie from "../components/modals/paymentGateway/stepTwo/select-allie";
import VerifiyEmail from "../components/modals/paymentGateway/stepThree/verifiy-email";
import ErrorPurchase from "../components/modals/paymentGateway/stepThree/error";
import { useModal } from "../contexts/modals";
import { useGetProduct } from "../hooks/useGetProduct";
import { usePurchaseContext } from "../contexts/checkout";


const PaymentGateway: React.FC = () => {
    const { isModalOpen, closeModal, getModalProps } = useModal();
    const termCondProps = getModalProps("termCond");
    const { product } = usePurchaseContext();

    // Estado para controlar el flujo de carga
    const { loading, error } = useGetProduct();
    const [isProductValid, setIsProductValid] = useState(false);

    // UseEffect para verificar si el producto es válido después de la carga
    useEffect(() => {
        if (!loading && !error && product) {
            // Aquí podrías realizar la verificación de que el producto es válido
            // Si es válido, cambia el estado isProductValid a true
            setIsProductValid(true); // Este es un ejemplo, adapta según tu lógica
        }
    }, [loading, error, product]);

    // Función que muestra un spinner mientras se carga
    const renderLoading = () => (
        <div className="flex justify-center items-center">
            <div className="spinner">Cargando...</div>{" "}
            {/* Puedes reemplazar esto con un spinner real */}
        </div>
    );

    // Función que maneja los errores
    const renderError = () => (
        <div className="text-center text-red-600">
            <p>{error || "Ha ocurrido un error."}</p>
        </div>
    );

    return (
        <Layout title="Medicall 24 | Pasarela de pago">
            {/* Mostrar un spinner mientras carga o si hay un error */}
            {loading && renderLoading()}
            {error && renderError()}

            {/* Solo mostramos el flujo principal cuando no hay errores y el producto está disponible */}
            {!loading && !error && isProductValid && (
                <>
                    <main>
                        <Gateway />
                    </main>

                    {/* Modales */}
                    {isModalOpen("domainVerified") && (
                        <DomaninVerified
                            onClose={() => closeModal("domainVerified")}
                        />
                    )}
                    {isModalOpen("userRegistered") && <UserRegistered />}
                    {isModalOpen("termCond") && termCondProps?.onClose && (
                        <TermCond {...termCondProps} />
                    )}
                    {isModalOpen("confirmData") && (
                        <ConfirmData
                            onClose={() => closeModal("confirmData")}
                        />
                    )}
                    {isModalOpen("newUserRegister") && (
                        <NewUser
                            onClose={() => closeModal("newUserRegister")}
                        />
                    )}
                    {isModalOpen("billingData") && (
                        <Billing
                        />
                    )}
                    {isModalOpen("selectAllie") && (
                        <SelectAllie
                        />
                    )}
                    {isModalOpen("verifiyEmail") && (
                        <VerifiyEmail
                        />
                    )}
                    {isModalOpen("errorPurchase") && (
                        <ErrorPurchase
                        />
                    )}
                </>
            )}
        </Layout>
    );
};

export default PaymentGateway;
