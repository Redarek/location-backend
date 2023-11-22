const {Wall} = require("../models/models");

class WallRepository {
    async create(x1, y1, x2, y2, wallTypeId, floorId) {
        return await Wall.create({x1: x1, y1: y1, x2: x2, y2: y2, wallTypeId: wallTypeId, floorId: floorId})
    }

    async get(wallId) {
        return await Wall.findOne({where: {id: wallId}})
    }

    async getAll(floorId) {
        return await Wall.findAndCountAll({where: {floorId: floorId}})
    }

    async update(x1, y1, x2, y2, typeId, wallId) {
        return await Wall.update({x1: x1, y1: y1, x2: x2, y2: y2, typeId: typeId}, {where: {id: wallId}})
    }

    async updateCoords(x1, y1, x2, y2, wallId) {
        return await Wall.update({x1: x1, y1: y1, x2: x2, y2: y2}, {where: {id: wallId}})
    }

    async delete(wallId) {
        return await Wall.destroy({where: {id: wallId}})
    }

}

module.exports = new WallRepository()