// описание всего приложения

const express = require('express')
const authRoutes = require('./routes/auth') //импорт роута
const analyticsRoutes = require('./routes/analytics') //импорт роута
const categoryRoutes = require('./routes/category') //импорт роута
const orderRoutes = require('./routes/order') //импорт роута
const positionRoutes = require('./routes/position') //импорт роута
//const bodyParser = require("body-parser") //парсер устарел(по умолчанию уже есть в express)
const mongoose = require('mongoose') //подключение базы данных
const keys = require('./config/keys')
const passport = require('passport') //установка пакета защиты роутов 


const app = express()

const cors = require('cors') // для ответа клиенту с разных доменов
const morgan = require('morgan') // логирование запросов




mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(() => {console.log('MongoDB connected. ')})
.catch(err =>{console.log(error)})

app.use(passport.initialize()) // указывает объекту app что далее работа будет идти с объектом passport
require('./middleware/passport')(passport)



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