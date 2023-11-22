const jwt = require('jsonwebtoken');
const {RefreshToken} = require('../../infrastructure/models/models');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '1d'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
        return {
            accessToken, refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        } catch (error) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        } catch (error) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await RefreshToken.findOne({where: {userId: userId}})
        if (tokenData) {
            return await RefreshToken.update({token: refreshToken}, {where: {userId: userId}})
        }
        return await RefreshToken.create({token: refreshToken, userId: userId})
    }

    async removeToken(refreshToken) {
        return await RefreshToken.destroy({where: {token: refreshToken}})
    }

    async findToken(refreshToken) {
        return await RefreshToken.findOne({where: {token: refreshToken}})
    }

    validateRole(token, roles) {
        try {
            const {roles: userRoles} = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            let hasRole = false
            userRoles.forEach(role => {
                if (roles.includes(role)) { //проверяем, содержит ли массив ролей пользователя, хотя бы одну роль, которая разрешена для данной функции
                    hasRole = true
                }
            })
            return hasRole;
        } catch (error) {
            return null;
        }
    }

}

module.exports = new TokenService();