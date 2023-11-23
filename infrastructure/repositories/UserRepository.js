const ApiError = require("../../application/exceptions/ApiError");
const {UserRole, User, Role} = require("../models/models");

class UserRepository {
    async registration(username, password) {
        const candidate = await this.getUserByUsername(username)
        // Проверяем, есть ли email в БД
        if (candidate) {
            throw ApiError.badRequest(`Пользователь с username ${username} уже существует`);
        }
        const user = await User.create({username: username, password: password})
        return user.get()
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
        const user = await User.findOne({where: {username: username}})
        return user.get()
    }

    async updateUser(id, data) {
        const user = await User.update(data, {where: {id: id}})
        return user
    }

}

module.exports = new UserRepository()