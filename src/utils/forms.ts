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

export const capitalize = (str: string): string => {
  return str
    .split(" ") // Divide el nombre por espacios en palabras
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza la primera letra de cada palabra
    .join(" "); // Une las palabras nuevamente con espacio
};

export const buildFullName = (
  name1: string,
  name2: string,
  lastName1: string,
  lastName2: string
): { fullName: string; fullLastName: string } => {
  const fullName = `${capitalize(name1)} ${capitalize(name2)}`.trim();
  const fullLastName = `${capitalize(lastName1)} ${capitalize(lastName2)}`.trim();
  return {
    fullName,
    fullLastName,
  };
};