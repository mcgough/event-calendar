# Event Calendar

A simple calendar app. The Node server is running with the help of Express and the frontend was scaffolded and built using Vue. Most frontend calendar business logic can be found in `/workers/calendar-api.worker.js`.

## Build & Serve

**Requirements**

- Node - lts
- NPM - lts

**Build Command**
`npm run build`

**Serve App**
`npm run serve`
[https://localhost:8080]([https://localhost:8080])

**Random Events**
`?count={numberOfEvents}`

## Design Decisions

- Calendar month/weeks data structured as matrix
- Business logic offloaded to web worker

## Notable NPM Dependencies

- date-fns
- Comlink

## TODO

- More unit testing on `class Month`
- Day's events detail view
- Endpoints to preload next and previous months events
