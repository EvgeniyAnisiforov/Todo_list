const ApiError = require("../error/ApiError");
const { User } = require("../models/models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateJwt = (id, login, role) => {
    return jwt.sign(
        { id, login, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
};

class UsersController {
    async registration(req, res, next) {
        const { login, password, role, name, surname } = req.body;
        if (!login || !password) {
            return next(ApiError.badRequest('Некорректный login или пароль'));
        }
        const candidate = await User.findOne({ where: { login } });
        if (candidate) {
            return next(ApiError.badRequest('Этот пользователь уже зарегистрирован'));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ login, password: hashPassword, role, name, surname });
        const token = generateJwt(user.id, user.login, user.role);

        // Установка токена в HTTP-only cookie
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Убедитесь, что это включено только в продакшене
            sameSite: 'Strict', // Можно настроить по необходимости
            maxAge: 24 * 60 * 60 * 1000 // Установите время жизни cookie, совпадающее с временем жизни токена
        });

        return res.status(200).json({ message: 'User registered successfully' });
    }

    async login(req, res, next) {
        const { login, password } = req.body;
        const user = await User.findOne({ where: { login } });
        if (!user) {
            return next(ApiError.badRequest("Пользователь не найден"));
        }
        const comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.badRequest('Неверный пароль'));
        }
        const token = generateJwt(user.id, user.login, user.role, user.name, user.surname);

        // Установка токена в HTTP-only cookie
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ id: user.id, name: user.name, surname: user.surname });
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.login, req.user.role);
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000
        });
        return res.status(200).json({ message: 'Token refreshed' });
    }
}

module.exports = new UsersController();
