# Google Calendar Clone

A simple clone of google's calendar web app. The Node server is running with the help of Express and the frontend was scaffolded and built using Vue. Most frontend calendar business logic can be found in `/workers/calendar-api/`.

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

## Notable NPM Dependencies

- compose
- date-fns
- tailwind

## TODO

- Day sub view
- Month sub view
- Endpoints to preload next and previous months events
- TypeScript integration
