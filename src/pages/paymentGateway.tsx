import React, { useState, useEffect } from "react";
import Layout from "../layouts/layout-secondary";
import Gateway from "../components/paymentGateway/gateway";
import DomaninVerified from "../components/modals/shared/domain-verified";
import UserRegistered from "../components/modals/paymentGateway/stepOne/user-registered";
import RecoveryPassword from "../components/modals/paymentGateway/stepOne/recovery-password";
import TermCond from "../components/modals/term&cond/bexa/term-cond";
import ConfirmData from "../components/modals/paymentGateway/stepOne/confirm-data";
import NewUser from "../components/modals/paymentGateway/stepOne/new-user-register";
import Billing from "../components/modals/paymentGateway/stepTwo/billing";
import SelectAllie from "../components/modals/paymentGateway/stepTwo/select-allie";
import SelectAppointment from "../components/modals/paymentGateway/stepTwo/select-allie-bexa";
import VerifiyEmail from "../components/modals/paymentGateway/stepThree/verifiy-email";
import ErrorPurchase from "../components/modals/paymentGateway/stepThree/error";
import ValidateMeddipayCupoModal from "../components/modals/paymentGateway/stepTwo/validate-meddipay-cupo";
import MeddipaySuccessModal from "../components/modals/paymentGateway/stepTwo/meddipay-success";
import MeddipayErrorModal from "../components/modals/paymentGateway/stepTwo/meddipay-error";
import SolicitarCupoMeddipayModal, { Paso } from "../components/modals/paymentGateway/stepTwo/solicitar-cupo-meddipay";
import ConsultationResultModal from "../components/modals/paymentGateway/stepThree/consultation-result";
import { useModal } from "../contexts/modals";
import { useGetProduct } from "../hooks/useGetProduct";
import { usePurchaseContext } from "../contexts/checkout";
import { useBeforeUnload } from "../hooks/useBeforeUnload";
import { registerGestionUsuarioCredito } from "../services/supabase/manage-user-credit";
import { toast } from "react-hot-toast";
import Loader from "../components/ui/loader";

import p1 from "../assets/img/p1.png";
import p2 from "../assets/img/p2.png";
import p3 from "../assets/img/p3.jpeg";


