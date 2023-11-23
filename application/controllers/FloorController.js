const FloorService = require('../service/FloorService')
class FloorController {
    async create(req, res, next) {
        try {
            const {name, number, scale, buildingId} = req.body
            const floor = await FloorService.create(name, number, scale, buildingId)
            return res.json(floor);
        } catch (error) {
            next(error);
        }
    }

    async get(req, res, next) {
        try {
            const floorId = req.query['id']
            const floor = await FloorService.get(floorId)
            return res.json(floor);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const buildingId = req.query['id']
            const floors = await FloorService.getAll(buildingId)
            return res.json(floors);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const {name, number, scale, id} = req.body;
            const floor = await FloorService.update(name, number, scale, id)
            return res.json(floor);
        } catch (error) {
            next(error);
        }
    }

    async patch(req, res, next)    {
        try {
            const {id, name, number} = req.body
            if (!req.files || Object.keys(req.files).length === 0) {
                const floor = await FloorService.patch(id, name, number)
                return res.json(floor);
            } else {
                const {image} = req.files
                const floor = await FloorService.patch(id, name, number, image)
                return res.json(floor);
            }
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const floorId = req.query['id']
            const floor = await FloorService.delete(floorId)
            return res.json(floor);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new FloorController();