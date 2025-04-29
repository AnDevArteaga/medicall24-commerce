import { useEffect, useState } from "react";
import { usePurchaseContext } from "../contexts/checkout";
import { fetchAlliesById, fetchAlliesByIdMunicipality } from "../services/supabase/allies";
import { listInstitutionsByIdComplete } from "../services/azure/institutions";
import { getDepartments, getMunicipalities } from "../services/azure/location";
import { isProductPromo } from "../guard/type-product";
import { CodeXProduct } from "../interfaces/product.interface";
import { Ally } from "../interfaces/allies-supabase.interface";
import { Department, Municipality } from "../interfaces/location.interfaces";
import { registerPurchase } from "../interfaces/checkout.interfase";

export const useSelectAllie = () => {
    const { setRegisterPurchase, product } = usePurchaseContext();

    const [loadingAliado, setLoadingAliado] = useState(false);
    const [selectsDisabled, setSelectsDisabled] = useState(false);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
    const [allyProvider, setAllyProvider] = useState<{ id: number; nombre: string }[]>([]);

    // Estado interno para el control de IDs en los selects
    const [selectedValues, setSelectedValues] = useState({
        dpto_institucion: "",
        ciudad_institucion: "",
        nombre_institucion: "",
    });

    // === Servicios ===
    const getInstitutionInfo = async (institutionId: number | string) => {
        const data = await listInstitutionsByIdComplete(institutionId);
        if (!data?.institution) throw new Error("No se pudo obtener la información de la institución");
        return {
            direccion: data.institution.address,
            telefono: data.institution.phone1,
        };
    };

    const loadDepartments = async () => {
        try {
            const dpts = await getDepartments();
            setDepartments(dpts);
            return dpts;
        } catch (error) {
            console.error("Error cargando departamentos:", error);
            return [];
        }
    };

    const loadMunicipalities = async (departmentId: string) => {
        try {
            const muns = await getMunicipalities(departmentId);
            setMunicipalities(muns);
            return muns;
        } catch (error) {
            console.error("Error cargando municipios:", error);
            return [];
        }
    };

    const loadProvidersByMunicipality = async (municipalityId: number) => {
        try {
            const allies = await fetchAlliesByIdMunicipality(municipalityId);
            if (!Array.isArray(allies)) return [];
            const formatted = allies.map((a: Ally) => ({
                id: a.id_aliado,
                nombre: a.nombre_prestador,
            }));
            setAllyProvider(formatted);
            return formatted;
        } catch (error) {
            console.error("Error cargando prestadores:", error);
            setAllyProvider([]);
            return [];
        }
    };

    // === Handlers ===
    const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setSelectedValues(prev => ({ ...prev, [name]: value }));

        if (name === "dpto_institucion") {
            const dpto = departments.find((d) => d.id === value);
            await loadMunicipalities(value);
            setRegisterPurchase((prev: registerPurchase) => ({
                ...prev,
                dpto_institucion: dpto ? dpto.nombre : "",
                ciudad_institucion: "",
                nombre_institucion: "",
                direccion_institucion: "",
                telefono_institucio: "",
            }));
            setAllyProvider([]);
        }

        if (name === "ciudad_institucion") {
            const mun = municipalities.find((m) => m.id === Number(value));
            if (value) {
                await loadProvidersByMunicipality(Number(value));
            }
            setRegisterPurchase((prev: registerPurchase) => ({
                ...prev,
                ciudad_institucion: mun ? mun.nombre : "",
                nombre_institucion: "",
                direccion_institucion: "",
                telefono_institucio: "",
            }));
        }

        if (name === "nombre_institucion") {
            const provider = allyProvider.find((a) => String(a.id) === value);
            try {
                const info = await getInstitutionInfo(value);
                setRegisterPurchase((prev: registerPurchase) => ({
                    ...prev,
                    nombre_institucion: provider ? provider.nombre : "",
                    direccion_institucion: info.direccion,
                    telefono_institucio: info.telefono,
                }));
            } catch (error) {
                console.error("Error obteniendo datos de la institución:", error);
            }
        }
    };

    const handlePromoProduct = async (promoProduct: CodeXProduct) => {
        setLoadingAliado(true);
        try {
            const allyData = await fetchAlliesById(promoProduct.id_aliado);
            if (!allyData) throw new Error("Aliado no encontrado");
            const ally = allyData[0];

            const dpts = await loadDepartments();
            const dpt = dpts.find(d => Number(d.id) === Number(ally.id_departamento));
            if (!dpt) throw new Error("Departamento no encontrado");

            const muns = await loadMunicipalities(dpt.id);
            const mun = muns.find(m => Number(m.id) === Number(ally.id_municipio));
            if (!mun) throw new Error("Municipio no encontrado");

            const info = await getInstitutionInfo(ally.id_aliado);

            // Actualizar estados
            setSelectedValues({
                dpto_institucion: dpt.id,
                ciudad_institucion: String(mun.id),
                nombre_institucion: String(ally.id_aliado),
            });

            setRegisterPurchase((prev: registerPurchase) => ({
                ...prev,
                dpto_institucion: dpt.nombre,
                ciudad_institucion: mun.nombre,
                nombre_institucion: ally.nombre_prestador,
                direccion_institucion: info.direccion,
                telefono_institucio: info.telefono,
            }));

            setAllyProvider([{ id: ally.id_aliado, nombre: ally.nombre_prestador }]);
            setSelectsDisabled(true);
        } catch (error) {
            console.error("Error en producto promocional:", error);
            setSelectsDisabled(false);
        } finally {
            setLoadingAliado(false);
        }
    };

    const handleNormalProduct = async () => {
        setLoadingAliado(true);
        try {
            await loadDepartments();
            setSelectsDisabled(false);
            setRegisterPurchase((prev: registerPurchase) => ({
                ...prev,
                dpto_institucion: "",
                ciudad_institucion: "",
                nombre_institucion: "",
                direccion_institucion: "",
                telefono_institucio: "",
            }));
            setSelectedValues({
                dpto_institucion: "",
                ciudad_institucion: "",
                nombre_institucion: "",
            });
            setAllyProvider([]);
        } catch (error) {
            console.error("Error procesando producto normal:", error);
        } finally {
            setLoadingAliado(false);
        }
    };

    // === Effects ===
    useEffect(() => {
        if (product) {
            if (isProductPromo(product)) {
                handlePromoProduct(product);
            } else {
                handleNormalProduct();
            }
        }
    }, [product]);

    useEffect(() => {
        if (selectedValues.dpto_institucion) {
            loadMunicipalities(selectedValues.dpto_institucion);
        }
    }, [selectedValues.dpto_institucion]);

    return {
        loadingAliado,
        selectsDisabled,
        departments,
        municipalities,
        allyProvider,
        handleSelectChange,
        selectedValues,
    };
};
