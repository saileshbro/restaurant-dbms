const router = require('express').Router();
const menuController = require('../controllers/menuController');

router.post('/menu', menuController.addMenu);
router.get('/menu', menuController.getMenus);
router.get('/menu/activeMenu', menuController.getActiveMenu);
router.post('/menu/menuContents/:menu_name', menuController.addMenuContents);
router.patch('/menu/:menu_name', menuController.updateMenu);

module.exports = router;