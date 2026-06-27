# CHANGELOG

## ⚠️ INCOMPLETE / NEEDS INPUT

### Gmail credentials (Phase 4 — prerequisite for email features)
- `.env` contains `GMAIL_USER=mazhanbaig44@gmail.com` and `GMAIL_APP_PASSWORD=wwtpnlxlnhrzasqb`
- **Blocking:** The credentials are rejected by Google SMTP with `535-5.7.8 Username and Password not accepted`
- The app password has likely been revoked or the account password changed since it was generated
- **Fix required before 4.6/5.3 email features will work:** Generate a new Gmail App Password at https://myaccount.google.com/apppasswords and update `.env`
- Until this is resolved, `lib/mailer.ts`, `lib/sendMail.ts`, and `app/api/send-event-reminder/route.ts` will all fail with 535 auth errors
- This also blocks 4.6 (CommunicationHub email sending), event reminder emails, and any task notification emails

## Phase 1 — Security Hardening

### 1.1 database.rules.json
- **New file:** `database.rules.json` at RSMS root
- Enforces per-user ownership scoping for `clients/{uid}/`, `owners/{uid}/`, `properties/{uid}/`, `events/{uid}/`, `notifications/{uid}/`, `messages/{uid}/`, `documents/{uid}/`, `users/{uid}/`, `tasks/{uid}/`, `activityLog/{uid}/`
- Public read-only for `public_properties/`, write disabled
- Deny-all catch-all for unknown paths
- **Deploy:** `firebase deploy --only database` or paste into Firebase Console → Realtime Database → Rules

### 1.2 Fixed data.js ownership scoping
- **File:** `BackendRSMS/src/routes/data.js`
- Added `validateOwnership()` function that checks path starts with `namespace/uid` for known namespaces
- Allows public read paths (`public_properties`, etc.) without ownership checks
- Blocks path traversal (`..`, `//`)
- Returns 403 on violation
- Validation applied to all four CRUD handlers (GET/POST/PUT/DELETE)

### 1.3 Locked down public data functions
- **File:** `RSMS/FBConfig/fbFunctions.ts`
- Removed `updatePublicData()` (direct DB write with no auth)
- Replaced `getPublicData()` to route through backend (`api.get`) instead of direct DB fetch
- Added `submitPublicInquiry()` as auth-gated backend endpoint

### 1.4 Fixed subscription.middleware.js
- **File:** `BackendRSMS/src/middlewares/subscription.middleware.js`
- Added missing `ResponseObj` import
- Added `db` import from firebase config
- Made handler async — now fetches user record from DB instead of relying on decoded token
- Fixed null safety checks and expiry comparison logic

### 1.5 AuthProvider + useAuth hook
- **New file:** `RSMS/providers/AuthProvider.tsx`
- **New file:** `RSMS/hooks/useAuth.ts`
- Single `onAuthStateChanged` subscription at app root
- Wired into `RSMS/app/layout.tsx` — wraps all pages
- Eliminates need for per-page `checkUserSession()` and localStorage dependency

### 1.6 Logout revoke flow
- **File:** `RSMS/FBConfig/fbFunctions.ts` — `logout()` now calls `POST /api/auth/logout` before `signOut()`
- `Header.tsx` already calls `logout()` from fbFunctions, so it automatically benefits

### 1.7 Input validation
- **New file:** `BackendRSMS/src/middlewares/validate.js`
- Uses `express-validator` for all routes
- Data.js: path format validation (no `..` traversal, must be string)
- Images.js: MIME type whitelist (JPEG/PNG/WebP/GIF/AVIF), max 10MB, max 10 files
- Auth.js: uid/email format validation

### 1.8 Rate limiting
- **File:** `BackendRSMS/src/index.js`
- Global limiter: 100 req/15min per IP
- Stricter limiter on `/api/auth` and `/api/data`: 30 req/15min per IP
- Payment routes get default global limiter only (no special treatment per exclusion)

### 1.9 Firebase init error logging
- **File:** `BackendRSMS/src/config/firebase.js`
- Empty catch block now logs error and re-throws

### 1.10 npm audit fixes
- **RSMS:** Upgraded `jspdf` 4.2.0→4.2.1 (critical CVEs), `nodemailer` 8.0.6→9.0.1 (high SSRF CVE)
- **BackendRSMS:** `npm audit fix` applied; remaining uuid moderate via firebase-admin internals (cannot fix without breaking firebase-admin — noted)
- Both projects run `npm audit fix` without breaking changes

