const express = require('express')
const cors = require('cors')
const app = express()
const port = 3030
const events = require('./events/event_calendar_data')

app.use(cors({ origin: '*' }))

app.get('/', (req, res) => {
  res.send(events)
})

app.listen(port, () => {
  console.log(`Server running at ${port}`)
})
