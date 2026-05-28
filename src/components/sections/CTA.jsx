import Button from '@/components/ui/Button'

export default function CTA() {
  return (
    <section className="py-32 text-center">
      <h2 className="font-display text-5xl font-bold text-white">Ready to stand out?</h2>
      <p className="mt-4 text-slate-400">Join thousands of developers who got hired faster.</p>
      <div className="mt-8 flex justify-center gap-4">
        <Button>Create your portfolio →</Button>
      </div>
    </section>
  )
}