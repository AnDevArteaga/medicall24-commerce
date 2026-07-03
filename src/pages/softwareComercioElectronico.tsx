import React from 'react'
import LayoutSoftwareSalud from '../layouts/layout-software-salud'
import ComercioElectronicoHero from '../components/sections/softwareSalud/comercioElectronico/hero'
import ComercioElectronicoMetodosPago from '../components/sections/softwareSalud/comercioElectronico/metodos-pago'
import SEO from '../components/seo/SEO'

const SoftwareComercioElectronico: React.FC = () => {
  return (
    <>
      <SEO
        title="Comercio Electrónico | Software en salud | Medicall24"
        description="Comercio electrónico integrado con Wompi Bancolombia. Monetiza tus servicios en línea y recibe pagos directo en tu cuenta bancaria."
        keywords="comercio electrónico salud, Wompi Bancolombia, pagos en línea, Medicall24"
        url="https://medicall24.com.co/software-en-salud/comercio-electronico"
      />
      <LayoutSoftwareSalud title="Medicall24 | Comercio Electrónico">
        <main>
          <ComercioElectronicoHero />
          <ComercioElectronicoMetodosPago />
        </main>
      </LayoutSoftwareSalud>
    </>
  )
}

export default SoftwareComercioElectronico
