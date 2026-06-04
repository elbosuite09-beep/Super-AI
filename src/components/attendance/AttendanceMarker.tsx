'use client'

import { useState, useEffect } from 'react'

export default function AttendanceMarker() {
  const [students, setStudents] = useState<any[]>([])
  const [selectedClass, setSelectedClass] = useState('')
  const [classes, setClasses] = useState<any[]>([])
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    fetch('/api/academic/classes').then(res => res.json()).then(data => setClasses(data))
  }, [])

  useEffect(() => {
    if (selectedClass) {
      fetch(`/api/students?classId=${selectedClass}`)
        .then(res => res.json())
        .then(data => setStudents(data.filter((s: any) => s.classId === selectedClass)))
    }
  }, [selectedClass])

  const markAttendance = async (studentId: string, status: string) => {
    await fetch('/api/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, date, status })
    })
    alert(`Présence marquée : ${status}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <select
          onChange={e => setSelectedClass(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Choisir une classe</option>
          {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left">Élève</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id} className="border-t">
                <td className="px-6 py-4">{s.user.name}</td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button onClick={() => markAttendance(s.id, 'PRESENT')} className="bg-green-500 text-white px-3 py-1 rounded text-sm">Présent</button>
                  <button onClick={() => markAttendance(s.id, 'ABSENT')} className="bg-red-500 text-white px-3 py-1 rounded text-sm">Absent</button>
                  <button onClick={() => markAttendance(s.id, 'LATE')} className="bg-yellow-500 text-white px-3 py-1 rounded text-sm">En retard</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
