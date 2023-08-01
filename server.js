//Get dependencies
const express = require('express')
const path = require('path')
const http = require('http')
const bodyParser = require('body-parser')

const mongoose = require('mongoose').default

/************ Connection to database **************/
const dbURI = 'mongodb://127.0.0.1:27017/db_mean'
mongoose.connect(dbURI, {}).then(() => console.log('Successful connection!'))

//Mongoose connection's events configuration
mongoose.connection.on('open', () => {
  console.log(`Mongoose default connection open to: ${dbURI}`)
})
mongoose.connection.on('error', (err) => {
  console.error(`Mongoose default connection error: ${err}.`)
})
process.on('SIGINT', () => {
  mongoose.connection.close()
    .then(() => {
      console.log('Mongoose default connection disconnected through app termination.')
      process.exit(0)
    })
    .catch(() => {
      console.error('An error has occurred.')
    })
})

/************ Express application and configuration **********/
const app = express()

//Parsers for POST data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//Configuration of 'dist' directory as our static path.
//Inside this directory will hold the files got from our Angular application's build process.
app.use(express.static(path.join(__dirname, './dist/to-do-list')))

//Routes configuration
const taskRouter = require('./server/routes/task')

app.use('/', taskRouter)

app.get('/api', (req, res) => {
  res.send('The API works!')
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/to-do-list/index.html'))
  //res.render('index', {})
})

//Port configuration
const port = process.env.PORT || '3000'
app.set('port', port)

//Creating the http server with the express application and opening the port.
const server = http.createServer(app)
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}/`)
})
