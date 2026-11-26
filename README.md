# STAR//OPS — Interstellar Transit Command
React 18 + Vite operator console with a Node.js/Express API.

## Run locally
`npm install`
Terminal 1: `npm start` (Express API at http://localhost:4000)
Terminal 2: `npm run dev` (Vite frontend at http://localhost:5173)
Vite proxies /api requests to Express during development.

## Features
- Star A → Star B convoy mission with Primary and Echo corridors.
- Three vessels with live position, speed, fuel, temperature, hull and status telemetry.
- Foobar density model influences simulated drag, fuel use and thermal load.
- Vessel selection, throttle up/down, reroute, pause/resume, emergency stop, failure injection, alert acknowledgement and reset.
- React hydrates from the backend fleet API; simulation changes are synchronized to the backend.
- API fleet state is in-memory on the server process. Browser localStorage is used only as a resilience cache.

## API contract

### GET /api/health
200:
```json
{"status":"ok","service":"star-transport-express-api","version":"1.1.0","timestamp":"<ISO-8601>"}
```

### GET /api/fleet
200:
```json
{"fleet":[{"id":"v1","name":"AURORA","call":"VSL-01","progress":28,"speed":78,"fuel":82,"temp":71,"hull":96,"route":"PRIMARY","status":"IN TRANSIT"}],"count":3,"source":"in-memory"}
```
Returns the current server-side fleet snapshot (three vessels initially).

### POST /api/fleet
Content-Type: application/json
Request:
```json
{"fleet":[{"id":"v1","name":"AURORA","call":"VSL-01","progress":29,"speed":83,"fuel":81,"temp":72,"hull":96,"route":"ECHO","status":"IN TRANSIT"}]}
```
200: `{"ok":true,"count":1,"fleet":[...],"updatedAt":"<ISO-8601>","source":"in-memory"}`
400 `INVALID_FLEET`: missing/non-array fleet or 1–20 item constraint.
422 `INVALID_VESSEL`: required field or numeric telemetry validation failed.
404 `NOT_FOUND`: unknown route.

## Architecture
Browser (React/Vite) ⇄ HTTP JSON API (Express) ⇄ process-local in-memory fleet.
On Vercel, Express is exposed as a serverless function; in-memory state is ephemeral and may reset between cold starts/instances. Local standalone Express keeps state for the lifetime of its process.

## Scope and safety
This is a simulation using synthetic telemetry and illustrative route corridors. It is not connected to real vessels, sensors, orbital mechanics or navigation systems. No database, authentication or guaranteed cross-instance persistence is included.
