import React from 'react'
import LayoutSoftwareSalud from '../layouts/layout-software-salud'
import AgendaCitasHero from '../components/sections/softwareSalud/agendaCitas/hero'
import AgendaCitasEcommerce from '../components/sections/softwareSalud/agendaCitas/ecommerce'
import SEO from '../components/seo/SEO'

const SoftwareAgendaCitas: React.FC = () => {
  return (
    <>
      <SEO
        title="Agenda de citas | Software en salud | Medicall24"
        description="Agenda de citas desde la App y autogestión desde el ecommerce. Calendario interactivo, selección de horarios y modalidad presencial o telemedicina."
        keywords="agenda citas, software salud, telemedicina, ecommerce salud, Medicall24"
        url="https://medicall24.com.co/software-en-salud/agenda-citas"
      />
      <LayoutSoftwareSalud title="Medicall24 | Agenda de citas">
        <main>
          <AgendaCitasHero />
          <AgendaCitasEcommerce />
        </main>
      </LayoutSoftwareSalud>
    </>
  )
}

export default SoftwareAgendaCitas
