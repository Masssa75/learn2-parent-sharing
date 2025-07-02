import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasSupabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    hasServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    urlValue: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT_SET',
    keyFirst20: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) || 'NOT_SET'
  })
}