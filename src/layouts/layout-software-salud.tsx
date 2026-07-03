import React, { useEffect } from 'react'
import HeaderSoftwareSalud from '../components/layouts/header-software-salud'
import Footer from '../components/layouts/footer'
import { prefetchSoftwareRoutes } from '../routes/route-prefetch'

interface LayoutProps {
  title: string
  children: React.ReactNode
}

const LayoutSoftwareSalud: React.FC<LayoutProps> = ({ title, children }) => {
  useEffect(() => {
    document.title = title
  }, [title])

  // Precarga las subrutas para navegación instantánea del menú
  useEffect(() => {
    const timer = window.setTimeout(() => prefetchSoftwareRoutes(), 300)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderSoftwareSalud />
      <main className="flex-1 bg-gray-50">{children}</main>
      <Footer />
    </div>
  )
}

export default LayoutSoftwareSalud
