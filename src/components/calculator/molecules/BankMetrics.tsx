import { Tooltip } from 'components/common/tooltip'
import tw from 'tw-tailwind'
import { formatCurrency, formatPercent } from 'utils/calculator'

export type BankMetricsProps = {
  monthlyPayment: number
  interestRate: number
  totalCost: number
}

export const BankMetrics = ({ monthlyPayment, interestRate, totalCost }: BankMetricsProps) => {
  return (
    <MetricsGrid>
      {/* Miesięczna rata - najważniejsza */}
      <MetricCard className="md:col-span-2">
        <MetricHeader>
          <MetricIcon className="text-3xl">💰</MetricIcon>
          <MetricLabelGroup>
            <MetricLabel>Miesięczna rata</MetricLabel>
            <MetricSubLabel>Kwota do zapłaty co miesiąc</MetricSubLabel>
          </MetricLabelGroup>
        </MetricHeader>
        <Tooltip
          content={
            <span>
              Rata miesięczna to kwota, którą będziesz płacić co miesiąc. Ważne, aby była
              dostosowana do Twojego budżetu. <strong>Czym mniej, tym lepiej.</strong>
            </span>
          }
        >
          <MetricValue className="text-3xl text-blue-600 md:text-4xl">
            {formatCurrency(monthlyPayment)}
          </MetricValue>
        </Tooltip>
      </MetricCard>

      {/* Oprocentowanie */}
      <MetricCard>
        <MetricHeader>
          <MetricIcon>📊</MetricIcon>
          <MetricLabelGroup>
            <MetricLabel>Oprocentowanie</MetricLabel>
            <MetricSubLabel>Stopa procentowa</MetricSubLabel>
          </MetricLabelGroup>
        </MetricHeader>
        <Tooltip
          content={
            <span>
              Oprocentowanie wpływa na wysokość odsetek.{' '}
              <strong>Niższe oprocentowanie oznacza niższe koszty.</strong>
            </span>
          }
        >
          <MetricValue className="text-2xl">{formatPercent(interestRate)}</MetricValue>
        </Tooltip>
      </MetricCard>

      {/* Całkowity koszt */}
      <MetricCard>
        <MetricHeader>
          <MetricIcon>💵</MetricIcon>
          <MetricLabelGroup>
            <MetricLabel>Całkowity koszt</MetricLabel>
            <MetricSubLabel>Suma wszystkich opłat</MetricSubLabel>
          </MetricLabelGroup>
        </MetricHeader>
        <Tooltip
          content={
            <span>
              Całkowity koszt kredytu obejmuje wszystkie odsetki i opłaty.{' '}
              <strong>Im niższy, tym lepiej.</strong>
            </span>
          }
        >
          <MetricValue className="text-2xl">{formatCurrency(totalCost)}</MetricValue>
        </Tooltip>
      </MetricCard>
    </MetricsGrid>
  )
}

const MetricsGrid = tw.div`
  grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4
`

const MetricCard = tw.div`
  backdrop-blur-sm
  bg-linear-to-br from-blue-50/50 to-indigo-50/50
  border border-blue-100/50
  rounded-xl md:rounded-2xl
  p-4 md:p-5
  transition-all duration-300
  hover:shadow-lg hover:border-blue-200
  hover:scale-[1.02]
  cursor-pointer
`

const MetricHeader = tw.div`
  flex items-start gap-3 mb-3
`

const MetricIcon = tw.span`
  text-2xl shrink-0
`

const MetricLabelGroup = tw.div`flex flex-col gap-0.5`

const MetricLabel = tw.span`
  text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide
`

const MetricSubLabel = tw.span`
  text-xs text-gray-500
`

const MetricValue = tw.div`
  font-bold text-gray-900
  transition-all duration-300
  hover:text-blue-600
`
