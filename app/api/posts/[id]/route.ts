import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

// Create Supabase client for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Use service key for write operations (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')
    
    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user data from session (decode from base64)
    const sessionData = JSON.parse(
      Buffer.from(sessionCookie.value, 'base64').toString()
    )
    const userId = sessionData.userId
    
    // Get the post to check ownership
    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('user_id')
      .eq('id', params.id)
      .single()
    
    if (fetchError || !post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    
    // Check if user owns the post or is admin
    const { data: user } = await supabase
      .from('users')
      .select('is_admin')
      .eq('id', userId)
      .single()
    
    if (post.user_id !== userId && !user?.is_admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    
    // Get the update data from request body
    const body = await request.json()
    const { title, description, linkUrl, imageUrl } = body
    
    // Update the post
    const { data: updatedPost, error: updateError } = await supabase
      .from('posts')
      .update({
        title,
        description,
        link_url: linkUrl || null,
        image_url: imageUrl || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()
      .single()
    
    if (updateError) {
      console.error('Error updating post:', updateError)
      return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
    }
    
    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error('Error in PATCH /api/posts/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')
    
    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user data from session (decode from base64)
    const sessionData = JSON.parse(
      Buffer.from(sessionCookie.value, 'base64').toString()
    )
    const userId = sessionData.userId
    
    // Get the post to check ownership
    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('user_id')
      .eq('id', params.id)
      .single()
    
    if (fetchError || !post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    
    // Check if user owns the post or is admin
    const { data: user } = await supabase
      .from('users')
      .select('is_admin')
      .eq('id', userId)
      .single()
    
    if (post.user_id !== userId && !user?.is_admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    
    // Delete the post
    const { error: deleteError } = await supabase
      .from('posts')
      .delete()
      .eq('id', params.id)
    
    if (deleteError) {
      console.error('Error deleting post:', deleteError)
      return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/posts/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}