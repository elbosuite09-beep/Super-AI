import AttendanceMarker from '@/components/attendance/AttendanceMarker'

export default function TeacherAttendancePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Feuille de Présence</h1>
      <AttendanceMarker />
    </div>
  )
}
