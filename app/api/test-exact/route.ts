import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Test by calling the exact same endpoint Learn calls
  const supabaseUrl = 'https://yvzinotrjggncbwflxok.supabase.co'
  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2emlub3RyamdnbmNid2ZseG9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0NjIwNzYsImV4cCI6MjA1MTAzODA3Nn0.Qj7E5YvGPjHGxYBJIJLNgSAJHkAqvHjz2sPQJGnOmEQ'
  
  try {
    // Try to fetch posts just like Learn does
    const response = await fetch(`${supabaseUrl}/rest/v1/posts?select=*&order=created_at.desc&limit=20`, {
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
      }
    })
    
    const data = await response.text()
    
    return NextResponse.json({
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
      data: data.length > 500 ? data.substring(0, 500) + '...' : data
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}