import React from 'react'
import Layout from '../layouts/layout-index'
import Hero from '../components/sections/index/hero'
import TelemedicinaConsultas from '../components/sections/index/telemedicina-consultas'
import Bexa from '../components/sections/index/bexa-service'
// import Main from "../components/sections/index/main";
// import PlanesEmpresa from "../components/sections/index/plan-company";
// import PlanesPersonas from "../components/sections/index/plan-person";
import SEO from '../components/seo/SEO'

const Home: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Medicall24',
    url: 'https://medicall24.com.co',
    description:
      'Plataforma de telemedicina en Colombia. Consulta médica virtual, examen BEXA para detección de masas en mama, planes de salud y atención médica desde casa.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://medicall24.com.co/buscar-médico',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <SEO
        title="Medicall24 | Telemedicina al alcance de todos"
        description="Plataforma de telemedicina en Colombia. Consulta médica virtual, examen BEXA para detección de masas en mama, planes de salud y atención médica desde casa."
        keywords="telemedicina, medicina virtual, consulta médica online, BEXA, examen de mama, salud digital, medicina a domicilio, EPS Colombia, prestadores de salud"
        url="https://medicall24.com.co/"
        schema={schema}
      />
      <Layout title="Medicall24 | Telemedicina al alcance de todos">
        <main>
          <section>
            <Hero />
          </section>
          <section>
            <TelemedicinaConsultas />
          </section>
          {/* <section>
                    <Main />
                </section> */}
          {/* <section>
                    <PlanesPersonas />
                </section> */}
          {/* <section>
                    <PlanesEmpresa />
                </section> */}
          <section>
            <Bexa />
          </section>
        </main>
      </Layout>
    </>
  )
}

export default Home
