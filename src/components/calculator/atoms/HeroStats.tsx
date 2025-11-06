import tw from 'tw-tailwind'

const stats = [
  { number: '15+', label: 'Banków' },
  { number: '1000+', label: 'Zadowolonych klientów' },
  { number: '100%', label: 'Bezpłatnie' },
] as const

export const HeroStats = () => {
  return (
    <StatsGrid>
      {stats.map((stat) => (
        <StatItem key={stat.label}>
          <StatNumber>{stat.number}</StatNumber>
          <StatLabel>{stat.label}</StatLabel>
        </StatItem>
      ))}
    </StatsGrid>
  )
}

const StatsGrid = tw.div`
  grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto
`

const StatItem = tw.div`
  text-center px-4 py-4 bg-white/10 backdrop-blur-sm rounded-xl
  border border-white/20
  hover:bg-white/20 transition-all duration-300
  hover:scale-105 hover:shadow-xl
  flex flex-col gap-1
`

const StatNumber = tw.div`
  text-2xl md:text-4xl font-bold text-white
`

const StatLabel = tw.div`
  text-xs md:text-sm text-blue-100
`
