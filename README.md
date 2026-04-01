# Portfolio Backend - Module 1

This module provides the data and state layer for portfolio projects and visitor analytics.

This repository now also includes Module 2, an isolated Three.js sandbox frontend.

## Stack
- Node.js + Express
- SQL database: PostgreSQL or MySQL

## 1) Migration Scripts
Run one of these scripts based on your database:
- PostgreSQL: `migrations/postgres/001_create_tables.sql`
- MySQL: `migrations/mysql/001_create_tables.sql`

Tables created:
- `portfolio_projects`
- `visitor_analytics`

## 2) API Endpoints (Strict JSON)
### GET /api/projects
Response:
```json
{
  "data": [
    {
      "id": 1,
      "title": "Project Name",
      "engineUsed": "Unreal Engine 5",
      "role": "Gameplay Programmer",
      "videoUrl": "https://example.com/video",
      "createdAt": "2026-03-19T10:00:00.000Z",
      "updatedAt": "2026-03-19T10:00:00.000Z"
    }
  ],
  "meta": {
    "count": 1
  }
}
```

### GET /api/analytics?limit=100
Response:
```json
{
  "data": [
    {
      "id": 1,
      "eventType": "page_view",
      "pagePath": "/",
      "referrer": null,
      "userAgent": "Mozilla/5.0",
      "sessionId": "abc123",
      "metadata": {
        "source": "landing"
      },
      "occurredAt": "2026-03-19T10:00:00.000Z",
      "createdAt": "2026-03-19T10:00:00.000Z"
    }
  ],
  "meta": {
    "count": 1,
    "limit": 100
  }
}
```

### POST /api/analytics
Request body:
```json
{
  "eventType": "page_view",
  "pagePath": "/projects",
  "referrer": "https://google.com",
  "userAgent": "Mozilla/5.0",
  "sessionId": "abc123",
  "metadata": {
    "campaign": "spring"
  },
  "occurredAt": "2026-03-19T10:00:00.000Z"
}
```

Success response:
```json
{
  "data": {
    "id": 2,
    "eventType": "page_view",
    "pagePath": "/projects",
    "referrer": "https://google.com",
    "userAgent": "Mozilla/5.0",
    "sessionId": "abc123",
    "metadata": {
      "campaign": "spring"
    },
    "occurredAt": "2026-03-19T10:00:00.000Z",
    "createdAt": "2026-03-19T10:00:00.000Z"
  }
}
```

Error response shape (all endpoints):
```json
{
  "error": {
    "code": "INVALID_PAYLOAD",
    "message": "eventType is required and must be a non-empty string."
  }
}
```

## Setup
1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and set DB values.
3. Run the matching SQL migration.
4. Start API: `npm run dev` or `npm start`

## Health Check
- `GET /health` returns `{ "status": "ok" }`

## Module 2 - 3D Engine Setup (Canvas Sandbox)

The 3D layer is intentionally separated from API concerns:
- Backend/API: `src/`
- Frontend/WebGL sandbox: `public/`

### Scene Initialization
- `public/js/main.js` creates:
  - `THREE.Scene`
  - `THREE.PerspectiveCamera`
  - `THREE.WebGLRenderer`
  - animation/render loop using `requestAnimationFrame`

### Character Controller
- `public/js/characterController.js` handles WASD movement.
- Includes simple collision handling against a static ground plane (`y = 0`).

### Asset Loading Utility
- `public/js/assetLoader.js` wraps `GLTFLoader` for GLB/GLTF imports.
- By default, the app attempts to load `/assets/scene.glb` if present.

### Run
1. Start the server: `npm run dev`
2. Open: `http://localhost:3000`
3. Move in-scene with `W`, `A`, `S`, `D`

### Notes
- Three.js is loaded via ESM CDN URLs in browser modules.
- Frontend reads API data from `GET /api/projects` and displays project count in the HUD.

## Module 5 - World Boundaries & Content Seeding

### Seed Data
- Seed 4 dummy projects with:
  - `npm run seed`
- Script location: `src/db/seed.js`

### World Boundaries
- `public/js/characterController.js` now supports invisible `THREE.Box3` environment colliders.
- `public/js/main.js` configures perimeter wall colliders to keep players inside the gallery.

### Loading Screen
- `public/index.html` includes a startup loading overlay.
- `public/js/main.js` uses `THREE.LoadingManager` plus API readiness gating.
- The loading mask fades away only after both project API data and GLB asset loads complete.
