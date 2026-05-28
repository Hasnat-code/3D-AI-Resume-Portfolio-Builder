import GlassCard from '@/components/ui/GlassCard'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

export default function PortfolioCard({ title = 'My Portfolio', status = 'Published', url = '#' }) {
  return (
    <GlassCard className="flex items-center justify-between">
      <div>
        <p className="font-semibold text-white">{title}</p>
        <p className="text-xs text-slate-500 mt-0.5">{url}</p>
      </div>
      <div className="flex items-center gap-3">
        <Badge color="green">{status}</Badge>
        <Button variant="ghost" className="text-xs">Edit</Button>
      </div>
    </GlassCard>
  )
}