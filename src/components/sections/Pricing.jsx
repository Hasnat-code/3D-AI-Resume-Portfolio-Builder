import GlassCard from '@/components/ui/GlassCard'
import Button from '@/components/ui/Button'

const plans = [
  { name: 'Free',  price: '$0',   features: ['1 portfolio', 'Basic templates', 'Nexfolio subdomain'] },
  { name: 'Pro',   price: '$12',  features: ['Unlimited portfolios', 'AI generation', 'Custom domain'], highlight: true },
  { name: 'Team',  price: '$39',  features: ['Everything in Pro', 'Team workspace', 'Priority support'] },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-display text-4xl font-bold text-white text-center mb-12">Simple pricing</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <GlassCard key={p.name} className={p.highlight ? 'border-indigo-500/50 ring-1 ring-indigo-500/30' : ''}>
              <p className="text-slate-400 text-sm">{p.name}</p>
              <p className="mt-1 font-display text-4xl font-bold text-white">{p.price}<span className="text-base font-normal text-slate-500">/mo</span></p>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                {p.features.map(f => <li key={f}>✓ {f}</li>)}
              </ul>
              <Button className="mt-6 w-full" variant={p.highlight ? 'primary' : 'outline'}>Get started</Button>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}