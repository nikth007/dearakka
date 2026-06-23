import bcrypt from 'bcryptjs';
import { getDb } from '../_db.js';
import { signToken } from '../_auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { email, password, name } = req.body || {};
  if (!email || !password || password.length < 6) {
    return res.status(400).json({ message: 'Valid email and password (≥6 chars) required' });
  }

  try {
    const sql = getDb();
    const existing = await sql`SELECT id FROM da_users WHERE email = ${email.toLowerCase()}`;
    if (existing.length > 0) {
      return res.status(409).json({ message: 'An account with this email already exists' });
    }
    const password_hash = await bcrypt.hash(password, 12);
    const rows = await sql`
      INSERT INTO da_users (email, password_hash, name)
      VALUES (${email.toLowerCase()}, ${password_hash}, ${name || null})
      RETURNING id, email, name, lang, created_at
    `;
    const user = rows[0];
    const token = signToken({ sub: user.id, email: user.email });
    return res.status(201).json({ token, user });
  } catch (err) {
    console.error('signup error', err);
    return res.status(500).json({ message: 'Server error' });
  }
}
