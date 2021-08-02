// модуль авторизации

const bcrypt = require('bcryptjs')  // используется для создания пароля
const User = require('../models/User') // подключение модели данных

module.exports.login  = (req, res) => {
    res.status(200).json({
        login: {
           email: req.body.email,
           password: req.body.password  
        }
    })
}

module.exports.register = async (req, res) => {
    //email pass
    const person = await User.findOne({email: req.body.email})   // поиск пользователя в базе

    if (person){
        // существует -> ошибка
        res.status(409).json({
            message: 'email has been occured, change new mail'
        })
    } else {
        // создаем

        const salt = bcrypt.genSaltSync(10) //генерируем хэш для пароля
        const pass = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(pass, salt)  // шифруем пароль , введенный пароль хэшируется
        })

        try{
            await user.save()
            res.status(201).json(user) // возврат объекта user с кодом 201 - create
            } 
            catch(e){
            // обработка ошибки

        }
        
    }

}