# GitHub Copilot Instructions for Credit Calculator

## Project Overview
This is an intelligent credit calculator application that helps users find the best mortgage loan option for their needs. The application analyzes various loan parameters, compares offers from different banks, and provides personalized recommendations based on the user's financial situation.

### Development Stages

#### Stage 1 (Current - MVP)
**Focus**: Simple form + bank ranking without database
- User fills out a credit calculator form (amount, period, down payment, etc.)
- Application displays a ranking of banks based on the input
- Data is mocked in JSON files (no database, no tRPC in this stage)
- Simple, clean UI with form and results list
- All calculations happen on the client side

**Tech Stack for Stage 1**:
- Next.js 15 (App Router) with React Server Components
- TypeScript (strict mode)
- Tailwind CSS v4
- Zod for form validation
- React Hook Form for form management
- Mock data in JSON files in `src/data/`

#### Stage 2 (Future)
**Focus**: Full application with database and advanced features
- PostgreSQL database with Prisma ORM
- tRPC for API layer
- User accounts and saved calculations
- Admin panel for managing bank offers
- Real-time interest rate updates
- Advanced features (amortization schedules, what-if scenarios, etc.)

### Current Features (Stage 1)
- **Calculator Form**: Simple form to input loan parameters
  - Loan amount (kwota kredytu)
  - Loan period in years (okres kredytowania)
  - Down payment / Own contribution (wkład własny)
  - Monthly income (dochód miesięczny)
  - Purpose (cel kredytu): purchase, refinancing, construction
- **Bank Ranking**: List of banks sorted by best offers
  - Shows monthly payment (rata miesięczna)
  - Total cost (całkowity koszt kredytu)
  - Interest rate (oprocentowanie)
  - Additional fees (prowizje, ubezpieczenia)
  - Simple scoring/recommendation system
- **Mock Data**: Bank offers stored in JSON files

### Future Features (Stage 2)
- **Database Integration**: PostgreSQL with Prisma
- **tRPC API**: Full API layer for data fetching
- **User Accounts**: Save calculations, compare over time
- **Admin Panel**: Manage bank offers and interest rates
- **Interactive Calculations**: Real-time calculation updates
- **Cost Analysis**: Detailed breakdown of all costs
- **Amortization Schedule**: Visual payment schedules
- **What-If Scenarios**: Test different scenarios

The application is built with modern web technologies to provide a fast, responsive, and user-friendly experience.

## Tech Stack

### Stage 1 (Current)
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Form Management**: React Hook Form
- **Validation**: Zod
- **Data Source**: JSON mock files
- **Code Quality**: Biome (linter & formatter)

### Stage 2 (Future)
- **API Layer**: tRPC v11
- **Database**: PostgreSQL with Prisma ORM
- **Data Fetching**: TanStack Query (React Query)

## Project Structure
- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - Reusable React components
  - `src/components/common/` - Common UI components
  - `src/components/form/` - Form-related components
  - `src/components/calculator/` - Calculator-specific components (Stage 1)
- `src/data/` - Mock JSON data files (Stage 1)
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions and helpers
- `src/hooks/` - Custom React hooks
- `src/server/` - Server-side code (Stage 2: tRPC routers, database)
- `src/trpc/` - tRPC client configuration (Stage 2)
- `prisma/` - Database schema and migrations (Stage 2)

## Coding Standards

### TypeScript
- Use strict TypeScript configuration
- Enable `noUncheckedIndexedAccess`
- Prefer type inference where possible
- Use Zod for runtime validation
- Define types in `src/types/` for reusability

### React/Next.js
- Use React Server Components by default
- Client Components only when needed (mark with "use client")
- Use Next.js App Router conventions
- Prefer `async`/`await` in Server Components
- For Stage 1: Keep logic simple, client-side calculations

### Data Management (Stage 1)
- Store mock data in `src/data/` as JSON files
- Create TypeScript types for all data structures
- Use Zod schemas to validate mock data at runtime
- Import JSON directly in components or utilities
- Keep mock data realistic and representative

### Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use semantic HTML elements
- Use `tw-tailwind` library for creating styled components with Tailwind classes
- Follow the component pattern shown in the example below
- For internal component styles, always create styled components using `tw` at the bottom of the file
- Allow `className` prop in components to accept dynamic styles from parent components
- Use `clsx()` to combine internal variants with external `className` prop

### Form Handling (Stage 1)
- Use React Hook Form for form state management
- Use Zod for form validation schemas
- Create reusable form components in `src/components/form/`
- Handle validation errors gracefully with clear messages
- Use Polish language for form labels and error messages

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

### Working with Mock Data (Stage 1):
1. Create JSON file in `src/data/` (e.g., `banks.json`)
2. Define TypeScript type in `src/types/` (e.g., `bank.ts`)
3. Create Zod schema for validation
4. Import and use in components:

```tsx
import banksData from '@/data/banks.json';
import { bankSchema } from '@/types/bank';

const banks = banksData.map(bank => bankSchema.parse(bank));
```

### Creating Calculator Logic (Stage 1):
1. Create utility functions in `src/utils/calculator.ts`
2. Keep calculations pure functions
3. Export functions for reusability
4. Add proper TypeScript types
5. Example:

```tsx
export function calculateMonthlyPayment(
  amount: number,
  interestRate: number,
  years: number
): number {
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = years * 12;
  return (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
}
```

### Creating a new tRPC router (Stage 2 - Future):
1. Create router in `src/server/api/routers/`
2. Import and add to `appRouter` in `src/server/api/root.ts`
3. Use in components via `api.routerName.procedureName.useQuery()`

### Database changes (Stage 2 - Future):
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
- Write clean, readable code with clear naming
- Add comments for complex business logic
- Test with realistic Polish bank data (PKO BP, mBank, ING, Santander, etc.)
