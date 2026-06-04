import DocumentList from '@/components/documents/DocumentList'

export default function AdminDocumentsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Documents Administratifs</h1>
      <DocumentList />
    </div>
  )
}
