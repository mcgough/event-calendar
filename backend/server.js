require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3030
const got = require('got')

app.use(cors({ origin: '*' }))

app.get('/', (req, res) => {
  res.send(events)
})

app.get('/events', async (req, res) => {
  const { body } = await got(
    `https://getfestivo.com/v2/holidays?api_key=${process.env.EVENTS_KEY}&country=US&year=2020`
  )
  res.send(body)
})

app.listen(port, () => {
  console.log(`Server running at ${port}`)
})
