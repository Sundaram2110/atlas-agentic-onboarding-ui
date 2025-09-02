import { useState } from 'react'
import Section from '@/components/ui/Section'
import { Plus, GripVertical, Trash2 } from 'lucide-react'

type StepType = 'form' | 'doc' | 'task'
interface Step { id: string; title: string; type: StepType; required: boolean }

export default function OnboardingBuilder() {
  const [steps, setSteps] = useState<Step[]>([
    { id: '1', title: 'Company Basics', type: 'form', required: true },
    { id: '2', title: 'Upload Pitch Deck', type: 'doc', required: true },
    { id: '3', title: 'Schedule Intro Call', type: 'task', required: false },
  ])

  const addStep = () => setSteps(s => [...s, { id: crypto.randomUUID(), title: 'New Step', type: 'form', required: false }])
  const remove = (id:string) => setSteps(s => s.filter(x => x.id !== id))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Onboarding Flow Builder</h1>
        <div className="flex gap-2">
          <button className="btn-ghost">Preview</button>
          <button className="btn-primary">Save Flow</button>
        </div>
      </div>

      <Section title="Steps">
        <div className="grid lg:grid-cols-[1fr_380px] gap-4">
          <div className="space-y-3">
            {steps.map(step => (
              <div key={step.id} className="card p-4 flex items-center gap-3">
                <GripVertical className="h-5 w-5 opacity-40" />
                <input className="input" value={step.title} onChange={(e)=>{
                  const title = e.target.value
                  setSteps(s => s.map(x => x.id===step.id ? { ...x, title } : x))
                }} />
                <select
                  className="input max-w-40"
                  value={step.type}
                  onChange={(e)=>{
                    const type = e.target.value as StepType
                    setSteps(s => s.map(x => x.id===step.id ? { ...x, type } : x))
                  }}
                >
                  <option value="form">Form</option>
                  <option value="doc">Document</option>
                  <option value="task">Task</option>
                </select>
                <label className="ml-auto flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={step.required} onChange={(e)=>{
                    const required = e.target.checked
                    setSteps(s => s.map(x => x.id===step.id ? { ...x, required } : x))
                  }} />
                  Required
                </label>
                <button className="btn-ghost" onClick={()=>remove(step.id)}><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
            <button className="btn-primary" onClick={addStep}><Plus className="h-4 w-4" /> Add Step</button>
          </div>

          <div className="card p-4 space-y-3">
            <p className="text-sm text-slate-400">AI Suggestions</p>
            <div className="space-y-2 text-sm">
              <p className="chip">+ Auto-verify CIN / PAN</p>
              <p className="chip">+ Extract KPIs from pitch deck</p>
              <p className="chip">+ Schedule demo with Calendly</p>
            </div>
            <p className="text-sm text-slate-400 pt-2">Connect to Agent later via API.</p>
          </div>
        </div>
      </Section>
    </div>
  )
}
