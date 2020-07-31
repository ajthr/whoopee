// Import Packages
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')

// Import Routes
const authentication = require('./routes/auth')
const movies = require('./routes/movies')
const fav = require('./routes/favorites')

// Initialize express app
const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

// Config env
dotenv.config()

// Connect to db
mongoose.connect(
  process.env.DB_TOKEN,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => console.log('Connected to db')
)

// Route Middlewares
app.use('/api/auth', authentication)
app.use('/api/movies', movies)
app.use('/api/favorites', fav)

if (process.env.NODE_ENV === 'production') {
  // static folder
  app.use(express.static(__dirname + 'public/'))

  //handle routes
  app.get(/.*/, (req, res) => req.sendFile(__dirname + '/public/index.html'))
}

// Run server in Local computer
// app.listen(3000, console.log('Server up and running'))

// Run server in Local network
app.listen(3000, '192.168.1.7', console.log('Server up and running'))
