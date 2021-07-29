const mongoose = require('mongoose')

const Schema = mongoose.Schema // создание схемы для модели

const categorySchema = new Schema({
    name: {
        type: String,
        required: true  // флаг на обязательность поля иначе будет ошибка
    },
    imagesrc: {
        type: String,
        default: '',
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }

})

module.exports = mongoose.model('categories', categorySchema) //экспорт
