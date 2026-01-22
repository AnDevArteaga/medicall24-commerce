  // Formateador de números con separadores de miles
  export const formatNumber = (number: number | string): string => {
    const value = typeof number === "string" ? Number(number) : number;
    return new Intl.NumberFormat("es-US").format(value || 0);
  };

  export const capitalize = (value: string) => {
    if (value === null || value === undefined) return '';
    const str = String(value);
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
