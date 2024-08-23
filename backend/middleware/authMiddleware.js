const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        const token = req.cookies.authToken; // Получаем токен из cookies
        if (!token) {
            return res.status(401).json({ message: 'Не авторизован' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded; // Добавляем информацию о пользователе в запрос
        next();
    } catch (e) {
        res.status(401).json({ message: 'Не авторизован' });
    }
};
