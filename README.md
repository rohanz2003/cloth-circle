# Cloth Circle

A clothing exchange marketplace for local, value-aware swaps. The repository contains a React/Vite client and an Express/Socket.io API.

The complete product requirements are documented in [PRD.md](PRD.md).

## Run locally

Install dependencies:

```bash
npm install
```

Start the API in one terminal:

```bash
npm run server
```

The API connects to local MongoDB by default at `mongodb://127.0.0.1:27017` and uses the `cloth_circle` database. Seed demo accounts and sample data with:

```bash
npm run seed
```

Demo accounts use password `Password123!` (`keira@example.com`, `aanya@example.com`, and `mira@example.com`). The admin account is `admin@clothcircle.local` with password `Admin123!` unless `ADMIN_PASSWORD` is set.

Start the client in another terminal:

```bash
npm run dev
```

Open `http://localhost:5173`. Create an account on the login screen. The API uses `server/data.json` as a zero-configuration development database; it can be replaced with MongoDB behind the same repository/service boundary for production.

For the development admin account, use `admin@clothcircle.local` with password `Admin123!`. Set `ADMIN_PASSWORD` in production instead of using the development default.

## Verification

```bash
npm test
npm run build
```

## API

- `POST /api/v1/auth/register` and `POST /api/v1/auth/login`
- `GET /api/v1/auth/me` and `PATCH /api/v1/users/me`
- `GET/POST /api/v1/listings`
- `GET /api/v1/listings/nearby?latitude=19.06&longitude=72.83&radius=25`
- `GET/PATCH/DELETE /api/v1/listings/:id`
- `GET/POST /api/v1/swaps`
- `PATCH /api/v1/swaps/:id/status`
- `PATCH /api/v1/swaps/:id/fulfillment`
- `GET /api/v1/swaps/:id/suggestions`
- `GET/POST /api/v1/swaps/:id/messages`
- `POST /api/v1/reports`
- `GET /api/v1/admin/overview`
- `GET /api/v1/admin/analytics`
- `GET /api/v1/admin/users`
- `GET /api/v1/admin/listings`
- `GET /api/v1/admin/swaps`
- `GET/PATCH /api/v1/admin/reports`
- `PATCH /api/v1/admin/listings/:id/status`
- Socket.io events: `swap:join`, `swap:message`

Listing images can be uploaded from the browser as PNG, JPEG, or WebP files. Development storage keeps the encoded image in `server/data.json`; production should move this field to S3 or Cloudinary.

API errors use `{ success: false, message, code }`. JWTs are sent as `Authorization: Bearer <token>`.

## Production deployment

Set `JWT_SECRET`, `PORT`, and `VITE_API_URL` in the deployment environment. Deploy the API as a Node service using `npm start`, and deploy the client with `npm run build` and `npm run preview` or a static hosting provider. A public URL requires a hosting account and credentials, which are intentionally not stored in this repository.

## Non-functional requirements

- **Secure authentication:** bcrypt password hashing, JWT expiry, production-only secret configuration, Helmet security headers, login/register rate limiting, and role-protected admin routes.
- **Mobile responsive:** responsive layouts cover login, browse, listing management, swaps, chat, calculator, nearby discovery, profile, and admin screens.
- **Fast search:** listing browse supports `page` and `limit` parameters, caps pages at 50 records, uses compressed responses, and sends private short-lived cache hints.
- **Secure storage:** development writes are atomic and owner-readable; `.env` and `server/data.json` are excluded from git. Production should use MongoDB plus S3/Cloudinary rather than local JSON/base64 media.
- **Scalable architecture:** REST resource boundaries, Socket.io swap rooms, stateless JWT requests, pagination, and configurable frontend/API origins allow separate deployment and horizontal scaling.
- **Privacy:** public listing responses expose only necessary item/owner display data, never passwords, raw contact details, or authentication fields; swap messages are restricted to the two swap members.
- **KPIs:** the admin analytics API and dashboard report total clothing listings, successful swaps, active users in the last 30 days, engagement rate (`active users / registered users`), and swap-request conversion (`successful swaps / total requests`).

## End-to-end flows

- **User:** register or log in, edit a profile, upload and manage listings, browse/filter or discover nearby pieces, send a local-exchange or shipping request, negotiate in private chat, confirm agreement, track fulfillment, and complete the swap.
- **Admin:** review live analytics, monitor users/listings/swaps, hide or remove listings, and investigate, resolve, or dismiss disputes.
