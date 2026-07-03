import React from 'react'
import LayoutSoftwareSalud from '../layouts/layout-software-salud'
import HistoriasClinicasHero from '../components/sections/softwareSalud/historiasClinicas/hero'
import HistoriasClinicasTecnologia from '../components/sections/softwareSalud/historiasClinicas/tecnologia'
import SEO from '../components/seo/SEO'

const SoftwareHistoriasClinicas: React.FC = () => {
  return (
    <>
      <SEO
        title="Historias Clínicas Electrónicas | Software en salud | Medicall24"
        description="Historias clínicas electrónicas interoperables en HL7 FHIR. Cumple resoluciones 866 y 1888 de 2025, con apoyo de IA y formatos por especialidad."
        keywords="historias clínicas electrónicas, HCE, HL7 FHIR, resolución 866, Medicall24"
        url="https://medicall24.com.co/software-en-salud/historias-clinicas"
      />
      <LayoutSoftwareSalud title="Medicall24 | Historias Clínicas Electrónicas">
        <main>
          <HistoriasClinicasHero />
          <HistoriasClinicasTecnologia />
        </main>
      </LayoutSoftwareSalud>
    </>
  )
}

export default SoftwareHistoriasClinicas
