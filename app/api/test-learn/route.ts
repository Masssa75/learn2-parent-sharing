import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Test if Learn project API works from here
  try {
    const response = await fetch('https://learn-parent-sharing-app.netlify.app/api/posts')
    const data = await response.json()
    
    return NextResponse.json({
      learnApiWorks: !data.error,
      learnResponse: data
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to test Learn API',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}