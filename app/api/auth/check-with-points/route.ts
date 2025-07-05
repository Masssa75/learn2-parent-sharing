import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/utils/session'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Pass request to getSession for Edge runtime compatibility
    const session = await getSession(request)
    
    if (!session) {
      return NextResponse.json({ authenticated: false })
    }

    const supabase = createServerSupabaseClient()
    
    // Get user data with profile - matching the exact structure Learn expects
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
      return NextResponse.json({ authenticated: false })
    }

    // Return data in the exact format the Learn FeedComponent expects
    // Notice we're using camelCase here to match what FeedComponent expects
    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        telegramId: user.telegram_id,
        username: user.telegram_username,
        firstName: user.first_name,
        lastName: user.last_name,
        photoUrl: user.photo_url,
        displayName: user.first_name || user.telegram_username || 'User',
        isAdmin: user.role === 'admin' || user.is_admin,
        points: user.profiles?.[0]?.points || 0,
        totalXp: user.profiles?.[0]?.total_xp || 0,
        level: user.profiles?.[0]?.level || 1,
        actionsRemaining: user.profiles?.[0]?.actions_remaining
      }
    })
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json({ authenticated: false })
  }
}