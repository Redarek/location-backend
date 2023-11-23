const Router = require('express').Router;
const router = new Router();
const FloorController = require("../application/controllers/FloorController");
const authMiddleware = require("../application/middlewares/authMiddleware");

router.post('/', authMiddleware, FloorController.create);
router.get('/', authMiddleware, FloorController.get);
router.get('/all', authMiddleware, FloorController.getAll);
router.put('/', authMiddleware, FloorController.update);
router.delete('/', authMiddleware, FloorController.delete);
router.patch('/', authMiddleware, FloorController.patch)

module.exports = router