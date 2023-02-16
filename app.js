// Configure database
require('./config/db.config')

// Configure dotenv
require('dotenv').config()

const express = require('express');
const app = express();

// Configure logger
const logger = require('morgan')
app.use(logger('dev'))

// Configure static files
app.use(express.static(`${__dirname}/public`))

// Configure cookie of session
const { session, loadSessionArtist } = require('./config/session.config')
app.use(session)
app.use(loadSessionArtist)

// Configure views
require('./config/hbs.config')
app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views`)

// Configure body
app.use(express.urlencoded({})) // extended:false

// Configure router
const router = require('./config/routes.config')
app.use('/', router)

// Configure global errors
app.use('/', (error, req, res, next) => {
  res.status(500)
  console.error(`Global error ${error}`)
  res.send(error)
})

// Configure port 
const port = 3000;
app.listen(port, ()=> {
  console.log(`App is listening at port ${port}`)
})