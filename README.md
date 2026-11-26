# STAR//OPS — Interstellar Transit Command

React + Vite operator dashboard with Node.js/Express API and Vercel serverless API routes.

## Stack
- React 18 + Vite frontend
- Node.js + Express standalone API (server.js, port 4000)
- Vercel Functions: GET /api/health, GET/POST /api/fleet
- Responsive CSS dashboard and browser localStorage demo state

## Run
`npm install && npm run dev`
Frontend: http://localhost:5173. Standalone API: `npm start`, then http://localhost:4000/api/health.

## Demo
Three simulated vessels, density-based drag/fuel/thermal behavior, primary/echo route, throttle, pause/resume, reroute, emergency stop, failure injection, alert acknowledgement and fleet telemetry.

## Scope
Demonstrator only; telemetry is synthetic. The Express and Vercel APIs are stateless demo endpoints. There is no database, authentication, shared multi-user synchronization, hardware integration or real-world navigation capability.