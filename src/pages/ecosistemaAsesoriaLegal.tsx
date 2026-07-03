import React from 'react'
import Layout from '../layouts/layout-index'
import AsesoriaLegalHero from '../components/sections/ecosistema/asesoria-legal-hero'
import AsesoriaLegalLogin from '../components/sections/ecosistema/asesoria-legal-login'
import SEO from '../components/seo/SEO'

const EcosistemaAsesoriaLegal: React.FC = () => {
  return (
    <>
      <SEO
        title="Asesorías legales y normativas | Ecosistema médico 360 | Medicall24"
        description="Plataforma interactiva de asesorías legales y normativas para médicos profesionales independientes. Capacitaciones y talleres virtuales."
        keywords="asesoría legal médica, normativa salud Colombia, ética médica, telemedicina legal, Medicall24"
        url="https://medicall24.com.co/ecosistema-medico-360/asesoria-legal"
      />
      <Layout title="Medicall24 | Asesorías legales y normativas">
        <main>
          <AsesoriaLegalHero />
          <AsesoriaLegalLogin />
        </main>
      </Layout>
    </>
  )
}

export default EcosistemaAsesoriaLegal
