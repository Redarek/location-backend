const WallRepository = require('../../infrastructure/repositories/WallRepository')

class WallService {
    async create(x1, y1, x2, y2, wallTypeId, floorId) {
        return await WallRepository.create(x1, y1, x2, y2, wallTypeId, floorId)
    }

    async get(wallId) {
        return await WallRepository.get(wallId)
    }

    async getAll(floorId) {
        return await WallRepository.getAll(floorId)
    }

    async update(x1, y1, x2, y2, typeId, floorId) {
        return await WallRepository.update(x1, y1, x2, y2, typeId, floorId)
    }

    async updateCoords(x1, y1, x2, y2, wallId) {
        return await WallRepository.updateCoords(x1, y1, x2, y2, wallId)
    }

    async delete(wallId) {
        return await WallRepository.delete(wallId)
    }
}

module.exports = new WallService();
