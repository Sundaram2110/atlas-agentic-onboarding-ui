export default function Help() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Help & Docs</h1>
      <div className="card p-5 space-y-2 text-sm text-slate-300">
        <p>• Start on <a className="underline" href="/">Overview</a> to see stats.</p>
        <p>• Build your onboarding in <a className="underline" href="/onboarding">Onboarding Builder</a>.</p>
        <p>• Later, connect the agent chat to your Node API that proxies LangGraph + Ollama.</p>
      </div>
    </div>
  )
}
