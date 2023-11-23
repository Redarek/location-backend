const {Site} = require("../models/models");

class SiteRepository {
    async create(name, description, userId) {
        const site = await Site.create({
            name: name, description: description, userId: userId
        })
        return site.get()
    }

    async get(siteId) {
        const site = await Site.findOne({where: {id: siteId}})
        return site.get()
    }

    async getAll(userId) {
        const sites = await Site.findAll({where: {userId: userId}})
        return sites.map((row) => row.get())
    }

    async update(name, description, siteId) {
        return await Site.update({name: name, description: description}, {where: {id: siteId}})
    }

    async delete(siteId) {
        return await Site.destroy({where: {id: siteId}})
    }

}

module.exports = new SiteRepository()