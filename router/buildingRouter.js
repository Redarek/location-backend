const Router = require('express').Router;
const router = new Router();
const BuildingController = require("../application/controllers/BuildingController");
const authMiddleware = require("../application/middlewares/authMiddleware");

router.post('/', authMiddleware, BuildingController.create);
router.get('/', authMiddleware, BuildingController.get);
router.get('/all', authMiddleware, BuildingController.getAll);
router.put('/', authMiddleware, BuildingController.update);
router.delete('/', authMiddleware, BuildingController.delete);

module.exports = router