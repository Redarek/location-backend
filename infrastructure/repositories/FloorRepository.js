const {Floor} = require("../models/models");

class FloorRepository {
    async create(name, number, scale, buildingId) {
        const floor = await Floor.create({
            name: name, number: number, scale: scale, buildingId: buildingId
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
        return await Floor.update({name: name, number: number, scale: scale}, {where: {id: floorId}})
    }

    async patch(floorId, name, number, filename=undefined) {
        const floor = await Floor.findByPk(floorId)
        if (name !== undefined) floor.name = name
        if (number !== undefined) floor.number = number
        if (filename !== undefined) floor.image = filename
        await floor.save()
        return floor.get()
    }

    async delete(floorId) {
        return await Floor.destroy({where: {id: floorId}})
    }

}

module.exports = new FloorRepository()