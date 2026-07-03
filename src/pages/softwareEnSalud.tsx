import React from 'react'
import LayoutSoftwareSalud from '../layouts/layout-software-salud'
import SoftwareSaludHero from '../components/sections/softwareSalud/hero-banner'
import PlanAccesible from '../components/sections/softwareSalud/plan-accesible'
import CuentaYApp from '../components/sections/softwareSalud/cuenta-y-app'
import SeguridadSlider from '../components/sections/softwareSalud/seguridad-slider'
import SEO from '../components/seo/SEO'

const SoftwareEnSalud: React.FC = () => {
  return (
    <>
      <SEO
        title="Software en salud | Medicall24"
        description="Software esencial en salud para sistematizar la atención. Agenda, telemedicina, historias clínicas electrónicas, facturación e integración vía API."
        keywords="software salud, historias clínicas electrónicas, telemedicina, facturación electrónica salud, Medicall24"
        url="https://medicall24.com.co/software-en-salud"
      />
      <LayoutSoftwareSalud title="Medicall24 | Software en salud">
        <main>
          <SoftwareSaludHero />
          <PlanAccesible />
          <CuentaYApp />
          <SeguridadSlider />
        </main>
      </LayoutSoftwareSalud>
    </>
  )
}

export default SoftwareEnSalud
