import Section from '@/components/ui/Section'

export default function Workflows() {
  const items = [
    { name: 'Founders Intake', steps: 6, updated: '2d ago' },
    { name: 'KYC Verification', steps: 4, updated: '5d ago' },
    { name: 'Product Demo Prep', steps: 5, updated: '1d ago' },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Workflows</h1>
        <button className="btn-primary">New Workflow</button>
      </div>

      <Section title="All Workflows">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((wf) => (
            <div key={wf.name} className="card p-5 space-y-2">
              <p className="font-medium">{wf.name}</p>
              <p className="text-sm text-slate-400">{wf.steps} steps • Updated {wf.updated}</p>
              <div className="flex gap-2 pt-2">
                <button className="btn-ghost">Edit</button>
                <button className="btn-primary">Run</button>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
