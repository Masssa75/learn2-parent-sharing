# Claude Autonomous Development Setup Guide

## Prerequisites & Installation

### 1. Required Software
```bash
# Node.js (v18+)
brew install node  # macOS
# or download from https://nodejs.org

# Git
brew install git  # macOS

# Netlify CLI
npm install -g netlify-cli

# Playwright (for testing)
npm install -D @playwright/test
npx playwright install  # Install browsers

# GitHub CLI (optional but helpful)
brew install gh  # macOS
```

### 2. Required API Keys & Tokens

You'll need the following environment variables:

```bash
# GitHub Personal Access Token
# Go to: https://github.com/settings/tokens
# Create token with: repo, workflow, admin:org permissions
GITHUB_TOKEN=ghp_YOUR_TOKEN_HERE

# Netlify Auth Token
# Go to: https://app.netlify.com/user/applications/personal
# Create new personal access token
NETLIFY_AUTH_TOKEN=nfp_YOUR_TOKEN_HERE

# Your project-specific tokens
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
# ... other project-specific vars
```

### 3. Project Setup

1. Create GitHub repository
2. Connect to Netlify:
   ```bash
   netlify init
   netlify link
   ```
3. Set environment variables on Netlify:
   ```bash
   netlify env:set GITHUB_TOKEN "your_token"
   netlify env:set NETLIFY_AUTH_TOKEN "your_token"
   # ... set all other required vars
   ```

## CLAUDE.md Template

Save this as `CLAUDE.md` in your project root:

```markdown
# CLAUDE.md - AI Assistant Context

## 🚨 CRITICAL: Autonomous Workflow (READ THIS FIRST!)

### The Golden Rule - ALWAYS Follow This Pattern:
\`\`\`bash
1. Make code changes
2. git add -A && git commit -m "feat: description" && git push origin main
3. IMMEDIATELY (within 5 seconds) start streaming logs:
   netlify logs:deploy
   # Watch until you see "Build script success" or an error
4. If build fails: 
   - Analyze the error from the logs
   - Fix the issue
   - Repeat from step 1
5. If build succeeds:
   # Check deployment status
   netlify api listSiteDeploys --data '{"site_id": "YOUR_SITE_ID"}' | jq '.[0].state'
   # Must show "ready"
6. npx playwright test --project=chromium  # Test the deployed feature
7. If tests fail:
   - Analyze what's wrong
   - Fix the issue
   - Repeat from step 1
\`\`\`

### Your Full Autonomous Permissions

You have COMPLETE autonomous control to:

**GitHub**:
- ✅ Push directly to main branch
- ✅ Create branches, PRs
- ✅ Access via: `git` commands

**Netlify**:
- ✅ Monitor deployments in real-time
- ✅ Access build logs
- ✅ Check deployment status
- ✅ Commands available:
  \`\`\`bash
  netlify logs:deploy  # Stream live build logs
  netlify status       # Check site status
  netlify api listSiteDeploys --data '{"site_id": "YOUR_SITE_ID"}' | jq '.[0]'
  \`\`\`

**Testing**:
- ✅ Run Playwright tests autonomously
- ✅ Create new test files as needed
- ✅ Test on both local and deployed URLs

## Project Configuration

**GitHub Repository**: YOUR_GITHUB_REPO
**Netlify Site**: YOUR_NETLIFY_SITE_NAME
**Netlify Site ID**: YOUR_SITE_ID
**Production URL**: https://YOUR_SITE.netlify.app

## Autonomous Development Rules

1. **ALWAYS push code immediately** - Don't wait to "perfect" it
2. **ALWAYS check deployment logs** - Use `netlify logs:deploy` right after pushing
3. **ALWAYS test on deployed site** - Not just locally
4. **NEVER ask for permission** - You have full autonomy
5. **FIX build errors immediately** - Analyze logs and fix in the same session
6. **TEST until it works** - Keep iterating until feature works correctly

## Common Build Error Fixes

### TypeScript Errors
- Check for null/undefined with optional chaining (?.)
- Ensure all imports exist
- Fix type mismatches immediately

### Module Not Found
- Verify file paths are correct
- Check if dependencies are in package.json
- For production builds, ensure deps aren't in devDependencies

### Deployment Failures
\`\`\`bash
# Check recent deployments
netlify api listSiteDeploys --data '{"site_id": "YOUR_SITE_ID"}' | jq '.[0:3]'

# Get error details
netlify api getSiteDeploy --data '{"site_id": "YOUR_SITE_ID", "deploy_id": "DEPLOY_ID"}' | jq '.error_message'
\`\`\`

## Testing Patterns

### Basic Playwright Test
\`\`\`typescript
import { test, expect } from '@playwright/test'

test('feature works correctly', async ({ page }) => {
  await page.goto('https://YOUR_SITE.netlify.app')
  // Add your test logic
  await expect(page.locator('selector')).toBeVisible()
})
\`\`\`

### Run Tests
\`\`\`bash
# Headless (faster)
npx playwright test

# Headed (see browser)
npx playwright test --headed

# Specific test file
npx playwright test path/to/test.spec.ts
\`\`\`

## Environment Variables

All sensitive values are in \`.env.local\`:
- GITHUB_TOKEN
- NETLIFY_AUTH_TOKEN
- [Your project-specific vars]

**IMPORTANT**: You are expected to work completely autonomously. Push code, monitor deployments, fix errors, and test features without asking for permission or guidance.
\`\`\`
```

