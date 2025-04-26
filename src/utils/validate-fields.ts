import { Validations } from "../interfaces/validations.interface";

interface Field {
    [key: string]: any;
}

export const validateFields = (
    obj: Field,
    requiredFields: string[],
    state?: boolean, // El estado opcional para validar
): boolean => {
    //Si el estado es `false`, retornamos `false`
    if (!state) {
        return false;
    }

    // Si el estado es `true` y los campos están completos, retornamos `true`, si no, `false`
    if (state) {
        // Primero, validamos que todos los campos requeridos tengan valor
        for (const field of requiredFields) {
            const fieldParts = field.split("."); // Para campos anidados
            let value = obj;

            // Recorremos el objeto para acceder a los campos anidados
            for (const part of fieldParts) {
                value = value ? value[part] : null; // Si el valor es nulo en cualquier parte del camino, termina
            }

            // Si algún campo está vacío o no tiene valor, retornamos `false`
            if (!value || value === null || value === undefined) {
                return false;
            }
        }
        // Si todos los campos están completos y el estado es `true`, retornamos `true`
        return true;
    }

    // Si no se pasa el estado, simplemente validamos los campos
    for (const field of requiredFields) {
        const fieldParts = field.split("."); // Para campos anidados
        let value = obj;

        // Recorremos el objeto para acceder a los campos anidados
        for (const part of fieldParts) {
            value = value ? value[part] : null; // Si el valor es nulo en cualquier parte del camino, termina
        }

        // Si algún campo está vacío o no tiene valor, retornamos `false`
        if (!value || value === null || value === undefined) {
            return false;
        }
    }

    // Si todos los campos están completos, retornamos `true`
    return true;
};
// Función que valida si todas las claves en "campos" son verdaderas en el objeto de validaciones
export const validateStates = (obj: Validations, campos: (keyof Validations)[]): boolean => {
    return campos.every((campo) => obj[campo] === true);
};