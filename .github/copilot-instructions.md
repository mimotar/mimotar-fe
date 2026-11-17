# Copilot instructions

## Commands

- `npm run dev` starts the local Next.js development server.
- `npm run build` creates the production build; `npm run start` serves it.
- Lint the repository with `npx eslint .`. To lint one file, pass its path, for example `npx eslint "app/(dashboard)/dashboard/projects/hooks/useProjects.ts"`.
- No test runner or checked-in test suite is configured, so there is no single-test command. The package's `npm run lint` currently calls `next lint`, which fails with the installed Next.js 16 CLI; use ESLint directly.

## Architecture

- This is a Next.js App Router application. The `(client)` and `(dashboard)` route groups organize pages and layouts without adding those names to URLs. Public website pages are under `app/(client)`; signed-in application pages are under `app/(dashboard)/dashboard`.
- The root layout loads the NextAuth session and wraps the app with TanStack Query, NextAuth, and Redux providers. The dashboard layout supplies its navigation shell; the public route-group layout supplies site navigation and the footer.
- Authentication is configured in `app/api/auth/authOptions.ts` and exposed through `app/api/auth/[...nextauth]/route.ts`. `proxy.ts` uses NextAuth middleware to gate `/dashboard` routes. The session carries the backend access token.
- Browser-facing backend calls generally use `lib/services/axiosService.ts`, which reads the session token and sends it as a bearer token. Server actions obtain the session with `getServerSession` and call the backend directly. The shared Axios client uses `NEXT_PUBLIC_API_BASE_URL`; server-only calls use `API_BASE_URL`.
- TanStack Query handles remote/server state. Redux Toolkit with redux-persist holds selected client-side state such as transaction flows and user state; persistence is configured in `lib/services/storeService.ts`.
- Feature code is colocated with its route, commonly in `api` or `actions`, `components`, `hooks`, `schema`, `types`, and `data` folders. Shared providers, services, and state live under `lib`; reusable Radix/shadcn-style primitives live under `components/ui`.

## Repository conventions

- Keep route-specific behavior beside its route. Query hooks commonly wrap a feature API function with `useQuery`; include all changing inputs in the query key, as in `useProjects`.
- Components that use React hooks, browser APIs, Redux, or client-side session/query hooks need the `"use client"` boundary. Keep route layouts and server-side session/data work in Server Components unless client behavior is required.
- Use the `@/*` alias for imports from the repository root. TypeScript strict mode is enabled.
- Feature forms use React Hook Form with Zod schemas; keep validation schemas in the feature's `schema` folder and request/response types in `types`.
- Prefer `axiosService` for authenticated client requests so session bearer-token handling and auth-expiry behavior remain consistent. Use the server-session pattern for server actions, and do not expose server-only credentials through `NEXT_PUBLIC_*` variables.
- Styling primarily uses Tailwind utility classes. Shared UI primitives are in `components/ui`; use a feature CSS module for intentionally scoped styling.
