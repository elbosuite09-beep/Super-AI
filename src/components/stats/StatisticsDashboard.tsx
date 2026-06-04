'use client'

import { useState, useEffect } from 'react'

export default function StatisticsDashboard() {
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    fetch('/api/stats').then(res => res.json()).then(data => setStats(data))
  }, [])

  if (!stats) return <div>Chargement des statistiques...</div>

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow">
          <p className="text-sm uppercase opacity-75">Revenus Totaux</p>
          <h3 className="text-3xl font-bold">{stats.totalRevenue} FCFA</h3>
        </div>
        <div className="bg-red-500 text-white p-6 rounded-lg shadow">
          <p className="text-sm uppercase opacity-75">Dépenses (RH)</p>
          <h3 className="text-3xl font-bold">{stats.totalExpenses} FCFA</h3>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow">
          <p className="text-sm uppercase opacity-75">Bénéfice Net</p>
          <h3 className="text-3xl font-bold">{stats.netProfit} FCFA</h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">Répartition par Cycle</h3>
        <div className="space-y-4">
          {Object.entries(stats.cycleStats).map(([cycle, amount]: [string, any]) => (
            <div key={cycle} className="flex items-center">
              <span className="w-32 font-semibold">{cycle}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-4 mx-4">
                <div
                  className="bg-blue-600 h-4 rounded-full"
                  style={{ width: `${(amount / stats.totalRevenue) * 100}%` }}
                ></div>
              </div>
              <span className="text-gray-600">{amount} FCFA</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
