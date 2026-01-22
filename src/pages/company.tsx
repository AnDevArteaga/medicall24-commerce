import React from 'react'
import Layout from '../layouts/layout-secondary';
import PlanInfo from "../components/sections/company/plan-info";
import PlanFeatures from "../components/sections/company/plan-features";
import CabinInfo from "../components/sections/company/cabin-info";
import SEO from '../components/seo/SEO';

const Company: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Planes de Telemedicina para Empresas",
    "description": "Soluciones de telemedicina para empresas. Mejora la salud de tus empleados con consultas médicas virtuales.",
    "category": "Servicios Corporativos de Salud",
    "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "COP"
    }
  };

  return (
    <>
      <SEO
        title="Planes de Telemedicina para Empresas | Medicall24"
        description="Soluciones de telemedicina para empresas. Mejora la salud de tus empleados con consultas médicas virtuales y atención médica corporativa."
        keywords="telemedicina empresas, salud corporativa, planes empresa, beneficios para empleados, medicina ocupacional, salud laboral"
        url="https://medicall24.com.co/empresas"
        schema={schema}
      />
      <Layout title="Medicall 24 | Planes de Telemedicina para Empresas">
      <main>
      <PlanInfo  />
      <PlanFeatures />
      <CabinInfo />
      </main>
    </Layout>
    </>
  )
}

export default Company