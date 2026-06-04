'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function MainDashboard() {
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    fetch('/api/stats').then(res => res.json()).then(data => setStats(data))
  }, [])

  if (!stats) return <div className="p-10 text-center">Initialisation du Dashboard...</div>

  const kpis = [
    { label: 'Élèves', value: stats.studentCount, color: 'bg-indigo-600', icon: '🎓' },
    { label: 'Professeurs', value: stats.teacherCount, color: 'bg-blue-600', icon: '👨‍🏫' },
    { label: 'Classes', value: stats.classCount, color: 'bg-emerald-600', icon: '🏫' },
    { label: 'Finances (Solde)', value: `${stats.netProfit} FCFA`, color: 'bg-amber-600', icon: '💰' },
  ]

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">Tableau de Bord Intégral</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
              <div className={`${kpi.color} p-3 rounded-xl text-2xl`}>{kpi.icon}</div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase">{kpi.label}</p>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <span className="mr-2">📈</span> Flux de Trésorerie
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between p-4 bg-green-50 rounded-lg">
                <span className="font-semibold text-green-700">Encaissements (Scolarité)</span>
                <span className="font-bold">+{stats.totalRevenue} FCFA</span>
              </div>
              <div className="flex justify-between p-4 bg-red-50 rounded-lg">
                <span className="font-semibold text-red-700">Décaissements (Salaires Profs)</span>
                <span className="font-bold">-{stats.totalExpenses} FCFA</span>
              </div>
              <div className="pt-4 border-t flex justify-between px-4">
                <span className="text-lg font-bold">Total Net</span>
                <span className={`text-lg font-bold ${stats.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stats.netProfit} FCFA
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <span className="mr-2">🚀</span> Accès Rapides
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/admin/students" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition text-center">
                <p className="text-2xl">📝</p>
                <p className="text-sm font-semibold mt-2">Inscriptions</p>
              </Link>
              <Link href="/teacher/grades" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition text-center">
                <p className="text-2xl">📝</p>
                <p className="text-sm font-semibold mt-2">Saisie Notes</p>
              </Link>
              <Link href="/admin/documents" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition text-center">
                <p className="text-2xl">📂</p>
                <p className="text-sm font-semibold mt-2">Documents</p>
              </Link>
              <Link href="/pedagogical" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition text-center">
                <p className="text-2xl">📚</p>
                <p className="text-sm font-semibold mt-2">Pédagogie</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
