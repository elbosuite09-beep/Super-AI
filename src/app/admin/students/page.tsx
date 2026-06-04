import EnrollmentForm from '@/components/students/EnrollmentForm'

export default function StudentsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Gestion des Élèves</h1>
      <EnrollmentForm />
    </div>
  )
}
