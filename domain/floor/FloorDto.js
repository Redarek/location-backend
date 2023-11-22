module.exports = class FloorDto  {
    id
    name
    number
    image
    scale
    walls

    constructor(model) {
        this.id = model.id
        this.name = model.name
        this.number = model.number
        this.image = model.image
        this.scale = model.scale
        this.walls = []
    }
}
