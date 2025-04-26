
// Validar que el campo sea solo números
export const validateNumbers = (value: string): boolean => {
  const regex = /^[0-9]+$/; // Solo números
  return regex.test(value);
};

// Bloqueo de letras, solo permite números
export const validateNumbersForce = (value: string) => {
  return value.replace(/[^0-9]/g, "");
};
// Validar correo electrónico
export const validateEmail = (value: string): boolean => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(value);
};

export const validateDomainEmail = (value: string) => {
  console.log(value);
  const domainValid = [
    "@yahoo.es",
    "@hotmail.com",
    "@gmail.com",
    "@emepece.com",
    "@yahoo.com",
    "@correo.unicordoba.edu.co",
    "@outlook.com",
    "@hotmail.es",
    "@prospectivus.co",
    "@live.com",
    "@outlook.es",
    "@nuevaeps.com.co",
  ];
  // Extraer la parte del dominio después del @
  const domain = value.substring(value.indexOf("@"));
  console.log(domain);
  if (!domainValid.includes(domain)) {
    return false;
  }
  return true;
};



// Validar la longitud de caracteres (minimo y máximo)
export const validateLength = (
  value: string,
  minLength: number,
  maxLength: number,
): boolean => {
  return value.length >= minLength && value.length <= maxLength;
};

// Validar si es un número positivo
export const validatePositiveNumber = (value: string): boolean => {
  const regex = /^[+]?\d*\.?\d+$/; // Permite números decimales positivos
  return regex.test(value);
};
