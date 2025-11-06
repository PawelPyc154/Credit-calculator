# GitHub Copilot Instructions for Credit Calculator

## Project Overview
This is an intelligent credit calculator application that helps users find the best mortgage loan option for their needs. The application analyzes various loan parameters, compares offers from different banks, and provides personalized recommendations based on the user's financial situation.

**Production Domain**: www.kredytanaliza.pl

## Modern Development Standards

### Latest Programming Trends (2025)
Follow current best practices and modern development patterns:

- **Performance First**: Optimize for Core Web Vitals (LCP, FID, CLS)
- **Accessibility (a11y)**: WCAG 2.2 AA compliance as minimum standard
- **Type Safety**: Leverage TypeScript's advanced features (const assertions, template literals, branded types)
- **Edge Computing**: Utilize Next.js Edge Runtime where appropriate
- **Progressive Enhancement**: Ensure core functionality works without JavaScript
- **Error Boundaries**: Implement proper error handling with React Error Boundaries
- **Suspense & Streaming**: Use React 19 Suspense for data fetching and streaming SSR
- **Server Actions**: Leverage Next.js Server Actions for form submissions (Stage 2)
- **Optimistic Updates**: Provide instant feedback for better UX
- **Code Splitting**: Automatic and manual code splitting for optimal bundle sizes
- **Modern JavaScript**: Use latest ECMAScript features (optional chaining, nullish coalescing, private class fields)
- **Immutability**: Prefer immutable data structures and pure functions
- **Composition over Inheritance**: Use React hooks and composition patterns
- **DRY with Caution**: Balance reusability with code clarity - avoid over-abstraction

### Modern UI/UX Design Principles (2025)

#### Visual Design
- **Minimalist Aesthetics**: Clean, uncluttered interfaces with purposeful whitespace
- **Micro-interactions**: Subtle animations and transitions for user feedback (use Framer Motion or CSS animations)
- **Glassmorphism & Neomorphism**: Modern visual styles with backdrop-blur and soft shadows
- **Dark Mode Support**: Provide system-preference-aware dark mode option
- **Custom Scrollbars**: Styled scrollbars that match the design system
- **Skeleton Loading**: Use skeleton screens instead of traditional spinners
- **Progressive Disclosure**: Show advanced options only when needed
- **Visual Hierarchy**: Use size, color, and spacing to guide user attention
- **Consistent Spacing**: Use a systematic spacing scale (4px, 8px, 16px, 24px, 32px, 48px, 64px)
- **Typography Scale**: Implement a harmonious type scale with clear hierarchy

#### Interaction Patterns
- **Gesture Support**: Swipe gestures on mobile (for carousels, dismissing modals)
- **Haptic Feedback**: Provide tactile feedback on mobile devices
- **Keyboard Shortcuts**: Support common keyboard shortcuts for power users
- **Focus Management**: Clear focus indicators and logical focus flow
- **Loading States**: Always show loading indicators for async operations
- **Empty States**: Thoughtful empty state designs with clear calls-to-action
- **Error Prevention**: Validate inputs in real-time with helpful suggestions
- **Undo/Redo**: Allow users to reverse actions where appropriate
- **Confirmation Dialogs**: Use sparingly, only for destructive actions
- **Toast Notifications**: Non-intrusive notifications that auto-dismiss

#### Mobile-First Approach
- **Touch Targets**: Minimum 44x44px touch targets (48x48px preferred)
- **Thumb Zones**: Place primary actions in easily reachable areas
- **Responsive Typography**: Fluid typography that scales with viewport
- **Mobile Navigation**: Bottom navigation or hamburger menu for mobile
- **Swipe Actions**: Implement swipe-to-action for list items on mobile
- **Pull-to-Refresh**: Where appropriate for data updates
- **Responsive Images**: Use next/image with proper sizing and lazy loading
- **Reduced Motion**: Respect prefers-reduced-motion user preference

#### Performance & Accessibility
- **Semantic HTML**: Use proper HTML5 semantic elements
- **ARIA Labels**: Provide descriptive labels for screen readers
- **Color Contrast**: Ensure WCAG AA contrast ratios (4.5:1 for text)
- **Focus Visible**: Clear focus indicators for keyboard navigation
- **Loading Performance**: Target <2s LCP, <100ms FID, <0.1 CLS
- **Image Optimization**: WebP/AVIF formats with fallbacks
- **Font Loading**: Use font-display: swap and preload critical fonts
- **Reduced Bundle Size**: Lazy load non-critical components

