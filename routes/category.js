// модуль авторизации

const express = require('express')
const controller = require('../controllers/category')
const router = express.Router() // вызов конструктора  маршрутов

// localhost:5000/api/getAll
router.get('/', controller.getAll)
// localhost:5000/api/getById
router.get('/:id', controller.getById)
// localhost:5000/api/remove
router.delete('/:id', controller.remove)
// localhost:5000/api/create
router.post('/', controller.create)
// localhost:5000/api/update
router.patch('/:id', controller.update)



module.exports = router //экспорт модуля 