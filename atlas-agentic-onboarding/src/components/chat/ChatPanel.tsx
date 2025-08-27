import { useState } from 'react'
import { Send } from 'lucide-react'

interface Message { role: 'user' | 'assistant'; content: string }
export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I\'m the Atlas Agent. Ask me to generate an onboarding flow.' }
  ])
  const [input, setInput] = useState('')

  const send = () => {
    if (!input.trim()) return
    setMessages(m => [...m, { role: 'user', content: input }, { role: 'assistant', content: 'This is a placeholder response. You\'ll wire me to LangGraph + Llama3 via your Node API.' }])
    setInput('')
  }

  return (
    <div className="card p-4 flex flex-col h-[480px]">
      <div className="flex-1 overflow-auto space-y-3 pr-1">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[75%] ${m.role==='user' ? 'ml-auto' : ''}`}>
            <div className={`px-3 py-2 rounded-xl border ${m.role==='user' ? 'bg-white/10 border-white/10' : 'bg-atlas-accent/10 border-atlas-accent/30 text-atlas-accent'}`}>
              <p className="text-sm">{m.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <input className="input" placeholder="Message the Atlas Agent..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=> e.key==='Enter' && send()} />
        <button className="btn-primary" onClick={send}><Send className="h-4 w-4" /></button>
      </div>
    </div>
  )
}
