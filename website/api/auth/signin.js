import bcrypt from 'bcryptjs';
import { getDb } from '../_db.js';
import { signToken } from '../_auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  try {
    const sql = getDb();
    const rows = await sql`SELECT * FROM da_users WHERE email = ${email.toLowerCase()}`;
    if (rows.length === 0) return res.status(401).json({ message: 'Invalid email or password' });

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: 'Invalid email or password' });

    const token = signToken({ sub: user.id, email: user.email });
    return res.status(200).json({ token, user: { id: user.id, email: user.email, name: user.name, lang: user.lang } });
  } catch (err) {
    console.error('signin error', err);
    return res.status(500).json({ message: 'Server error' });
  }
}
