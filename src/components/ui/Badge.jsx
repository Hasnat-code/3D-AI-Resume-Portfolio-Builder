import clsx from 'clsx'

export default function Badge({ children, color = 'indigo', className }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        color === 'indigo' && 'bg-indigo-500/20 text-indigo-300',
        color === 'green'  && 'bg-emerald-500/20 text-emerald-300',
        color === 'amber'  && 'bg-amber-500/20 text-amber-300',
        className
      )}
    >
      {children}
    </span>
  )
}