const Router = require('express').Router;
const router = new Router();
const authMiddleware = require("../application/middlewares/authMiddleware");
const WallController = require("../application/controllers/WallController");

router.post('/', authMiddleware, WallController.create);
router.get('/', authMiddleware, WallController.get);
router.get('/all', authMiddleware, WallController.getAll);
router.put('/', authMiddleware, WallController.update);
router.patch('/', authMiddleware, WallController.updateCoords);
router.delete('/', authMiddleware, WallController.delete);

module.exports = router