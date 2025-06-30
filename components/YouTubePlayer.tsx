'use client'

import { useState } from 'react'

interface YouTubePlayerProps {
  videoId: string
  title?: string
}

export function YouTubePlayer({ videoId, title }: YouTubePlayerProps) {
  const [showPlayer, setShowPlayer] = useState(false)
  
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`
  
  if (!videoId) return null
  
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
      {!showPlayer ? (
        <div 
          className="relative w-full h-full cursor-pointer group"
          onClick={() => setShowPlayer(true)}
        >
          <img
            src={thumbnailUrl}
            alt={title || 'YouTube video'}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg 
                className="w-8 h-8 text-white ml-1" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.84A1.01 1.01 0 004 3.02v13.96a1 1 0 001.54.84l11.94-6.98a1 1 0 000-1.68L5.54 2.18c-.13-.08-.28-.12-.44-.12z" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <iframe
          src={embedUrl}
          title={title || 'YouTube video player'}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      )}
    </div>
  )
}