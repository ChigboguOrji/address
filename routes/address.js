var express = require('express');
var router = express.Router();
var address_controller = require('../controllers/address-controller');


router.use(function (req, res, next) {
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
});


router.get('/', address_controller.home);


router.get('/add/', address_controller.getAddPage);

router.post('/add/', address_controller.add_address);

router.get('/delete/:id', address_controller.deleteAddr);

router.get('/edit/:id', address_controller.editAddr);

router.post('/edit/', address_controller.editMyAddr);

module.exports = router;