const ApiError = require("../../application/exceptions/ApiError");
const {UserRole, User, Role} = require("../models/models");

class UserRepository {
    async registration(username, password) {
        const candidate = await this.getUserByUsername(username)
        // Проверяем, есть ли email в БД
        if (candidate) {
            throw ApiError.badRequest(`Пользователь с username ${username} уже существует`);
        }
        return await User.create({username: username, password: password})
    }

    async getUserRoles(userId) {
        const userRoles = await UserRole.findAll({where: {userId: userId}})
        const userRoleNames = []
        for (const userRole of userRoles) {
            const role = await Role.findOne({where: {id: userRole.roleId}});
            userRoleNames.push(role.name)
        }
        return userRoleNames
    }

    async getUserByUsername(username){
        return await User.findOne({where: {username: username}})
    }

    async updateUser(id, data) {
        return await User.update(data, {where: {id: id}})
    }

}

module.exports = new UserRepository()