const Router = require('express').Router;
const router = new Router();

const userRouter = require('./userRouter')
const siteRouter = require('./siteRouter')
const buildingRouter = require('./buildingRouter')
const floorRouter = require('./floorRouter')
const wallTypeRouter = require('./wallTypeRouter')
const wallRouter = require('./wallRouter')

router.use('/user', userRouter)
router.use('/site', siteRouter)
router.use('/building', buildingRouter)
router.use('/floor', floorRouter)
router.use('/wallType', wallTypeRouter)
router.use('/wall', wallRouter)

module.exports = router;
