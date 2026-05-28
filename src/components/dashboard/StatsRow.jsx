import GlassCard from '@/components/ui/GlassCard'

const stats = [
  { label: 'Portfolio views', value: '1,284' },
  { label: 'Link clicks',     value: '342'   },
  { label: 'AI credits left', value: '80'    },
]

export default function StatsRow() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((s) => (
        <GlassCard key={s.label} className="p-5">
          <p className="text-xs text-slate-500 uppercase tracking-wide">{s.label}</p>
          <p className="mt-1 font-display text-3xl font-bold text-white">{s.value}</p>
        </GlassCard>
      ))}
    </div>
  )
}