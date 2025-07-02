import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'
import { createSessionCookie } from '@/utils/session'

function verifyTelegramAuth(authData: any): boolean {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  if (!botToken) return false

  const checkString = Object.keys(authData)
    .filter(key => key !== 'hash')
    .sort()
    .map(key => `${key}=${authData[key]}`)
    .join('\n')

  const secretKey = crypto
    .createHash('sha256')
    .update(botToken)
    .digest()

  const hash = crypto
    .createHmac('sha256', secretKey)
    .update(checkString)
    .digest('hex')

  return hash === authData.hash
}

export async function POST(request: NextRequest) {
  try {
    const authData = await request.json()

    // Verify the data came from Telegram
    if (!verifyTelegramAuth(authData)) {
      return NextResponse.json(
        { error: 'Invalid authentication data' },
        { status: 401 }
      )
    }

    // Check if auth is not too old (5 minutes)
    const authDate = parseInt(authData.auth_date)
    const currentTime = Math.floor(Date.now() / 1000)
    if (currentTime - authDate > 300) {
      return NextResponse.json(
        { error: 'Authentication data is too old' },
        { status: 401 }
      )
    }

    // Create Supabase client using the same pattern as Learn
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    console.log('Checking for existing user with telegram_id:', authData.id)

    // Check if user exists
    const { data: existingUser, error: selectError } = await supabase
      .from('users')
      .select('*')
      .eq('telegram_id', authData.id)
      .maybeSingle() // Use maybeSingle instead of single to avoid error when no rows

    let userId: string

    if (existingUser) {
      // Update existing user
      const { error: updateError } = await supabase
        .from('users')
        .update({
          first_name: authData.first_name,
          last_name: authData.last_name || null,
          telegram_username: authData.username || null,
          photo_url: authData.photo_url || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingUser.id)

      if (updateError) {
        console.error('Error updating user:', updateError)
      }
      
      userId = existingUser.id
    } else {
      // Create new user
      console.log('Creating new user with data:', {
        telegram_id: authData.id,
        first_name: authData.first_name,
        last_name: authData.last_name || null,
        telegram_username: authData.username || null,
        photo_url: authData.photo_url || null,
        role: 'user',
      })
      
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert({
          telegram_id: authData.id,
          first_name: authData.first_name,
          last_name: authData.last_name || null,
          telegram_username: authData.username || null,
          photo_url: authData.photo_url || null,
          role: 'user',
        })
        .select()
        .single()

      if (insertError || !newUser) {
        console.error('Error creating user:', insertError)
        return NextResponse.json(
          { 
            error: 'Failed to create user',
            details: insertError?.message || 'Unknown error',
            hint: insertError?.hint,
            code: insertError?.code
          },
          { status: 500 }
        )
      }

      // Create initial profile
      await supabase
        .from('profiles')
        .insert({
          user_id: newUser.id,
          points: 0,
        })

      userId = newUser.id
    }

    // Create session cookie
    const sessionCookie = createSessionCookie(userId)
    const cookieStore = await cookies()
    
    cookieStore.set('session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return NextResponse.json({ success: true, userId })
  } catch (error) {
    console.error('Telegram auth error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}