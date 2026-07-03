import React from 'react'
import Layout from '../layouts/layout-index'
import EcosistemaHero from '../components/sections/ecosistema/hero'
import SolucionIntegral from '../components/sections/ecosistema/solucion-integral'
import PreciosPlan from '../components/sections/ecosistema/precios-plan'
import SEO from '../components/seo/SEO'

const EcosistemaMedico360: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Ecosistema médico 360',
    description:
      'Solución integral para profesionales de la salud: aseguramiento, asesoría legal y normativa, y respaldo tecnológico.',
    category: 'Servicios de Salud',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'COP',
      price: '149900',
    },
  }

  return (
    <>
      <SEO
        title="Ecosistema médico 360 | Medicall24"
        description="Solución integral para profesionales de la salud: aseguramiento, asesoría legal y normativa, y respaldo tecnológico con aliados estratégicos."
        keywords="ecosistema médico, aseguramiento médico, asesoría legal salud, telemedicina profesionales, Medicall24"
        url="https://medicall24.com.co/ecosistema-medico-360"
        schema={schema}
      />
      <Layout title="Medicall24 | Ecosistema médico 360">
        <main>
          <EcosistemaHero />
          <SolucionIntegral />
          <PreciosPlan />
        </main>
      </Layout>
    </>
  )
}

export default EcosistemaMedico360
