const express = require('express')

const app = express()
const router = require('./routes/routes')
const PORT = 7000
app.use(express.json())
app.get('/', (req, res) => {
  res.status(200).send('Homepage !!!')
})
app.use('/api/v1/tasks', router)

app.listen(PORT, () => {
  console.log(`Listening on ${PORT} !!!`)
})
