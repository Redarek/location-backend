const bcrypt = require('bcrypt');
const TokenService = require('./TokenService');
const UserDto = require('../../domain/user/UserDto')
const ApiError = require('../exceptions/ApiError');
const UserRepository = require('../../infrastructure/repositories/UserRepository')

class UserService {
    async registration(username, password, image) {
        const hashPassword = await bcrypt.hash(password, 3); //хэшируем пароль
        const user = await UserRepository.registration(username, hashPassword)
        const userDto = new UserDto(user); //передаём все данные о пользователе в DTO (Data Transfer Object) dto получаем на клиенте и dto нужен для отправки email письма
        const tokens = TokenService.generateTokens({ ...userDto }); // генерируем JWT токены
        await TokenService.saveToken(userDto.id, tokens.refreshToken); // сохраняем рефреш токен в БД

        // возвращаем инфу о польз-ле и токены
        return {
            ...tokens,
            user: userDto,
        }
    }

    async login(username, password) {
        const user = await UserRepository.getUserByUsername(username)
        if (!user) {
            throw ApiError.badRequest(`Пользователь с username ${username} не найден`)
        }

        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.badRequest('Неверный пароль')
        }
        const userDto = new UserDto(user); //генерируем dto, выбрасываем из модели всё ненужное
        const tokens = TokenService.generateTokens({ ...userDto }); // генерируем JWT токены
        await TokenService.saveToken(userDto.id, tokens.refreshToken); // сохраняем рефреш токен в БД

        // возвращаем инфу о польз-ле и токены
        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        return await TokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unauthorizedError();
        }
        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.unauthorizedError();
        }
        // console.log(userData);
        const user = await UserRepository.getUser(userData.id)
        // код ниже можно вынести в отдельную функцию
        const userDto = new UserDto(user); //генерируем dto, выбрасываем из модели всё ненужное
        const tokens = TokenService.generateTokens({ ...userDto }); // генерируем JWT токены
        await TokenService.saveToken(userDto.id, tokens.refreshToken); // сохраняем рефреш токен в БД

        // возвращаем инфу о польз-ле и токены
        return {
            ...tokens,
            user: userDto
        }
    }
}

module.exports = new UserService();
