'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { YouTubePlayer } from './YouTubePlayer'
import { extractYouTubeVideoId } from '@/utils/youtube'

interface User {
  id: string
  telegram_id: number
  telegram_username?: string
  first_name: string
  last_name?: string
  photo_url?: string
  role: string
  points?: number
}

interface Post {
  id: string
  title: string
  description?: string
  link_url?: string
  image_url?: string
  category?: string
  user_id: string
  age_range?: string
  created_at: string
  users?: {
    first_name: string
    last_name?: string
    telegram_username?: string
    photo_url?: string
  }
}

interface FeedComponentProps {
  showAuthPrompt?: boolean
}

export default function FeedComponent({ showAuthPrompt = true }: FeedComponentProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    fetchPosts()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check')
      const data = await response.json()
      
      if (data.authenticated) {
        setIsAuthenticated(true)
        setUser(data.user)
      } else {
        setIsAuthenticated(false)
        setUser(null)
      }
    } catch (error) {
      console.error('Error checking auth:', error)
      setIsAuthenticated(false)
      setUser(null)
    }
  }

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/posts')
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }
      
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setIsAuthenticated(false)
      setUser(null)
      router.push('/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-secondary">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-border z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Learn2</h1>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link href="/create" className="btn-primary text-sm">
                + Share
              </Link>
              <div className="flex items-center gap-2">
                {user?.photo_url && (
                  <img 
                    src={user.photo_url} 
                    alt={user.first_name}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="text-sm">{user?.first_name}</span>
                {user?.points !== undefined && (
                  <span className="text-sm text-primary">
                    {user.points} pts
                  </span>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-text-secondary hover:text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn-primary text-sm">
              Login
            </Link>
          )}
        </div>
      </header>

      {/* Feed */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-secondary mb-4">No posts yet</p>
            {isAuthenticated && (
              <Link href="/create" className="btn-primary">
                Be the first to share!
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold mb-1">{post.title}</h2>
                    <p className="text-sm text-text-secondary">
                      by {post.users?.first_name || 'Anonymous'} • {
                        new Date(post.created_at).toLocaleDateString()
                      }
                    </p>
                  </div>
                  {post.category && (
                    <span className="text-sm bg-primary/20 text-primary px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  )}
                </div>
                
                {post.description && (
                  <p className="text-text-secondary mb-4">{post.description}</p>
                )}
                
                {post.link_url && (() => {
                  const videoId = extractYouTubeVideoId(post.link_url)
                  if (videoId) {
                    return (
                      <div className="mb-4">
                        <YouTubePlayer videoId={videoId} title={post.title} />
                      </div>
                    )
                  }
                  return (
                    <a 
                      href={post.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm"
                    >
                      {post.link_url}
                    </a>
                  )
                })()}
              </article>
            ))}
          </div>
        )}

        {showAuthPrompt && !isAuthenticated && posts.length > 0 && (
          <div className="mt-12 text-center py-8 border-t border-border">
            <p className="text-text-secondary mb-4">
              Join Learn2 to share what works for your kids
            </p>
            <Link href="/login" className="btn-primary">
              Sign in with Telegram
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}