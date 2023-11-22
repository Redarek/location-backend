const Router = require('express').Router;
const router = new Router();
const SiteController = require("../application/controllers/SiteController");
const authMiddleware = require("../application/middlewares/authMiddleware");

router.post('/', authMiddleware, SiteController.create);
router.get('/', authMiddleware, SiteController.get);
router.get('/full', authMiddleware, SiteController.getFull);
router.get('/all', authMiddleware, SiteController.getAll);
router.get('/all/full', authMiddleware, SiteController.getAllFull);
router.put('/', authMiddleware, SiteController.update);
router.delete('/', authMiddleware, SiteController.delete);

module.exports = router