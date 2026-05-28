import GlassCard from '@/components/ui/GlassCard'

const features = [
  { icon: '✦', title: 'AI Content Generation',  desc: 'Let Claude write your bio, case studies, and project descriptions.' },
  { icon: '⬡', title: '3D Visualizations',       desc: 'Stunning Three.js scenes that make your portfolio unforgettable.' },
  { icon: '◈', title: 'One-click Deploy',         desc: 'Publish to your own domain via Vercel in under 60 seconds.' },
]

export default function Features() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-display text-4xl font-bold text-white text-center mb-12">Why Nexfolio?</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <GlassCard key={f.title}>
              <span className="text-3xl text-indigo-400">{f.icon}</span>
              <h3 className="mt-4 font-display text-xl font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-slate-400 text-sm">{f.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}