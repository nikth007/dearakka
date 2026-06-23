-- Run this against your Neon database once to set up the app schema.
-- Safe to run multiple times (IF NOT EXISTS / ADD COLUMN IF NOT EXISTS).

-- Users (add missing cols if table already exists)
CREATE TABLE IF NOT EXISTS da_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  lang TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE da_users ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE da_users ADD COLUMN IF NOT EXISTS lang TEXT DEFAULT 'en';
ALTER TABLE da_users ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

-- Cycle setup per user
CREATE TABLE IF NOT EXISTS da_cycle_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES da_users(id) ON DELETE CASCADE,
  last_period_start DATE,
  cycle_length INTEGER DEFAULT 28,
  period_length INTEGER DEFAULT 5,
  period_dates JSONB DEFAULT '[]',
  period_lengths JSONB DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Daily logs
CREATE TABLE IF NOT EXISTS da_daily_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES da_users(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  flow INTEGER DEFAULT 0,
  moods JSONB DEFAULT '[]',
  symptoms JSONB DEFAULT '[]',
  energy INTEGER,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, log_date)
);
