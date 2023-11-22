const Router = require('express').Router
const router = new Router()
const {body} = require('express-validator')
const UserController = require("../application/controllers/UserController")

router.post('/registration',
    body('username').isLength({ min: 3, max: 32 }),
    body('password').isLength({ min: 3, max: 32 }),
    UserController.registration)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/refresh', UserController.refresh)

module.exports = router