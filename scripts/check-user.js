const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
})

async function checkUser() {
  // Your Telegram ID (replace with your actual ID)
  const yourTelegramId = parseInt(process.argv[2])
  
  if (!yourTelegramId) {
    console.log('Usage: node scripts/check-user.js <your_telegram_id>')
    console.log('Example: node scripts/check-user.js 123456789')
    return
  }
  
  console.log(`Checking for user with Telegram ID: ${yourTelegramId}`)
  
  try {
    // Check if user exists
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('telegram_id', yourTelegramId)
      .maybeSingle()
    
    if (error) {
      console.error('Error querying user:', error)
      return
    }
    
    if (user) {
      console.log('✅ User found:')
      console.log('- ID:', user.id)
      console.log('- Name:', user.first_name, user.last_name)
      console.log('- Username:', user.telegram_username)
      console.log('- Role:', user.role)
      console.log('- Created:', user.created_at)
      
      // Check if they have a profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle()
      
      if (profile) {
        console.log('- Profile: Yes (Points:', profile.points, ')')
      } else {
        console.log('- Profile: Missing')
      }
      
      console.log('\nTo delete this user, run:')
      console.log(`node scripts/check-user.js ${yourTelegramId} delete`)
      
    } else {
      console.log('❌ User not found with that Telegram ID')
    }
    
  } catch (err) {
    console.error('Script error:', err)
  }
}

async function deleteUser() {
  const yourTelegramId = parseInt(process.argv[2])
  
  if (process.argv[3] !== 'delete') {
    return checkUser()
  }
  
  console.log(`⚠️  DELETING user with Telegram ID: ${yourTelegramId}`)
  
  try {
    // Get user first
    const { data: user, error: getUserError } = await supabase
      .from('users')
      .select('id')
      .eq('telegram_id', yourTelegramId)
      .maybeSingle()
    
    if (!user) {
      console.log('User not found')
      return
    }
    
    // Delete profile first (foreign key constraint)
    const { error: profileError } = await supabase
      .from('profiles')
      .delete()
      .eq('user_id', user.id)
    
    if (profileError) {
      console.error('Error deleting profile:', profileError)
    } else {
      console.log('✅ Profile deleted')
    }
    
    // Delete user
    const { error: userError } = await supabase
      .from('users')
      .delete()
      .eq('id', user.id)
    
    if (userError) {
      console.error('Error deleting user:', userError)
    } else {
      console.log('✅ User deleted successfully')
      console.log('You can now try Telegram login again')
    }
    
  } catch (err) {
    console.error('Delete error:', err)
  }
}

deleteUser()