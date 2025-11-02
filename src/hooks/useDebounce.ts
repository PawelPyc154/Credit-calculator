import { useEffect, useState } from 'react'

/**
 * Hook do debounce wartości - opóźnia aktualizację wartości o podany czas
 * Przydatny do optymalizacji wydajności przy częstych zmianach (np. slidery, inputy)
 *
 * @param value - Wartość do zdebounce'owania
 * @param delay - Opóźnienie w milisekundach (domyślnie 300ms)
 * @returns Zdebounce'owana wartość
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Ustaw timer do zaktualizowania wartości po opóźnieniu
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup - anuluj timer jeśli wartość zmieni się przed upływem czasu
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
