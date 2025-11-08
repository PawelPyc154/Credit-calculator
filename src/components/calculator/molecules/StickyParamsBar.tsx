import tw from 'tw-tailwind'
import { formatCurrencyNoCents } from 'utils/calculator'

export type StickyParamsBarProps = {
  loanAmount: number
  loanPeriod: number
  downPayment: number
  onEditClick: () => void
}

export const StickyParamsBar = ({
  loanAmount,
  loanPeriod,
  downPayment,
  onEditClick,
}: StickyParamsBarProps) => {
  return (
    <StickyBar>
      <StickyContent>
        <StickyParams>
          <ParamChip>
            <ParamLabel>Kredyt:</ParamLabel>
            <ParamValue>{formatCurrencyNoCents(loanAmount)}</ParamValue>
          </ParamChip>
          <ParamDivider>•</ParamDivider>
          <ParamChip>
            <ParamLabel>Okres:</ParamLabel>
            <ParamValue>{loanPeriod} lat</ParamValue>
          </ParamChip>
          <ParamDivider>•</ParamDivider>
          <ParamChip>
            <ParamLabel>Wkład:</ParamLabel>
            <ParamValue>{formatCurrencyNoCents(downPayment)}</ParamValue>
          </ParamChip>
        </StickyParams>
        <EditButton onClick={onEditClick}>
          <EditIcon>✏️</EditIcon>
          <EditButtonText>Zmień</EditButtonText>
        </EditButton>
      </StickyContent>
    </StickyBar>
  )
}

const StickyBar = tw.div`fixed top-0 left-0 right-0 bg-white shadow-lg border-b border-gray-200 z-50 animate-in slide-in-from-top duration-300`
const StickyContent = tw.div`max-w-6xl mx-auto px-3 py-2 md:px-4 md:py-3 flex items-center justify-between gap-2 md:gap-4 flex-wrap md:flex-nowrap`
const StickyParams = tw.div`flex items-center gap-2 md:gap-3 flex-wrap text-xs md:text-sm`
const ParamChip = tw.div`flex items-center gap-1 md:gap-2 bg-blue-50 px-2 py-1 md:px-3 md:py-1.5 rounded-lg whitespace-nowrap`
const ParamLabel = tw.span`text-xs md:text-xs text-gray-600 font-medium hidden md:inline`
const ParamValue = tw.span`text-xs md:text-sm font-bold text-blue-600`
const ParamDivider = tw.span`text-gray-400 hidden md:inline`
const EditButton = tw.button`flex items-center gap-1 md:gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-semibold transition-colors whitespace-nowrap shrink-0`
const EditIcon = tw.span`text-sm md:text-base`
const EditButtonText = tw.span`hidden sm:inline`
