const sequelize = require('../../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    password: {type: DataTypes.STRING},
    username: {type: DataTypes.STRING, unique: true},
    deletedAt: {type: DataTypes.DATE}
})

const RoleNames = ['admin', 'user']

const Role = sequelize.define('role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.ENUM, values: RoleNames},
    deletedAt: {type: DataTypes.DATE}
})

const UserRole = sequelize.define('user_role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, deletedAt: {type: DataTypes.DATE}
})

User.belongsToMany(Role, {through: UserRole})
Role.belongsToMany(User, {through: UserRole})

const RefreshToken = sequelize.define('refresh_token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, token: {type: DataTypes.STRING(1500)}
})

User.hasMany(RefreshToken, { onDelete: 'CASCADE' })
RefreshToken.belongsTo(User)

const Site = sequelize.define('site', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    deletedAt: {type: DataTypes.DATE}
})

User.hasMany(Site, { onDelete: 'CASCADE' })
Site.belongsTo(User)

const Building = sequelize.define('building', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    description: {type: DataTypes.STRING},
    country: {type: DataTypes.STRING},
    city: {type: DataTypes.STRING},
    address: {type: DataTypes.STRING},
    deletedAt: {type: DataTypes.DATE}
})

Site.hasMany(Building, { onDelete: 'CASCADE' })
Building.belongsTo(Site)

const Floor = sequelize.define('floor', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    number: {type: DataTypes.INTEGER},
    image: {type: DataTypes.STRING},
    scale: {type: DataTypes.STRING},
    deletedAt: {type: DataTypes.DATE}
})

Building.hasMany(Floor, { onDelete: 'CASCADE' })
Floor.belongsTo(Building)

const AccessPoint = sequelize.define('access_point', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    x1: {type: DataTypes.INTEGER},
    y1: {type: DataTypes.INTEGER},
    x2: {type: DataTypes.INTEGER},
    y2: {type: DataTypes.INTEGER},
    deletedAt: {type: DataTypes.DATE}
})

Floor.hasMany(AccessPoint, { onDelete: 'CASCADE' })
AccessPoint.belongsTo(Floor)

const Sensor = sequelize.define('sensor', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    x: {type: DataTypes.INTEGER},
    y: {type: DataTypes.INTEGER},
    deletedAt: {type: DataTypes.DATE}
})

Floor.hasMany(Sensor, { onDelete: 'CASCADE' })
Sensor.belongsTo(Floor)

const RadiationPattern = sequelize.define('radiation_pattern', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    path: {type: DataTypes.STRING},
    deletedAt: {type: DataTypes.DATE}
})

Sensor.hasOne(RadiationPattern)
RadiationPattern.belongsTo(Sensor)

const Wall = sequelize.define('wall', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    x1: {type: DataTypes.INTEGER},
    y1: {type: DataTypes.INTEGER},
    x2: {type: DataTypes.INTEGER},
    y2: {type: DataTypes.INTEGER},
    deletedAt: {type: DataTypes.DATE}
})

Floor.hasMany(Wall, { onDelete: 'CASCADE' })
Wall.belongsTo(Floor)

const WallType = sequelize.define('wall_type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    color: {type: DataTypes.STRING},
    attentuation1: {type: DataTypes.FLOAT},
    attentuation2: {type: DataTypes.FLOAT},
    attentuation3: {type: DataTypes.FLOAT},
    thickness: {type: DataTypes.FLOAT},
    deletedAt: {type: DataTypes.DATE}
})

WallType.hasOne(Wall)
Wall.belongsTo(WallType)

Site.hasMany(WallType, { onDelete: 'CASCADE' })
WallType.belongsTo(Site)

module.exports = {
    User,
    Role,
    UserRole,
    RefreshToken,
    Wall,
    WallType,
    Sensor,
    AccessPoint,
    Site,
    Building,
    Floor,
    RadiationPattern
}