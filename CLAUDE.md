# CLAUDE.md - AI Assistant Context

## 🚨 CRITICAL: Autonomous Workflow (READ THIS FIRST!)

### File Coordination - CHECK FIRST!
Before editing ANY file:
1. **Check WORKING.md** - See if another instance is working on it
2. **Add your entry** - List files you'll edit with timestamp
3. **Remove when done** - Clean up after yourself

If a file is taken, either:
- Wait and work on something else
- Coordinate with user if urgent

### The Golden Rule - ALWAYS Follow This Pattern:
```bash
1. Make code changes
2. git add -A && git commit -m "feat: description" && git push origin main
3. sleep 120  # MUST wait 2 minutes for Netlify deployment
4. Check deployment: https://app.netlify.com/sites/[site-name]/deploys
5. npx playwright test --headed  # Test on DEPLOYED site
6. If broken, fix and repeat from step 1
```

**NEVER**:
- Wait to push code "until it's ready"
- Test only locally
- Skip deployment verification
- Leave broken code undeployed

### Your Full Permissions

You have COMPLETE autonomous control:

**Supabase**:
- ✅ Full management key access (in .env)
- ✅ Can run ANY Supabase CLI command
- ✅ Can modify schema, RLS policies, functions
- ✅ Can access service role for admin operations
```bash
# If not installed:
npm install -g supabase

# You can do:
npx supabase db push
npx supabase db execute --sql "YOUR SQL"
```

**Netlify**:
- ✅ Full deployment access
- ✅ Can add/modify environment variables
- ✅ Can trigger deployments
- ✅ Can check deployment status

**GitHub**:
- ✅ Full repository access
- ✅ Can push directly to main
- ✅ Can create branches, PRs
- ✅ Can manage secrets

**You are expected to work autonomously. Don't ask for permission - just do it!**

---

## 📚 Documentation Structure

When you need detailed information, check these files:

- **ARCHITECTURE.md** - Technical decisions, database schema, system design
- **STYLE_GUIDE.md** - Code conventions, naming rules, patterns
- **DEVELOPMENT_GUIDE.md** - Setup instructions, debugging recipes
- **MIGRATION_PLAN.md** - Current migration status from Learn to Learn2

---

## Project Overview

**Learn2** - A social platform for parents to discover and share apps, toys, books, and tips that work for their kids.

**Tech Stack**:
- Frontend: Next.js 15, TypeScript, Tailwind CSS
- Backend: Supabase (PostgreSQL)
- Auth: Telegram Login Widget + Session cookies
- Deployment: Netlify
- Testing: Playwright

---

## Current Project State

### 🚀 Migration Status: Ready to Start!

This is a fresh project created from the template. The next step is to migrate from the old Learn project.

**Source Project**: `/Users/marcschwyn/Desktop/projects/Learn`
**Target Project**: `/Users/marcschwyn/Desktop/projects/Learn2` (this folder)

### Migration Instructions:
1. **Read MIGRATION_PLAN.md first** - It has the complete step-by-step process
2. **Start with Checkpoint 1** - Basic setup (env vars, Supabase connection)
3. **Follow the checkpoint system** - Deploy and test after each checkpoint
4. **Use existing database** - Supabase project: yvzinotrjggncbwflxok

### What's Working in Original Learn:
- Feed with real posts from database
- Telegram authentication + dev login system  
- Post creation with AI voice input
- YouTube embedding
- Points/gamification system
- Admin dashboard with user management
- Post editing and deletion
- Responsive design with dark theme

