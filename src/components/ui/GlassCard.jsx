import { clsx } from 'clsx'

export default function GlassCard({ children, className = '', hover = true, glow = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'glass rounded-2xl p-8 relative overflow-hidden transition-all duration-400',
        hover && 'hover:-translate-y-1 hover:border-cyan/25 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_30px_rgba(0,245,255,0.05)]',
        glow && 'shadow-glow-cyan',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}
