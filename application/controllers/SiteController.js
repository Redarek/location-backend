const SiteService = require('../service/SiteService')

class SiteController {
    async create(req, res, next) {
        try {
            const {name, description} = req.body
            const userId = req.user.id
            const site = await SiteService.create(name, description, userId)
            return res.json(site)
        } catch (error) {
            next(error)
        }
    }

    async get(req, res, next) {
        try {
            const siteId = req.query['id']
            const site = await SiteService.get(siteId)
            return res.json(site)
        } catch (error) {
            next(error)
        }
    }

    async getFull(req, res, next) {
        try {
            const siteId = req.query['id']
            const site = await SiteService.getFull(siteId)
            return res.json(site)
        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const userId = req.user.id
            const sites = await SiteService.getAll(userId)
            return res.json(sites)
        } catch (error) {
            next(error)
        }
    }

    async getAllFull(req, res, next) {
        try {
            const userId = req.user.id
            const sites = await SiteService.getAllFull(userId)
            return res.json(sites)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const {name, description, id} = req.body
            const site = await SiteService.update(name, description, id)
            return res.json(site)
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const siteId = req.query['id']
            const site = await SiteService.delete(siteId)
            return res.json(site)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new SiteController();