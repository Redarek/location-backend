const BuildingService = require('../service/BuildingService')

class BuildingController {
    async create(req, res, next) {
        try {
            const {name, description, country, city, address, siteId} = req.body
            const building = await BuildingService.create(name, description, country, city, address, siteId)
            return res.json(building)
        } catch (error) {
            next(error)
        }
    }

    async get(req, res, next) {
        try {
            const buildingId = req.query['id']
            const building = await BuildingService.get(buildingId)
            return res.json(building)
        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const siteId = req.query['id']
            const buildings = await BuildingService.getAll(siteId)
            return res.json(buildings)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const {name, description, country, city, address, id} = req.body
            const building = await BuildingService.update(name, description, country, city, address, id)
            return res.json(building)
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const buildingId = req.query['id']
            const building = await BuildingService.delete(buildingId)
            return res.json(building)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new BuildingController()