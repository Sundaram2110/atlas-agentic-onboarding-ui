import { useState } from 'react'
import { chatAgent } from '@/api/services/agent'

export default function ChatPanel({ agentId }: { agentId?: string }) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const newMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, newMessage])
    setInput('')
    setLoading(true)
    setError(null)

    try {
      let response;
      if (agentId) {
        response = await chatAgent(input, { agentId });
        setMessages(prev => [...prev, { role: 'assistant', content: response.response }])
      } else {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/agent/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: input }),
        })
        if (!res.ok) throw new Error('Failed to get reply')
        const data = await res.json()
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
      }
    } catch (e: any) {
      setError(e.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-2 p-4">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <span className="inline-block px-3 py-2 rounded-lg bg-gray-900 dark:bg-gray-900">
              {m.content}
            </span>
          </div>
        ))}
        {error && <div className="text-red-500">{error}</div>}
      </div>
      <div className="p-4 flex gap-2">
        <input
          className="flex-1 border rounded-lg px-3 py-2 text-gray-900 dark:text-gray-900"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={e => { if (e.key === 'Enter') sendMessage() }}
          disabled={loading}
        />
        <button className="btn-primary" onClick={sendMessage} disabled={loading}>Send</button>
      </div>
    </div>
  )
}