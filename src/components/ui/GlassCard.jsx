import clsx from 'clsx'

export default function GlassCard({ children, className, ...props }) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}