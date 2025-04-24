import React  from "react";
import Layout from "../layouts/layout-secondary";
import Gateway from "../components/paymentGateway/gateway";
import DomaninVerified from "../components/modals/shared/domain-verified";
import UserRegistered from "../components/modals/paymentGateway/stepOne/user-registered";
import TermCond from "../components/modals/term&cond/bexa/term-cond";
import ConfirmData from "../components/modals/paymentGateway/stepOne/confirm-data";
import NewUser from "../components/modals/paymentGateway/stepOne/new-user-register";
import { useModal } from "../contexts/modals";


const PaymentGateway: React.FC = () => {
    const { isModalOpen, closeModal, getModalProps } = useModal();
    const termCondProps = getModalProps("termCond");


    return (
        <Layout title="Medicall 24 | Pasarela de pago">
            <main>
                <Gateway />
            </main>
            {isModalOpen("domainVerified") && (
                <DomaninVerified onClose={() => closeModal("domainVerified")} />
            )}
            {isModalOpen("userRegistered") && (
                <UserRegistered />
            )}
            {isModalOpen("termCond") && termCondProps?.onClose && (
                <TermCond {...termCondProps} />
            )}
            {isModalOpen("confirmData") && (
                <ConfirmData onClose={() => closeModal("confirmData")} />
            )}
            {isModalOpen("newUserRegister") && (
                <NewUser onClose={() => closeModal("newUserRegister")} />
            )}
        </Layout>
    );

}
export default PaymentGateway;
