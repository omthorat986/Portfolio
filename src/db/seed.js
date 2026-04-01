require('dotenv').config();
const { Pool } = require('pg');
const mysql = require('mysql2/promise');

const DB_CLIENT = (process.env.DB_CLIENT || 'postgres').toLowerCase();

const DUMMY_PROJECTS = [
  {
    title: 'Neon Drift Arena',
    engineUsed: 'Unreal Engine 5',
    role: 'Gameplay Programmer',
    videoUrl: 'https://www.youtube.com/watch?v=1H8M9sQ2x1A'
  },
  {
    title: 'Citadel Tactics VR',
    engineUsed: 'Unity 2022 LTS',
    role: 'Technical Artist',
    videoUrl: 'https://www.youtube.com/watch?v=Q9wX2mR7r8s'
  },
  {
    title: 'Moonforge Operations',
    engineUsed: 'Godot 4',
    role: 'Systems Designer',
    videoUrl: 'https://www.youtube.com/watch?v=rfT6nNwZ5M4'
  },
  {
    title: 'Arc Line Protocol',
    engineUsed: 'Custom C++/OpenGL',
    role: 'Graphics Programmer',
    videoUrl: 'https://www.youtube.com/watch?v=U4J2eP9H6kM'
  }
];

async function seedPostgres() {
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    max: 5
  });

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('TRUNCATE TABLE portfolio_projects RESTART IDENTITY');

    const values = [];
    const placeholders = DUMMY_PROJECTS.map((project, index) => {
      const offset = index * 4;
      values.push(project.title, project.engineUsed, project.role, project.videoUrl);
      return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4})`;
    }).join(', ');

    await client.query(
      `INSERT INTO portfolio_projects (title, engine_used, role, video_url) VALUES ${placeholders}`,
      values
    );

    await client.query('COMMIT');
    console.log(`Seed complete: inserted ${DUMMY_PROJECTS.length} projects into portfolio_projects (PostgreSQL).`);
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

async function seedMysql() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 5
  });

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.query('TRUNCATE TABLE portfolio_projects');

    const rows = DUMMY_PROJECTS.map((project) => [
      project.title,
      project.engineUsed,
      project.role,
      project.videoUrl
    ]);

    await connection.query(
      'INSERT INTO portfolio_projects (title, engine_used, role, video_url) VALUES ?',
      [rows]
    );

    await connection.commit();
    console.log(`Seed complete: inserted ${DUMMY_PROJECTS.length} projects into portfolio_projects (MySQL).`);
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
    await pool.end();
  }
}

async function run() {
  if (DB_CLIENT === 'postgres') {
    await seedPostgres();
    return;
  }

  if (DB_CLIENT === 'mysql') {
    await seedMysql();
    return;
  }

  throw new Error('Unsupported DB_CLIENT. Use postgres or mysql.');
}

run().catch((error) => {
  console.error('Seed failed:', error.message || error);
  process.exitCode = 1;
});
