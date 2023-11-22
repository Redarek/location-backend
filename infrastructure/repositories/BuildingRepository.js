const {Building} = require("../models/models");

class BuildingRepository {
    async create(name, description, country, city, address, siteId) {
        return await Building.create({
            name: name, description: description, country: country, city: city, address: address, siteId: siteId
        })
    }

    async get(buildingId) {
        return await Building.findOne({where: {id: buildingId}})
    }

    async getAll(siteId) {
        return await Building.findAndCountAll({where: {siteId: siteId}})
    }

    async update(name, description, country, city, address, buildingId) {
        return await Building.update({name: name, description: description, country: country, city: city, address: address}, {where: {id: buildingId}})
    }

    async delete(buildingId) {
        return await Building.destroy({where: {id: buildingId}})
    }

}

module.exports = new BuildingRepository()