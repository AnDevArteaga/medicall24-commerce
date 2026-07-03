import React from 'react'
import Layout from '../layouts/layout-index'
import RespaldoTecnologicoHero from '../components/sections/ecosistema/respaldo-tecnologico-hero'
import RespaldoTecnologicoFuncionalidades from '../components/sections/ecosistema/respaldo-tecnologico-funcionalidades'
import SEO from '../components/seo/SEO'

const EcosistemaRespaldoTecnologico: React.FC = () => {
  return (
    <>
      <SEO
        title="Respaldo tecnológico | Ecosistema médico 360 | Medicall24"
        description="Plataforma tecnológica de gestión en salud. Infraestructura en la nube, historias clínicas, telemedicina y facturación electrónica conforme a la normativa colombiana."
        keywords="software salud, gestión clínica, telemedicina, historias clínicas electrónicas, RIPS, Medicall24"
        url="https://medicall24.com.co/ecosistema-medico-360/respaldo-tecnologico"
      />
      <Layout title="Medicall24 | Respaldo tecnológico">
        <main>
          <RespaldoTecnologicoHero />
          <RespaldoTecnologicoFuncionalidades />
        </main>
      </Layout>
    </>
  )
}

export default EcosistemaRespaldoTecnologico
