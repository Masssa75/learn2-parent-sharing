const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkUsers() {
  console.log('Checking test users in database...\n')
  
  const testUserIds = [999999999, 888888888, 777777777]
  
  for (const telegramId of testUserIds) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('telegram_id', telegramId)
      .single()
    
    if (error) {
      console.log(`❌ User ${telegramId} not found: ${error.message}`)
    } else {
      console.log(`✅ User ${telegramId} exists:`)
      console.log(`   ID: ${data.id}`)
      console.log(`   Username: ${data.telegram_username}`)
      console.log(`   Name: ${data.first_name} ${data.last_name || ''}`)
      console.log(`   Role: ${data.role}`)
    }
  }
  
  // Also check total user count
  const { count } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    
  console.log(`\nTotal users in database: ${count}`)
}

checkUsers().catch(console.error)