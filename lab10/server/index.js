require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const tokenVerification = require('./middleware/tokenVerification')
const usersRoutes = require('./routes/users')
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')

app.use(express.json())
app.use(cors())
const port = process.env.PORT || 8080

app.get('/api/users', tokenVerification)
app.get('/api/user', tokenVerification)
app.delete('/api/user', tokenVerification)

app.use('/api/users', usersRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

const connection = require('./db')
connection()

app.listen(port, () => console.log(`Nasłuchiwanie na porcie ${port}`))
