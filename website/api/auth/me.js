import { getDb } from '../_db.js';
import { verifyToken, extractToken } from '../_auth.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  const token = extractToken(req);
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const payload = verifyToken(token);
    const sql = getDb();
    const rows = await sql`SELECT id, email, name, lang, created_at FROM da_users WHERE id = ${payload.sub}`;
    if (rows.length === 0) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json({ user: rows[0] });
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
