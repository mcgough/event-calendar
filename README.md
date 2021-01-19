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

## Notable NPM Dependencies

- lodash.flowright
- date-fns
- tailwind

## APIs
- Festivo (holidays)

## TODO

- Day sub view
- Month sub view
- Transitions between views
- Endpoints to preload next and previous months events
