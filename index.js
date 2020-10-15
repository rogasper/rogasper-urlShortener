const express = require('express')
const app = express()
const connectDB = require('./config/db')
const index = require('./routes/index')
const url = require('./routes/url')

connectDB()

app.use(express.json({ extented: false }))

app.use('/', index)
app.use('/url', url)

const PORT = 3000

app.listen(PORT, () => console.log(`server running in port ${PORT}`))