import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const PENDING_EVENT = 'medicall:nav-pending'

export function setNavPending(pending: boolean) {
  window.dispatchEvent(
    new CustomEvent(PENDING_EVENT, { detail: { pending } }),
  )
}

/** Barra superior al cambiar de ruta o mientras se precarga el chunk */
function RouteProgress() {
  const location = useLocation()
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(true)
    const done = window.setTimeout(() => setActive(false), 350)
    return () => window.clearTimeout(done)
  }, [location.pathname])

  useEffect(() => {
    const onPending = (event: Event) => {
      const pending = (event as CustomEvent<{ pending: boolean }>).detail
        ?.pending
      setActive(Boolean(pending))
    }
    window.addEventListener(PENDING_EVENT, onPending)
    return () => window.removeEventListener(PENDING_EVENT, onPending)
  }, [])

  if (!active) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-0.5 overflow-hidden pointer-events-none"
      aria-hidden
    >
      <div className="h-full w-full origin-left animate-[route-progress_0.35s_ease-out] bg-primary" />
    </div>
  )
}

export default RouteProgress
