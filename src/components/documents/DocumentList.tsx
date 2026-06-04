'use client'

import { useState, useEffect } from 'react'

export default function DocumentList() {
  const [docs, setDocs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/documents')
      .then(res => res.json())
      .then(data => setDocs(data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Chargement...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {docs.map(doc => (
        <div key={doc.id} className="bg-white p-4 rounded-lg shadow flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase">{doc.category}</span>
            <h3 className="text-lg font-bold mt-1">{doc.title}</h3>
          </div>
          <a
            href={doc.url}
            target="_blank"
            className="mt-4 text-center bg-gray-100 py-2 rounded hover:bg-gray-200 transition"
          >
            Télécharger
          </a>
        </div>
      ))}
    </div>
  )
}
