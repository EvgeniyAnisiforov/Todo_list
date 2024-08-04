const ApiError = require("../error/ApiError")
const { User } = require("../models/models")
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const generateJwt = (id, login, role) => {
    return jwt.sign(
        {id: id, login: login, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UsersController {
    async registration(req, res, next){
        const {login, password, role, name, surname} = req.body
        if(!login || !password){
            return next(ApiError.badRequest('Некорректный login или пароль'))
        }
        const candidate = await User.findOne({where: {login}})
        if(candidate){
            return next(ApiError.badRequest('Этот пользователь уже зарегистрирован'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({login, password: hashPassword, role, name, surname})
        const token = generateJwt(user.id, user.login, user.role)
        return res.json({token})
    }

    async login(req, res, next){
        const {login, password} = req.body
        const user = await User.findOne({where: {login}})
        if(!user){
            return next(ApiError.badRequest("Пользователь не найден"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.badRequest('Неверный пароль'))
        }
        const token = generateJwt(user.id, user.login, user.role, user.name, user.surname)
        return res.json({token, id: user.id, name: user.name, surname: user.surname})
    }

    async check(req, res){
        const token = generateJwt(req.user.id, req.user.login, req.user.role)
        return res.json({token})
    }
}

module.exports = new UsersController()