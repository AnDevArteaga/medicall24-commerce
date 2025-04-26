import { useModal } from "../contexts/modals";
import { validateDomainEmail } from "../utils/validators";

export const HandleValidateDomainEmail = (value: string) => {
    const { openModal } = useModal();
    const domainValid = validateDomainEmail(value);
    console.log(domainValid);
    if (!domainValid) {
        console.log("Dominio no permitido");
        openModal("domainVerified");
    }
    return domainValid;
};
