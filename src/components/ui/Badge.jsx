import { clsx } from 'clsx'

const variants = {
  cyan:   'bg-cyan/10 border-cyan/30 text-cyan',
  violet: 'bg-violet/10 border-violet/30 text-violet',
  pink:   'bg-pink-400/10 border-pink-400/30 text-pink-400',
  green:  'bg-emerald-400/10 border-emerald-400/30 text-emerald-400',
  muted:  'bg-white/5 border-white/10 text-slate-400',
}

export default function Badge({ children, variant = 'cyan', className = '' }) {
  return (
    <span
      className={clsx(
        'inline-block border rounded-full px-3 py-1 text-xs font-medium font-mono tracking-wide',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
