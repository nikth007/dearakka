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
    const { from, to } = req.query || {};
    const rows = from && to
      ? await sql`SELECT * FROM da_daily_logs WHERE user_id = ${userId} AND log_date BETWEEN ${from} AND ${to} ORDER BY log_date DESC`
      : await sql`SELECT * FROM da_daily_logs WHERE user_id = ${userId} ORDER BY log_date DESC LIMIT 90`;
    return res.status(200).json({ logs: rows });
  }

  if (req.method === 'POST') {
    const { log_date, flow, moods, symptoms, energy, note } = req.body || {};
    if (!log_date) return res.status(400).json({ message: 'log_date required' });
    await sql`
      INSERT INTO da_daily_logs (user_id, log_date, flow, moods, symptoms, energy, note)
      VALUES (${userId}, ${log_date}, ${flow || 0}, ${JSON.stringify(moods || [])}, ${JSON.stringify(symptoms || [])}, ${energy || null}, ${note || null})
      ON CONFLICT (user_id, log_date) DO UPDATE SET
        flow = EXCLUDED.flow,
        moods = EXCLUDED.moods,
        symptoms = EXCLUDED.symptoms,
        energy = EXCLUDED.energy,
        note = EXCLUDED.note
    `;
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
