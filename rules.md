# rules.md
**Project rules, standards, and guidelines — Clothing Exchange & Swap Marketplace**

---

## 1. What to Use

**Frontend**
- React.js (Vite or Create React App — no Next.js required since SEO/SSR isn't a Phase 1 priority for a login-gated marketplace)
- Bootstrap or Tailwind CSS — pick one, do not mix both in the same project
- React Router for the 6–8 page flow (Login, Listings, Item Detail, Swap Request, Chat, Dashboard, Admin Panel)
- React Hook Form + Yup/Zod for listing and profile forms

**Backend**
- Node.js with Express.js
- REST API architecture (`/api/v1/...`)
- JWT for authentication
- Socket.io (or polling as a fallback) for the negotiation chat module

**Database**
- MongoDB (recommended — flexible schema fits clothing listings with variable attributes like size/brand/condition) or PostgreSQL
- Mongoose (if MongoDB) or Prisma (if PostgreSQL) — one ORM/ODM only

**Media & Location**
- Cloud storage (AWS S3 / Cloudinary) for clothing images — optional per the PRD, but required in practice since listings are photo-driven
- A geolocation/distance library (e.g. `geolib`) or MongoDB's `$geoNear` for location-based matching — no need for a full mapping SDK in Phase 1

**Infra / Deployment**
- AWS / Render / Vercel
- Environment variables via `.env`, never committed
- A live deployed link is a hard deliverable — deploy early and often, don't leave it to the end

---

## 2. What to Avoid

- ❌ No online payment system — this is a barter/swap platform, not a marketplace with checkout, for Phase 1
- ❌ No AI-powered fashion recommendations
- ❌ No AR virtual try-on features
- ❌ No native mobile application work
- ❌ No placeholder/lorem-ipsum clothing data in the final build — use realistic listings (real-sounding brands, sizes, conditions)
- ❌ No skipping validation on clothing listing uploads (size/brand/condition/images are required fields, not optional)
- ❌ No exposing another user's raw contact details before a swap is mutually accepted — route first contact through the in-app chat
- ❌ No blocking/synchronous file uploads on the main request thread — stream/queue image uploads

---

## 3. Libraries & Dependencies

| Purpose | Library | Notes |
|---|---|---|
| Auth | `jsonwebtoken`, `bcrypt` | Salted password hashing |
| Validation | `zod` or `yup` (shared shape frontend/backend) | Enforce clothing listing schema strictly |
| Real-time chat | `socket.io` | Negotiation chat is a core Phase 1 feature, build it real-time from the start |
| Image upload | `multer` + `aws-sdk`/`cloudinary` | Validate file type/size before upload |
| Geolocation | `geolib` or native Mongo geospatial queries | Powers "nearby swap opportunities" |
| Date handling | `date-fns` | Avoid `moment.js` |
| Testing | `jest`, `supertest`, `react-testing-library` | Required before final deployed submission |
| Linting | `eslint`, `prettier` | Enforced via pre-commit hook |

---

## 4. Error Handling

- Consistent API error envelope: `{ "success": false, "message": "...", "code": "SWAP_REQUEST_NOT_FOUND" }`
- Centralized Express error middleware — no per-route custom formatting
- User-facing messages are plain language (e.g. "This item is no longer available for swap" — never raw DB errors)
- Swap-state errors are explicit: attempting to accept an already-accepted/cancelled swap request returns a clear conflict message (409), not a generic 500
- Chat/socket errors degrade gracefully — if the socket connection drops, the UI shows a reconnecting state rather than losing messages silently
- Frontend: every async action (listing upload, swap request, chat send) has loading/error/success states with visible feedback

---

## 5. Boundaries of AI (Coding Assistant Scope)

- Build only what's in Scope for Phase 1 (see PRD) — do not add payments, AI recommendations, AR try-on, or a mobile app even if they seem like natural next steps.
- Do not alter authentication or the swap-acceptance business logic silently — flag and explain any change to how a swap request moves between states (pending → accepted/rejected → completed).
- Do not change the data model (Clothing Item, User, Swap Request, Chat Message) without first updating `architecture.md`.
- Ask for clarification on ambiguous business rules (e.g., exact swap value calculation formula) rather than inventing one silently — document whatever formula is chosen in `architecture.md`.
- Update `memory.md` after every completed feature or decision.

---

## 6. General Rules

- **Code style & formatting:** Prettier + ESLint (Airbnb config), 2-space indent, single quotes.
- **Naming conventions:** `camelCase` for variables/functions, `PascalCase` for components, `kebab-case` for files/folders, `UPPER_SNAKE_CASE` for env vars/constants.
- **Commit message guidelines:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`), e.g. `feat(swap): add accept/reject endpoint`.
- **Security & data privacy:** hash passwords, sanitize all listing/chat input, rate-limit auth and swap-request endpoints, never expose full contact details pre-swap-acceptance, HTTPS only in production.
- **Performance & scalability:** paginate listing browse/search results, index MongoDB fields used in queries (`location`, `category`, `userId`, `status`), compress uploaded images.
- **Documentation & comments:** JSDoc on exported functions; comment the swap-value calculation logic clearly since it encodes a specific business formula.
- **Testing rules:** the swap request lifecycle (create → accept/reject → complete) and the chat module require integration tests; every listing CRUD endpoint needs a happy-path + failure-path test.
- **Other rules:** the app must be mobile-responsive (not necessarily mobile-first like a social feed, but every one of the 6–8 pages must work cleanly on a phone screen); a live deployed link is mandatory — no local-only submission.
