import test from 'node:test';
import assert from 'node:assert/strict';
import { app, calculateValue } from '../app.js';
import { closeStore } from '../store.js';

async function request(path, options = {}) { return fetch(`http://localhost:4987${path}`, options); }
let server;
test.before(() => { server = app.listen(4987); });
test.after(async () => { await new Promise((resolve) => server.close(resolve)); await closeStore(); });

test('health endpoint responds', async () => { const response = await request('/api/v1/health'); assert.equal(response.status, 200); assert.equal((await response.json()).data.status, 'ok'); });
test('swap value formula is deterministic', () => { assert.equal(calculateValue({ category: 'Dresses', brand: 'Mango', condition: 'Excellent' }), 1573); });
test('registration validates and returns a JWT', async () => { const response = await request('/api/v1/auth/register', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: 'Test Member', email: `test-${Date.now()}@example.com`, password: 'password123', location: 'Mumbai' }) }); const body = await response.json(); assert.equal(response.status, 201); assert.ok(body.data.token); });
test('listing browse returns available pieces', async () => { const response = await request('/api/v1/listings'); const body = await response.json(); assert.equal(response.status, 200); assert.ok(Array.isArray(body.data.items)); });
