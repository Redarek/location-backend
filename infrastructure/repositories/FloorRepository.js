const {Floor} = require("../models/models");

class FloorRepository {
    async create(name, number, scale, buildingId, fileName) {
        return await Floor.create({
            name: name, number: number, image: fileName, scale: scale, buildingId: buildingId
        })
    }

    async get(floorId) {
        return await Floor.findOne({where: {id: floorId}})
    }

    async getAll(buildingId) {
        return await Floor.findAndCountAll({where: {buildingId: buildingId}})
    }

    async update(name, number, scale, floorId) {
        return await Floor.update({name: name, number: number, scale: scale}, {where: {id: floorId}})
    }

    async updateImage(floorId, fileName) {
        return await Floor.update({image: fileName}, {where: {id: floorId}})
    }

    async delete(floorId) {
        return await Floor.destroy({where: {id: floorId}})
    }

}

module.exports = new FloorRepository()