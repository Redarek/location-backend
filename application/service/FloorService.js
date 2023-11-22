const FloorRepository = require('../../infrastructure/repositories/FloorRepository')
const uuid = require("uuid")
const path = require('path')
const fs = require("fs");
const ApiError = require('../exceptions/ApiError');

class FloorService {
    async create(name, number, scale, buildingId, img) {
        const extension = img.name.split('.').pop()
        const fileName = `${uuid.v4()}.${extension}`
        await img.mv(path.resolve(__dirname, '..', 'static', fileName))
        return await FloorRepository.create(name, number, scale, buildingId, fileName)
    }

    async get(floorId) {
        return await FloorRepository.get(floorId)
    }

    async getAll(buildingId) {
        return await FloorRepository.getAll(buildingId)
    }

    async update(name, number, scale, floorId) {
        return await FloorRepository.update(name, number, scale, floorId)
    }

    async updateImage(floorId, img) {
        await this.deleteImage(floorId)
        const extension = img.name.split('.').pop()
        const fileName = `${uuid.v4()}.${extension}`
        await img.mv(path.resolve(__dirname, '..', 'static', fileName))
        return await FloorRepository.updateImage(floorId, fileName)
    }

    async delete(floorId) {
        await this.deleteImage(floorId)
        return await FloorRepository.delete(floorId)
    }

    async deleteImage(floorId) {
        const floor = await FloorRepository.get(floorId)
        if (floor) {
            const fileName = floor.image;
            const filePath = path.resolve(__dirname, '..', 'static', fileName)
            // Check if the file exists
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath)
                console.log('File deleted successfully')
                return await FloorRepository.updateImage(floorId, null)
            } else {
                console.log('File not found')
                return ApiError.badRequest('File not found')
            }
        } else {
            console.log('Floor not found')
            return ApiError.badRequest('Floor not found')
        }
    }
}

module.exports = new FloorService();
