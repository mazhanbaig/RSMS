# CHANGELOG

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

## Phase 2 — Code Cleanup (in progress)

*(tasks pending)*
