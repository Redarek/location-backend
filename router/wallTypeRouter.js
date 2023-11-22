const Router = require('express').Router;
const router = new Router();
const authMiddleware = require("../application/middlewares/authMiddleware");
const WallTypeController = require("../application/controllers/WallTypeController");

router.post('/', authMiddleware, WallTypeController.create);
router.get('/', authMiddleware, WallTypeController.get);
router.get('/all', authMiddleware, WallTypeController.getAll);
router.put('/', authMiddleware, WallTypeController.update);
router.delete('/', authMiddleware, WallTypeController.delete);

module.exports = router