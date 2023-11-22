const {Wall} = require("../models/models");

class WallRepository {
    async create(x1, y1, x2, y2, wallTypeId, floorId) {
        const wall = await Wall.create({x1: x1, y1: y1, x2: x2, y2: y2, wallTypeId: wallTypeId, floorId: floorId})
        return wall.get()
    }

    async get(wallId) {
        const wall = await Wall.findOne({where: {id: wallId}})
        return wall.get()
    }

    async getAll(floorId) {
        const walls = await Wall.findAll({where: {floorId: floorId}})
        return walls.map((row) => row.get())
    }

    async update(x1, y1, x2, y2, typeId, wallId) {
        const wall = await Wall.update({x1: x1, y1: y1, x2: x2, y2: y2, typeId: typeId}, {where: {id: wallId}})
        return wall.get()
    }

    async updateCoords(x1, y1, x2, y2, wallId) {
        const wall = await Wall.update({x1: x1, y1: y1, x2: x2, y2: y2}, {where: {id: wallId}})
        return wall.get()
    }

    async delete(wallId) {
        return await Wall.destroy({where: {id: wallId}})
    }

}

module.exports = new WallRepository()