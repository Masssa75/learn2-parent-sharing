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
  } else {
    const cookieStore = await cookies()
    sessionCookie = cookieStore.get('session')
  }
  
  if (!sessionCookie) {
    return null
  }
  
  try {
    const sessionData = JSON.parse(
      Buffer.from(sessionCookie.value, 'base64').toString()
    )
    return sessionData
  } catch (error) {
    console.error('Failed to parse session:', error)
    return null
  }
}

export function createSessionCookie(userId: string): string {
  const sessionData: SessionData = { userId }
  return Buffer.from(JSON.stringify(sessionData)).toString('base64')
}