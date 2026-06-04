import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-6">
          Logiciel de Gestion Scolaire Intégrale
        </h1>
        <p className="text-xl text-gray-700 mb-10">
          Une plateforme complète pour gérer l&apos;administration, les professeurs, les élèves et les finances de votre établissement.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/dashboard"
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg"
          >
            Accéder au Dashboard
          </Link>
          <Link
            href="/director"
            className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg"
          >
            Espace Direction
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
          <div className="p-4 bg-white rounded-lg shadow-sm border">RH & Paie</div>
          <div className="p-4 bg-white rounded-lg shadow-sm border">Notes & Bulletins</div>
          <div className="p-4 bg-white rounded-lg shadow-sm border">Pédagogie</div>
          <div className="p-4 bg-white rounded-lg shadow-sm border">Finances</div>
        </div>
      </div>
    </main>
  )
}
