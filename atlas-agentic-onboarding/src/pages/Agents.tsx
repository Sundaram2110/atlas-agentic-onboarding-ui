import AgentCard from '@/components/agents/AgentCard'

export default function Agents() {
  const agents = [
    { name: 'Intake Assistant', model: 'Llama3 8B (Ollama)', status: 'running', description: 'Collects user requirements and routes.' },
    { name: 'Verifier', model: 'Llama3 8B (Ollama)', status: 'idle', description: 'Validates documents and flags issues.' },
    { name: 'Guide', model: 'Llama3 8B (Ollama)', status: 'stopped', description: 'Step-by-step onboarding guidance.' },
  ] as const

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Agents</h1>
        <button className="btn-primary">New Agent</button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map(a => <AgentCard key={a.name} {...a} />)}
      </div>
    </div>
  )
}