### 1.11 .env.example files
- **New file:** `RSMS/.env.example` — documents all 22 frontend env vars
- **New file:** `BackendRSMS/.env.example` — documents all 12 backend env vars

### 1.12 Security bug fix — public_properties write protection
- **File:** `BackendRSMS/src/routes/data.js`
- `validateOwnership()` unconditional `PUBLIC_READ_PATHS` exemption allowed writes to `public_properties`
- Fixed by gating public path bypass to `req.method === "GET"` only

### 1.13 Full auth migration — 16 pages + 1 component
- Replaced `checkUserSession()` + `localStorage` pattern with `useAuth()` hook across all pages:
  - `login/page.tsx`, `signup/page.tsx` — removed `localStorage.setItem('userInfo')`
  - `[name]/page.tsx` (dashboard)
  - `[name]/clients/page.tsx`, `[name]/clients/addclient/page.tsx`, `[name]/clients/viewclient/[id]/page.tsx`
  - `[name]/owners/page.tsx`, `[name]/owners/addowner/page.tsx`, `[name]/owners/viewowner/[id]/page.tsx`
  - `[name]/properties/page.tsx`, `[name]/properties/addproperty/page.tsx`, `[name]/properties/viewproperty/[propertyid]/page.tsx`
  - `[name]/events/page.tsx`, `[name]/events/addevent/page.tsx`, `[name]/events/[id]/page.tsx`
  - `[name]/settings/page.tsx`
  - `pricing/page.tsx`
  - `components/AddPropertyPart3.tsx` — replaced `localStorage.getItem('userInfo')` with `uid` prop from parent

## Phase 2 — Code Cleanup

### 2.1 Removed stacked old-version dead code (5 files)
- `settings/page.tsx` — removed 813 lines of commented-out legacy code (62.5% of file)
- `events/page.tsx` — removed 606 lines of commented-out legacy code (37.6% of file)
- `properties/page.tsx` — removed 677 lines of commented-out legacy code (47% of file)
- `properties/addproperty/page.tsx` — removed 353 lines of commented-out legacy code (40.6% of file)
- `clients/addclient/page.tsx` — removed 314 lines of commented-out legacy code (47.8% of file)
- **Total: ~2,763 lines of dead code removed**

### 2.2 Removed 31 MB Node.js installer binary
- `public/images/node-v22.22.0-x64.msi` — 31 MB binary committed to git, deleted

### 2.3 Cleaned up dead component stubs in components/ root
- Deleted 6 unused duplicate components that were replaced by `components/layout/` versions:
  - `HeroSection.tsx`, `CTASection.tsx`, `FeaturesGrid.tsx`, `HowItWorks.tsx`, `PricingSection.tsx`, `ProblemsSolutions.tsx`
- Removed commented-out imports in `app/page.tsx` referencing them (48-line dead block)

### 2.4 Consolidated duplicate stat card implementations
- Deleted unused `StatCard.tsx` and `StatsCard.tsx` from components/ (not imported anywhere)
- Deleted `DashboardStats.tsx` and `Hero.tsx` (unused components that imported the deleted files)
- Dashboard uses its own inline `StatsCard` — no external dependency

### 2.5 Removed unused component stubs (CommunicationHub, DocumentManager)
- `CommunicationHub.tsx` — reduced to 8-line stub then deleted (imported but never rendered in dashboard)
- `DocumentManager.tsx` — reduced to 7-line stub then deleted (not imported anywhere)
- Removed dead `import CommunicationHub` from dashboard `page.tsx`

## Phase 3 — Performance

### 3.1 Replaced chat polling with real-time Firebase listeners
- `FBConfig/fbFunctions.ts` — rewrote `subscribeToMessages()` to use `ref(db, 'chatMessages')` with `query()`, `orderByChild('chatId')`, `equalTo(chatId)`, and `onValue()` instead of `setInterval` polling
- Returns an unsubscribe function that calls `off()` on unmount
- Exported `db` from `FBConfig/config.ts` (was already imported but unused)

### 3.2 Added pagination/limiting to list fetches
- Replaced 3 chat functions that downloaded entire nodes and filtered client-side:
  - `getChatMessages(chatId)` — now uses `queryList('chatMessages', { orderBy: 'chatId', equalTo: chatId })`
  - `getAgentChatSessions(agentId)` — now uses `queryList('chatSessions', { orderBy: 'agentId', equalTo: agentId })`
  - `getClientChatSessions(clientId)` — now uses `queryList('chatSessions', { orderBy: 'clientId', equalTo: clientId })`
