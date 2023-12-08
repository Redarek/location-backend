const WallService = require('../service/WallService')

class WallController {
    async create(req, res, next) {
        try {
            const {x1, y1, x2, y2, wallTypeId, floorId} = req.body
            const wall = await WallService.create(x1, y1, x2, y2, wallTypeId, floorId)
            return res.json(wall)
        } catch (error) {
            next(error)
        }
    }

    async get(req, res, next) {
        try {
            const wallId = req.query['id']
            const wall = await WallService.get(wallId)
            return res.json(wall)
        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const floorId = req.query['id']
            const walls = await WallService.getAll(floorId)
            return res.json(walls)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const {x1, y1, x2, y2, wallTypeId, wallId} = req.body
            const wall = await WallService.update(x1, y1, x2, y2, wallTypeId, wallId)
            return res.json(wall)
        } catch (error) {
            next(error)
        }
    }

    async updateCoords(req, res, next) {
        try {
            const {x1, y1, x2, y2, wallId} = req.body
            const wall = await WallService.updateCoords(x1, y1, x2, y2, wallId)
            return res.json(wall)
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const wallId = req.query['id']
            const wall = await WallService.delete(wallId)
            return res.json(wall)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new WallController()