// Función para actualizar el error en un campo específico
export const setFieldError = (
    name: string,
    errorMessage: string | null,
    setErrors: React.Dispatch<
        React.SetStateAction<Record<string, string | null>>
    >,
) => {
    setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessage,
    }));
};


//Funcion para asignar clases a los campos de un formulario, dependiendo si tienen valor en un estado o no -- Requerida
type ObjectWithFields = Record<string, any>;

export const getInputClass = (
  object: ObjectWithFields,
  field: string,
  validClass: string,  
  invalidClass: string 
): string => {
  return object[field] && object[field] !== "" ? validClass : invalidClass;
};
