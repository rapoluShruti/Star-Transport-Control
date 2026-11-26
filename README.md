# STAR//OPS — Interstellar Transit Command

Operator-console prototype for a three-vessel convoy traveling from Star A to Star B through a variable-density foobar corridor.

## Features
- Live vessel simulation with speed, fuel, thermal load, hull integrity and crossing progress.
- Foobar density model affects drag, fuel burn and thermal load.
- Lower-density ECHO route and single-vessel or convoy rerouting.
- Operator commands: throttle up/down, emergency stop, pause/resume and engine-failure injection.
- Alert center with severity and vessel association.
- Failure behavior: a failed vessel freezes at its current crossing progress and creates a critical alert.
- Responsive operator UI and browser persistence.

## Run locally
This is a dependency-free static app. Serve the repository root with `npx serve .` and open the local URL.

## Demo
1. Watch all three vessels cross Star A → Star B.
2. Select PIONEER and change speed or reroute it to ECHO.
3. Pause and resume the simulation.
4. Inject an engine failure and confirm the vessel stops mid-crossing and raises a critical alert.
5. Reset to restore the initial scenario.

## Architecture
- `engine.js`: deterministic domain logic (density profile, vessel tick, commands, fleet rollups).
- `app.js`: state orchestration, browser persistence, rendering and command dispatch.
- `index.html` / `styles.css`: responsive operator experience, route plot and control surface.
- `tests/engine.test.js`: core simulation invariants.

## Scope and safety
This is a demonstrable simulation prototype, not a production flight-control system. All telemetry is synthetic. Browser localStorage is used for persistence; there is no real spacecraft hardware, shared multi-operator backend, authentication, database, or live telemetry ingestion. Real-world use would require approved operational interfaces, durable storage, identity controls, audit logging and safety certification.