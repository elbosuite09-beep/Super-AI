'use client'

import { useState, useEffect } from 'react'

export default function PedagogicalDashboard() {
  const [files, setFiles] = useState<any[]>([])
  const [progress, setProgress] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/pedagogical/files').then(res => res.json()).then(data => setFiles(data))
    fetch('/api/pedagogical/progress').then(res => res.json()).then(data => setProgress(data))
  }, [])

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-bold mb-4">Documents de cours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {files.map(f => (
            <div key={f.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-blue-600">{f.subject.name} - {f.type}</p>
                <h3 className="font-bold">{f.title}</h3>
                <p className="text-xs text-gray-500">Destiné aux {f.target === 'STUDENT' ? 'Élèves' : 'Profs'}</p>
              </div>
              <a href={f.url} className="text-blue-500 underline">Ouvrir</a>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Avancement des cours</h2>
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">Matière</th>
                <th className="px-6 py-3 text-left">Chapitre</th>
                <th className="px-6 py-3 text-left">Statut</th>
              </tr>
            </thead>
            <tbody>
              {progress.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="px-6 py-4">{p.subject.name}</td>
                  <td className="px-6 py-4">{p.chapter}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      p.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
