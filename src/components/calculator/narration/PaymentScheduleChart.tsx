'use client'

import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Tooltip as ChartTooltip,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
import tw from 'tw-tailwind'
import { formatCurrencyNoCents } from 'utils/calculator'

// Rejestrujemy komponenty Chart.js
ChartJS.register(
  BarController,
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
  Filler,
)

type PaymentScheduleChartProps = {
  schedule: Array<{
    month: number
    payment: number
    principal: number
    interest: number
    remaining: number
  }>
  loanTermMonths: number
}

export function PaymentScheduleChart({ schedule, loanTermMonths }: PaymentScheduleChartProps) {
  // Przygotuj dane do wykresu - pokazujemy co 6 miesiąc (lub częściej dla krótszych kredytów)
  const step = loanTermMonths > 60 ? 6 : loanTermMonths > 24 ? 3 : 1
  const labels: string[] = []
  const remainingData: number[] = []
  const principalData: number[] = []
  const interestData: number[] = []

  for (let i = 0; i < schedule.length; i += step) {
    const payment = schedule[i]
    if (payment) {
      labels.push(`M${payment.month}`)
      remainingData.push(payment.remaining)
      principalData.push(payment.principal)
      interestData.push(payment.interest)
    }
  }

  // Dodaj ostatnią ratę jeśli nie została dodana
  if (schedule.length > 0) {
    const lastPayment = schedule[schedule.length - 1]
    if (lastPayment && labels[labels.length - 1] !== `M${lastPayment.month}`) {
      labels.push(`M${lastPayment.month}`)
      remainingData.push(lastPayment.remaining)
      principalData.push(lastPayment.principal)
      interestData.push(lastPayment.interest)
    }
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          font: {
            size: 11,
            weight: 'bold' as const,
          },
          padding: 12,
          boxWidth: 18,
          usePointStyle: true,
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: (context: any) => {
            const value = context.parsed.y
            if (value === null || value === undefined) return ''
            return `${context.dataset.label}: ${formatCurrencyNoCents(value)}`
          },
        },
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Kwota',
          font: {
            size: 11,
            weight: 'bold' as const,
          },
        },
        ticks: {
          callback: (value: any) => formatCurrencyNoCents(value as number),
          font: {
            size: 9,
          },
          maxTicksLimit: 6,
        },
        grid: {
          color: 'rgba(99, 102, 241, 0.15)',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Kapitał i odsetki',
          font: {
            size: 11,
            weight: 'bold' as const,
          },
        },
        ticks: {
          callback: (value: any) => formatCurrencyNoCents(value as number),
          font: {
            size: 9,
          },
          maxTicksLimit: 6,
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          font: {
            size: 8,
          },
          maxTicksLimit: 12,
        },
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  }

  return (
    <ChartCard>
      <ChartContainer>
        <Chart
          type="bar"
          data={{
            labels,
            datasets: [
              {
                type: 'line' as const,
                label: 'Pozostała kwota',
                data: remainingData,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.12)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                borderWidth: 2,
                yAxisID: 'y',
              },
              {
                type: 'bar' as const,
                label: 'Kapitał',
                data: principalData,
                backgroundColor: 'rgba(16, 185, 129, 0.7)',
                borderColor: '#10b981',
                borderWidth: 1,
                yAxisID: 'y1',
              },
              {
                type: 'bar' as const,
                label: 'Odsetki',
                data: interestData,
                backgroundColor: 'rgba(245, 101, 101, 0.7)',
                borderColor: '#f56565',
                borderWidth: 1,
                yAxisID: 'y1',
              },
            ],
          }}
          options={chartOptions}
        />
      </ChartContainer>
    </ChartCard>
  )
}

const ChartCard = tw.div`
  bg-white rounded-lg border border-gray-200 p-4
  transition-all duration-200
  hover:shadow-md
`

const ChartContainer = tw.div`
  relative h-64 w-full
`

