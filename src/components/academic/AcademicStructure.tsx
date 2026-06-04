'use client'

import { useState, useEffect } from 'react'

interface Class {
  id: string
  name: string
  cycle: string
  teacher?: {
    user: {
      name: string | null
    }
  }
  _count: {
    students: number
  }
}

export default function AcademicStructure() {
  const [classes, setClasses] = useState<Class[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/academic/classes')
      .then((res) => res.json())
      .then((data) => setClasses(data))
      .finally(() => setLoading(false))
  }, [])

  const cycles = ['PRE-SCHOOL', 'PRIMARY', 'MIDDLE', 'HIGH']

  if (loading) return <div>Chargement...</div>

  return (
    <div className="space-y-8">
      {cycles.map((cycle) => (
        <section key={cycle} className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">{cycle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes
              .filter((c) => c.cycle === cycle)
              .map((c) => (
                <div key={c.id} className="border p-4 rounded bg-gray-50">
                  <h3 className="font-bold text-lg">{c.name}</h3>
                  <p className="text-sm text-gray-600">Prof. Principal: {c.teacher?.user.name || 'Non assigné'}</p>
                  <p className="text-sm text-gray-600">Élèves: {c._count.students}</p>
                </div>
              ))}
            {classes.filter((c) => c.cycle === cycle).length === 0 && (
              <p className="text-gray-400 italic">Aucune classe définie pour ce cycle.</p>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
