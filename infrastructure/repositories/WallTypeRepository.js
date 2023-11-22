const {WallType} = require("../models/models");

class WallTypeRepository {
    async create(name, color, attentuation1, attentuation2, attentuation3, thickness, siteId) {
        return await WallType.create({
            name: name,
            color: color,
            attentuation1: attentuation1,
            attentuation2: attentuation2,
            attentuation3: attentuation3,
            thickness: thickness,
            siteId: siteId
        })
    }

    async get(wallTypeId) {
        return await WallType.findOne({where: {id: wallId}})
    }

    async getAll(siteId) {
        return await WallType.findAndCountAll({where: {siteId: siteId}})
    }

    async update(name, color, attentuation1, attentuation2, attentuation3, thickness, wallTypeId) {
        return await WallType.update({
            name: name,
            color: color,
            attentuation1: attentuation1,
            attentuation2: attentuation2,
            attentuation3: attentuation3,
            thickness: thickness
        }, {where: {id: wallTypeId}})
    }

    async delete(wallTypeId) {
        return await WallType.destroy({where: {id: wallTypeId}})
    }

}

module.exports = new WallTypeRepository()