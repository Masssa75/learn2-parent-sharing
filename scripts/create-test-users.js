const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables')
  console.log('SUPABASE_URL:', supabaseUrl)
  console.log('Has SERVICE_KEY:', !!supabaseServiceKey)
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const testUsers = [
  {
    telegram_id: 999999999,
    first_name: 'Dev',
    last_name: 'Test',
    telegram_username: 'devtest',
    role: 'user'
  },
  {
    telegram_id: 888888888,
    first_name: 'Admin',
    last_name: 'Test',
    telegram_username: 'admintest',
    role: 'admin'
  },
  {
    telegram_id: 777777777,
    first_name: 'Admin',
    last_name: 'Developer',
    telegram_username: 'admindev',
    role: 'admin'
  }
]

async function createTestUsers() {
  console.log('Creating test users...\n')
  
  for (const user of testUsers) {
    try {
      // Check if user exists
      const { data: existing, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('telegram_id', user.telegram_id)
        .single()
      
      if (existing) {
        console.log(`✓ User ${user.telegram_username} already exists`)
        continue
      }
      
      // Create user
      const { data, error } = await supabase
        .from('users')
        .insert(user)
        .select()
        .single()
      
      if (error) {
        console.error(`✗ Failed to create ${user.telegram_username}:`, error.message)
      } else {
        console.log(`✓ Created user ${user.telegram_username} (${data.id})`)
        
        // Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            user_id: data.id,
            points: 0
          })
        
        if (profileError) {
          console.error(`  ✗ Failed to create profile:`, profileError.message)
        } else {
          console.log(`  ✓ Created profile`)
        }
      }
    } catch (err) {
      console.error(`✗ Error with ${user.telegram_username}:`, err.message)
    }
  }
  
  // List all users
  console.log('\nFetching all users...')
  const { data: allUsers, error: listError } = await supabase
    .from('users')
    .select('id, telegram_id, telegram_username, first_name, role')
    .order('created_at', { ascending: false })
  
  if (listError) {
    console.error('Failed to list users:', listError.message)
  } else {
    console.log(`\nTotal users: ${allUsers.length}`)
    allUsers.forEach(u => {
      console.log(`- ${u.telegram_username} (${u.telegram_id}) - ${u.role}`)
    })
  }
}

createTestUsers().catch(console.error)