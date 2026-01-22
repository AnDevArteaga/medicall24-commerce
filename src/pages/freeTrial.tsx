import Layout from "../layouts/layout-secondary";
import Register from "../components/freeTrial/register";
import TermCondModal from "../components/modals/term&cond/bexa/term-cond";
import ConfirmData from "../components/modals/paymentGateway/stepOne/confirm-data";
import DomaninVerified from "../components/modals/shared/domain-verified";
import UserRegistered from "../components/modals/paymentGateway/stepOne/user-registered";
import RecoveryPassword from "../components/modals/paymentGateway/stepOne/recovery-password";
import NewUser from "../components/modals/paymentGateway/stepOne/new-user-register";
import CardVinculed from "../components/modals/freeTrial/vinculed-card";
import VinculedCompleted from "../components/modals/freeTrial/vinculed-completed";
import { useModal } from "../contexts/modals";

const FreeTrial: React.FC = () => {
    const { closeModal, isModalOpen, getModalProps } = useModal();
    const termCondProps = getModalProps("termCond");
    return (
        <Layout title="Medicall 24 | Prueba gratis">
            <main className="container mx-auto py-10 px-72">
                <Register />
            </main>
            {isModalOpen("termCond") && termCondProps?.onClose && (
                <TermCondModal {...termCondProps} />
            )} {isModalOpen("confirmData") && (
                <ConfirmData onClose={() => closeModal("confirmData")} />
            )}
            {isModalOpen("newUserRegister") && (
                <NewUser onClose={() => closeModal("newUserRegister")} flow="freeTrial" />
            )}
            {isModalOpen("userRegistered") && (
                <UserRegistered />
            )}
            {isModalOpen("recoveryPassword") && (() => {
                const recoveryProps = getModalProps("recoveryPassword");
                return recoveryProps ? (
                    <RecoveryPassword
                        email={recoveryProps.email}
                        typeId={recoveryProps.typeId}
                        identification={recoveryProps.identification}
                    />
                ) : null;
            })()}
            {isModalOpen("domainVerified") && (
                <DomaninVerified onClose={() => closeModal("domainVerified")} />
            )}
            {isModalOpen("cardVinculed") && (
                <CardVinculed />
            )}
            {isModalOpen("vinculedCompleted") && (
                <VinculedCompleted />
            )}
        </Layout>
    );
};

export default FreeTrial;
