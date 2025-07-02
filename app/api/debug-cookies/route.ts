import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  // Method 1: From request object
  const requestCookies = request.cookies.getAll()
  
  // Method 2: From headers
  const cookieHeader = request.headers.get('cookie')
  
  // Method 3: From Next.js cookies() function
  let nextCookies: any[] = []
  try {
    const cookieStore = await cookies()
    nextCookies = cookieStore.getAll()
  } catch (e: any) {
    console.error('Failed to get cookies from Next.js:', e.message)
  }
  
  return NextResponse.json({
    method1_request_cookies: requestCookies.map(c => ({ name: c.name, valueLength: c.value.length })),
    method2_cookie_header: cookieHeader || 'none',
    method3_nextjs_cookies: nextCookies.map(c => ({ name: c.name, valueLength: c.value.length })),
    runtime: process.env.NEXT_RUNTIME || 'unknown',
    nodeVersion: process.version
  })
}