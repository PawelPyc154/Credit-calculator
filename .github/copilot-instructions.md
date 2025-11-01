# GitHub Copilot Instructions for Credit Calculator

## Project Overview
This is a credit calculator application built with modern web technologies.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **API Layer**: tRPC v11
- **Database**: PostgreSQL with Prisma ORM
- **Data Fetching**: TanStack Query (React Query)
- **Validation**: Zod
- **Code Quality**: Biome (linter & formatter)

## Project Structure
- `src/app/` - Next.js App Router pages and layouts
- `src/server/` - Server-side code (tRPC routers, database)
- `src/trpc/` - tRPC client configuration
- `prisma/` - Database schema and migrations

## Coding Standards

### TypeScript
- Use strict TypeScript configuration
- Enable `noUncheckedIndexedAccess`
- Prefer type inference where possible
- Use Zod for runtime validation

### React/Next.js
- Use React Server Components by default
- Client Components only when needed (mark with "use client")
- Use Next.js App Router conventions
- Prefer `async`/`await` in Server Components

### tRPC
- Define all API endpoints in `src/server/api/routers/`
- Use Zod for input validation
- Follow the existing router pattern in `post.ts`

### Database
- Use Prisma for all database operations
- Run migrations with `yarn db:generate`
- Never use raw SQL unless absolutely necessary

### Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use semantic HTML elements

### Code Quality
- Run `yarn check` before committing
- Use `yarn check:write` to auto-fix issues
- Follow Biome configuration in `biome.jsonc`

## Common Patterns

### Creating a new tRPC router:
1. Create router in `src/server/api/routers/`
2. Import and add to `appRouter` in `src/server/api/root.ts`
3. Use in components via `api.routerName.procedureName.useQuery()`

### Database changes:
1. Update `prisma/schema.prisma`
2. Run `yarn db:generate` to create migration
3. Migration applies automatically

### Environment Variables:
- Define in `src/env.js` with Zod validation
- Access via `env.VARIABLE_NAME`

## Preferences
- Use Polish language for comments and UI text when applicable
- Prefer functional components over class components
- Use arrow functions for component definitions
- Keep components small and focused
- Extract reusable logic into custom hooks
