module.exports = class WallDto {
    id
    x1
    y1
    x2
    y2
    floorId
    wallTypeId
    color
    attenuation1
    attenuation2
    attenuation3
    thickness
    createdAt
    updatedAt
    deletedAt

    constructor(wall, wallType) {
        this.id = wall.id
        this.x1 = wall.x1
        this.y1 = wall.y1
        this.x2 = wall.x2
        this.y2 = wall.y2
        this.floorId = wall.floorId
        this.wallTypeId = wall.wallTypeId
        this.color = wallType.color
        this.attenuation1 = wallType.attenuation1
        this.attenuation2 = wallType.attenuation2
        this.attenuation3 = wallType.attenuation3
        this.thickness = wallType.thickness
        this.createdAt = wall.createdAt
        this.updatedAt = wall.updatedAt
        this.deletedAt = wall.deletedAt
    }
}
