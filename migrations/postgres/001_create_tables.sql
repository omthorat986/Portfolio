BEGIN;

CREATE TABLE IF NOT EXISTS portfolio_projects (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  engine_used VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL,
  video_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS visitor_analytics (
  id BIGSERIAL PRIMARY KEY,
  event_type VARCHAR(64) NOT NULL,
  page_path VARCHAR(255) NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  session_id VARCHAR(128),
  metadata JSONB,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_visitor_analytics_occurred_at
  ON visitor_analytics (occurred_at DESC);

CREATE INDEX IF NOT EXISTS idx_visitor_analytics_event_type
  ON visitor_analytics (event_type);

COMMIT;
