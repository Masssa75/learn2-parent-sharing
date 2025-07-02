import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/utils/session'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Pass request to getSession for Edge runtime compatibility
    const session = await getSession(request)
    
    // Debug logging
    console.log('[Auth Check] Session:', session)
    
    if (!session) {
      console.log('[Auth Check] No session found')
      return NextResponse.json({ authenticated: false, debug: 'no_session' })
    }

    const supabase = createServerSupabaseClient()
    
    // Get user data with profile
    const { data: user, error } = await supabase
      .from('users')
      .select(`
        *,
        profiles (
          points,
          total_xp,
          level,
          actions_remaining,
          created_at,
          updated_at
        )
      `)
      .eq('id', session.userId)
      .single()

    if (error || !user) {
      console.log('[Auth Check] Database error:', error)
      return NextResponse.json({ authenticated: false, debug: 'db_error', error: error?.message })
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        telegram_id: user.telegram_id,
        telegram_username: user.telegram_username,
        first_name: user.first_name,
        last_name: user.last_name,
        photo_url: user.photo_url,
        role: user.role,
        is_admin: user.is_admin || false,
        points: user.profiles?.[0]?.points || 0,
        total_xp: user.profiles?.[0]?.total_xp || 0,
        level: user.profiles?.[0]?.level || 1,
        actions_remaining: user.profiles?.[0]?.actions_remaining
      }
    })
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json({ authenticated: false })
  }
}