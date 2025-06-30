# Learn2

A social platform for parents to discover and share apps, toys, books, and tips that work for their kids.

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev
```

## Documentation

- **[CLAUDE.md](./CLAUDE.md)** - AI assistant context and workflow
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical decisions and structure
- **[STYLE_GUIDE.md](./STYLE_GUIDE.md)** - Design system and code style
- **[DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)** - Development workflow
- **[MIGRATION_PLAN.md](./MIGRATION_PLAN.md)** - Migration from Learn to Learn2

## Project Structure

```
├── app/          # Next.js pages and API routes
├── components/   # React components
├── lib/          # Core utilities
├── hooks/        # Custom React hooks
├── types/        # TypeScript types
├── public/       # Static assets
├── scripts/      # Utility scripts
├── docs/         # Additional documentation
├── design/       # Design mockups (gitignored)
└── _testing/     # Test files (gitignored)
```

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Auth**: Telegram Login Widget
- **Deployment**: Netlify

## Key Features

- Browse and share parenting resources
- AI-powered content creation
- Points and gamification system
- YouTube video embedding
- Admin dashboard
- Mobile-first design

## Contributing

See [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) for development workflow.