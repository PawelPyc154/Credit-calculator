import { HipotecznyCalculatorClient } from './HipotecznyCalculatorClient'
import { calculateBankOffers } from 'utils/calculator'
import { banks } from '../../../data/banks'
import type { CalculatorFormData } from 'types/calculator'

// Domyślne wartości formularza - te same co w komponencie klienckim
const defaultFormData: CalculatorFormData = {
  loanAmount: 500000,
  loanPeriod: 25,
  downPayment: 100000,
  monthlyIncome: 8000,
  purpose: 'purchase',
  interestRateType: 'variable',
}

/**
 * Server Component - oblicza wyniki na serwerze z domyślnymi wartościami
 * 
 * WAŻNE DLA SEO:
 * - Wyniki są obliczane na serwerze i renderowane w HTML od razu
 * - Google widzi pełne dane (listę banków) zamiast komunikatu "Brak wyników"
 * - To poprawia indeksowanie i ranking w wyszukiwarkach
 * 
 * Dzięki temu:
 * - Strona ma pełną treść już w pierwszym renderze (SSR)
 * - Użytkownicy widzą wyniki natychmiast, bez czekania na JavaScript
 * - SEO jest znacznie lepsze niż w przypadku Client Component z pustym stanem
 */
export default function HipotecznyCalculatorPage() {
  // Oblicz wyniki na serwerze z domyślnymi wartościami
  // To zapewnia, że dane są dostępne w HTML od razu (SSR)
  const initialResults = calculateBankOffers(defaultFormData, banks)

  return (
    <HipotecznyCalculatorClient
      initialResults={initialResults}
      initialFormData={defaultFormData}
    />
  )
}
