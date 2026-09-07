# phases.doc.md
**Breakdown of the Clothing Exchange & Swap Marketplace into manageable build phases**

---

## PHASE 1: Login & Authentication
- User registration (name, contact details, location)
- Login/Logout with JWT
- Create personal profile (bio, location, profile photo)
- Authentication & authorization setup (roles: User, Admin)

**Exit criteria:** a user can register with their location, log in/out, and edit a basic profile. Admin role is distinguishable and gated.

---

## PHASE 2: Dashboard
- User Dashboard layout: my listings, my swap requests (sent/received), swap history
- Navigation setup across the 6–8 page flow (Login, Listings, Item Detail, Swap Request, Chat, Dashboard, Admin Panel)
- Basic stats on dashboard (active listings count, pending swaps, completed swaps)

**Exit criteria:** a logged-in user has a working dashboard summarizing their own activity and a navigable shell connecting all pages.

---

## PHASE 3: CRUD Operations
- **Clothing Listings:** upload (images + type/size/brand/condition), edit, remove; set estimated swap value; browse/search/filter by category and location; view availability status
- **Swap Requests:** send a swap request against a listing, view incoming/outgoing requests, accept/reject, track status through its lifecycle
- **Item Detail Page:** full listing view with images, details, owner info (limited), and a "Request Swap" action
- Form validation on all listing and swap-request forms

**Exit criteria:** listings and swap requests support full CRUD/lifecycle management with validation; browsing, search, and filter all work correctly.

---

## PHASE 4: Additional Features
- **Negotiation Chat:** real-time messaging tied to a swap request, discuss details, confirm agreement
- **Swap Value Calculator:** estimate value from brand/condition/category, display a side-by-side comparison for both items in a proposed swap
- **Location-Based Matching:** show nearby users/listings, filter by proximity, surface suggested nearby swaps
- **Admin Panel:** manage users and listings, monitor swap activity, remove inappropriate listings, resolve disputes, generate basic platform analytics

**Exit criteria:** users can negotiate and confirm a swap end-to-end through chat, get fair-value guidance, discover nearby matches, and admins can moderate the platform.

---

## PHASE 5: Testing & Quality Assurance
- Unit testing (controllers, swap-value calculation logic, validators)
- Integration testing (registration → listing upload → swap request → chat → swap completion, full happy path)
- Bug fixing pass across Phases 1–4
- Performance testing (fast search/listing load, responsive on mobile)
- Replace any placeholder data with realistic clothing listings before final testing

**Exit criteria:** the full swap lifecycle is covered by automated tests, known bugs are resolved, and the app performs well under realistic data and mobile viewports.

---

## PHASE 6: Deployment & Maintenance
- Deployment to a live environment (AWS/Render/Vercel) — a live deployed link is a mandatory deliverable
- User feedback collection & monitoring
- Bug fixes & improvements post-launch
- Future enhancements backlog: AI-based swap recommendations, mobile app, clothing condition verification, sustainability impact tracker, community fashion groups

**Exit criteria:** the application is live at a public URL, fully functional, tested, and documented — ready for final evaluation.

---

### Build Order Notes
- Phases are sequential; do not build Phase 4 features (chat, value calculator, geo-matching) before Phase 3's core CRUD is stable.
- Every phase, on completion, must update `memory.md` with what was built, decisions made (especially the finalized swap-value formula), and what's next.
- Nothing from "Out of Scope (Phase 1)" in the PRD — online payments, AI recommendations, AR try-on, mobile app — should appear in any phase here.
