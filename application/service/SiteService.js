const SiteRepository = require('../../infrastructure/repositories/SiteRepository')
const BuildingRepository = require('../../infrastructure/repositories/BuildingRepository')
const FloorRepository = require('../../infrastructure/repositories/FloorRepository')
const WallTypeRepository = require('../../infrastructure/repositories/WallTypeRepository')
const WallRepository = require('../../infrastructure/repositories/WallRepository')
const WallDto = require("../../domain/wall/WallDto");

class SiteService {
    async create(name, description, userId) {
        return await SiteRepository.create(name, description, userId)
    }

    async get(siteId) {
        return await SiteRepository.get(siteId)
    }

    async getFull(siteId) {
        const site = await SiteRepository.get(siteId)
        const wallTypes = await WallTypeRepository.getAll(siteId)
        site.wallTypes = []
        site.wallTypes = wallTypes
        const buildings = await BuildingRepository.getAll(siteId)
        site.buildings = []
        site.buildings = buildings
        for (let i = 0; i < site.buildings.length; i++) {
            const floors = await FloorRepository.getAll(site.buildings[i].id)
            site.buildings[i].floors = []
            site.buildings[i].floors = floors
            for (let j = 0; j < site.buildings[i].floors.length; j++) {
                const walls = await WallRepository.getAll(site.buildings[i].floors[j].id)
                site.buildings[i].floors[j].walls = []
                site.buildings[i].floors[j].walls = walls
                for (let k = 0; k < site.buildings[i].floors[j].walls.length; k++) {
                    for (let n = 0; n < site.wallTypes.length; n++) {
                        // console.log(site.buildings[i].floors[j].walls[k])
                        // console.log(site.wallTypes[n])
                        if (site.buildings[i].floors[j].walls[k].wallTypeId === site.wallTypes[n].id) {
                            site.buildings[i].floors[j].walls[k] = new WallDto(site.buildings[i].floors[j].walls[k], site.wallTypes[n])
                        }
                    }
                }
            }
        }
        return site
    }

    async getAll(userId) {
        return await SiteRepository.getAll(userId)
    }

    async getAllFull(userId) {
        const sites = await this.getAll(userId)
        const fullSites = []
        for (let i = 0; i < sites.length; i++) {
            fullSites.push(await this.getFull(sites[i].id))
        }
        return fullSites
    }

    async update(name, description, siteId) {
        return await SiteRepository.update(name, description, siteId)
    }

    async delete(siteId) {
        return await SiteRepository.delete(siteId)
    }
}

module.exports = new SiteService();
