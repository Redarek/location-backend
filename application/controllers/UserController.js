const UserService = require('../service/UserService');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/ApiError');

class UserController {
    async registration(req, res, next) {
        const {username, password} = req.body; //вытаскиваем из тела запроса почту и пароль
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return next(ApiError.badRequest('Ошибка при валидации', errors.array()))
        }
        try {
            const userData = await UserService.registration(username, password)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'none', secure: true
            })
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const {username, password} = req.body;
            const userData = await UserService.login(username, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'none', secure: true
            });
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies; // вытаскиваем рефреш-токен  из куки
            const token = await UserService.logout(refreshToken); // передаем рефреш-токен в юзер сервис
            res.clearCookie('refreshToken'); // удаляем рефреш-токен из куки
            return res.json(token);
        } catch (error) {
            next(error);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'none', secure: true
            });
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
