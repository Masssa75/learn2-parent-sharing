import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ 
      error: 'Missing environment variables',
      hasUrl: !!supabaseUrl,
      hasAnonKey: !!supabaseAnonKey
    })
  }
  
  try {
    // Try a simple fetch to Supabase
    const response = await fetch(`${supabaseUrl}/rest/v1/users?select=count`, {
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Prefer': 'count=exact,head=true'
      }
    })
    
    const text = await response.text()
    
    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      headers: {
        'content-range': response.headers.get('content-range'),
        'content-type': response.headers.get('content-type')
      },
      body: text,
      url: supabaseUrl
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Fetch failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}