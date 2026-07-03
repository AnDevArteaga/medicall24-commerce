import React from 'react'
import LayoutSoftwareSalud from '../layouts/layout-software-salud'
import SignosVitalesMetodosHero from '../components/sections/softwareSalud/signosVitales/metodos-hero'
import SignosVitalesParametros from '../components/sections/softwareSalud/signosVitales/parametros'
import SEO from '../components/seo/SEO'

const SoftwareMedicionSignosVitales: React.FC = () => {
  return (
    <>
      <SEO
        title="Medición de signos vitales | Software en salud | Medicall24"
        description="Métodos para medir signos vitales: PPG con IA, dispositivos wearables y equipos biomédicos. Parámetros medibles en tiempo real."
        keywords="signos vitales, PPG, wearables, equipos biomédicos, telemedicina, Medicall24"
        url="https://medicall24.com.co/software-en-salud/medicion-signos-vitales"
      />
      <LayoutSoftwareSalud title="Medicall24 | Medición de signos vitales">
        <main>
          <SignosVitalesMetodosHero />
          <SignosVitalesParametros />
        </main>
      </LayoutSoftwareSalud>
    </>
  )
}

export default SoftwareMedicionSignosVitales
