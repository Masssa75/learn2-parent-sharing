export interface User {
  id: string
  telegram_id: number
  telegram_username?: string
  first_name: string
  last_name?: string
  photo_url?: string
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
}

export interface Profile {
  user_id: string
  points: number
  created_at: string
  updated_at: string
}

export interface Post {
  id: string
  user_id: string
  title: string
  description?: string
  link_url?: string
  image_url?: string
  category: 'APPS' | 'TOYS' | 'BOOKS' | 'ACTIVITIES' | 'TIPS'
  age_range?: string
  created_at: string
  updated_at: string
}

export interface PostAction {
  id: string
  user_id: string
  post_id: string
  action_type: 'like' | 'save' | 'share'
  created_at: string
}