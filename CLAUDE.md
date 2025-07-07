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
3. IMMEDIATELY (within 5 seconds) start streaming logs:
   netlify logs:deploy
   # Watch until you see "Build script success" or an error
4. If build fails:
   - Analyze the error from the logs
   - Fix the issue immediately
   - Repeat from step 1
5. If build succeeds, verify deployment:
   netlify api listSiteDeploys --data '{"site_id": "0d9c7411-304b-40d3-94bf-73d979c8bf33"}' | jq '.[0].state'
   # Must show "ready"
6. npx playwright test --headed  # Test on DEPLOYED site
7. If tests fail:
   - Debug what's wrong
   - Fix and repeat from step 1
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

## Design Direction (Jan 7, 2025 Session)

### Final Design Choice: Medium-Style with Purple Accents
After exploring multiple design directions (Pinterest-style, playful variations), we settled on a Medium-style design that feels professional yet approachable for parents.

**Key Design Files:**
- `design-medium-expanded.html` - The base design with rich content examples
- `design-medium-subtle.html` - The refined version with purple touches

**Design Principles:**
1. **Clean, content-focused layout** - Similar to Medium's article feed
2. **Subtle purple accents** - Purple "Write" button, active tab underline, Editor's Pick badges
3. **Rich content types** - Articles with embedded YouTube videos, app recommendations, website resources
4. **Professional typography** - Merriweather for headlines, Inter for body text
5. **Minimal but warm** - White background, subtle shadows, rounded corners on cards

**Key Visual Elements:**
- App cards with gradient letter icons (no external images)
- Star ratings in amber color
- Green links that feel friendly
- Pink heart hovers for warmth
- Indigo/purple for primary actions

**Content Philosophy:**
- **Evergreen over ephemeral** - Focus on timeless parenting resources
- **Quality over quantity** - Curated, tested recommendations
- **Real experiences** - Parent-written reviews and guides
- **Mixed media** - Apps, YouTube videos, websites, printables all in one feed

**Next Design Considerations:**
- How to emphasize evergreen content vs. time-based social feeds
- Possibly add "Last updated" instead of "2 hours ago"
- Consider "Collections" or "Guides" as primary navigation
- Maybe add quality indicators like "Parent-tested for 6+ months"

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

## Common Deployment Issues & Fixes

### Build Dependencies Issue
If you see "Module not found" errors in Netlify but it works locally:
- Check if TypeScript, postcss, tailwindcss are in `dependencies` not `devDependencies`
- Netlify sets NODE_ENV=production which skips devDependencies
- Fix in netlify.toml:
  ```toml
  [build.environment]
    NPM_FLAGS = "--production=false"
  ```

### Real-time Build Monitoring
```bash
# Get deployment details
netlify api listSiteDeploys --data '{"site_id": "0d9c7411-304b-40d3-94bf-73d979c8bf33"}' | jq '.[0:3]'

# Get specific deployment error
netlify api getSiteDeploy --data '{"site_id": "0d9c7411-304b-40d3-94bf-73d979c8bf33", "deploy_id": "DEPLOY_ID"}' | jq '.error_message'
```

### CSS/Styling Not Showing
- Ensure Tailwind classes are defined in tailwind.config.js
- Use existing color classes (bg-primary, text-primary) instead of undefined ones
- Check the generated CSS file exists in .next/static/css/

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

### Session July 7, 2025 - UI Fixes & Deployment Automation:

**✅ COMPLETED:**
1. **Fixed invisible authentication UI** - Profile button and SIGN IN button were black-on-black
   - Added missing Tailwind color classes to config
   - Changed to use existing color classes (bg-primary instead of bg-brand-yellow)
   - Both buttons now properly visible with yellow styling

2. **Replaced large PointsDisplay with compact design**
   - Implemented minimal stack design (points number + level text)
   - Positioned next to profile button in header
   - Removed bulky card component for cleaner UI

3. **Fixed Netlify deployment issues**
   - Moved build dependencies (TypeScript, Tailwind) from devDependencies to dependencies
   - Added NPM_FLAGS = "--production=false" to netlify.toml
   - Deployments now succeed consistently

4. **Established real-time deployment monitoring**
   - Replaced "wait 2 minutes" with immediate `netlify logs:deploy`
   - Can now see build errors in real-time and fix immediately
   - Full autonomous workflow: push → monitor → fix → test → iterate

**🔑 KEY LEARNINGS:**
- Always use `netlify logs:deploy` immediately after git push (within 5 seconds)
- Netlify sets NODE_ENV=production which skips devDependencies
- Use existing Tailwind classes to avoid CSS generation issues
- Test on deployed site, not just locally
- Fix build errors immediately when they appear in logs