const mongoose = require('mongoose')

const Schema = mongoose.Schema // создание схемы для модели

const userSchema = new Schema({
    email: {
        type: String,
        required: true,  // флаг на обязательность поля иначе будет ошибка
        unique: true // поле для установки проверки уникальности
    },
    password: {
        type: String,
        required: true
    }
  
})

module.exports = mongoose.model('users', userSchema) //экспорт
