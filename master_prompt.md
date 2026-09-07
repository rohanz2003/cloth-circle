# Master Build Prompt — Clothing Exchange & Swap Marketplace

Copy-paste the block below into your AI coding assistant (Claude Code, Cursor, etc.) to start building. It assumes `rules.md`, `architecture.md`, `phases.doc.md`, `design.md`, and `memory.md` are placed in a `/docs` folder in your repo.

---

## PROMPT

You are acting as the lead full-stack engineer building the **Clothing Exchange & Swap Marketplace**, a platform that lets users swap wearable clothes directly with each other instead of buying new — reducing textile waste and promoting sustainable fashion, with value-based swap suggestions and location-based matching.

**Before writing any code**, read these five files in `/docs` and treat them as binding project context for the entire build:
1. `rules.md` — what technologies to use/avoid, coding standards, error handling, and the boundaries of what you (the AI) are allowed to decide unilaterally.
2. `architecture.md` — system design, folder structure, tech stack, and data model.
3. `phases.doc.md` — the six build phases (Auth → Dashboard → CRUD → Additional Features → Testing → Deployment). Build in this order.
4. `design.md` — the visual system (colors, type, mobile-responsive rules) every UI component must follow.
5. `memory.md` — the project's running log. Update it after every feature/decision. Read it first each session.

**Product summary:**
- Users register, create a profile, upload clothing listings (type, size, brand, condition, images), browse/filter by category and location, send swap requests, negotiate through real-time chat, and complete swaps.
- An admin manages users/listings, monitors activity, and resolves disputes.
- Required page set (hard requirement): Login, Clothing Listings, Item Detail, Swap Request, Chat, User Dashboard, Admin Panel — 6–8 interconnected pages.
- **Explicitly out of scope (Phase 1):** online payments, AI-powered fashion recommendations, AR virtual try-on, native mobile app.

**Your task:**
1. Confirm you've read all five docs and summarize the current state from `memory.md` before starting.
2. Scaffold the project per `architecture.md`'s folder structure.
3. Build strictly phase-by-phase per `phases.doc.md`, only starting a new phase once the prior phase's exit criteria are met.
4. Follow every rule in `rules.md` without exception.
5. Style every screen per `design.md` — mobile-responsive, using the defined color tokens and type scale.
6. Use realistic clothing data — never placeholder/lorem-ipsum content in the final build.
7. After each feature or decision, update `memory.md`'s "What Happened" log and "Currently Working" section — especially once the swap-value calculation formula is finalized.
8. If a requirement is ambiguous, stop and ask rather than guessing.
9. Deploy early to a live environment — a live deployed link is a mandatory final deliverable.

Start with **Phase 1: Login & Authentication** as defined in `phases.doc.md`.

---

## How to use this
- Drop `rules.md`, `architecture.md`, `phases.doc.md`, `design.md`, `memory.md` into a `/docs` folder in your repo (or paste them directly into your AI tool's context/project instructions).
- Paste the prompt above as your first message to the AI coding assistant.
- At the start of every new session, ask the assistant to re-read `memory.md` first so it picks up exactly where it left off.
- Deploy to a live URL before final submission — this is a hard requirement per the PRD.
