import { useEffect, useState } from 'react'
import { Bot, Workflow, Database } from 'lucide-react'
import StatCard from '@/components/ui/StatCard'
import Section from '@/components/ui/Section'
import AgentCard from '@/components/agents/AgentCard'
import ChatPanel from '@/components/chat/ChatPanel'

export default function Dashboard() {
  const [agents, setAgents] = useState<any[]>([])
  const [workflows, setWorkflows] = useState<any[]>([])
  const [dataSources, setDataSources] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [agentsRes, workflowsRes, dataSourcesRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/agent`),
          fetch(`${import.meta.env.VITE_API_URL}/api/workflows`),
          fetch(`${import.meta.env.VITE_API_URL}/api/data-sources`)
        ])

        if (!agentsRes.ok) throw new Error('Failed to fetch agents')
        if (!workflowsRes.ok) throw new Error('Failed to fetch workflows')
        if (!dataSourcesRes.ok) throw new Error('Failed to fetch data sources')

        const agentsData = await agentsRes.json()
        const workflowsData = await workflowsRes.json()
        const dataSourcesData = await dataSourcesRes.json()

        setAgents(agentsData.agents || [])
        setWorkflows(workflowsData.workflows || [])
        setDataSources(dataSourcesData.dataSources || [])
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const activeAgents = agents.filter(a => a.status === 'running').length
  const totalWorkflows = workflows.length
  const totalDatasets = dataSources.length
  const inProgressWorkflows = workflows.filter(w => w.status === 'in_progress').length // assuming status field

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-400">{error}</div>

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <StatCard title="Active Agents" value={activeAgents.toString()} detail="Running in local env" icon={<Bot className="h-5 w-5" />} />
        <StatCard title="Workflows" value={totalWorkflows.toString()} detail={`${inProgressWorkflows} in progress`} icon={<Workflow className="h-5 w-5" />} />
        <StatCard title="Datasets" value={totalDatasets.toString()} detail="Supabase connected" icon={<Database className="h-5 w-5" />} />
      </div>

      <Section title="Quick Actions" action={<div className="flex gap-2">
        <a className="btn-primary" href="/onboarding">New Onboarding Flow</a>
        <a className="btn-ghost" href="/agents">Add Agent</a>
      </div>}>
        <div className="grid lg:grid-cols-3 gap-4">
          {agents.slice(0, 3).map(a => <AgentCard key={a.id} {...a} />)}
        </div>
      </Section>

      <Section title="Chat with the Atlas Agent">
        <ChatPanel />
      </Section>
    </div>
  )
}
