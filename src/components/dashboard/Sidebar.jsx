import { NavLink } from 'react-router-dom'

const links = [
  { to: '/dashboard', label: 'Overview',  icon: '⊞' },
  { to: '/portfolio', label: 'Portfolio', icon: '◈' },
  { to: '/resume',    label: 'Resume',    icon: '✎' },
  { to: '/settings',  label: 'Settings',  icon: '⚙' },
]

export default function Sidebar() {
  return (
    <aside className="w-60 flex-shrink-0 border-r border-white/5 bg-[#0d0d14] p-6 flex flex-col gap-1">
      <p className="font-display text-lg font-bold text-white mb-6">Nexfolio</p>
      {links.map(({ to, label, icon }) => (
        <NavLink
          key={to} to={to}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${isActive ? 'bg-indigo-600/20 text-indigo-300' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`
          }
        >
          <span>{icon}</span>{label}
        </NavLink>
      ))}
    </aside>
  )
}