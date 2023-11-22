const {Building} = require("../models/models");

class BuildingRepository {
    async create(name, description, country, city, address, siteId) {
        const building = await Building.create({
            name: name, description: description, country: country, city: city, address: address, siteId: siteId
        })
        return building.get()
    }

    async get(buildingId) {
        const building = await Building.findOne({where: {id: buildingId}})
        return building.get()
    }

    async getAll(siteId) {
        const buildings = await Building.findAll({where: {siteId: siteId}})
        return buildings.map((row) => row.get())
    }

    async update(name, description, country, city, address, buildingId) {
        const building = await Building.update({name: name, description: description, country: country, city: city, address: address}, {where: {id: buildingId}})
        return building.get()
    }

    async delete(buildingId) {
        return await Building.destroy({where: {id: buildingId}})
    }

}

module.exports = new BuildingRepository()