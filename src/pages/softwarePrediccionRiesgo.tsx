import React from 'react'
import LayoutSoftwareSalud from '../layouts/layout-software-salud'
import PrediccionRiesgoHero from '../components/sections/softwareSalud/prediccionRiesgo/hero'
import PrediccionRiesgoEncuestas from '../components/sections/softwareSalud/prediccionRiesgo/encuestas'
import SEO from '../components/seo/SEO'

const SoftwarePrediccionRiesgo: React.FC = () => {
  return (
    <>
      <SEO
        title="Predicción del riesgo | Software en salud | Medicall24"
        description="Herramienta de predicción de riesgo en salud con IA. Identifica, evalúa y predice el riesgo en salud de la población con encuestas y segmentación."
        keywords="predicción riesgo salud, IA salud, encuestas riesgo cardiovascular, Medicall24"
        url="https://medicall24.com.co/software-en-salud/prediccion-del-riesgo"
      />
      <LayoutSoftwareSalud title="Medicall24 | Predicción del riesgo">
        <main>
          <PrediccionRiesgoHero />
          <PrediccionRiesgoEncuestas />
        </main>
      </LayoutSoftwareSalud>
    </>
  )
}

export default SoftwarePrediccionRiesgo
