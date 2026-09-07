# memory.md
**Project memory — keeps track of progress, decisions, and current work for Clothing Exchange & Swap Marketplace**

This file must be updated after every significant change. It is the single source of truth for "where the project stands" across sessions. Append, don't delete history — treat it like a build log.

---

## 1. Memory (Key Context & Decisions)
> Important context, decisions, and patterns to remember across sessions.

- Project: Clothing Exchange & Swap Marketplace — barter-based platform for swapping clothes instead of buying new
- Reference docs: `rules.md`, `architecture.md`, `phases.doc.md`, `design.md` (all in `/docs`)
- Stack decision: React (Bootstrap/Tailwind) frontend, Node/Express backend, MongoDB, JWT auth, Socket.io for chat
- Scope decision (Phase 1 out-of-scope): no online payments, no AI-powered recommendations, no AR try-on, no mobile app
- Required page set: Login, Clothing Listings Page, Item Detail Page, Swap Request Page, Chat Page, User Dashboard, Admin Panel (6–8 interconnected pages, hard requirement)
- Hard deliverable: a **live deployed link** is mandatory for final evaluation — no local-only submission
- Swap value formula: implemented as `baseValue(category) × brandTier × conditionFactor`, returning swap points for comparison rather than money.

---

## 2. What Happened (Build Log)
> Log of major updates, changes, and decisions, in chronological order.

- `[YYYY-MM-DD]` Project initialized. PRD reviewed and converted into `rules.md`, `architecture.md`, `phases.doc.md`, `design.md`.
- `[2026-09-07]` Built the first runnable React/Vite release in the workspace: responsive Discover, Item Detail, Swap Request, Dashboard, Chat, and Admin views with realistic listings, filtering, local request persistence, and browser-only message state.
- `[2026-09-07]` Validated the production bundle with `npm run build`.
- `[2026-09-07]` Added Express API with JSON development persistence, JWT/bcrypt authentication, profile updates, validated listing CRUD, swap lifecycle transitions, protected chat messages, Socket.io rooms, admin overview, and API tests.
- `[2026-09-07]` Connected the login screen to API registration/login and documented local and production commands in `README.md`.
- `[2026-09-07]` Completed the remaining requirement paths: API-backed listing browse and creation, browser image upload encoding, nearby Haversine matching, fair-value suggestions, realtime chat client, admin analytics/moderation/report endpoints, and live admin listing metrics.
- `[2026-09-07]` Added non-functional protections: Helmet, compression, configurable CORS, production JWT secret/origin enforcement, auth and swap rate limiting, paginated privacy-safe listing responses, atomic restrictive local persistence, and documented responsive/scalable/privacy requirements.
- `[2026-09-07]` Completed the high-level user/admin flow with local exchange or shipping selection, fulfillment status tracking, and protected admin/user monitoring paths.
- `[2026-09-07]` Added the requested data fields: explicit clothing type, private user contact details, initialized user swap history, and sample listing/user records for development.
- `[2026-09-07]` Added platform KPIs to admin analytics: total listings, successful swaps, active users, engagement rate, and swap-request conversion rate.
- `[2026-09-07]` Added `PRD.md` covering product scope, user/admin flows, acceptance criteria, architecture, KPI definitions, security, privacy, and deployment requirements.
- `[2026-09-07]` Synchronized `architecture.md` with the actual Vite/Express/MongoDB repository structure, API surface, Mongo configuration, seed workflow, and swap fulfillment model.
- `[2026-09-07]` Fixed the listing upload race and validation path: image data must be ready before submit, uploads support larger local images, and empty optional image URLs are omitted.
- *(Add an entry here every time a feature ships, a decision is made, or a bug is fixed.)*

---

## 3. Currently Working
> What's in progress right now — keep this section short and current, overwrite it as work moves forward.

- **Phase:** Phases 1–5 local implementation complete; Phase 6 deployment requires hosting credentials
- **Current file/module:** `server/app.js`, `server/store.js`, `server/seed.js`, `src/main.jsx`, `PRD.md`
- **What's next:** Use the production environment variables to deploy the API and Vite `dist/` bundle, then record the public URL.

---

## 4. Updates
> Keep this log of housekeeping/meta-updates to the docs themselves.

- `[YYYY-MM-DD]` Initial doc set created (rules, architecture, phases, design, memory).
- `[2026-09-07]` Kept the original Markdown specifications at the workspace root and added the runnable app beside them because the workspace began as a document-only specification set.
- *(Remove or revise outdated information here as the project evolves — don't let this file grow stale.)*

---

## 5. Purpose
> Why this file exists — read this if you forget.

- Maintain context across sessions/chats so work doesn't restart from zero
- Improve productivity and consistency between build phases
- Ensure nothing important (a decision, a constraint, a workaround) is forgotten between sessions
