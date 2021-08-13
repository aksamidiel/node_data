//функционал для работы с js-токеном

const JwtStrategy = require('passport-jwt').Strategy
const extJWT = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users')
const keys = require('../config/keys')


const options = {
    jwtFromRequest: extJWT.fromAuthHeaderAsBearerToken(),  // говорит стратегии jwtStrategy то чтотмы будем извлекать token из header
    secretOrKey: keys.jwt
}


module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done)=>{
            try{
                const user = await User.findById(payload.userId).select('email id')

            if(user){
                done(null, user)
            } else {
                done(null, false)
            }
            } catch(e){
                console.log(`Error: ${e}`)
            }
            

        })
    )
}