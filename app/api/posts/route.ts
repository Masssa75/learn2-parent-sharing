import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import { getSession } from '@/utils/session'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    
    // Get posts with user info
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        *,
        users (
          id,
          first_name,
          last_name,
          telegram_username,
          photo_url
        )
      `)
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      console.error('Error fetching posts:', error)
      return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
    }

    // Check if user is authenticated to add user-specific data
    const session = await getSession()
    
    // Transform posts if needed
    const transformedPosts = posts?.map(post => ({
      ...post,
      // Add any user-specific data here if authenticated
      isOwner: session?.userId === post.user_id
    })) || []

    return NextResponse.json(transformedPosts)
  } catch (error) {
    console.error('Posts API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, link_url, category, age_range } = body

    if (!title || !category) {
      return NextResponse.json(
        { error: 'Title and category are required' },
        { status: 400 }
      )
    }

    const supabase = createServerSupabaseClient()

    const { data: post, error } = await supabase
      .from('posts')
      .insert({
        title,
        description,
        link_url,
        category,
        age_range,
        user_id: session.userId,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating post:', error)
      return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Create post error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}