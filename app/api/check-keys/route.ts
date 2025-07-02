import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    hasTelegramToken: !!process.env.TELEGRAM_BOT_TOKEN,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET',
    // Show first/last 4 chars of keys for verification
    anonKeyPreview: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 
      ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.slice(0, 4)}...${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.slice(-4)}`
      : 'NOT SET',
    serviceKeyPreview: process.env.SUPABASE_SERVICE_ROLE_KEY
      ? `${process.env.SUPABASE_SERVICE_ROLE_KEY.slice(0, 4)}...${process.env.SUPABASE_SERVICE_ROLE_KEY.slice(-4)}`
      : 'NOT SET',
  })
}