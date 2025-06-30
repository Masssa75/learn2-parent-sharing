import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/utils/session'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    
    if (!session) {
      return NextResponse.json({ authenticated: false })
    }

    const supabase = createServerSupabaseClient()
    
    // Get user data with profile
    const { data: user, error } = await supabase
      .from('users')
      .select(`
        *,
        profiles (
          points,
          created_at,
          updated_at
        )
      `)
      .eq('id', session.userId)
      .single()

    if (error || !user) {
      return NextResponse.json({ authenticated: false })
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
        points: user.profiles?.[0]?.points || 0,
      }
    })
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json({ authenticated: false })
  }
}