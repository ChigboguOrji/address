var express = require('express');
var router = express.Router();
var address_controller = require('../controllers/address-controller');


router.use(function (req, res, next) {
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
});


router.get('/', address_controller.allContacts);


router.get('/add/', address_controller.addContactGet);

router.post('/add/', address_controller.addContactPost);

router.get('/delete/:id', address_controller.deleteContactPost);

router.get('/edit/:id', address_controller.editContactGet);

router.post('/edit/', address_controller.editContactPost);

module.exports = router;