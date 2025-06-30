import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const authData = await request.json()
    
    console.log('=== TELEGRAM AUTH DEBUG ===')
    console.log('Raw auth data received:', JSON.stringify(authData, null, 2))
    console.log('Telegram ID:', authData.id)
    console.log('Username:', authData.username)
    console.log('First name:', authData.first_name)
    console.log('Last name:', authData.last_name)
    console.log('Photo URL:', authData.photo_url)
    console.log('Auth date:', authData.auth_date)
    console.log('Hash:', authData.hash)
    console.log('=== END DEBUG ===')
    
    return NextResponse.json({
      success: true,
      received: authData,
      message: 'Debug data logged to console'
    })
  } catch (error) {
    console.error('Debug auth error:', error)
    return NextResponse.json({ error: 'Debug failed' }, { status: 500 })
  }
}