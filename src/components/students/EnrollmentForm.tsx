'use client'

import { useState, useEffect } from 'react'

export default function EnrollmentForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: 'password123',
    registration: '',
    classId: '',
  })
  const [classes, setClasses] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/academic/classes')
      .then(res => res.json())
      .then(data => setClasses(data))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    if (res.ok) {
      alert('Élève inscrit avec succès !')
      setFormData({ name: '', email: '', password: 'password123', registration: '', classId: '' })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-md">
      <h2 className="text-xl font-bold">Nouvelle Inscription</h2>
      <div>
        <label className="block text-sm font-medium">Nom complet</label>
        <input
          type="text"
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Matricule</label>
        <input
          type="text"
          value={formData.registration}
          onChange={e => setFormData({...formData, registration: e.target.value})}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Classe</label>
        <select
          value={formData.classId}
          onChange={e => setFormData({...formData, classId: e.target.value})}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        >
          <option value="">Sélectionner une classe</option>
          {classes.map(c => (
            <option key={c.id} value={c.id}>{c.name} ({c.cycle})</option>
          ))}
        </select>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Inscrire l&apos;élève
      </button>
    </form>
  )
}
