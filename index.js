const app = require('./app')
const port = process.env.PORT || 5000  //задание порта через консоль либо по умолчанию 5000


app.listen(port, ()=>{
    console.log(`Server has been started ${port}`)
})

// пакет nodemon ставим с флагами --save-dev для разработки

