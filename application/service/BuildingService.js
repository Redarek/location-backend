const BuildingRepository = require('../../infrastructure/repositories/BuildingRepository')

class BuildingService {
    async create(name, description, country, city, address, siteId) {
        return await BuildingRepository.create(name, description, country, city, address, siteId)
    }

    async get(buildingId) {
        return await BuildingRepository.get(buildingId)
    }

    async getAll(siteId) {
        return await BuildingRepository.getAll(siteId)
    }

    async update(name, description, country, city, address, buildingId) {
        return await BuildingRepository.update(name, description, country, city, address, buildingId)
    }

    async delete(buildingId) {
        return await BuildingRepository.delete(buildingId)
    }
}

module.exports = new BuildingService();
