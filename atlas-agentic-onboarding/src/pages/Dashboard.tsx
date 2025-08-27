import { Bot, Workflow, Database } from 'lucide-react'
import StatCard from '@/components/ui/StatCard'
import Section from '@/components/ui/Section'
import AgentCard from '@/components/agents/AgentCard'
import ChatPanel from '@/components/chat/ChatPanel'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <StatCard title="Active Agents" value="3" detail="Running in local env" icon={<Bot className="h-5 w-5" />} />
        <StatCard title="Workflows" value="7" detail="2 in progress" icon={<Workflow className="h-5 w-5" />} />
        <StatCard title="Datasets" value="12" detail="Supabase connected" icon={<Database className="h-5 w-5" />} />
      </div>

      <Section title="Quick Actions" action={<div className="flex gap-2">
        <a className="btn-primary" href="/onboarding">New Onboarding Flow</a>
        <a className="btn-ghost" href="/agents">Add Agent</a>
      </div>}>
        <div className="grid lg:grid-cols-3 gap-4">
          <AgentCard name="Intake Assistant" model="Llama3 8B (Ollama)" status="running" description="Collects user requirements and routes to the correct workflow." />
          <AgentCard name="Verifier" model="Llama3 8B (Ollama)" status="idle" description="Validates documents and flags issues in user submissions." />
          <AgentCard name="Guide" model="Llama3 8B (Ollama)" status="stopped" description="Provides step-by-step onboarding guidance." />
        </div>
      </Section>

      <Section title="Chat with the Atlas Agent">
        <ChatPanel />
      </Section>
    </div>
  )
}
