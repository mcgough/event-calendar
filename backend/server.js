const express = require('express')
const cors = require('cors')
const app = express()
const port = 3030
const events = require('./events/event_calendar_data')
const utils = require('./utils')

// TODO: cleanup
events.data.map((e) => {
  return Object.assign(e.when, {
    start_time: e.when.start_time * 1000,
    end_time: e.when.end_time * 1000,
  })
})

app.use(cors({ origin: '*' }))

app.get('/', (req, res) => {
  res.send(events)
})

app.get('/random', (req, res) => {
  const randomEvents = {
    data: [
      ...events.data,
      ...utils.generateRandomEvents(req.query.count || 100),
    ],
  }
  res.send(randomEvents)
})

app.listen(port, () => {
  console.log(`Server running at ${port}`)
})
