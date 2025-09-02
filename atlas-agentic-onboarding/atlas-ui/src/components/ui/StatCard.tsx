import { ReactNode } from 'react'

export default function StatCard({ title, value, detail, icon }: { title: string, value: string, detail?: string, icon?: ReactNode }) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          {detail && <p className="text-sm text-slate-400 mt-1">{detail}</p>}
        </div>
        {icon && <div className="p-2 rounded-xl bg-white/5 border border-white/10">{icon}</div>}
      </div>
    </div>
  )
}
