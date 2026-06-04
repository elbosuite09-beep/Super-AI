'use client'

import { useState, useEffect } from 'react'

export default function HRTable() {
  const [report, setReport] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/hr')
      .then(res => res.json())
      .then(data => setReport(data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Chargement...</div>

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Professeur</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heures Totales</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taux Horaire</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salaire Dû</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {report.map((t) => (
            <tr key={t.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.totalHours} h</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.hourlyRate} FCFA/h</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">{t.totalPay} FCFA</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
