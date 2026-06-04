'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LicensePage() {
  const [key, setKey] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key })
      })

      if (res.ok) {
        window.location.href = '/'
      } else {
        const data = await res.json()
        setError(data.error || 'Erreur lors de l\'activation')
      }
    } catch (err) {
      setError('Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Activation du Logiciel</h1>
        <p className="text-gray-600 text-sm mb-6 text-center">
          Veuillez saisir votre clé de licence pour accéder au logiciel de gestion scolaire.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-center font-mono tracking-widest focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Activation...' : 'Activer le Logiciel'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t text-center text-xs text-gray-400">
          © 2024 School Management System - Licence requise.
        </div>
      </div>
    </div>
  )
}
