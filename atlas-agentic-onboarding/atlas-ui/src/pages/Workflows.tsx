import { useEffect, useState } from 'react'

export default function Workflows() {
  const [workflows, setWorkflows] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/workflows`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch workflows')
        return res.json()
      })
      .then(data => setWorkflows(data.workflows))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const toggleExpanded = (id: string) => {
    setExpanded(expanded === id ? null : id)
  }

  const executeStep = (action: string) => {
    // Placeholder: In a real app, parse action and call corresponding API
    alert(`Executing action: ${action}`)
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Workflows</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}
      <ul className="space-y-4">
        {workflows.map(w => (
          <li key={w.id} className="p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-medium">{w.name}</h2>
                <p className="text-sm text-gray-600">Agent ID: {w.agent_id}</p>
                <p className="text-sm text-gray-600">Created: {new Date(w.created_at).toLocaleString()}</p>
                <p className="text-sm text-gray-600">Updated: {new Date(w.updated_at).toLocaleString()}</p>
              </div>
              <button
                onClick={() => toggleExpanded(w.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {expanded === w.id ? 'Hide Steps' : 'Show Steps'}
              </button>
            </div>
            {expanded === w.id && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">Steps:</h3>
                <ul className="space-y-2">
                  {w.steps.map((step: any, index: number) => (
                    <li key={index} className="flex justify-between items-center p-2 bg-gray-900 dark:bg-gray-900 rounded">
                      <div>
                        <span className="font-medium">{step.step}</span> - Action: {step.action}
                      </div>
                      <button
                        onClick={() => executeStep(step.action)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Execute
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
