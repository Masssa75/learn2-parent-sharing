import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    console.log('Testing database connection...')
    console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('Has ANON_KEY:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    console.log('Has SERVICE_KEY:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)
    
    const supabase = createServerSupabaseClient()
    
    // Try to count users
    const { count, error: countError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
    
    if (countError) {
      console.error('Count error:', countError)
      return NextResponse.json({ 
        error: 'Count failed',
        details: countError.message,
        hint: countError.hint,
        code: countError.code
      }, { status: 500 })
    }
    
    // Try to get test users
    const { data: testUser, error: userError } = await supabase
      .from('users')
      .select('id, telegram_id, first_name, role')
      .eq('telegram_id', 999999999)
      .single()
    
    if (userError && userError.code !== 'PGRST116') { // PGRST116 is "no rows found"
      console.error('User query error:', userError)
      return NextResponse.json({ 
        error: 'User query failed',
        details: userError.message,
        hint: userError.hint,
        code: userError.code
      }, { status: 500 })
    }
    
    return NextResponse.json({
      success: true,
      totalUsers: count,
      testUserExists: !!testUser,
      testUser: testUser || null,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL
    })
  } catch (error) {
    console.error('Test DB error:', error)
    return NextResponse.json({ 
      error: 'Internal error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}