#### Form Design Best Practices
- **Inline Validation**: Validate as users type, not just on submit
- **Clear Error Messages**: Specific, actionable error messages in Polish
- **Smart Defaults**: Pre-fill with sensible defaults when possible
- **Autocomplete**: Use proper autocomplete attributes
- **Input Masking**: Format inputs (currency, dates) as users type
- **Progress Indicators**: Show progress in multi-step forms
- **Field Grouping**: Group related fields with clear labels
- **Required Field Indicators**: Clear visual indicators for required fields
- **Help Text**: Provide contextual help without cluttering the UI

#### Animation & Motion
- **Purposeful Animation**: Animations should serve a functional purpose
- **Duration**: Keep animations short (150-300ms for transitions)
- **Easing**: Use natural easing functions (ease-in-out, cubic-bezier)
- **Page Transitions**: Smooth transitions between routes
- **Scroll Animations**: Subtle parallax and reveal effects
- **Loading Animations**: Engaging loading states that reduce perceived wait time
- **Micro-interactions**: Button press states, hover effects, focus rings
- **Respect Motion Preferences**: Disable animations for users with motion sensitivity

#### Component Design Patterns
- **Atomic Design**: Build from atoms → molecules → organisms → templates → pages
- **Compound Components**: Use compound pattern for flexible component APIs
- **Render Props & Hooks**: Prefer hooks over render props for logic reuse
- **Controlled Components**: Use controlled inputs for forms
- **Polymorphic Components**: Components that can render as different HTML elements
- **Composable Components**: Small, focused components that work well together
- **Accessible by Default**: Build accessibility into components from the start

### Development Workflow
- **Version Control**: Meaningful commit messages following Conventional Commits
- **Code Reviews**: Review code for logic, performance, and accessibility
- **Testing**: Write tests for critical business logic (consider Vitest + Testing Library)
- **Documentation**: Document complex logic and component APIs
- **Performance Monitoring**: Use Lighthouse CI and Core Web Vitals monitoring
- **Error Tracking**: Implement error tracking (consider Sentry in production)
- **Analytics**: Track user interactions for data-driven improvements

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

### User-Centric Design Principles

To ensure the credit calculator is accessible and understandable for users without prior knowledge of loans or financial concepts, the following principles should be followed:

1. **Educational Guidance**:
   - Provide clear explanations for each input field (e.g., "Kwota kredytu" should include a tooltip or description explaining what it means and how it affects the loan).
   - Include contextual tips or information next to results (e.g., "Niższa rata miesięczna może oznaczać dłuższy okres kredytowania i wyższy całkowity koszt kredytu.").

2. **Prioritization of Key Information**:
   - Highlight the most critical factors first, such as monthly payment (rata miesięczna) and total cost (całkowity koszt kredytu).
   - Provide secondary information, like additional fees or insurance, in a less prominent way but still accessible.

3. **Interactive Learning**:
   - Allow users to interact with "What-If" scenarios (e.g., "Co się stanie, jeśli zwiększę wkład własny?").
   - Use visual aids like graphs or progress bars to show the impact of changes in loan parameters.

4. **Simplified Language**:
   - Avoid financial jargon. Use simple, everyday language to explain concepts.
   - Provide examples to make abstract concepts concrete (e.g., "Przy oprocentowaniu 5%, pożyczając 100 000 zł na 10 lat, rata wyniesie około 1 060 zł miesięcznie.").

5. **Step-by-Step Guidance**:
   - Guide users through the process of selecting a loan with step-by-step instructions.
   - Include a checklist of things to consider (e.g., "Sprawdź, czy możesz wcześniej spłacić kredyt bez dodatkowych opłat.").

6. **Accessible Design**:
   - Ensure the UI is intuitive and easy to navigate.
   - Use visual hierarchy to emphasize important elements.
   - Make the design mobile-friendly and responsive.

7. **Trust and Transparency**:
   - Clearly state that the data is based on mock data or real offers (when applicable).
   - Provide disclaimers about the limitations of the calculator.

By incorporating these principles, the credit calculator will not only provide users with numerical results but also empower them with the knowledge needed to make informed decisions about their loans.

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
- **Prefer `gap` over margins**: Use Flexbox/Grid `gap` utilities for spacing between elements instead of margins (e.g., `flex gap-4` instead of applying margins to children). This creates cleaner, more maintainable layouts with consistent spacing.
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
