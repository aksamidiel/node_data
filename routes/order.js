// модуль авторизации

const express = require('express')
const controller = require('../controllers/order')
const router = express.Router() // вызов конструктора  маршрутов

// localhost:5000/api/auth/login
router.get('/', controller.getAll)
// localhost:5000/api/auth/register
router.post('/', controller.create)



module.exports = router //экспорт модуля 