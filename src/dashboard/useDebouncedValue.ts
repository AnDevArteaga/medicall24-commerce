import { useState, useEffect } from 'react'

/**
 * Devuelve un valor debounced para usarlo en query keys (búsqueda en BD).
 * Así no se dispara una petición por cada tecla.
 */
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState<T>(value)

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(t)
  }, [value, delayMs])

  return debounced
}
