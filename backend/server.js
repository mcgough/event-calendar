require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3030
const apiMemo = require('./utils/apiMemo')

const FESTIVO_END_POINT = `https://getfestivo.com/v2/holidays?api_key=${process.env.EVENTS_KEY}&country=US&year=2020`

app.use(cors({ origin: '*' }))

app.get('/', (req, res) => {
  res.send(events)
})

app.get('/events', async (req, res) => {
  const result = await apiMemo(FESTIVO_END_POINT)

  res.send(result)
})

app.listen(port, () => {
  console.log(`Server running at ${port}`)
})
