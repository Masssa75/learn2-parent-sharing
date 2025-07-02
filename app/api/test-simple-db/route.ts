import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  try {
    // Create a simple client like Learn does
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    
    console.log('Creating simple Supabase client...')
    console.log('URL:', supabaseUrl)
    console.log('Has service key:', !!supabaseServiceKey)
    
    // Use the same simple configuration as Learn
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
    
    // Try to count users
    const { count, error } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
    
    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ 
        error: 'Database query failed',
        details: error.message,
        hint: error.hint,
        code: error.code
      }, { status: 500 })
    }
    
    // Try to fetch a test user
    const { data: users, error: userError } = await supabase
      .from('users')
      .select('id, telegram_id, first_name')
      .limit(1)
    
    return NextResponse.json({
      success: true,
      totalUsers: count,
      sampleUser: users?.[0] || null,
      configUsed: 'simple (like Learn)'
    })
  } catch (error) {
    console.error('Test error:', error)
    return NextResponse.json({ 
      error: 'Internal error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}