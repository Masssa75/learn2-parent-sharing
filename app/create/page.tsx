'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const categories = [
  { value: 'APPS', label: 'Apps', emoji: '📱' },
  { value: 'TOYS', label: 'Toys', emoji: '🧸' },
  { value: 'BOOKS', label: 'Books', emoji: '📚' },
  { value: 'ACTIVITIES', label: 'Activities', emoji: '🎨' },
  { value: 'TIPS', label: 'Tips', emoji: '💡' },
]

const ageRanges = [
  '0-1 years',
  '1-3 years',
  '3-5 years',
  '5-8 years',
  '8-12 years',
  '12+ years',
]

export default function CreatePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link_url: '',
    category: '',
    age_range: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/')
      } else {
        setError(data.error || 'Failed to create post')
      }
    } catch (err) {
      setError('An error occurred while creating the post')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-border z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            Learn2
          </Link>
          <h1 className="text-xl font-semibold">Share Something</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              What are you sharing? *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input w-full"
              placeholder="e.g., Khan Academy Kids, LEGO Duplo Train, etc."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input w-full"
              required
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.emoji} {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Age Range
            </label>
            <select
              name="age_range"
              value={formData.age_range}
              onChange={handleChange}
              className="input w-full"
            >
              <option value="">Select age range</option>
              {ageRanges.map(range => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Why do you recommend it?
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input w-full min-h-[100px]"
              placeholder="Share your experience..."
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Link (optional)
            </label>
            <input
              type="url"
              name="link_url"
              value={formData.link_url}
              onChange={handleChange}
              className="input w-full"
              placeholder="https://example.com"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1"
            >
              {loading ? 'Sharing...' : 'Share'}
            </button>
            <Link
              href="/"
              className="btn-secondary px-8"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  )
}