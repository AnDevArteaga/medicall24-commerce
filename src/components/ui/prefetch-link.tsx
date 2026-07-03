import { useCallback, type MouseEvent, type FocusEvent, type TouchEvent } from 'react'
import { Link, useNavigate, type LinkProps } from 'react-router-dom'
import { prefetchRoute } from '../../routes/route-prefetch'
import { setNavPending } from './route-progress'

type PrefetchLinkProps = LinkProps & {
  /** Si true, espera el chunk antes de navegar (evita URL nueva con página vieja) */
  waitForChunk?: boolean
}

/**
 * Link que precarga el chunk de la ruta al hover/focus/touch.
 * Con waitForChunk, asegura que el módulo esté listo antes de cambiar de vista.
 */
function PrefetchLink({
  to,
  onMouseEnter,
  onFocus,
  onTouchStart,
  onClick,
  waitForChunk = true,
  ...rest
}: PrefetchLinkProps) {
  const navigate = useNavigate()
  const path = typeof to === 'string' ? to : (to.pathname ?? '')

  const prefetch = useCallback(() => {
    if (path) void prefetchRoute(path)
  }, [path])

  const handleMouseEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    prefetch()
    onMouseEnter?.(e)
  }

  const handleFocus = (e: FocusEvent<HTMLAnchorElement>) => {
    prefetch()
    onFocus?.(e)
  }

  const handleTouchStart = (e: TouchEvent<HTMLAnchorElement>) => {
    prefetch()
    onTouchStart?.(e)
  }

  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || !waitForChunk || !path) return
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return

    e.preventDefault()
    setNavPending(true)
    try {
      await prefetchRoute(path)
      navigate(to)
    } finally {
      setNavPending(false)
    }
  }

  return (
    <Link
      to={to}
      onMouseEnter={handleMouseEnter}
      onFocus={handleFocus}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
      {...rest}
    />
  )
}

export default PrefetchLink
