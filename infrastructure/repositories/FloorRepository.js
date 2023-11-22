const {Floor} = require("../models/models");

class FloorRepository {
    async create(name, number, scale, buildingId, fileName) {
        const floor = await Floor.create({
            name: name, number: number, image: fileName, scale: scale, buildingId: buildingId
        })
        return floor.get()
    }

    async get(floorId) {
        const floor = await Floor.findOne({where: {id: floorId}})
        return floor.get()
    }

    async getAll(buildingId) {
        const floors = await Floor.findAll({where: {buildingId: buildingId}})
        return floors.map((row) => row.get())
    }

    async update(name, number, scale, floorId) {
        const floor = await Floor.update({name: name, number: number, scale: scale}, {where: {id: floorId}})
        return floor.get()
    }

    async updateImage(floorId, fileName) {
        const floor = await Floor.update({image: fileName}, {where: {id: floorId}})
        return floor.get()
    }

    async delete(floorId) {
        return await Floor.destroy({where: {id: floorId}})
    }

}

module.exports = new FloorRepository()