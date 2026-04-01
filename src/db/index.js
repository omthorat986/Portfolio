const { Pool } = require('pg');
const mysql = require('mysql2/promise');

const DB_CLIENT = (process.env.DB_CLIENT || 'postgres').toLowerCase();

let pgPool;
let mysqlPool;

function mapProjectRow(row) {
  return {
    id: Number(row.id),
    title: row.title,
    engineUsed: row.engine_used,
    role: row.role,
    videoUrl: row.video_url,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function parseJsonValue(value) {
  if (value == null) {
    return null;
  }

  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }

  return value;
}

function mapAnalyticsRow(row) {
  return {
    id: Number(row.id),
    eventType: row.event_type,
    pagePath: row.page_path,
    referrer: row.referrer,
    userAgent: row.user_agent,
    sessionId: row.session_id,
    metadata: parseJsonValue(row.metadata),
    occurredAt: row.occurred_at,
    createdAt: row.created_at
  };
}

function getPgPool() {
  if (!pgPool) {
    pgPool = new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 5432),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      max: 10
    });
  }

  return pgPool;
}

function getMysqlPool() {
  if (!mysqlPool) {
    mysqlPool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10
    });
  }

  return mysqlPool;
}

async function getProjects() {
  if (DB_CLIENT === 'postgres') {
    const pool = getPgPool();
    const { rows } = await pool.query(
      `SELECT id, title, engine_used, role, video_url, created_at, updated_at
       FROM portfolio_projects
       ORDER BY id ASC`
    );

    return rows.map(mapProjectRow);
  }

  if (DB_CLIENT === 'mysql') {
    const pool = getMysqlPool();
    const [rows] = await pool.query(
      `SELECT id, title, engine_used, role, video_url, created_at, updated_at
       FROM portfolio_projects
       ORDER BY id ASC`
    );

    return rows.map(mapProjectRow);
  }

  throw new Error('Unsupported DB_CLIENT. Use postgres or mysql.');
}

async function insertAnalyticsEvent(payload) {
  const event = {
    eventType: payload.eventType,
    pagePath: payload.pagePath,
    referrer: payload.referrer || null,
    userAgent: payload.userAgent || null,
    sessionId: payload.sessionId || null,
    metadata: payload.metadata || null,
    occurredAt: payload.occurredAt || new Date().toISOString()
  };

  if (DB_CLIENT === 'postgres') {
    const pool = getPgPool();
    const { rows } = await pool.query(
      `INSERT INTO visitor_analytics (event_type, page_path, referrer, user_agent, session_id, metadata, occurred_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, event_type, page_path, referrer, user_agent, session_id, metadata, occurred_at, created_at`,
      [
        event.eventType,
        event.pagePath,
        event.referrer,
        event.userAgent,
        event.sessionId,
        event.metadata,
        event.occurredAt
      ]
    );

    return mapAnalyticsRow(rows[0]);
  }

  if (DB_CLIENT === 'mysql') {
    const pool = getMysqlPool();
    const [result] = await pool.execute(
      `INSERT INTO visitor_analytics (event_type, page_path, referrer, user_agent, session_id, metadata, occurred_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        event.eventType,
        event.pagePath,
        event.referrer,
        event.userAgent,
        event.sessionId,
        JSON.stringify(event.metadata),
        event.occurredAt
      ]
    );

    const [rows] = await pool.execute(
      `SELECT id, event_type, page_path, referrer, user_agent, session_id, metadata, occurred_at, created_at
       FROM visitor_analytics
       WHERE id = ?`,
      [result.insertId]
    );

    return mapAnalyticsRow(rows[0]);
  }

  throw new Error('Unsupported DB_CLIENT. Use postgres or mysql.');
}

async function getAnalytics(limit = 100) {
  const safeLimit = Number.isInteger(limit) ? Math.min(Math.max(limit, 1), 1000) : 100;

  if (DB_CLIENT === 'postgres') {
    const pool = getPgPool();
    const { rows } = await pool.query(
      `SELECT id, event_type, page_path, referrer, user_agent, session_id, metadata, occurred_at, created_at
       FROM visitor_analytics
       ORDER BY occurred_at DESC
       LIMIT $1`,
      [safeLimit]
    );

    return rows.map(mapAnalyticsRow);
  }

  if (DB_CLIENT === 'mysql') {
    const pool = getMysqlPool();
    const [rows] = await pool.execute(
      `SELECT id, event_type, page_path, referrer, user_agent, session_id, metadata, occurred_at, created_at
       FROM visitor_analytics
       ORDER BY occurred_at DESC
       LIMIT ?`,
      [safeLimit]
    );

    return rows.map(mapAnalyticsRow);
  }

  throw new Error('Unsupported DB_CLIENT. Use postgres or mysql.');
}

module.exports = {
  getProjects,
  insertAnalyticsEvent,
  getAnalytics
};
