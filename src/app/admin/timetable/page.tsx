import TimetableCalendar from '@/components/academic/timetable/TimetableCalendar'

export default function TimetablePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Emploi du Temps</h1>
      <TimetableCalendar />
    </div>
  )
}
