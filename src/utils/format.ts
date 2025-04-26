  // Formateador de números con separadores de miles
export const formatNumber = (number: number) =>
    new Intl.NumberFormat("es-US").format(number || 0);