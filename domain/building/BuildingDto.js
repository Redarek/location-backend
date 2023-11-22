module.exports = class BuildingDto {
    id
    name
    description
    country
    city
    address
    floors

    constructor(model) {
        this.id = model.id
        this.name = model.name
        this.description = model.description
        this.country = model.country
        this.city = model.city
        this.address = model.address
        this.floors = []
    }
}
