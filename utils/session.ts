import { cookies } from 'next/headers'

export interface SessionData {
  userId: string
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')
  
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