- New generic `queryList(path, options)` helper accepts `orderBy`, `equalTo`, `limitToFirst`, `limitToLast` — uses `fbGet` (Firebase SDK `get()`) with proper query constraints

### 3.3 Added SWR caching layer for dashboard data
- Installed `swr` package
- Dashboard `[name]/page.tsx` — replaced manual `fetchAllData` + `hasFetchedRef` pattern with 4 SWR hooks (`useSWR`) for clients, owners, properties, events
- Metrics recalculated via `useEffect` watching SWR data
- Refresh button now calls SWR `mutate()` on all 4 keys — cached data means navigation back to dashboard doesn't re-fetch
- Removed `dataLoading`, `hasFetchedRef`, and `fetchAllData` (68 lines of manual fetch orchestration eliminated)

### 3.4 Converted public pages to SSR/ISR
- **Landing page** (`app/page.tsx`):
  - Removed `'use client'` — now a pure server component
  - Removed artificial 800ms loading spinner
  - Added `metadata` export for SEO (title, description, Open Graph)
- **Public property page**: Added `layout.tsx` with metadata (title, description)
- **Contact page**: Added `layout.tsx` with metadata (title, description)

### 3.5 Trimmed unused dependencies
- Removed 3 unused packages (39 transitive deps eliminated):
  - `jwt-decode` — zero imports
  - `react-icons` — zero imports (all icons use `lucide-react`)
  - `recharts` — zero imports
- Kept `styled-components` (used in `components/Loader.tsx`)
- antd v6 tree-shakes by default with named imports — `antd/es/` paths unnecessary and potentially incompatible with v6

### 3.6 Fixed dead `useEventReminder` hook
- Created `app/api/send-event-reminder/route.ts` — the API endpoint the hook was calling (`fetch("/api/send-event-reminder")`) which previously didn't exist
- Route uses `nodemailer` with existing Gmail app password config to send HTML reminder emails with event details (title, date, time, address, attendees, notes)
- Hook's existing logic (schedules 2-hour-before reminder, uses ref to prevent double-fire) now works end-to-end without changes

### 3.7 Gap closure: pagination on all list pages
- **Clients page**: `getData` + manual conversion → `queryList` with `limitToLast(100)` + "Load All" button
- **Owners page**: Same pattern as clients
- **Properties page**: Same pattern, removed redundant `agentUid` filter (path already scoped to uid)
- **Events page**: Uses `queryList` for all 3 fetches (events, clients, owners) but no limit on calendar events (calendar needs all events for month navigation)
- Pages that fetch clients/owners as attendee lookups (events page, add event) also use `queryList` for consistency

## Phase 4 — UI/UX

### 4.1 Error boundaries & global error handling
- **New file:** `components/ErrorBoundary.tsx` — React class-based error boundary with "Try Again" button and optional custom fallback
- **New file:** `app/error.tsx` — Next.js App Router global error boundary for SSR/rendering errors
- **New file:** `providers/Providers.tsx` — client wrapper combining `ErrorBoundary` + `AuthProvider`
- **Updated:** `app/layout.tsx` — uses `<Providers>` instead of `<AuthProvider>` directly
- **New file:** `components/ErrorState.tsx` — reusable inline error state with retry button for data fetch failures
- **New file:** `components/EmptyState.tsx` — reusable empty state component with title, message, action button
- **Added retry UI** to all 4 list pages (clients, owners, properties, events): error state + retry button on fetch failure

### 4.1 Error boundaries & global error handling
- **New file:** `components/ErrorBoundary.tsx` — React class-based error boundary with "Try Again" button and optional custom fallback
- **New file:** `app/error.tsx` — Next.js App Router global error boundary for SSR/rendering errors
- **New file:** `providers/Providers.tsx` — client wrapper combining `ErrorBoundary` + `AuthProvider`
- **Updated:** `app/layout.tsx` — uses `<Providers>` instead of `<AuthProvider>` directly
- **New file:** `components/ErrorState.tsx` — reusable inline error state with retry button for data fetch failures
- **New file:** `components/EmptyState.tsx` — reusable empty state component with title, message, action button
- **Added retry UI** to all 4 list pages (clients, owners, properties, events): error state + retry button on fetch failure