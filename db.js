const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    process.env.NODE_ENV === "production" ? process.env.DB_NAME : process.env.DB_NAME_DEV,
    process.env.NODE_ENV === "production" ? process.env.DB_USER : process.env.DB_USER_DEV,
    process.env.NODE_ENV === "production" ? process.env.DB_PASSWORD : process.env.DB_PASSWORD_DEV,
    {
        dialect: 'postgres',
        host: process.env.NODE_ENV === "production" ? process.env.DB_HOST : process.env.DB_HOST_DEV,
        port: process.env.NODE_ENV === "production" ? process.env.DB_PORT : process.env.DB_PORT_DEV
    }
)