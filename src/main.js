const express = require('express')
const person = require('./api/person')
const breed = require('./api/breed')
const shop = require('./api/shop')
const animal = require('./api/animal')
const pet = require('./api/pet')
const login = require('./api/login')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const {verifyToken} = require('./common/middleware/auth')

dotenv.config()


const app = express()
app.get('/', (req, res) => {
    res.send('api endpoint')
})

app.user
app.use(bodyParser.json())
app.use('/person', person)
app.use('/breed', breed)
app.use('/shop', shop)
app.use('/animal', animal)
app.use('/pet', pet)
app.use('/login', login)


const port = 4000
app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})