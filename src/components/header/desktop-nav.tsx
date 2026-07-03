import React from 'react'
import { useLocation } from 'react-router-dom'
import PrefetchLink from '../ui/prefetch-link'

interface NavItem {
  href: string
  label: string
}

interface Props {
  navItems: NavItem[]
}

const DesktopNav: React.FC<Props> = ({ navItems }) => {
  const location = useLocation()

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  return (
    <ul className="flex items-center gap-8 lg:gap-10 xl:gap-12 text-sm lg:text-base font-medium text-gray-600">
      {navItems.map((item) => (
        <li key={item.href}>
          <PrefetchLink
            to={item.href}
            className={`transition-colors text-lg lg:text-base xl:text-base hover:text-primary ${
              isActive(item.href)
                ? 'text-primary font-semibold'
                : 'text-gray-600'
            }`}
          >
            {item.label}
          </PrefetchLink>
        </li>
      ))}
    </ul>
  )
}

export default DesktopNav