const PaymentGateway: React.FC = () => {
    const { isModalOpen, closeModal, getModalProps, openModal } = useModal();
    const termCondProps = getModalProps("termCond");
    const { product, purchaseData, consultationResult, status } = usePurchaseContext();
    const setIsDirty = useBeforeUnload();
    const [loadingValidate, setLoadingValidate] = useState(false);
    const [hasShownConsultationModal, setHasShownConsultationModal] = useState(false);

    // Verificar si el estado es aprobado
    const isApproved = status?.toLowerCase() === 'aprobada' || status?.toUpperCase() === 'APPROVED';

    // Abrir modal automáticamente cuando haya un resultado de consulta y el estado sea aprobado
    // Solo la primera vez, no si el usuario ya lo cerró
    useEffect(() => {
        if (consultationResult && isApproved && !isModalOpen("consultationResult") && !hasShownConsultationModal) {
            // Esperar un poco para que el usuario vea el cambio de estado
            const timer = setTimeout(() => {
                openModal("consultationResult", { result: consultationResult });
                setHasShownConsultationModal(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [consultationResult, isApproved, openModal, isModalOpen, hasShownConsultationModal]);

    // Estado para controlar el flujo de carga
    const { loading, error } = useGetProduct();

    // Determinar si debemos mostrar el contenido principal
    const shouldShowContent = !loading && !error && product;

    // Handlers para modales de Meddipay
    const handleCancelValidate = () => {
        closeModal("validateMeddipayCupo");
    };

    // Función para capitalizar texto
    const capitalizeText = (text: string): string => {
        if (!text) return "";
        return text
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    };

    const handleValidateCupo = async (creditoAprobado: string) => {
        // Validar que el comprador tenga teléfono
        if (!purchaseData.phone || purchaseData.phone.trim() === "") {
            toast.error("Escribe un número de teléfono para seguir con la validación");
            return;
        }

        // Validar que el crédito aprobado esté presente
        if (!creditoAprobado || creditoAprobado.trim() === "") {
            toast.error("El campo crédito aprobado es obligatorio");
            return;
        }

        setLoadingValidate(true);

        try {
            // Capitalizar todas las palabras de nombres y apellidos
            const nombresCapitalizados = purchaseData.names
                ?.split(" ")
                .map(nombre => capitalizeText(nombre.trim()))
                .filter(nombre => nombre.length > 0)
                .join(" ") || "";
            
            const apellidosCapitalizados = purchaseData.lastNames
                ?.split(" ")
                .map(apellido => capitalizeText(apellido.trim()))
                .filter(apellido => apellido.length > 0)
                .join(" ") || "";
            
            // Combinar nombres y apellidos capitalizados
            const nombreCompleto = `${nombresCapitalizados} ${apellidosCapitalizados}`.trim().replace(/\s+/g, " ");

            const dataToSend = {
                tipoId: purchaseData.typeId || "",
                identificacion: parseInt(purchaseData.identification || "0", 10),
                nombre_comprador: nombreCompleto,
                correo_comprador: purchaseData.email || "",
                telefono_comprador: parseInt(purchaseData.phone || "0", 10),
                gestionado: false,
                credito_aprobado: creditoAprobado.trim(),
            };

            const status = await registerGestionUsuarioCredito(dataToSend);

            if (status === 201 || status === 200) {
                closeModal("validateMeddipayCupo");
                openModal("meddipaySuccess");
            } else {
                throw new Error("Error al enviar la solicitud");
            }
        } catch (error: unknown) {
            const errorMsg = error instanceof Error 
                ? error.message 
                : "Error al enviar la solicitud. Por favor intenta nuevamente.";
            closeModal("validateMeddipayCupo");
            closeModal("meddipaySuccess");
            openModal("meddipayError", { error: errorMsg });
        } finally {
            setLoadingValidate(false);
        }
    };

    const handleSuccessContinue = () => {
        closeModal("meddipaySuccess");
    };

    const handleErrorClose = () => {
        // Cerrar todos los modales
        closeModal("meddipayError");
        closeModal("validateMeddipayCupo");
        closeModal("meddipaySuccess");
    };

    const handleCancelSolicitarCupo = () => {
        closeModal("solicitarCupoMeddipay");
    };

    const handleGoToMeddipay = () => {
        window.open("https://www.meddipay.com.co/", "_blank", "noopener,noreferrer");
    };

    // Datos de los pasos para el modal de solicitar cupo
    const pasosSolicitarCupo: Paso[] = [
        {
            numero: 1,
            texto: "Dirígete a la plataforma <strong>Meddipay</strong> e ingresa a la opción <strong>solicita tu cupo</strong>.",
            imagen: p1, 
        },
        {
            numero: 2,
            texto: "Si aún no estás registrado completa el registro y luego <strong>inicia sesión</strong>.",
            imagen: p2, 
        },
        {
            numero: 3,
            texto: "Completa el formulario para <strong>solicitar tu crédito</strong> y luego regresa al comercio para <strong>validar el cupo</strong> aprobado.",
            imagen: p3, 
        },
    ];

    const errorProps = getModalProps<{ error: string }>("meddipayError");

    // Mostrar loader de inmediato si está cargando
    if (loading) {
        return (
            <Layout title="Medicall24 | Pasarela de pago">
                <div className="flex justify-center items-center h-screen">
                    <Loader />
                </div>
            </Layout>
        );
    }

    // Mostrar error si hay uno
    if (error) {
        return (
            <Layout title="Medicall24 | Pasarela de pago">
                <div className="flex justify-center items-center h-screen">
                    <div className="text-center text-red-600">
                        <p>{error || "Ha ocurrido un error."}</p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Medicall24 | Pasarela de pago">
            {/* Solo mostramos el flujo principal cuando no hay errores y el producto está disponible */}
            {shouldShowContent && (
                <>
                    <main onChange={() => setIsDirty(true)}>
                        <Gateway />
                    </main>

                    {/* Modales */}
                    {isModalOpen("domainVerified") && (
                        <DomaninVerified
                            onClose={() => closeModal("domainVerified")}
                        />
                    )}
                    {isModalOpen("userRegistered") && <UserRegistered />}
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
                            flow="purchase"
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
                    {isModalOpen("selectAllieBexa") && (
                        <SelectAppointment
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

                    {/* Modales de Meddipay */}
                    {isModalOpen("validateMeddipayCupo") && (
                        <ValidateMeddipayCupoModal
                            purchaseData={purchaseData}
                            onCancel={handleCancelValidate}
                            onValidate={handleValidateCupo}
                            loading={loadingValidate}
                        />
                    )}

                    {isModalOpen("meddipaySuccess") && (
                        <MeddipaySuccessModal onContinue={handleSuccessContinue} />
                    )}

                    {isModalOpen("meddipayError") && errorProps && (
                        <MeddipayErrorModal
                            error={errorProps.error || "Error desconocido"}
                            onClose={handleErrorClose}
                        />
                    )}

                    {isModalOpen("solicitarCupoMeddipay") && (
                        <SolicitarCupoMeddipayModal
                            pasos={pasosSolicitarCupo}
                            onCancel={handleCancelSolicitarCupo}
                            onGoToMeddipay={handleGoToMeddipay}
                        />
                    )}

                    {/* Modal de resultado de consultación */}
                    {isModalOpen("consultationResult") && (() => {
                        const consultationProps = getModalProps<{ result: { status?: number; data?: unknown } }>("consultationResult");
                        return consultationProps ? (
                            <ConsultationResultModal
                                result={consultationProps.result}
                                onClose={() => {
                                    closeModal("consultationResult");
                                    setHasShownConsultationModal(true); // Marcar como mostrado cuando el usuario lo cierra
                                }}
                            />
                        ) : null;
                    })()}

                </>
            )}
        </Layout>
    );
};

export default PaymentGateway;
