// Función para alternar la visibilidad de cualquier campo de contraseña
export const togglePasswordVisibility = (
    field: string,
    showPasswordState: boolean,
    setShowPasswordState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (field === "password") {
      setShowPasswordState(!showPasswordState);  // Alterna visibilidad para el campo de contraseña
    } else if (field === "confirmPassword") {
      setShowPasswordState(!showPasswordState);  // Alterna visibilidad para el campo de confirmación de contraseña
    }
  };
// Función para comprobar si una confirmación de la contraseña coincide
export const checkPasswordMatch = (
    password: string,
    confirmPassword: string,
): boolean => {
    return password === confirmPassword;
};
