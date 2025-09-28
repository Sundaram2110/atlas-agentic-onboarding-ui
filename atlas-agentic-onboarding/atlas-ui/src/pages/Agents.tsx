import { useEffect, useState } from 'react'
import AgentCard from '@/components/agents/AgentCard'
import ChatPanel from '@/components/chat/ChatPanel'
import { getAgents, createAgent, updateAgent, startAgent, stopAgent, deleteAgent } from '@/api/services/agent'

export default function Agents() {
  const [agents, setAgents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [newAgent, setNewAgent] = useState({ name: '', model: '', description: '' })
  const [creating, setCreating] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<any>(null)
  const [showChatModal, setShowChatModal] = useState(false)
  const [editingAgent, setEditingAgent] = useState<any>(null)
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    getAgents()
      .then(setAgents)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)
    try {
      await createAgent(newAgent)
      const updatedAgents = await getAgents()
      setAgents(updatedAgents)
      setShowModal(false)
      setNewAgent({ name: '', model: '', description: '' })
    } catch (e) {
      setError('Failed to create agent')
    } finally {
      setCreating(false)
    }
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)
    try {
      await updateAgent(editingAgent.id, newAgent)
      const updatedAgents = await getAgents()
      setAgents(updatedAgents)
      setShowEditModal(false)
      setNewAgent({ name: '', model: '', description: '' })
    } catch (e) {
      setError('Failed to update agent')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Agents</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>New Agent</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map(a => <AgentCard key={a.id} {...a} onTest={async () => { try { if (a.status === 'idle') { await startAgent(a.id); setAgents(agents.map(ag => ag.id === a.id ? {...ag, status: 'running'} : ag)); setSelectedAgent({...a, status: 'running'}); } else { setSelectedAgent({...a, status: a.status}); } setShowChatModal(true); } catch (e) { setError('Failed to start agent'); } }} onConfigure={() => { setEditingAgent(a); setNewAgent({ name: a.name, model: a.model, description: a.description }); setShowEditModal(true); }} onDelete={async () => { try { await deleteAgent(a.id); setAgents(agents.filter(ag => ag.id !== a.id)); } catch (e) { setError('Failed to delete agent'); } }} />)}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Create New Agent</h2>
            <form onSubmit={handleCreate}>
              <input
                type="text"
                placeholder="Name"
                value={newAgent.name}
                onChange={e => setNewAgent({ ...newAgent, name: e.target.value })}
                className="w-full mb-2 p-2 bg-slate-700 rounded border border-slate-600"
                required
              />
              <input
                type="text"
                placeholder="Model"
                value={newAgent.model}
                onChange={e => setNewAgent({ ...newAgent, model: e.target.value })}
                className="w-full mb-2 p-2 bg-slate-700 rounded border border-slate-600"
                required
              />
              <textarea
                placeholder="Description"
                value={newAgent.description}
                onChange={e => setNewAgent({ ...newAgent, description: e.target.value })}
                className="w-full mb-4 p-2 bg-slate-700 rounded border border-slate-600"
                required
              />
              <div className="flex gap-2">
                <button type="submit" className="btn-primary" disabled={creating}>
                  {creating ? 'Creating...' : 'Create'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="btn-ghost">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Edit Agent</h2>
            <form onSubmit={handleEdit}>
              <input
                type="text"
                placeholder="Name"
                value={newAgent.name}
                onChange={e => setNewAgent({ ...newAgent, name: e.target.value })}
                className="w-full mb-2 p-2 bg-slate-700 rounded border border-slate-600"
                required
              />
              <input
                type="text"
                placeholder="Model"
                value={newAgent.model}
                onChange={e => setNewAgent({ ...newAgent, model: e.target.value })}
                className="w-full mb-2 p-2 bg-slate-700 rounded border border-slate-600"
                required
              />
              <textarea
                placeholder="Description"
                value={newAgent.description}
                onChange={e => setNewAgent({ ...newAgent, description: e.target.value })}
                className="w-full mb-4 p-2 bg-slate-700 rounded border border-slate-600"
                required
              />
              <div className="flex gap-2">
                <button type="submit" className="btn-primary" disabled={creating}>
                  {creating ? 'Updating...' : 'Update'}
                </button>
                <button type="button" onClick={() => setShowEditModal(false)} className="btn-ghost">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showChatModal && selectedAgent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-lg w-full max-w-2xl h-3/4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Chat with {selectedAgent.name}</h2>
              <div className="flex gap-2">
                <button onClick={async () => { try { if (selectedAgent.status === 'running') { await stopAgent(selectedAgent.id); setAgents(agents.map(ag => ag.id === selectedAgent.id ? {...ag, status: 'stopped'} : ag)); setSelectedAgent({...selectedAgent, status: 'stopped'}); setShowChatModal(false); } else { await startAgent(selectedAgent.id); setAgents(agents.map(ag => ag.id === selectedAgent.id ? {...ag, status: 'running'} : ag)); setSelectedAgent({...selectedAgent, status: 'running'}); } } catch (e) { setError('Failed to update agent'); } }} className="btn-ghost">{selectedAgent.status === 'running' ? 'Stop' : 'Resume'}</button>
                <button onClick={() => setShowChatModal(false)} className="btn-ghost">Close</button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <ChatPanel agentId={selectedAgent.id} disabled={selectedAgent.status !== 'running'} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
