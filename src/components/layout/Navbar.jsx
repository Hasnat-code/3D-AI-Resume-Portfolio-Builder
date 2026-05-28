import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="font-display text-xl font-bold text-white tracking-tight">
          Nex<span className="text-indigo-400">folio</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-400">
          <Link to="/#features" className="hover:text-white transition-colors">Features</Link>
          <Link to="/#pricing"  className="hover:text-white transition-colors">Pricing</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="ghost">Sign in</Button>
          <Button>Get started</Button>
        </div>
      </div>
    </header>
  )
}