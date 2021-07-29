// модуль авторизации

const express = require('express')
const controller = require('../controllers/position')
const router = express.Router() // вызов конструктора  маршрутов

// localhost:5000/api/getByCategoryId
router.get('/:categoryId', controller.getByCategoryId)
// localhost:5000/api/create
router.post('/', controller.create)
// localhost:5000/api/update
router.patch('/:id', controller.update)
// localhost:5000/api/remove
router.delete('/:id', controller.remove)



module.exports = router //экспорт модуля 