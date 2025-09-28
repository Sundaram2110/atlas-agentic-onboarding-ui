import { Bot, Settings2, Play, Trash2 } from 'lucide-react'

export default function AgentCard({ name, model = 'N/A', status = 'idle', description, onTest, onConfigure, onDelete }: { name: string, model?: string, status?: 'idle'|'running'|'stopped', description: string, onTest?: () => void, onConfigure?: () => void, onDelete?: () => void }) {
  const statusMap = {
    idle: 'bg-yellow-500/20 text-yellow-300',
    running: 'bg-emerald-500/20 text-emerald-300',
    stopped: 'bg-rose-500/20 text-rose-300'
  }
  return (
    <div className="card p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/5 grid place-items-center border border-white/10">
            <Bot className="h-5 w-5 opacity-80" />
          </div>
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-xs text-slate-400">{model}</p>
          </div>
        </div>
        <span className={`chip ${statusMap[status]}`}>{status}</span>
      </div>
      <p className="text-sm text-slate-300">{description}</p>
      <div className="flex gap-1 mt-auto">
        <button className="btn-primary" onClick={onTest}><Play className="h-4 w-4" /> Test</button>
        <button className="btn-ghost" onClick={onConfigure}><Settings2 className="h-4 w-4" /> Configure</button>
        <button className="btn-ghost text-red-400 hover:text-red-300" onClick={onDelete}><Trash2 className="h-4 w-4" /></button>
      </div>
    </div>
  )
}
