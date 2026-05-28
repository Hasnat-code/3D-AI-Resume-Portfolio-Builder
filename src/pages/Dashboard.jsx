import DashboardLayout from '@/components/layout/DashboardLayout'
import StatsRow        from '@/components/dashboard/StatsRow'
import PortfolioCard   from '@/components/dashboard/PortfolioCard'
import AIStudio        from '@/components/dashboard/AIStudio'

export default function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className="font-display text-3xl font-bold text-white mb-8">Overview</h1>
      <StatsRow />
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <PortfolioCard />
        </div>
        <AIStudio />
      </div>
    </DashboardLayout>
  )
}