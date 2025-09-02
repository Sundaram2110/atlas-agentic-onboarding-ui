import { NavLink } from 'react-router-dom'
import { Bot, CircuitBoard, Database, HelpCircle, Home, Settings, Workflow } from 'lucide-react'

const nav = [
  { to: '/', label: 'Overview', icon: Home },
  { to: '/agents', label: 'Agents', icon: Bot },
  { to: '/workflows', label: 'Workflows', icon: Workflow },
  { to: '/onboarding', label: 'Onboarding Builder', icon: CircuitBoard },
  { to: '/data', label: 'Data Sources', icon: Database },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/help', label: 'Help', icon: HelpCircle },
]

export function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col gap-4 p-4 border-r border-white/5 bg-gradient-to-b from-white/5 to-transparent">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-9 w-9 rounded-2xl bg-atlas-accent/20 grid place-items-center border border-atlas-accent/30">
          <span className="font-black text-atlas-accent">A</span>
        </div>
        <div>
          <p className="text-lg font-semibold leading-tight">Atlas</p>
          <p className="text-xs text-slate-400 -mt-0.5">Agentic Onboarding</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-xl border transition ${
                isActive
                  ? 'bg-white/10 border-white/10'
                  : 'hover:bg-white/5 border-transparent'
              }`
            }
          >
            <Icon className="h-5 w-5 opacity-80" />
            <span className="text-sm">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto p-3 rounded-xl border border-white/10 bg-white/5">
        <p className="text-xs text-slate-400">Environment</p>
        <p className="font-medium">Local Dev</p>
      </div>
    </aside>
  )
}
