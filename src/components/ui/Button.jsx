import { clsx } from 'clsx'

const variants = {
  primary: 'btn-primary',
  outline: 'btn-outline',
  ghost: 'bg-transparent border border-transparent text-slate-400 hover:text-white hover:bg-white/5 px-4 py-2 rounded-lg transition-all duration-200',
  danger: 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 px-4 py-2 rounded-lg transition-all duration-200',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        variants[variant],
        variant === 'primary' || variant === 'outline' ? sizes[size] : '',
        'font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Loading...
        </span>
      ) : children}
    </button>
  )
}
