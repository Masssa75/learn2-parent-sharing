import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export interface SessionData {
  userId: string
}

export async function getSession(request?: NextRequest): Promise<SessionData | null> {
  // Try to get cookie from request first (for Edge runtime compatibility)
  let sessionCookie
  
  if (request) {
    sessionCookie = request.cookies.get('session')
    console.log('[getSession] Got cookie from request:', !!sessionCookie)
  } else {
    const cookieStore = await cookies()
    sessionCookie = cookieStore.get('session')
    console.log('[getSession] Got cookie from cookies():', !!sessionCookie)
  }
  
  if (!sessionCookie) {
    return null
  }
  
  try {
    console.log('[getSession] Cookie value:', sessionCookie.value.substring(0, 20) + '...')
    const decoded = Buffer.from(sessionCookie.value, 'base64').toString()
    console.log('[getSession] Decoded:', decoded)
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