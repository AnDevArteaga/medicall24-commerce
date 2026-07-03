import React from 'react'
import LayoutSoftwareSalud from '../layouts/layout-software-salud'
import FinancieroContableHero from '../components/sections/softwareSalud/financieroContable/hero'
import SEO from '../components/seo/SEO'

const SoftwareFinancieroContable: React.FC = () => {
  return (
    <>
      <SEO
        title="Financiero y contable | Software en salud | Medicall24"
        description="Módulo financiero y contable para centralizar y automatizar la gestión financiera de tu prestador de salud."
        keywords="financiero contable salud, cuentas por pagar, cuentas por cobrar, conciliación bancaria, Medicall24"
        url="https://medicall24.com.co/software-en-salud/financiero-contable"
      />
      <LayoutSoftwareSalud title="Medicall24 | Financiero y contable">
        <main>
          <FinancieroContableHero />
        </main>
      </LayoutSoftwareSalud>
    </>
  )
}

export default SoftwareFinancieroContable
