import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MongoClient } from 'mongodb';

const directory = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(directory, 'data.json');
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const mongoDbName = process.env.MONGODB_DB || 'cloth_circle';
let mongoClient;
const seed = {
  users: [{ id: 'admin-1', name: 'Cloth Circle Admin', email: 'admin@clothcircle.local', contactDetails: 'Operations desk', passwordHash: '', role: 'admin', bio: 'Community care team', location: 'Mumbai', swapHistory: [] }],
  listings: [
    { id: 'listing-1', ownerId: 'demo-user', title: 'Linen wrap dress', type: 'Dress', brand: 'Mango', size: 'M', condition: 'Excellent', category: 'Dresses', location: 'Bandra, Mumbai', latitude: 19.0607, longitude: 72.8362, value: 1850, imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85', status: 'available' },
    { id: 'listing-2', ownerId: 'demo-user', title: 'Vintage denim jacket', type: 'Jacket', brand: "Levi's", size: 'L', condition: 'Good', category: 'Outerwear', location: 'Indiranagar, Bengaluru', latitude: 12.9784, longitude: 77.6408, value: 2200, imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85', status: 'available' }
  ],
  swaps: [],
  messages: [],
  reports: []
};

async function mongoCollection() { if (!mongoClient) { mongoClient = new MongoClient(mongoUri, { serverSelectionTimeoutMS: 1500 }); await mongoClient.connect(); } return mongoClient.db(mongoDbName).collection('application_state'); }
export async function readStore() {
  try { const collection = await mongoCollection(); const document = await collection.findOne({ _id: 'main' }); if (!document) { const initial = structuredClone(seed); await collection.insertOne({ _id: 'main', ...initial, updatedAt: new Date() }); return initial; } const { _id, updatedAt, ...data } = document; return data; } catch { try { return JSON.parse(await fs.readFile(filePath, 'utf8')); } catch { await writeStore(structuredClone(seed)); return structuredClone(seed); } }
}
export async function writeStore(data) { try { const collection = await mongoCollection(); await collection.replaceOne({ _id: 'main' }, { _id: 'main', ...structuredClone(data), updatedAt: new Date() }, { upsert: true }); return; } catch { await fs.mkdir(directory, { recursive: true }); const temporaryPath = `${filePath}.tmp`; await fs.writeFile(temporaryPath, JSON.stringify(data, null, 2), { mode: 0o600 }); await fs.rename(temporaryPath, filePath); } }
export async function closeStore() { if (mongoClient) { await mongoClient.close(); mongoClient = undefined; } }
export function nextId(prefix) { return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`; }
