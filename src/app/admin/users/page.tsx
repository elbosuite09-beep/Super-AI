import UserList from '@/components/users/UserList'

export default function AdminUsersPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Gestion des Utilisateurs</h1>
      <UserList />
    </div>
  )
}
