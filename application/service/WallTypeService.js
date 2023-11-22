const WallTypeRepository = require('../../infrastructure/repositories/WallTypeRepository')

class WallTypeService {
    async create(name, color, attentuation1, attentuation2, attentuation3, thickness, siteId) {
        return await WallTypeRepository.create(name, color, attentuation1, attentuation2, attentuation3, thickness, siteId)
    }

    async get(wallTypeId) {
        return await WallTypeRepository.get(wallTypeId)
    }

    async getAll(siteId) {
        return await WallTypeRepository.getAll(siteId)
    }

    async update(name, color, attentuation1, attentuation2, attentuation3, thickness, wallTypeId) {
        return await WallTypeRepository.update(name, color, attentuation1, attentuation2, attentuation3, thickness, wallTypeId)
    }

    async delete(wallTypeId) {
        return await WallTypeRepository.delete(wallTypeId)
    }
}

module.exports = new WallTypeService();
