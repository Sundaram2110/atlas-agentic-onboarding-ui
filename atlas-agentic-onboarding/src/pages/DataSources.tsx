import { useEffect, useState } from 'react'

export default function DataSources() {
  const [sources, setSources] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/data-sources`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch data sources')
        return res.json()
      })
      .then(setSources)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Data Sources</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}
      <ul className="space-y-2">
        {sources.map(s => (
          <li key={s.id} className="p-4 border rounded-lg">{s.name}</li>
        ))}
      </ul>
    </div>
  )
}
