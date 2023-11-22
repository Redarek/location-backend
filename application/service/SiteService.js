const SiteRepository = require('../../infrastructure/repositories/SiteRepository')
const BuildingRepository = require('../../infrastructure/repositories/BuildingRepository')
const FloorRepository = require('../../infrastructure/repositories/FloorRepository')
const WallTypeRepository = require('../../infrastructure/repositories/WallTypeRepository')
const WallRepository = require('../../infrastructure/repositories/WallRepository')
const {Floor} = require("../../infrastructure/models/models");

class SiteService {
    async create(name, description, userId) {
        return await SiteRepository.create(name, description, userId)
    }

    async get(siteId) {
        return await SiteRepository.get(siteId)
    }

    async getFull(siteId) {
        const site = await SiteRepository.get(siteId)
        site.dataValues.buildings = []
        console.log(site.dataValues)
        const buildings = await BuildingRepository.getAll(siteId)
        site.dataValues.buildings = buildings.rows
        for (let i = 0; i < site.dataValues.buildings.length; i++) {
            const floors = await FloorRepository.getAll(site.dataValues.buildings[i].id)
            console.log(site.dataValues.buildings[i])
            site.dataValues.buildings[i].dataValues.floors = []
            site.dataValues.buildings[i].dataValues.floors = floors.rows
            for (let j = 0; j < site.dataValues.buildings[i].dataValues.floors.length; j++) {
                const walls = await WallRepository.getAll(site.dataValues.buildings[i].dataValues.floors[j].id)
                site.dataValues.buildings[i].dataValues.floors[j].dataValues.walls = []
                site.dataValues.buildings[i].dataValues.floors[j].dataValues.walls = walls.rows
            }
        }
        const wallTypes = await WallTypeRepository.getAll(siteId)
        site.dataValues.wallTypes = []
        site.dataValues.wallTypes = wallTypes.rows
        return site
    }

    async getAll(userId) {
        return await SiteRepository.getAll(userId)
    }

    async getAllFull(userId) {
        const sites = await this.getAll(userId)
        console.log(sites)
        const fullSites = []
        for (let i = 0; i < sites.rows.length; i++) {
            console.log(sites.rows[i].id)
            fullSites.push(await this.getFull(sites.rows[i].id))
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
