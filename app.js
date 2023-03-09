// Configure database
require('./config/db.config')

//Require Errors
const createError = require('http-errors');

// Configure dotenv
require('dotenv').config()

const express = require('express');
const app = express();

// Configure logger
const logger = require('morgan')
app.use(logger('dev'))

// Configure static files
app.use(express.static(`${__dirname}/public`))

// Configure Favicon
const favicon = require("serve-favicon");
app.use(favicon(`${__dirname}/public/favicon.ico`));

// Configure cookie of session
const { session, loadSessionArtist } = require('./config/session.config')
app.use(session)
app.use(loadSessionArtist)

// Configure views
require('./config/hbs.config')
app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views`)

// Configure current path
app.use((req, res, next) => {
  res.locals.currentPath = req.path
  next()
})

// Configure body
app.use(express.urlencoded({})) // extended:false

// Configure router
const router = require('./config/routes.config')
app.use('/', router)

// Configure global errors
app.use((req, res, next) => {  
  next(createError(404, 'Page not Found'))
})

app.use((error, req, res, next) => {
  console.log('error > ', error)
  error = !error.status ? createError(500, error) : error
  res.status(error.status)
  res.render(`errors/${error.status}`)
  console.error(`Global error ${error}`, error)
})

// Configure port 
const port = 3000;
app.listen(port, ()=> {
  console.log(`App is listening at port ${port}`)
})