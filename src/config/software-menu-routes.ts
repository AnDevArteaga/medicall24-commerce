export interface SoftwareMenuItem {
  label: string
  href: string
}

export const softwareMenuItems: SoftwareMenuItem[] = [
  {
    label: 'Predicción del riesgo',
    href: '/software-en-salud/prediccion-del-riesgo',
  },
  {
    label: 'Medición de signos vitales',
    href: '/software-en-salud/medicion-signos-vitales',
  },
  {
    label: 'Agenda de citas',
    href: '/software-en-salud/agenda-citas',
  },
  {
    label: 'Telemedicina',
    href: '/software-en-salud/telemedicina',
  },
  {
    label: 'Historias Clínicas Electrónicas',
    href: '/software-en-salud/historias-clinicas',
  },
  {
    label: 'Factura Electrónica',
    href: '/software-en-salud/factura-electronica',
  },
  {
    label: 'Comercio Electrónico',
    href: '/software-en-salud/comercio-electronico',
  },
  {
    label: 'Financiero y contable',
    href: '/software-en-salud/financiero-contable',
  },
  {
    label: 'Integración vía API',
    href: '/software-en-salud/integracion-api',
  },
]
