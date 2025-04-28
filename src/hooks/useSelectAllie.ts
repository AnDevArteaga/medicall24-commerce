import { useEffect, useState } from "react";
import { usePurchaseContext } from "../contexts/checkout";
import { fetchAlliesById } from "../services/supabase/allies";
import { listInstitutionsByIdComplete } from "../services/azure/institutions";
import { getDepartments, getMunicipalities } from "../services/azure/location";
import { isProductPromo } from "../guard/type-product";
import { Product, CodeXProduct } from "../interfaces/product.interface";
import { Ally } from "../interfaces/allies-supabase.interface";
import { Department, Municipality } from "../interfaces/location.interfaces";

export const useSelectAllie = () => {
    const { setRegisterPurchase, registerPurchase, product } = usePurchaseContext();
    const [loadingAliado, setLoadingAliado] = useState(false);
    const [selectsDisabled, setSelectsDisabled] = useState(false);
    const [ally, setAlly] = useState<Ally | null>(null);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [municipalities, setMunicipalities] = useState<Municipality[]>([]);

    // Obtener la info de una institución desde Azure
    const getInstitutionInfo = async (institution: string | number) => {
        const data = await listInstitutionsByIdComplete(institution);
        if (!data) throw new Error('No se pudo obtener la información de la institución');
        return {
            direccion: data.address,
            telefono: data.phone1,
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

    const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;

        setRegisterPurchase((prev: any) => ({ ...prev, [name]: value }));

        if (name === "dpto_institucion") {
            // Cuando selecciona departamento, traer municipios
            await loadMunicipalities(value);
            setRegisterPurchase((prev: any) => ({
                ...prev,
                ciudad_institucion: '',
                nombre_institucion: '',
                direccion_institucion: '',
                telefono_institucion: '',
            }));
        }

        if (name === "ciudad_institucion") {
            // Buscar prestador cuando selecciona municipio
            if (ally) {
                const prestador = ally.nombre_prestador;
                setRegisterPurchase((prev: any) => ({
                    ...prev,
                    nombre_institucion: prestador,
                }));
            }
        }

        if (name === "nombre_institucion") {
            // Buscar dirección y teléfono al seleccionar prestador
            try {
                const info = await getInstitutionInfo(value);
                setRegisterPurchase((prev: any) => ({
                    ...prev,
                    direccion_institucion: info.direccion,
                    telefono_institucion: info.telefono,
                }));
            } catch (error) {
                console.error("Error obteniendo datos de la institución:", error);
            }
        }
    };

    const handlePromoProduct = async (promoProduct: CodeXProduct) => {
        try {
            setLoadingAliado(true);
            const allyData = await fetchAlliesById(promoProduct.id_aliado);
            setAlly(allyData);

            const dpts = await getDepartments();
            const dpt = dpts.find((d) => Number(d.id) === allyData.id_departamento);

            const muns = await getMunicipalities(String(allyData.id_departamento));
            const mun = muns.find((m) => m.id === allyData.id_municipio);

            if (!dpt || !mun) throw new Error('Departamento o municipio no encontrado');

            const info = await getInstitutionInfo(promoProduct.id_aliado);

            setRegisterPurchase((prev: any) => ({
                ...prev,
                dpto_institucion: dpt.nombre,
                ciudad_institucion: mun.nombre,
                nombre_institucion: allyData.nombre_prestador,
                direccion_institucion: info.direccion,
                telefono_institucion: info.telefono,
            }));
            setSelectsDisabled(true);
        } catch (error) {
            console.error("Error procesando producto promocional:", error);
            setSelectsDisabled(false);
        } finally {
            setLoadingAliado(false);
        }
    };

    const handleNormalProduct = async () => {
        await loadDepartments();
        setSelectsDisabled(false);
        setRegisterPurchase((prev: any) => ({
            ...prev,
            dpto_institucion: '',
            ciudad_institucion: '',
            nombre_institucion: '',
            direccion_institucion: '',
            telefono_institucion: '',
        }));
    };

    useEffect(() => {
        if (product) {
            if (isProductPromo(product)) {
                console.log('es promocional', product)
                handlePromoProduct(product);
            } else {
                console.log('no es promocional', product)
                handleNormalProduct();
            }
        }
    }, [product]);

    useEffect(() => {
        if (registerPurchase.dpto_institucion) {
            loadMunicipalities(registerPurchase.dpto_institucion);
        }
    }, [registerPurchase.dpto_institucion]);

    return {
        loadingAliado,
        selectsDisabled,
        departments,
        municipalities,
        handleSelectChange,
    };
};
