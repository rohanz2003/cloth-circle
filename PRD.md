# Cloth Circle Product Requirements Document

## 1. Product Overview

Cloth Circle is a privacy-conscious clothing exchange marketplace. Members list wearable clothing, discover pieces from nearby people, request swaps, negotiate in private chat, and complete an in-person or shipped exchange without online payments.

## 2. Product Goals

- Keep good clothing in circulation longer.
- Make local and shipped clothing swaps easy to coordinate.
- Provide transparent, points-based value guidance without treating swaps as cash sales.
- Protect member contact information until both parties agree to a swap.
- Give administrators the tools to moderate listings, resolve disputes, and monitor platform health.

## 3. Scope

### In scope

- Account registration and login
- JWT authentication and role-based admin access
- Personal profiles with private contact details
- Clothing image upload and listing management
- Browse, search, category filtering, and pagination
- Location-based discovery and radius matching
- Swap requests and status lifecycle
- Private negotiation chat with Socket.io
- Local exchange or shipping fulfillment tracking
- Swap-value estimation and fair-match suggestions
- Admin users, listings, swaps, disputes, and analytics
- Platform KPI reporting

### Explicitly out of scope

- Online payments or checkout
- AI recommendations
- AR virtual try-on
- Native mobile applications

## 4. Personas

### Member

A person who wants to refresh their wardrobe sustainably, list clothing they no longer wear, discover nearby pieces, and arrange a safe exchange.

### Administrator

A trusted operator who moderates listings, reviews reports, monitors swaps, resolves disputes, and tracks platform performance.

## 5. User Requirements

### Authentication and profile

- Register with name, email, password, location, and optional contact details.
- Log in and receive a JWT session.
- Edit name, location, bio, and private contact details.
- Sign out and prevent access to protected actions.

### Clothing listings

Each listing contains:

- Item ID
- Clothing type/category
- Brand
- Size
- Condition
- Estimated swap value in points
- Image
- Location and optional coordinates
- Availability status
- Owner reference

Members can create, browse, edit, and remove their own listings. Images support PNG, JPEG, and WebP uploads in local development.

### Browse and discovery

- Search by item title, brand, or location.
- Filter by category.
- Paginate results.
- View item details, owner display name, condition, location, and point value.
- Discover nearby opportunities by browser location and radius.

### Swap requests

- Request another member's available item using one of the member's own listings.
- Choose local exchange or shipping.
- Add a message and optional public meeting area.
- View incoming and outgoing requests.
- Accept, reject, cancel, and complete requests according to valid state transitions.
- Track fulfillment status without exposing private addresses.

### Negotiation chat

- Create a private conversation for a swap.
- Send and persist messages.
- Receive realtime Socket.io messages in the swap room.
- Discuss fit, condition, handover, carriers, and tracking.
- Confirm agreement and move an accepted swap into negotiation.

### Swap value calculator

The point estimate is calculated as:

```text
baseValue(category) × brandTier × conditionFactor
```

The calculator supports side-by-side comparison and suggests available pieces within the configured value range.

## 6. Admin Requirements

- View registered users and roles.
- View listing inventory and availability.
- Hide, remove, and restore listings.
- Monitor all swap activity and statuses.
- View open reports and disputes.
- Mark reports investigating, resolved, or dismissed.
- View KPI analytics.

## 7. KPI Definitions

- **Clothing listings:** total listing records, with available count shown separately.
- **Successful swaps:** swaps with `completed` status.
- **Active users:** users with activity in the last 30 days.
- **Engagement rate:** active users divided by registered users.
- **Swap request conversion rate:** successful swaps divided by total swap requests.

## 8. Non-Functional Requirements

### Security

- Bcrypt password hashing.
- JWT expiry and production secret enforcement.
- Helmet security headers.
- CORS allowlist in production.
- Rate limits for authentication and swap mutation endpoints.
- Admin role guards.
- Private chat authorization.

### Performance and scalability

- Compressed responses.
- Paginated listing search with a maximum page size.
- Short private cache hints for browse responses.
- Stateless API requests suitable for horizontal scaling.
- Socket.io rooms isolated by swap ID.
- MongoDB persistence for production.

### Privacy

- Password hashes never leave the server.
- Raw contact details are not included in public listing responses.
- Full addresses are not requested in swap forms.
- Messages are accessible only to swap participants.
- Public owner data is limited to display information needed for discovery.

### Accessibility and responsive design

- Keyboard-accessible buttons and forms.
- Visible focus states.
- Responsive layouts for desktop and mobile.
- Clear status labels and error feedback.
- Consistent image ratios for listing cards.

## 9. Technical Architecture

- React and Vite frontend.
- Express REST API under `/api/v1`.
- MongoDB via the official Node driver.
- JSON persistence fallback for local environments without MongoDB.
- JWT and bcrypt authentication.
- Socket.io for negotiation chat.
- Zod request validation.
- Render, Vercel, AWS, or equivalent deployment target.

## 10. Acceptance Criteria

- A new member can register and log in.
- A member can create a listing with an image and required details.
- A listing appears in browse and nearby discovery when available.
- A member can request another listing using an owned offer.
- The listing owner can accept or reject the request.
- Both members can chat privately.
- Both members can choose and track local exchange or shipping fulfillment.
- A swap can progress to completed.
- An admin can moderate listings and resolve reports.
- Admin analytics show all defined KPIs.
- `npm test` passes.
- `npm run build` passes.

## 11. Local Runbook

```powershell
npm install
npm run seed
npm run server
npm run dev
```

Open `http://localhost:5173`.

## 12. Deployment Deliverable

A public application URL requires deployment credentials. The repository is production-buildable and documents the required environment variables in `.env.example`:

- `MONGODB_URI`
- `MONGODB_DB`
- `JWT_SECRET`
- `ADMIN_PASSWORD`
- `CLIENT_ORIGIN`
- `VITE_API_URL`

The final release process is:

1. Provision MongoDB.
2. Deploy the API with `npm start`.
3. Set `VITE_API_URL` to the API URL.
4. Build and deploy the Vite `dist/` directory.
5. Run `npm run seed` once against the production database if demo data is required.
6. Record the resulting public frontend URL in the release notes.
