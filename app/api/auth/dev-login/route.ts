import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerSupabaseClient } from '@/lib/supabase'
import { createSessionCookie } from '@/utils/session'

export async function POST(request: NextRequest) {
  try {
    const { password, username } = await request.json()

    // Check if dev login is allowed
    if (process.env.ALLOW_DEV_LOGIN !== 'true') {
      return NextResponse.json(
        { error: 'Dev login is disabled' },
        { status: 403 }
      )
    }

    // Verify password
    if (password !== process.env.DEV_LOGIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    // Map username to telegram ID
    const userMap: Record<string, number> = {
      devtest: 999999999,
      admintest: 888888888,
      admindev: 777777777,
    }

    const telegramId = userMap[username]
    if (!telegramId) {
      return NextResponse.json(
        { error: 'Invalid username' },
        { status: 400 }
      )
    }

    // Get user from database
    const supabase = createServerSupabaseClient()
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('telegram_id', telegramId)
      .single()

    if (error || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Create session cookie
    const sessionCookie = createSessionCookie(user.id)
    const cookieStore = await cookies()
    
    cookieStore.set('session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return NextResponse.json({ 
      success: true,
      user: {
        id: user.id,
        telegram_username: user.telegram_username,
        first_name: user.first_name,
        role: user.role,
      }
    })
  } catch (error) {
    console.error('Dev login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}