# Next.js Coding Principles

## Project Structure

### Module Architecture
This project follows a module-based architecture where each module represents a major feature or domain.

**Module Structure:** Each module contains `/components`, `/hooks`, `/actions`, `/api`, `/stores`, `/lib`, `/types`, and `index.ts` for public exports.

**Module Principles:**
1. Self-Contained: All code related to a feature in one module
2. Encapsulation: Only export via `index.ts`
3. Clear Boundaries: Avoid cross-module dependencies
4. Consistent Structure: Same organizational pattern
5. Feature-Based: Organize by feature, not file type

**Shared vs Module Code:**
- `/modules/*`: Feature-specific code
- `/components/*`: Shared UI components across modules
- `/lib/*`: Shared utilities and configurations
- `/hooks/*`: Shared hooks across modules
- `/stores/*`: Global stores across modules

### App Router Organization
- Use App Router (`app/` directory) for routing
- Route files should be thin - delegate to module components
- Default to server components; add `'use client'` only when necessary

### File Naming Conventions
- Directories: lowercase with hyphens (`user-profile/`)
- Components: PascalCase (`UserCard.tsx`)
- Utilities/stores: lowercase (`utils.ts`, `auth-store.ts`)
- Next.js files: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`

## Component Architecture

### Server vs Client Components
- Default to Server Components
- Use Client Components only for: event handlers, React hooks, browser APIs, client-side libraries

### Component Design
- Single responsibility, focused components
- Extract logic into custom hooks
- Composition over prop drilling
- Named exports for components

### File Length (CRITICAL)
**Maximum 200 lines per file.** When exceeded:
1. Split into smaller components
2. Extract logic into hooks
3. Move utilities to separate files
4. Split server actions by domain

### DRY Principles
Never duplicate code. Extract reusable components, logic, styles, and data fetching patterns.

## Data Fetching

### API Routes vs Server Actions
**Prefer API Routes** for: mutations, complex logic, third-party integrations, RESTful endpoints.

**Use Server Actions** only for: simple form submissions, progressive enhancement.

### React Query
Use TanStack Query for all client-side API requests:
- Set up QueryClientProvider in root layout
- Create centralized API client in `lib/api-client.ts`
- Use `useQuery` for fetching, `useMutation` for modifications
- Implement optimistic updates for better UX
- Use selectors and proper query keys

### Server-Side Fetching
Use native fetch with Next.js caching in Server Components. Pass server data to client components via `initialData`.

## Performance Optimization

### Images
- Use `next/image` with width/height
- Use `sizes` prop and `priority` for above-fold images

### Code Splitting
- Dynamic imports for heavy components
- Lazy load non-visible components

### Fonts
- Use `next/font` for optimization
- Self-host when possible

## TypeScript

- Enable strict mode
- Define interfaces for props and API responses
- Avoid `any`; use `unknown` if needed
- Use generics for reusable components
- Keep types close to usage; shared types in `types/`

## Styling

- Use Tailwind CSS or CSS Modules
- Global styles in `app/globals.css`
- Descriptive class names

## State Management

### Local State
- `useState` for component-local state
- `useReducer` for complex logic
- Keep state close to usage

### Global State (Zustand)
**Use Zustand only** - no Redux or other libraries.

**Store Organization:**
- Module stores in `/modules/[module]/stores/`
- Global stores in `/stores/`

**Best Practices:**
- Use selectors to prevent re-renders
- Include async actions in stores
- Export stores from module's `index.ts`
- Use devtools, persist, and immer middleware as needed

**Don't use Zustand for:** simple local state, form state, URL state, server state without caching.

- This website will be in hebrew, so keep everything RTL, for native shadnc components just put dir=rtl in the main component inside the native component itself.


- Project Stack - 

postgress + prisma for db
betterauth - auth
zustand - store
reac query - querying 
shadcn - design