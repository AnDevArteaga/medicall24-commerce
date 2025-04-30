import { useState, useEffect } from "react";
import { CodeXProduct } from "../interfaces/product.interface";
import { useModal } from "../contexts/modals";
import { usePurchaseContext } from "../contexts/checkout";

export const useCodePromo = (
    idProduct: number,
    codes: CodeXProduct[],
    valor_cop: number,
    codigoInicial: string,
) => {
    const [codeValid, setCodeValid] = useState<boolean>(false);
    const [codeFounded, setCodeFounded] = useState<CodeXProduct | null>(null);
    const [inputCode, setInputCode] = useState<string>(codigoInicial);
    const [discount, setDiscount] = useState<number>(0);
    const [discountValue, setDiscountValue] = useState<number>(0);
    const [totalWithDiscount, setTotalWithDiscount] = useState<number>(valor_cop);
    const { openModal } = useModal();
    const { setQueryParam } = usePurchaseContext();


    useEffect(() => {
        if (codigoInicial) {
            validateCode(codigoInicial);
        }
      }, [codigoInicial]);

    const validateCode = (code: string) => {
        if (!code) return;
        const CodeClear = code.trim().toUpperCase();

        const codeAplicabble = codes.find(
            (c) =>
                c.id_producto === idProduct &&
                c.cod_promo.trim().toUpperCase() === CodeClear,
        );

        if (codeAplicabble) {
            const percentaje = codeAplicabble.procentaje_descuento_compra ?? 0;
            const valorDescuento = Math.floor((valor_cop * percentaje) / 100);
            const totalFinal = valor_cop - valorDescuento;
            setCodeValid(true);
            setCodeFounded(codeAplicabble);
            setDiscount(percentaje);
            setDiscountValue(valorDescuento);
            setTotalWithDiscount(totalFinal);
            setQueryParam({ id_producto: idProduct.toString(), code: codeAplicabble.cod_promo });
        } else {
            resetCodigo();
            openModal("codeInvalid");
        }
    };

    const resetCodigo = () => {
        setCodeValid(false);
        setCodeFounded(null);
        setDiscount(0);
        setDiscountValue(0);
        setTotalWithDiscount(valor_cop);
        setQueryParam({ id_producto: "", code: "" });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputCode(e.target.value);
    }
    
      const handleValidate = () => {
        validateCode(inputCode);
      };

    return {
        isValidCode: codeValid,
        code: codeFounded,
        validateCode,
        resetCodigo,
        handleInputChange,
        handleValidate,
        inputCode,
        discount,
        discountValue,
        totalWithDiscount
    };
};
