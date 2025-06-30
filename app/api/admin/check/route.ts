import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/utils/session'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    
    if (!session) {
      return NextResponse.json({ isAdmin: false })
    }

    const supabase = createServerSupabaseClient()
    
    const { data: user, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.userId)
      .single()

    if (error || !user) {
      return NextResponse.json({ isAdmin: false })
    }

    return NextResponse.json({ isAdmin: user.role === 'admin' })
  } catch (error) {
    console.error('Admin check error:', error)
    return NextResponse.json({ isAdmin: false })
  }
}