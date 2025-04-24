import React from 'react'
import Layout from '../layouts/layout-secondary';
import PlanInfo from "../components/sections/company/plan-info";
import PlanFeatures from "../components/sections/company/plan-features";
import CabinInfo from "../components/sections/company/cabin-info";

const Company: React.FC = () => {
  return (
    <Layout title="Medicall 24 | Planes de Telemedicina para Empresas">
      <main>
      <PlanInfo  />
      <PlanFeatures />
      <CabinInfo />
      </main>
    </Layout>
  )
}

export default Company