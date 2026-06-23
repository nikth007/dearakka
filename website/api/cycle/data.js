import { getDb } from '../_db.js';
import { verifyToken, extractToken } from '../_auth.js';

export default async function handler(req, res) {
  const token = extractToken(req);
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  let payload;
  try { payload = verifyToken(token); } catch { return res.status(401).json({ message: 'Invalid token' }); }

  const sql = getDb();
  const userId = payload.sub;

  if (req.method === 'GET') {
    const rows = await sql`SELECT * FROM da_cycle_data WHERE user_id = ${userId}`;
    return res.status(200).json({ data: rows[0] || null });
  }

  if (req.method === 'POST') {
    const { last_period_start, cycle_length, period_length, period_dates, period_lengths } = req.body || {};
    await sql`
      INSERT INTO da_cycle_data (user_id, last_period_start, cycle_length, period_length, period_dates, period_lengths, updated_at)
      VALUES (${userId}, ${last_period_start}, ${cycle_length || 28}, ${period_length || 5}, ${JSON.stringify(period_dates || [])}, ${JSON.stringify(period_lengths || [])}, NOW())
      ON CONFLICT (user_id) DO UPDATE SET
        last_period_start = EXCLUDED.last_period_start,
        cycle_length = EXCLUDED.cycle_length,
        period_length = EXCLUDED.period_length,
        period_dates = EXCLUDED.period_dates,
        period_lengths = EXCLUDED.period_lengths,
        updated_at = NOW()
    `;
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
