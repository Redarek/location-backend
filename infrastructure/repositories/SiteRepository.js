const {Site} = require("../models/models");

class SiteRepository {
    async create(name, description, userId) {
        return await Site.create({
            name: name, description: description, userId: userId
        })
    }

    async get(siteId) {
        return await Site.findOne({where: {id: siteId}})
    }

    async getAll(userId) {
        return await Site.findAndCountAll({where: {userId: userId}})
    }

    async update(name, description, siteId) {
        return await Site.update({name: name, description: description}, {where: {id: siteId}})
    }

    async delete(siteId) {
        return await Site.destroy({where: {id: siteId}})
    }

}

module.exports = new SiteRepository()