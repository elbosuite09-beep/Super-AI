import Link from 'next/link'

export default function DirectorDashboard() {
  const modules = [
    { title: 'Gestion Scolaire', href: '/admin/academic', icon: '🏫', desc: 'Cycles, Classes, Matières' },
    { title: 'Ressources Humaines', href: '/admin/hr', icon: '👥', desc: 'Paie, Heures profs' },
    { title: 'Finances', href: '/admin/stats', icon: '💰', desc: 'Bilans, Recettes, Dépenses' },
    { title: 'Inscriptions', href: '/admin/students', icon: '📝', desc: 'Dossiers élèves' },
    { title: 'Documentation', href: '/admin/documents', icon: '📂', desc: 'Archives administratives' },
    { title: 'Pédagogie', href: '/pedagogical', icon: '📚', desc: 'Suivi des cours' },
  ]

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">Espace Direction</h1>
        <p className="text-gray-600 mt-2">Pilotage intégral de l&apos;établissement</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {modules.map((m) => (
          <Link
            key={m.title}
            href={m.href}
            className="group block p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-500 transition-all"
          >
            <div className="text-4xl mb-4">{m.icon}</div>
            <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600">{m.title}</h2>
            <p className="text-gray-500 mt-2">{m.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
