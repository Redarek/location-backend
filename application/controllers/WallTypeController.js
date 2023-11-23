const WallTypeService = require('../service/WallTypeService')

class WallTypeController {
    async create(req, res, next) {
        try {
            const {name, color, attenuation1, attenuation2, attenuation3, thickness, siteId} = req.body
            const wallType = await WallTypeService.create(name, color, attenuation1, attenuation2, attenuation3, thickness, siteId)
            return res.json(wallType)
        } catch (error) {
            next(error)
        }
    }

    async get(req, res, next) {
        try {
            const wallTypeId = req.query['id']
            const wallType = await WallTypeService.get(wallTypeId)
            return res.json(wallType)
        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const siteId = req.query['id']
            const wallTypes = await WallTypeService.getAll(siteId)
            return res.json(wallTypes)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const {name, color, attenuation1, attenuation2, attenuation3, thickness, id} = req.body;
            const wallType = await WallTypeService.update(name, color, attenuation1, attenuation2, attenuation3, thickness, id)
            return res.json(wallType)
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const wallTypeId = req.query['id']
            const wallType = await WallTypeService.delete(wallTypeId)
            return res.json(wallType)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new WallTypeController()