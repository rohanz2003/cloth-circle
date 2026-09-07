import bcrypt from 'bcryptjs';
import { readStore, writeStore } from './store.js';

const passwordHash = await bcrypt.hash('Password123!', 12);
const adminHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin123!', 12);
const now = new Date().toISOString();
const users = [
  { id: 'admin-1', name: 'Cloth Circle Admin', email: 'admin@clothcircle.local', contactDetails: 'Operations desk', passwordHash: adminHash, role: 'admin', bio: 'Community care team', location: 'Mumbai', swapHistory: [], lastActiveAt: now },
  { id: 'user-keira', name: 'Keira Morgan', email: 'keira@example.com', contactDetails: '+91 90000 10001', passwordHash, role: 'user', bio: 'Linen, quiet colors, and good repair stories.', location: 'Bandra, Mumbai', swapHistory: [], lastActiveAt: now },
  { id: 'user-aanya', name: 'Aanya Shah', email: 'aanya@example.com', contactDetails: '+91 90000 10002', passwordHash, role: 'user', bio: 'Weekend market explorer.', location: 'Bandra, Mumbai', swapHistory: [], lastActiveAt: now },
  { id: 'user-mira', name: 'Mira Rao', email: 'mira@example.com', contactDetails: '+91 90000 10003', passwordHash, role: 'user', bio: 'Denim and vintage finds.', location: 'Indiranagar, Bengaluru', swapHistory: [], lastActiveAt: now }
];
const listings = [
  { id: 'listing-1', ownerId: 'user-aanya', title: 'Linen wrap dress', type: 'Dress', brand: 'Mango', size: 'M', condition: 'Excellent', category: 'Dresses', location: 'Bandra, Mumbai', latitude: 19.0607, longitude: 72.8362, value: 1850, imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85', status: 'available' },
  { id: 'listing-2', ownerId: 'user-mira', title: 'Vintage denim jacket', type: 'Jacket', brand: "Levi's", size: 'L', condition: 'Good', category: 'Outerwear', location: 'Indiranagar, Bengaluru', latitude: 12.9784, longitude: 77.6408, value: 2200, imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85', status: 'available' },
  { id: 'listing-3', ownerId: 'user-keira', title: 'Pleated midi skirt', type: 'Skirt', brand: 'Zara', size: 'S', condition: 'Like new', category: 'Bottoms', location: 'Bandra, Mumbai', latitude: 19.062, longitude: 72.835, value: 1450, imageUrl: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d27?auto=format&fit=crop&w=900&q=85', status: 'available' }
];
const swaps = [{ id: 'swap-sample-1', requestedListingId: 'listing-1', offeredListingId: 'listing-3', message: 'Would you like to compare the fit over chat?', handoverMethod: 'local_exchange', handoverLocation: 'Bandra community market', requesterId: 'user-keira', ownerId: 'user-aanya', status: 'accepted', fulfillmentStatus: 'arranging', createdAt: now, updatedAt: now }];
const messages = [{ id: 'message-sample-1', swapId: 'swap-sample-1', senderId: 'user-keira', content: 'Happy to meet at a public place this weekend.', createdAt: now }];
const reports = [{ id: 'report-sample-1', reporterId: 'user-keira', listingId: 'listing-2', reason: 'Please review the condition description.', status: 'open', createdAt: now }];
const data = { users, listings, swaps, messages, reports };
await writeStore(data);
console.log(`Seeded MongoDB with ${users.length} users, ${listings.length} listings, ${swaps.length} swap, ${messages.length} message, and ${reports.length} report.`);
console.log('Demo user password: Password123!');
console.log('Admin password:', process.env.ADMIN_PASSWORD || 'Admin123!');
