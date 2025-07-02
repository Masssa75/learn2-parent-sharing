import { cookies } from 'next/headers'

export interface SessionData {
  userId: string
}

export async function getSession(): Promise<SessionData | null> {
  console.log('[getSession] Starting session retrieval...')
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')
  console.log('[getSession] Session cookie exists:', !!sessionCookie)
  
  if (!sessionCookie) {
    console.log('[getSession] No session cookie found')
    return null
  }
  
  try {
    console.log('[getSession] Session cookie value (first 20 chars):', sessionCookie.value.substring(0, 20) + '...')
    const decoded = Buffer.from(sessionCookie.value, 'base64').toString()
    console.log('[getSession] Decoded session:', decoded)
    const sessionData = JSON.parse(decoded)
    console.log('[getSession] Parsed session data:', sessionData)
    return sessionData
  } catch (error) {
    console.error('[getSession] Failed to parse session:', error)
    return null
  }
}

export function createSessionCookie(userId: string): string {
  const sessionData: SessionData = { userId }
  return Buffer.from(JSON.stringify(sessionData)).toString('base64')
}