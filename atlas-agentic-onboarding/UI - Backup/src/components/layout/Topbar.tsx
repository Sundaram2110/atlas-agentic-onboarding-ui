import { Bell, Search } from 'lucide-react'

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-atlas-bg/60 bg-atlas-bg/80 border-b border-white/5">
      <div className="flex items-center justify-between px-4 py-3 gap-3">
        <div className="flex items-center gap-3 w-full max-w-xl">
          <Search className="h-4 w-4 opacity-70" />
          <input className="input" placeholder="Search agents, workflows, datasets..." />
        </div>
        <button className="btn-ghost"><Bell className="h-5 w-5" /></button>
      </div>
    </header>
  )
}
