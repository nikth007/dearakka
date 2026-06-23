import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'dear-akka-dev-secret-change-in-production';
const EXPIRES = '30d';

export function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES });
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

export function extractToken(req) {
  const auth = req.headers.authorization || '';
  if (auth.startsWith('Bearer ')) return auth.slice(7);
  return null;
}
