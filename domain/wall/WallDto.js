module.exports = class UserDto {
    id
    x1
    y1
    x2
    y2
    color
    attentuation1
    attentuation2
    attentuation3
    thickness

    constructor(wall, wallType) {
        this.id = wall.id
        this.x1 = wall.x1
        this.y1 = wall.y1
        this.x2 = wall.x2
        this.y2 = wall.y2
        this.color = wallType.color
        this.attentuation1 = wallType.attentuation1
        this.attentuation2 = wallType.attentuation2
        this.attentuation3 = wallType.attentuation3
        this.thickness = wallType.thickness
    }
}
