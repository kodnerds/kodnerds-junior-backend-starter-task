const express = require('express')
const connectDB = require('./config/dbConnection')
require('dotenv').config()
const cors = require('cors')
const handleError = require('./middlewares/errorHandler')

connectDB()

const app = express()
app.use(express.json())
app.use(cors({
  credentials: true,
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use('/api/v1/user', require('./routers/usersRouter'))
app.use('/api/v1/books', require('./routers/booksRouter'))
app.use(handleError)

// module.exports = app;

app.listen( process.env.PORT, ()=>{
    console.log(`server starts on port ${process.env.PORT} `);
})