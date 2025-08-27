import { useEffect, useState } from 'react'

export default function Workflows() {
  const [workflows, setWorkflows] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/workflows`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch workflows')
        return res.json()
      })
      .then(setWorkflows)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Workflows</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}
      <ul className="space-y-2">
        {workflows.map(w => (
          <li key={w.id} className="p-4 border rounded-lg">{w.name}</li>
        ))}
      </ul>
    </div>
  )
}