### Known Issues from Original:
- Telegram photo URLs blocked by CORS
- Session persistence could be better
- Some TypeScript strict mode issues
- File structure is messy (why we're migrating!)

### First Steps:
1. Set up GitHub repository
2. Set up Netlify deployment
3. Copy .env values from Learn/.env
4. Start with Checkpoint 1 in MIGRATION_PLAN.md

---

## Critical Context

### Database Gotchas (from Learn project)
1. **Users table**: Column is `telegram_username` NOT `username`
2. **Profiles table**: Primary key is `user_id` NOT `id`
3. **RLS Policies**: Often need manual dashboard application if CLI fails
4. **Relationships**: Use explicit foreign keys like `users!posts_user_id_fkey`
5. **Posts table**: Has `link_url` not `url`, no `youtube_video_id` column (extract from URL)

### Authentication (to be migrated)
- Sessions stored as base64 encoded JSON in httpOnly cookies
- Test users available via `/test-auth` route
- Password: See `DEV_LOGIN_PASSWORD` in `.env` file (copy from Learn/.env)
- Test users already exist in database:
  - devtest (999999999) - Regular user
  - admintest (888888888) - Admin user
  - admindev (777777777) - Admin developer

### Environment Variables
All sensitive values are stored in `.env` file (never commit this!)

**Required** (for autonomous work):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` 
- `SUPABASE_SERVICE_ROLE_KEY` (full database access)
- `NETLIFY_AUTH_TOKEN` (deployment automation)
- `GITHUB_TOKEN` (repository automation)
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_BOT_USERNAME`
- `DEV_LOGIN_PASSWORD`

**Optional**:
- `GEMINI_API_KEY` (for AI features)
- `OPENAI_API_KEY` (for image generation)
- `LINKPREVIEW_API_KEY` (for link previews)

---

## Test Users (Already in Database)
- `devtest` (999999999) - Regular user, ID: cdad4b8b-0355-414b-90ef-9769a1045b80
- `admintest` (888888888) - Admin user, ID: de2f7130-7682-4bc0-aad1-e1b83c07cb43
- `admindev` (777777777) - Admin developer

---

## Quick Commands

```bash
# Check deployment
node scripts/check-deployment.js

# Test with Playwright
npx playwright test --headed

# Run Supabase migrations
npx supabase db push

# Check TypeScript
npx tsc --noEmit
```

---

## Important URLs
- **Supabase**: https://supabase.com/dashboard/project/yvzinotrjggncbwflxok (existing project)
- **GitHub**: [To be created - suggested: learn2-parent-sharing]
- **Netlify**: [To be created - connect to new GitHub repo]
- **Live Site**: [To be deployed]
- **Original Learn Site**: https://learn-parent-sharing-app.netlify.app (reference)

---

## Session Handoff Notes

### Migration Progress - Session June 30, 2024:

**✅ COMPLETED:**
1. **Checkpoint 1: Basic Setup** - Environment, Supabase, GitHub, Netlify ✅
2. **Checkpoint 2: Authentication System** - All auth routes, TelegramLogin, test auth ✅
3. **Checkpoint 3: Core Feed** - FeedComponent, posts API, ErrorBoundary ✅
4. **Checkpoint 4: Content Creation** - Create page, middleware, YouTube support ✅

**🚧 CURRENT BLOCKER:**
- **Database Connection Issue**: API returns "Failed to create user" when trying Telegram auth
- Supabase credentials appear correct (same as Learn project)
- Error persists despite multiple debugging attempts
- Both Learn and Learn2 projects have same issue (suggests Supabase project problem)

**🔧 WHAT'S BEEN TRIED:**
1. Updated Supabase client config to match Learn project exactly
2. Added detailed error logging to auth routes
3. Changed database queries from single() to maybeSingle()
4. Updated Telegram bot configuration (new bot: learn2_notifications_bot)
5. Enhanced error reporting in frontend

**🎯 NEXT STEPS FOR NEXT SESSION:**
1. **PRIORITY**: Debug database connection via Supabase dashboard
   - Check API keys at: https://supabase.com/dashboard/project/yvzinotrjggncbwflxok/settings/api
   - Verify RLS policies on users table
   - Check if service role has proper permissions
2. **Alternative**: Create test users manually in Supabase dashboard
3. **Continue Migration**: Once DB fixed, proceed to Checkpoint 5 (Points system)

**📋 WORKING FEATURES:**
- Telegram login widget loads correctly (no domain errors)
- All pages and routing work
- Feed displays (empty due to DB issue)
- Create post form works (pending DB fix)
- Test auth page ready (pending DB fix)

**🔑 KEY INFO:**
- GitHub: https://github.com/Masssa75/learn2-parent-sharing
- Netlify: https://learn2-parent-sharing.netlify.app
- New Telegram Bot: learn2_notifications_bot (token: 8036276993:AAGbouAqY0Q03lBSU2oi3syhOpL2mhxY7XY)
- All env vars configured on Netlify

### Key Files to Check:
- **Learn/.env** - Copy all environment variables from here
- **Learn/app/api/** - API routes to migrate  
- **Learn/components/FeedComponent.tsx** - Main feed component
- **Learn/app/api/auth/dev-login/route.ts** - Dev login implementation

### Important: 
The migration architecture is complete and clean. Only the database connection needs to be resolved to have a fully functional app. All core components have been successfully migrated and improved.