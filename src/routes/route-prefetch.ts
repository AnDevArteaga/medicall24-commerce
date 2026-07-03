/** Prefetch de chunks de página para navegación instantánea */

type PrefetchFn = () => Promise<unknown>

const prefetched = new Set<string>()

const routeModules: Record<string, PrefetchFn> = {
  '/': () => import('../pages/index'),
  '/buscar-médico': () => import('../pages/findDoctor'),
  '/Examen-bexa': () => import('../pages/bexa'),
  '/personas': () => import('../pages/peoplePlan'),
  '/ecosistema-medico-360': () => import('../pages/ecosistemaMedico360'),
  '/ecosistema-medico-360/asesoria-legal': () =>
    import('../pages/ecosistemaAsesoriaLegal'),
  '/ecosistema-medico-360/respaldo-tecnologico': () =>
    import('../pages/ecosistemaRespaldoTecnologico'),
  '/software-en-salud': () => import('../pages/softwareEnSalud'),
  '/software-en-salud/prediccion-del-riesgo': () =>
    import('../pages/softwarePrediccionRiesgo'),
  '/software-en-salud/medicion-signos-vitales': () =>
    import('../pages/softwareMedicionSignosVitales'),
  '/software-en-salud/agenda-citas': () => import('../pages/softwareAgendaCitas'),
  '/software-en-salud/telemedicina': () => import('../pages/softwareTelemedicina'),
  '/software-en-salud/historias-clinicas': () =>
    import('../pages/softwareHistoriasClinicas'),
  '/software-en-salud/factura-electronica': () =>
    import('../pages/softwareFacturaElectronica'),
  '/software-en-salud/comercio-electronico': () =>
    import('../pages/softwareComercioElectronico'),
  '/software-en-salud/financiero-contable': () =>
    import('../pages/softwareFinancieroContable'),
  '/software-en-salud/integracion-api': () =>
    import('../pages/softwareIntegracionApi'),
  '/empresas': () => import('../pages/company'),
  '/aliados': () => import('../pages/allies'),
  '/pagos': () => import('../pages/paymentGateway'),
  '/prueba': () => import('../pages/freeTrial'),
  '/consulta-gratis': () => import('../pages/freeConsult'),
  '/consulta-gratis/acceso': () => import('../pages/freeConsultAccess'),
  '/consulta-gratis/agendar': () => import('../pages/freeConsultSchedule'),
  '/consulta-gratis/finalizar': () => import('../pages/freeConsultFinalize'),
  '/prueba-gratuita-especialidades': () =>
    import('../pages/freeTrialSpecialties'),
  '/gestionar-creditos': () => import('../pages/dashboard'),
  '/iniciar-sesion': () => import('../pages/login'),
  '/pqrs': () => import('../pages/pqrs'),
  '/politica-de-privacidad': () => import('../pages/politica-privacidad'),
}

export function prefetchRoute(path: string): Promise<unknown> {
  const normalized = path.split('?')[0].split('#')[0]
  if (prefetched.has(normalized)) return Promise.resolve()

  const loader = routeModules[normalized]
  if (!loader) return Promise.resolve()

  prefetched.add(normalized)
  return loader().catch(() => {
    prefetched.delete(normalized)
  })
}

export function prefetchRoutes(paths: string[]): void {
  paths.forEach((path) => {
    void prefetchRoute(path)
  })
}

export function prefetchSoftwareRoutes(): void {
  prefetchRoutes([
    '/software-en-salud',
    ...Object.keys(routeModules).filter((p) =>
      p.startsWith('/software-en-salud/'),
    ),
  ])
}
