'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    onTelegramAuthDebug: (user: any) => void
  }
}

export default function TelegramLoginDebug() {
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Define the debug callback function
    window.onTelegramAuthDebug = async (user: any) => {
      try {
        console.log('🔍 Debug: Telegram auth data received:', user)
        
        // Send to debug endpoint
        const response = await fetch('/api/debug-auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        })
        
        const data = await response.json()
        console.log('🔍 Debug response:', data)
        
        alert(`Debug complete! Check console for details. Your Telegram ID: ${user.id}`)
        
      } catch (error) {
        console.error('Debug error:', error)
        alert('Debug failed - check console')
      }
    }
    
    // Create the Telegram login widget for debugging
    const script = document.createElement('script')
    script.src = 'https://telegram.org/js/telegram-widget.js?22'
    script.setAttribute('data-telegram-login', 'learn2_notifications_bot')
    script.setAttribute('data-size', 'large')
    script.setAttribute('data-radius', '20')
    script.setAttribute('data-onauth', 'onTelegramAuthDebug(user)')
    script.setAttribute('data-request-access', 'write')
    script.async = true
    
    if (ref.current) {
      ref.current.appendChild(script)
    }
    
    return () => {
      if (ref.current && script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])
  
  return (
    <div>
      <p className="text-sm text-yellow-500 mb-4">🔍 DEBUG MODE: This will show your Telegram data</p>
      <div ref={ref} />
    </div>
  )
}