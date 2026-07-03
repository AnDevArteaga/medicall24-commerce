import React from 'react'
import LayoutSoftwareSalud from '../layouts/layout-software-salud'
import FacturaElectronicaHero from '../components/sections/softwareSalud/facturaElectronica/hero'
import FacturaElectronicaProcedimientos from '../components/sections/softwareSalud/facturaElectronica/procedimientos'
import SEO from '../components/seo/SEO'

const SoftwareFacturaElectronica: React.FC = () => {
  return (
    <>
      <SEO
        title="Factura Electrónica | Software en salud | Medicall24"
        description="Factura de venta electrónica integrada con DIAN y Ministerio de Salud. RIPS en formato JSON y validación SISPRO."
        keywords="factura electrónica salud, RIPS JSON, DIAN, SISPRO, Medicall24"
        url="https://medicall24.com.co/software-en-salud/factura-electronica"
      />
      <LayoutSoftwareSalud title="Medicall24 | Factura Electrónica">
        <main>
          <FacturaElectronicaHero />
          <FacturaElectronicaProcedimientos />
        </main>
      </LayoutSoftwareSalud>
    </>
  )
}

export default SoftwareFacturaElectronica
