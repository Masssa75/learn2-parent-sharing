# Learn to Learn2 Migration Plan

## Overview
This document outlines the complete migration strategy from the Learn folder to Learn2, keeping the Supabase database while creating new GitHub and Netlify projects.

## What We Keep
1. **Supabase Database** (yvzinotrjggncbwflxok)
   - All tables, data, and configurations remain unchanged
   - Users, posts, categories, points system - all preserved
   - No data migration needed

## Phase 1: Documentation Migration ✅

### Files to Copy
1. **CLAUDE.md** - Main project documentation (from root, not app/)
2. **FRESH_START_PLAN.md** - Clean start reference
3. Create new **MIGRATION_PLAN.md** (this file)

### Documentation Updates Needed
- Update GitHub URLs in CLAUDE.md
- Update Netlify URLs and deployment instructions
- Remove references to old file structure issues
- Clean up session history (keep only essential info)

## Phase 2: Project Setup

### 1. Create New GitHub Repository
```bash
# Create on GitHub.com: learn2-parent-sharing
# Then locally:
cd /Users/marcschwyn/Desktop/projects/Learn2
git init
git remote add origin https://github.com/[username]/learn2-parent-sharing.git
```

### 2. Initialize Next.js Project
```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir
# Select options:
# - TypeScript: Yes
# - ESLint: Yes
# - Tailwind CSS: Yes
# - App Router: Yes
# - Import alias: No
```

### 3. Install Core Dependencies
```bash
npm install @supabase/supabase-js
npm install --save-dev @types/node
```

## Phase 3: Folder Structure

### Proposed Clean Structure
```
Learn2/
├── app/
│   ├── api/
│   │   ├── actions/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── posts/
│   │   └── users/
│   ├── admin/
│   ├── create/
│   ├── login/
│   ├── test-auth/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ErrorBoundary.tsx
│   ├── FeedComponent.tsx
│   ├── PointsDisplay.tsx
│   ├── TelegramLogin.tsx
│   ├── YouTubePlayer.tsx
│   └── YouTubePreview.tsx
├── lib/
│   └── supabase.ts
├── types/
│   └── points.ts
├── utils/
│   └── youtube.ts
├── public/
├── .env.local
├── .gitignore
├── CLAUDE.md
├── MIGRATION_PLAN.md
├── next.config.js
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

### What We DON'T Copy
- All test*.js files
- All screenshot .png files
- Scripts folder (recreate only essential ones)
- Duplicate app/app structure
- node_modules
- .next build folder

## Phase 4: Code Migration Strategy

### Deployment Checkpoints
We'll deploy and test after each major phase to ensure everything works.

### Migration Order

#### Checkpoint 1: Basic Setup ✅
1. **Environment Setup**
   - Copy .env variables to .env.local
   - Configure Supabase connection
   - Set up Tailwind with design system

2. **Core Configuration**
   - tailwind.config.js (with typography and color system)
   - globals.css (without circular dependencies)
   - lib/supabase.ts

3. **Deploy & Test**
   - Push to GitHub
   - Connect Netlify
   - Add environment variables
   - Verify deployment works

#### Checkpoint 2: Authentication System
1. **Auth Components**
   - TelegramLogin component
   - Test auth page (/test-auth)
   
2. **Auth API Routes**
   - /api/auth/telegram
   - /api/auth/check
   - /api/auth/dev-login
   - /api/auth/logout

3. **Deploy & Test**
   - Test login flow
   - Verify session persistence
   - Check dev login system

#### Checkpoint 3: Core Feed
1. **Main Components**
   - ErrorBoundary
   - FeedComponent (simplified)
   - Homepage integration

2. **Posts API**
   - /api/posts GET
   - Basic feed display

3. **Deploy & Test**
   - Verify posts display
   - Check responsive design
   - Test error handling

#### Checkpoint 4: Content Creation
1. **Create Page**
   - Form components
   - YouTube preview
   - Category selection

2. **Posts API POST**
   - Create post endpoint
   - YouTube URL handling

3. **Deploy & Test**
   - Create test post
   - Verify YouTube embedding
   - Check feed updates

#### Checkpoint 5: Advanced Features
1. **Points System**
   - PointsDisplay component
   - /api/actions endpoint
   - /api/users/[id]/points

2. **Admin System**
   - Admin dashboard
   - User management
   - Post moderation

3. **Final Testing**
   - All features working
   - Performance check
   - Mobile responsiveness

## Phase 5: Netlify Setup

### New Netlify Site Configuration
1. Create new site: learn2-parent-sharing
2. Connect to new GitHub repo
3. Build settings:
   ```
   Build command: npm run build
   Publish directory: .next
   ```
4. Environment variables (from old site):
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
   - TELEGRAM_BOT_TOKEN
   - TELEGRAM_BOT_USERNAME
   - ALLOW_DEV_LOGIN
   - DEV_LOGIN_PASSWORD
   - GEMINI_API_KEY
   - OPENAI_API_KEY (if needed)

## Phase 6: Testing Scripts

### Essential Scripts to Recreate
Only create these in a `scripts/` folder:
1. `check-deployment.js` - Verify Netlify deployment
2. `test-auth.js` - Test authentication flow
3. `verify-database.js` - Check Supabase connection

## Phase 7: Final Cleanup

### After Successful Migration
1. Update all documentation
2. Remove old project references
3. Archive Learn folder
4. Update any external integrations

### Success Criteria
- [ ] Clean folder structure
- [ ] No duplicate files
- [ ] All features working
- [ ] Proper git history
- [ ] Documentation updated
- [ ] Fast build times
- [ ] Clean deployments

## Migration Commands Summary

```bash
# Start migration
cd /Users/marcschwyn/Desktop/projects/Learn2
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir

# Install dependencies
npm install @supabase/supabase-js
npm install --save-dev @types/node

# Set up git
git init
git add .
git commit -m "Initial setup for Learn2"
git remote add origin https://github.com/[username]/learn2-parent-sharing.git
git push -u origin main

# After each checkpoint
git add .
git commit -m "Checkpoint X: [description]"
git push
# Wait for Netlify deployment
# Test functionality
```

## Notes
- Keep commits small and focused
- Test after each deployment
- Don't rush - clean code is the goal
- Document any deviations from this plan