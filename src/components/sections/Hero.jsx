import { Suspense } from 'react'
import { motion } from 'framer-motion'
import HeroScene from '@/components/three/HeroScene'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}><HeroScene /></Suspense>
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h1 className="font-display text-6xl font-bold leading-tight text-white lg:text-7xl">
            Build your portfolio<br />
            <span className="text-indigo-400">powered by AI</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-400">
            Nexfolio turns your resume into a stunning portfolio in seconds — no design skills needed.
          </p>
          <div className="mt-8 flex gap-4">
            <Button>Start for free</Button>
            <Button variant="outline">See examples</Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}