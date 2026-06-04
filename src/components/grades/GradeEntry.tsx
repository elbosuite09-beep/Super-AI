'use client'

import { useState, useEffect } from 'react'

export default function GradeEntry() {
  const [students, setStudents] = useState<any[]>([])
  const [subjects, setSubjects] = useState<any[]>([])
  const [selectedClass, setSelectedClass] = useState('')
  const [classes, setClasses] = useState<any[]>([])
  const [selectedSubject, setSelectedSubject] = useState('')
  const [period, setPeriod] = useState('TRIMESTRE 1')

  useEffect(() => {
    fetch('/api/academic/classes').then(res => res.json()).then(data => setClasses(data))
    fetch('/api/academic/subjects').then(res => res.json()).then(data => setSubjects(data))
  }, [])

  useEffect(() => {
    if (selectedClass) {
      fetch(`/api/students?classId=${selectedClass}`)
        .then(res => res.json())
        .then(data => setStudents(data.filter((s: any) => s.classId === selectedClass)))
    }
  }, [selectedClass])

  const submitGrade = async (studentId: string, value: string) => {
    if (!value || !selectedSubject) return
    await fetch('/api/grades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, subjectId: selectedSubject, value, period })
    })
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <select onChange={e => setSelectedClass(e.target.value)} className="border p-2 rounded">
          <option value="">Classe</option>
          {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select onChange={e => setSelectedSubject(e.target.value)} className="border p-2 rounded">
          <option value="">Matière</option>
          {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <select onChange={e => setPeriod(e.target.value)} className="border p-2 rounded">
          <option value="TRIMESTRE 1">TRIMESTRE 1</option>
          <option value="TRIMESTRE 2">TRIMESTRE 2</option>
          <option value="TRIMESTRE 3">TRIMESTRE 3</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left">Élève</th>
              <th className="px-6 py-3 text-left">Note (/20)</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id} className="border-t">
                <td className="px-6 py-4">{s.user.name}</td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    min="0" max="20" step="0.25"
                    className="border p-1 rounded w-20"
                    onBlur={(e) => submitGrade(s.id, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
