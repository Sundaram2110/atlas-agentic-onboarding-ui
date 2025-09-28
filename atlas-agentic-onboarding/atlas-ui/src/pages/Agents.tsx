import { useEffect, useState } from 'react'
import AgentCard from '@/components/agents/AgentCard'

export default function Agents() {
  const [agents, setAgents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/agent`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch agents')
        return res.json()
      })
      .then(data => setAgents(data.agents))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Agents</h1>
        <button className="btn-primary">New Agent</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map(a => <AgentCard key={a.id} {...a} />)}
      </div>
    </div>
  )
}