import GlassCard from '@/components/ui/GlassCard'

const testimonials = [
  { name: 'Alex Chen',    role: 'Frontend Engineer', text: 'Nexfolio got me three interviews in a week. Worth every penny.' },
  { name: 'Sara Malik',   role: 'UX Designer',       text: 'The AI wrote better copy than I could have. Genuinely shocked.' },
  { name: 'Jordan Reyes', role: 'Full-stack Dev',     text: 'Set up, customised, and deployed in under 15 minutes.' },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-indigo-950/10">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-4xl font-bold text-white text-center mb-12">Loved by builders</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <GlassCard key={t.name}>
              <p className="text-slate-300 text-sm leading-relaxed">"{t.text}"</p>
              <div className="mt-4">
                <p className="font-semibold text-white text-sm">{t.name}</p>
                <p className="text-slate-500 text-xs">{t.role}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}