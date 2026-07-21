# Proposed Route Map

## Goals

- Replace in-memory `page` switching with real Next.js App Router URLs.
- Preserve the current public marketing UI, user app UI, and admin UI.
- Separate public, auth, app, and admin layouts.
- Keep room for localized content and future onboarding routes.

## Proposed Route Groups

```text
src/app/
  (marketing)/
  (auth)/
  (dashboard)/
  admin/
```

## Public Routes

### `/`

- Current source:
  - landing page in `src/app/App.tsx`
- Content:
  - hero
  - features
  - how-it-works
  - pricing
  - testimonials
  - about/footer

### `/features`

- Public marketing page
- Can reuse the current landing feature sections, expanded into a dedicated page

### `/pricing`

- Public pricing page
- Should reuse the current pricing cards

### `/login`

- Auth entry page
- Based on current `AuthPage` login mode

### `/register`

- Auth registration page
- Based on current `AuthPage` register mode

### `/forgot-password`

- New route not present in the prototype as a standalone page
- Required for the real auth flow

## Authenticated App Routes

All of these should live under an authenticated layout and require a server-side session.

### `/app/dashboard`

- Current source:
  - `Dashboard`

### `/app/tasks`

- Current source:
  - `TasksPage`

### `/app/finance`

- Current source:
  - `FinancePage`

### `/app/bills`

- Current source:
  - `BillsPage`

### `/app/documents`

- Current source:
  - `DocumentsPage`

### `/app/student`

- Current source:
  - `StudentPage`

### `/app/goals`

- Current source:
  - `GoalsPage`

### `/app/habits`

- Current source:
  - `HabitsPage`

### `/app/family`

- Current source:
  - `FamilyPage`

### `/app/health`

- Current source:
  - `HealthPage`

### `/app/emergency`

- Current source:
  - `EmergencyPage`

### `/app/ai`

- Current source:
  - `AIPage`

### `/app/notifications`

- Current source:
  - `NotificationsPage`

### `/app/settings`

- Current source:
  - `SettingsPage`

## Admin Routes

All admin routes should require:

- authenticated session
- server-side authorization
- role/permission checks

### `/admin`

- Current source:
  - `AdminDashboard` overview

### `/admin/users`

- Admin user management
- Currently part of admin section switching

### `/admin/roles`

- New dedicated route
- Not currently distinct in the prototype
- Needed for RBAC management

### `/admin/subscriptions`

- Current admin subscriptions section

### `/admin/revenue`

- Current admin revenue section

### `/admin/analytics`

- New dedicated route
- Prototype mixes analytics inside overview/revenue

### `/admin/services`

- New dedicated route
- Needed for government-service CMS from the prompt

### `/admin/content`

- New dedicated route
- Needed for announcements/content management

### `/admin/notifications`

- New dedicated route
- Needed for admin notification creation and management

### `/admin/support`

- Current admin support ticket section

### `/admin/feedback`

- New dedicated route
- Not currently distinct in prototype

### `/admin/security`

- Current admin security center section

### `/admin/audit-logs`

- Current admin audit section

### `/admin/settings`

- Current admin settings section

## Suggested Supporting Routes

These are not in the required list but will likely be needed during implementation:

### `/unauthorized`

- For unauthenticated access attempts

### `/forbidden`

- For authenticated users without permission

### `/onboarding`

- For post-registration onboarding flow

### `/app/profile`

- Optional split if settings becomes too broad

## Route-to-Prototype Mapping Summary

### Existing one-to-one mappings

- `/` -> `LandingPage`
- `/login` -> `AuthPage` login
- `/register` -> `AuthPage` register
- `/app/dashboard` -> `Dashboard`
- `/app/tasks` -> `TasksPage`
- `/app/finance` -> `FinancePage`
- `/app/bills` -> `BillsPage`
- `/app/documents` -> `DocumentsPage`
- `/app/student` -> `StudentPage`
- `/app/goals` -> `GoalsPage`
- `/app/habits` -> `HabitsPage`
- `/app/family` -> `FamilyPage`
- `/app/health` -> `HealthPage`
- `/app/emergency` -> `EmergencyPage`
- `/app/ai` -> `AIPage`
- `/app/notifications` -> `NotificationsPage`
- `/app/settings` -> `SettingsPage`
- `/admin` -> `AdminDashboard`

### Routes that require splitting or expansion

- `/features`
- `/pricing`
- `/forgot-password`
- `/admin/users`
- `/admin/roles`
- `/admin/subscriptions`
- `/admin/revenue`
- `/admin/analytics`
- `/admin/services`
- `/admin/content`
- `/admin/notifications`
- `/admin/support`
- `/admin/feedback`
- `/admin/security`
- `/admin/audit-logs`
- `/admin/settings`

## Recommended Layout Structure

### `(marketing)` layout

- Public header
- theme toggle
- language switcher placeholder
- marketing footer

### `(auth)` layout

- Split-screen auth layout
- shared auth card
- shared validation and notices

### `(dashboard)` layout

- Authenticated app shell
- desktop sidebar
- mobile navigation
- top bar
- notification access
- theme toggle

### `admin` layout

- Admin shell
- admin sidebar
- admin top bar
- permission-aware navigation

## Notes for Migration

- Keep the current visual composition, spacing, color system, and charts.
- Replace state-based `setPage(...)` navigation with `Link`, route segments, and protected layouts.
- Avoid recreating the UI from scratch.
- During migration, move prototype-only sample data to `src/data/demo/*` so components stop depending on inline constants.
