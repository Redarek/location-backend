const FloorRepository = require('../../infrastructure/repositories/FloorRepository')
const uuid = require("uuid")
const path = require('path')
const fs = require("fs");
const ApiError = require('../exceptions/ApiError');

class FloorService {
    async create(name, number, scale, buildingId) {
        return await FloorRepository.create(name, number, scale, buildingId)
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

    async patch(floorId, name=undefined, number=undefined, scale=undefined,  image=undefined) {
        if (image !== undefined) {
            await this.deleteImage(floorId)
            const extension = image.name.split('.').pop()
            const filename = `${uuid.v4()}.${extension}`
            await image.mv(path.resolve(__dirname, '../..', 'static', filename))
            return await FloorRepository.patch(floorId, name, number, scale, filename)
        } else {
            return await FloorRepository.patch(floorId, name, number, scale)
        }
    }

    async delete(floorId) {
        await this.deleteImage(floorId)
        return await FloorRepository.delete(floorId)
    }

    async deleteImage(floorId) {
        const floor = await FloorRepository.get(floorId)
        if (floor.image) {
            const filePath = path.resolve(__dirname, '../..', 'static', floor.image)
            // Check if the file exists
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath)
                console.log('File deleted successfully')
                return await FloorRepository.patch(floorId, undefined, undefined, undefined, null)
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
