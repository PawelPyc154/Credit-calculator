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
- Use `tw-tailwind` library for creating styled components with Tailwind classes
- Follow the component pattern shown in the example below
- For internal component styles, always create styled components using `tw` at the bottom of the file
- Allow `className` prop in components to accept dynamic styles from parent components
- Use `clsx()` to combine internal variants with external `className` prop

## Common Patterns

### Creating Components with tw-tailwind:
Use the pattern from `src/components/common/example.tsx`:

```tsx
import clsx from "clsx";
import tw from "tw-tailwind";

const sizes = {
  sm: tw`text-sm`,
  base: tw`text-base`,
  lg: tw`text-lg`,
};
const colors = {
  amber: tw`bg-amber-400`,
  red: tw`bg-red-400`,
  blue: tw`bg-blue-400`,
  green: tw`bg-green-400`,
};

export type ExampleProps = {
  color: keyof typeof colors;
  size: keyof typeof sizes;
  data: string[];
  className?: string;
};

export const Example = ({ size, data, color, className }: ExampleProps) => {
  return (
    <Container className={clsx(sizes[size], colors[color], className)}>
      {data.map((item) => (
        <Item key={item}>{item}</Item>
      ))}
    </Container>
  );
};

const Container = tw.div`text-white`;
const Item = tw.div``;
```

Key points:
- Use `tw-tailwind` for creating styled components for internal component structure
- Define variant maps (sizes, colors, etc.) as const objects with `tw` template literals
- Use `keyof typeof` for type-safe props
- Accept optional `className` prop for external customization
- Combine variants with external `className` using `clsx()`
- Export component props type
- Keep styled components at the bottom of the file
- Create styled components for static internal styles instead of inline `className`
- Use `className` prop to allow parent components to customize styling

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
