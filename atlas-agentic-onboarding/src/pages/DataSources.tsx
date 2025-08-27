export default function DataSources() {
  const items = [
    { name: 'Supabase (Postgres)', status: 'connected' },
    { name: 'Local Files', status: 'connected' },
    { name: 'Webhooks', status: 'not configured' },
  ]
  const badge = (s:string) => s==='connected' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-yellow-500/20 text-yellow-300'
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Data Sources</h1>
        <button className="btn-primary">Add Source</button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(x => (
          <div key={x.name} className="card p-5">
            <p className="font-medium">{x.name}</p>
            <span className={`chip mt-2 ${badge(x.status)}`}>{x.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
