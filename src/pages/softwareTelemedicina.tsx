import React from 'react'
import LayoutSoftwareSalud from '../layouts/layout-software-salud'
import TelemedicinaHero from '../components/sections/softwareSalud/telemedicina/hero'
import TelemedicinaModalidades from '../components/sections/softwareSalud/telemedicina/modalidades'
import SEO from '../components/seo/SEO'

const SoftwareTelemedicina: React.FC = () => {
  return (
    <>
      <SEO
        title="Telemedicina | Software en salud | Medicall24"
        description="Herramienta de telemedicina con videollamadas cifradas, calidad HD y cumplimiento de la resolución 2654 de 2019."
        keywords="telemedicina, videollamadas médicas, resolución 2654, Medicall24"
        url="https://medicall24.com.co/software-en-salud/telemedicina"
      />
      <LayoutSoftwareSalud title="Medicall24 | Telemedicina">
        <main>
          <TelemedicinaHero />
          <TelemedicinaModalidades />
        </main>
      </LayoutSoftwareSalud>
    </>
  )
}

export default SoftwareTelemedicina
