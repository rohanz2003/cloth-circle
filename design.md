# design.md
**UI/UX guidelines and visual design system — Clothing Exchange & Swap Marketplace**

---

## 1. UI/UX

- Clean, image-forward interface — clothing listings live or die by photo quality, so listing cards should give images generous space
- Consistent UX across Listings, Item Detail, Swap Request, and Chat (same card and modal patterns throughout)
- Mobile-responsive — every one of the 6–8 pages (Login, Listings, Item Detail, Swap Request, Chat, Dashboard, Admin Panel) must work cleanly on a phone screen
- Easy navigation and accessibility — clear category/location filters, ARIA labels on icon-only buttons, visible focus states
- Component reuse — one `<ListingCard>`, one `<SwapStatusBadge>`, one `<ChatBubble>` used consistently everywhere

---

## 2. Color & Theme

A sustainable-fashion identity: earthy, natural, trustworthy — avoiding the aggressive reds/oranges of "sale" e-commerce.

| Role | Color | Hex (suggested) |
|---|---|---|
| Primary | Sage Green | `#5B8266` |
| Secondary | Clay/Terracotta | `#C97B5A` |
| Accent | Mustard | `#E0A458` |
| Background | Warm Ivory | `#FAF8F3` |
| Surface | White | `#FFFFFF` |
| Text (primary) | Charcoal | `#2B2B28` |
| Success | `#4C9A5B` |
| Warning | `#E0A458` |
| Error | `#C4483F` |

- **Light & dark theme support:** dark mode background `#1E1D1A`, surface `#28261F`, text `#F1EEE6`; primary/secondary/accent colors held consistent.
- **Swap status colors:** Pending = neutral gray, Accepted = Primary green, Rejected = Error red, Completed = Secondary clay — used consistently on `<SwapStatusBadge>`.

---

## 3. Fonts & Typography

- **Primary font family:** Inter (UI, body text) — clean and neutral so clothing photos remain the visual focus
- **Heading font:** Work Sans or the same Inter family at heavier weight — keep to one font family to reduce visual noise
- **Heading styles:** H1 26–28px SemiBold, H2 20–22px SemiBold, H3 16–18px Medium
- **Body text styles:** 15px Regular, 1.5 line-height
- **Font sizes & line heights:** 16px base scale, generous line-height for scanning listing details
- **Font weights:** Regular (400), Medium (500), SemiBold (600) — avoid Bold except for prices/values and swap status badges

---

## 4. Memory (UI Preferences)

Persisted per-user:
- Theme mode (light/dark)
- Last-used category/location filters (so returning to Listings doesn't reset search state)
- Sidebar/layout state on Dashboard and Admin Panel
- Notification preferences (new swap request, new chat message, swap accepted/rejected)

---

## Notes for Implementation
- Register the palette above as Tailwind/Bootstrap theme tokens rather than hardcoding hex values in components.
- Listing images should use a consistent aspect ratio (e.g., 4:5 portrait) across all cards so the browse grid stays visually even.
- Chat UI should visually distinguish "my messages" vs. "their messages" using the primary color for the user's own bubbles.
