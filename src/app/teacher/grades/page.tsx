import GradeEntry from '@/components/grades/GradeEntry'

export default function TeacherGradesPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Saisie des Notes</h1>
      <GradeEntry />
    </div>
  )
}
