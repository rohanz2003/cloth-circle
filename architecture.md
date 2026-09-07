# architecture.md
**High-level design and structure — Clothing Exchange & Swap Marketplace**

---

## 1. Architecture Overview

A client-server web application with a REST API backbone plus a real-time channel for negotiation chat.

```
┌─────────────────────┐        HTTPS/REST         ┌──────────────────────┐
│   React Frontend     │ ────────────────────────▶ │  Express.js Backend  │
│ (React Router + UI)  │ ◀──────────────────────── │   (Node.js REST API) │
└──────────┬───────────┘                            └──────────┬───────────┘
           │            WebSocket (Socket.io)                  │
           └──────────────────────┬──────────────────────────┘
                                   ▼
                    ┌──────────────────────────┐
                    │   Chat / Realtime Layer   │
                    └──────────────────────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              ▼                    ▼                     ▼
     ┌────────────────┐   ┌────────────────┐   ┌─────────────────┐
     │ MongoDB/Postgres │   │  Cloud Storage │   │ Geolocation/Geo  │
     │  (Core data)     │   │ (S3/Cloudinary)│   │  matching layer  │
     └────────────────┘   └────────────────┘   └─────────────────┘
```

**Core components:**
- **Frontend (React/Vite):** Login, Browse, Nearby, Item Detail, Swap Request, Value Guide, Chat, Profile, Listing Management, Dashboard, and Admin Workspace views.
- **Backend (Express):** REST endpoints under `/api/v1` for auth, users, listings, values, swaps, messages, reports, and admin operations, plus Socket.io swap rooms.
- **Database:** MongoDB database `cloth_circle` via the official MongoDB Node driver. A JSON file fallback remains available when MongoDB cannot be reached.
- **Media:** local development accepts PNG/JPEG/WebP data URLs; production should use S3 or Cloudinary.
- **Geolocation layer:** listing latitude/longitude with Haversine radius matching and location text search.

**How they interact:**
1. User registers/logs in → JWT issued → attached to all API calls and the socket handshake.
2. User uploads a clothing listing (images → cloud storage, metadata → DB) with an estimated swap value calculated from brand/condition/category inputs.
3. Browsing users filter listings by category/location; the swap value calculator suggests fair matches.
4. A swap request moves through states: `pending → accepted/rejected → (if accepted) in_negotiation → completed/cancelled`.
5. Once a swap request exists, both parties gain access to a private chat thread (Socket.io room keyed by swap request ID) to negotiate details and confirm the exchange.
6. Admin has a separate protected namespace to manage users/listings, monitor swaps, resolve disputes, and view analytics.

---

## 2. Folder & File Structure

```
clothing-swap/
├── src/                           # React/Vite frontend
│   ├── main.jsx                   # app shell and feature views
│   └── *.css                      # feature-scoped responsive styles
├── server/                        # Express backend
│   ├── app.js                     # routes, validation, auth, analytics
│   ├── server.js                  # HTTP and Socket.io server
│   ├── store.js                   # MongoDB adapter with JSON fallback
│   ├── seed.js                    # demo accounts and sample data
│   └── tests/app.test.js          # API tests
├── PRD.md                         # complete product requirements
├── architecture.md
├── design.md
├── phases.doc.md
├── rules.md
├── memory.md
└── README.md
```

---

## 3. Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Bootstrap/Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB via the official `mongodb` Node driver; JSON fallback for local resilience |
| Real-time | Socket.io |
| Auth | JWT + bcrypt |
| Media storage | Browser data URLs in development; AWS S3 / Cloudinary recommended for production |
| Deployment | AWS / Render / Vercel |
| Testing | Jest, Supertest, React Testing Library |

### Data Model (Core Entities)
- **User** — name, private contact details, location, swap history, role (user/admin)
- **ClothingItem** — owner ref, item ID, type/category, brand, size, condition, estimated swap value, images, location/coordinates, availability status
- **SwapRequest** — requester ref, item offered, item requested, status (`pending → accepted/rejected → in_negotiation → completed/cancelled`), handover method, fulfillment status, timestamps
- **Message** — swap request ref, sender ref, content, timestamp
- **Report/Dispute** (Admin) — swap ref or listing ref, reporter, reason, status

### Swap Value Calculation
- Implemented in `server/app.js` as `baseValue(category) × brandTier × conditionFactor`.
- Current base values: Dresses 1300, Tops 900, Bottoms 1100, Outerwear 1600, Knitwear 1200, with a 1000 fallback.
- Values are displayed as swap points rather than money because no payment changes hands.

### Implemented API Surface

- Auth/profile: `/api/v1/auth/*`, `/api/v1/users/me`
- Listings: `/api/v1/listings`, `/api/v1/users/me/listings`, `/api/v1/listings/nearby`
- Value: `/api/v1/value/estimate`, `/api/v1/value/matches`
- Swaps: `/api/v1/swaps`, status, fulfillment, suggestions, and messages
- Reports: `/api/v1/reports`
- Admin: users, listings, swaps, reports, overview, and analytics

### Operational Configuration

- `MONGODB_URI` and `MONGODB_DB` select the database.
- `JWT_SECRET`, `ADMIN_PASSWORD`, and `CLIENT_ORIGIN` are required for production.
- `VITE_API_URL` points the deployed frontend to the API.
- `npm run seed` creates demo users, listings, swap activity, chat data, and a report.