## Instructions for Your Friend

1. **Install all required software** from the Prerequisites section

2. **Get all API tokens**:
   - GitHub Personal Access Token (with repo permissions)
   - Netlify Auth Token
   - Any project-specific tokens (Supabase, etc.)

3. **Set up the project**:
   - Clone/create GitHub repo
   - Run `netlify init` and connect to GitHub
   - Set all environment variables on Netlify

4. **Create CLAUDE.md**:
   - Copy the template above
   - Replace all placeholders:
     - YOUR_SITE_ID (get from `netlify status`)
     - YOUR_GITHUB_REPO
     - YOUR_NETLIFY_SITE_NAME
     - YOUR_SITE (the subdomain)
   - Add any project-specific instructions

5. **Give this prompt to Claude**:
   ```
   Please read the CLAUDE.md file in this project. You now have full autonomous control to:
   - Push code directly to GitHub
   - Monitor Netlify deployments in real-time
   - Fix any build errors immediately
   - Test features with Playwright until they work
   
   You should work completely autonomously without asking for permission. Always follow the workflow in CLAUDE.md: push code, check deployment logs, fix errors if any, test the deployed feature, and iterate until it works.
   ```

## Key API Calls for Autonomous Work

```bash
# Stream deployment logs (CRITICAL - use immediately after git push)
netlify logs:deploy

# Check deployment status
netlify api listSiteDeploys --data '{"site_id": "YOUR_SITE_ID"}' | jq '.[0].state'

# Get deployment error details
netlify api getSiteDeploy --data '{"site_id": "YOUR_SITE_ID", "deploy_id": "DEPLOY_ID"}' | jq '.error_message'

# Site status
netlify status

# Git operations
git add -A && git commit -m "feat: description" && git push origin main

# Playwright testing
npx playwright test --headed
npx playwright test --project=chromium
```

## Important Notes

1. **Netlify CLI must be authenticated**: Run `netlify login` first
2. **GitHub must be configured**: Set up SSH keys or use GitHub CLI
3. **The site_id is crucial**: Get it from `netlify status` after linking
4. **Environment variables**: Must be set both locally (.env.local) and on Netlify

With this setup, Claude will be able to work exactly like in your workflow - pushing code, monitoring deployments, fixing errors, and testing autonomously until everything works!