module.exports = class SiteDto {
    id
    name
    description
    buildings

    constructor(model) {
        this.id = model.id
        this.name = model.name
        this.description = model.description
        this.buildings = []
    }
}
