export default function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Settings</h1>
      <div className="card p-5 space-y-4">
        <div>
          <label className="text-sm text-slate-300">API Base URL</label>
          <input className="input mt-1" placeholder="http://localhost:3000/api" />
        </div>
        <div>
          <label className="text-sm text-slate-300">Ollama Model</label>
          <input className="input mt-1" placeholder="llama3" />
        </div>
        <button className="btn-primary">Save</button>
      </div>
    </div>
  )
}
