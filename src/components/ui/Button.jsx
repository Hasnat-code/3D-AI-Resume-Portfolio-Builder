import clsx from 'clsx'

export default function Button({ children, variant = 'primary', className, ...props }) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50',
        variant === 'primary'  && 'bg-indigo-600 text-white hover:bg-indigo-500 active:scale-95',
        variant === 'ghost'    && 'bg-transparent text-indigo-400 hover:bg-indigo-500/10',
        variant === 'outline'  && 'border border-indigo-500/40 text-indigo-300 hover:border-indigo-400',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}