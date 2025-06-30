'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TestAuthPage() {
  const [password, setPassword] = useState('')
  const [selectedUser, setSelectedUser] = useState('devtest')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const testUsers = [
    { id: 'devtest', name: 'Dev Test User', telegramId: 999999999 },
    { id: 'admintest', name: 'Admin Test User', telegramId: 888888888 },
    { id: 'admindev', name: 'Admin Developer', telegramId: 777777777 },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/dev-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          username: selectedUser,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/')
      } else {
        setError(data.error || 'Authentication failed')
      }
    } catch (err) {
      setError('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="card max-w-md w-full">
        <h1 className="text-title font-bold mb-6">Test Authentication</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Test User
            </label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="input w-full"
            >
              {testUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.telegramId})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input w-full"
              placeholder="Enter dev password"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-sm text-text-secondary text-center">
            For development testing only
          </p>
        </div>
      </div>
    </div>
  )
}