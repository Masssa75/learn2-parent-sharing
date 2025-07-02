import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSession } from '@/utils/session'

export async function GET(request: NextRequest) {
  try {
    // Get raw cookie
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')
    
    // Get parsed session
    const session = await getSession()
    
    return NextResponse.json({
      hasCookie: !!sessionCookie,
      cookieValue: sessionCookie?.value ? sessionCookie.value.substring(0, 20) + '...' : null,
      sessionParsed: !!session,
      sessionData: session,
      allCookies: cookieStore.getAll().map(c => ({ name: c.name, valueLength: c.value.length }))
    })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}