import { useModal } from "../contexts/modals";
import { validateDomainEmail } from "../utils/validators";

export const HandleValidateDomainEmail = () => {
    const { openModal } = useModal();

    const validateDomain = (value: string) => {
    const domainValid = validateDomainEmail(value);
    console.log(domainValid);
    if (!domainValid) {
        console.log("Dominio no permitido");
        openModal("domainVerified");
    }}

return validateDomain
};
