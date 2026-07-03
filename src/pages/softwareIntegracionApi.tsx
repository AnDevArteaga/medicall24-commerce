import React from 'react'
import LayoutSoftwareSalud from '../layouts/layout-software-salud'
import IntegracionApiAcercaDe from '../components/sections/softwareSalud/integracionApi/acerca-de'
import IntegracionApiIconos from '../components/sections/softwareSalud/integracionApi/iconos'
import SEO from '../components/seo/SEO'

const SoftwareIntegracionApi: React.FC = () => {
  return (
    <>
      <SEO
        title="Integración vía API | Software en salud | Medicall24"
        description="Interoperabilidad con otros sistemas de información mediante integración vía API para acceder a historias clínicas y continuidad de procesos asistenciales."
        keywords="integración API salud, interoperabilidad HCE, software prestadores de salud, Medicall24"
        url="https://medicall24.com.co/software-en-salud/integracion-api"
      />
      <LayoutSoftwareSalud title="Medicall24 | Integración vía API">
        <main>
          <IntegracionApiAcercaDe />
          <IntegracionApiIconos />
        </main>
      </LayoutSoftwareSalud>
    </>
  )
}

export default SoftwareIntegracionApi
