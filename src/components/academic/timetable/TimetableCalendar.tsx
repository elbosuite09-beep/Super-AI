'use client'

import { useState, useEffect } from 'react'

export default function TimetableCalendar() {
  const [timetable, setTimetable] = useState<any[]>([])
  const [classes, setClasses] = useState<any[]>([])
  const [selectedClass, setSelectedClass] = useState('')

  useEffect(() => {
    fetch('/api/academic/classes').then(res => res.json()).then(data => setClasses(data))
  }, [])

  useEffect(() => {
    if (selectedClass) {
      fetch(`/api/academic/timetable?classId=${selectedClass}`)
        .then(res => res.json())
        .then(data => setTimetable(data))
    }
  }, [selectedClass])

  const days = [
    { label: 'Lundi', value: 1 },
    { label: 'Mardi', value: 2 },
    { label: 'Mercredi', value: 3 },
    { label: 'Jeudi', value: 4 },
    { label: 'Vendredi', value: 5 },
  ]

  return (
    <div className="space-y-6">
      <select
        onChange={e => setSelectedClass(e.target.value)}
        className="border p-2 rounded w-full max-w-xs"
      >
        <option value="">Sélectionner une classe</option>
        {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>

      <div className="grid grid-cols-5 gap-4">
        {days.map(day => (
          <div key={day.value} className="bg-white p-4 rounded-lg shadow min-h-[400px]">
            <h3 className="font-bold border-b pb-2 mb-4 text-center">{day.label}</h3>
            <div className="space-y-2">
              {timetable
                .filter(t => t.dayOfWeek === day.value)
                .sort((a, b) => a.startTime.localeCompare(b.startTime))
                .map(t => (
                  <div key={t.id} className="bg-blue-50 p-2 rounded text-sm border-l-4 border-blue-500">
                    <div className="font-bold">{t.startTime} - {t.endTime}</div>
                    <div className="text-blue-800">{t.subject.name}</div>
                    <div className="text-xs text-gray-600">{t.teacher.user.name}</div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
