// модуль авторизации

const bcrypt = require('bcryptjs')  // используется для создания пароля
const User = require('../models/User') // подключение модели данных
const jwt = require('jsonwebtoken')  // подключение библиотеки генерации уникального токена исп при механизме авторизации
const keys = require('../config/keys')

module.exports.login  =  async(req, res) => {
    const person = await User.findOne({email: req.body.email})

    if(person){
        // проверка пароля
        const passwordResult = bcrypt.compareSync(req.body.password, person.password)// req.body.password то что получаем из запроса
        if(passwordResult){
            // пароли совпали
            const token = jwt.sign({
                email: person.email,
                userId: person._id
            }, keys.flag, {expiresIn: 60*60})
            
            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                message: "Пароли не совпадают"
            })
        }
    }else{                                                                            //               
        //пользователя нет, error
        res.status(404).json({
            message: "Пользователь с таким email не обнаружен"
        })
    }
}

module.exports.register = async (req, res) => {
    //email pass
    const person = await User.findOne({email: req.body.email})   // поиск пользователя в базе

    if (person){
        // существует -> ошибка
        res.status(409).json({
            message: 'email занят, используйте другой'
        })
    } else {
        // создаем

        const salt = bcrypt.genSaltSync(10) //генерируем хэш для пароля
        const pass = req.body.password
        //локальное создание пользователя
        const user = new User({
            email: req.body.email, // получаем из объекта request
            password: bcrypt.hashSync(pass, salt)  // шифруем пароль с  помощью bcrypt, введенный пароль хэшируется
        })
        //сохранение пользователя в БД через механизм asynch/await
        try{
            await user.save()
            res.status(201).json(user) // возврат объекта user с кодом 201 - create
            } 
            catch(e){
            // обработка ошибки

        }
        
    }

}