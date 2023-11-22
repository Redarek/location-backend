const {WallType} = require("../models/models");

class WallTypeRepository {
    async create(name, color, attentuation1, attentuation2, attentuation3, thickness, siteId) {
        const wallType = await WallType.create({
            name: name,
            color: color,
            attentuation1: attentuation1,
            attentuation2: attentuation2,
            attentuation3: attentuation3,
            thickness: thickness,
            siteId: siteId
        })
        return wallType.get()
    }

    async get(wallTypeId) {
        const wallType = await WallType.findOne({where: {id: wallTypeId}})
        return wallType.get()
    }

    async getAll(siteId) {
        const wallTypes = await WallType.findAll({where: {siteId: siteId}})
        return wallTypes.map((row) => row.get())
    }

    async update(name, color, attentuation1, attentuation2, attentuation3, thickness, wallTypeId) {
        const wallType = await WallType.update({
            name: name,
            color: color,
            attentuation1: attentuation1,
            attentuation2: attentuation2,
            attentuation3: attentuation3,
            thickness: thickness
        }, {where: {id: wallTypeId}})
        return wallType.get()
    }

    async delete(wallTypeId) {
        return await WallType.destroy({where: {id: wallTypeId}})
    }

}

module.exports = new WallTypeRepository()