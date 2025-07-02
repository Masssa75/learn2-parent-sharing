import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Only show in development or with correct password
  const authHeader = request.headers.get('authorization')
  const devPassword = process.env.DEV_LOGIN_PASSWORD
  
  if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${devPassword}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  return NextResponse.json({
    hasUrl: !!supabaseUrl,
    hasAnonKey: !!supabaseAnonKey,
    urlLength: supabaseUrl?.length || 0,
    anonKeyLength: supabaseAnonKey?.length || 0,
    urlPrefix: supabaseUrl?.substring(0, 30) || 'missing',
    anonKeyPrefix: supabaseAnonKey?.substring(0, 50) || 'missing',
    nodeEnv: process.env.NODE_ENV
  })
}