// описание всего приложения

const express = require('express')
const authRoutes = require('./routes/auth') //импорт роута
const analyticsRoutes = require('./routes/analytics') //импорт роута
const categoryRoutes = require('./routes/category') //импорт роута
const orderRoutes = require('./routes/order') //импорт роута
const positionRoutes = require('./routes/position') //импорт роута
//const bodyParser = require("body-parser") //парсер устарел(по умолчанию уже есть в express)
//const mongoose = require('mongoose') //подключение базы данных
const keys = require('./config/keys')



const cors = require('cors') // для ответа клиенту с разных доменов
const morgan = require('morgan') // логирование запросов


const { MongoClient } = require("mongodb");


// Connection URI
// Create a new MongoClient
const client = new MongoClient(keys.mongoURI);
async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


//mongoose.connect(keys.mongoURI)
//.then(() => {
//    console.log('MongoDB connected. ')
//})
//.catch(err =>{
//    console.log('error ')
//})


const app = express()

app.use(morgan('dev'))
app.use(cors('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

module.exports = app