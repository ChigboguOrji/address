/**
 * source too messy
 * gat to clean up soon
 */
var Address = require('../models/address-model');

exports.home = function (req, res, next) {
  Address.find().sort({
    added: -1
  }).exec(function (err, done) {
    if (err) return next(err);
    if (done) {
      res.render('address', {
        title: 'Address List',
        contact: done
      });
    }
  });
}

exports.getAddPage = function (req, res, next) {
  res.render('add-address', {
    title: 'Add an address',
    operation: 'add'
  })
}


exports.add_address = function (req, res, next) {
  var addrObj = {
    name: req.body.first_name,
    lastname: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    homephone: req.body.homephone,
    kin: req.body.kin
  };

  Address.findOne({
    name: addrObj.name,
    email: addrObj.email
  }, function (err, exist) {
    if (err) return next(err);
    if (exist) {
      req.flash('error', 'Address already exist');
      return res.redirect('/address/add/')
    }

    var contactAddr = new Address(addrObj);

    contactAddr.save(function (err, saved) {
      if (err) return next(err);
      if (saved) {
        req.flash('info', 'Address saved successfully');
        res.status(201);
        res.redirect('/address/add/');
      }
    })
  })
}


exports.deleteAddr = function (req, res, next) {
  var id = req.params.id
  Address.findOne({
    _id: id
  }, function (err, addr) {
    if (err) return next(err);
    if (addr) {
      addr.remove();
      req.flash('info', 'Address deleted');
      res.redirect('/address/')
    }
  })
}



exports.editAddr = function (req, res, next) {
  var id = req.params.id;

  Address.findOne({
    _id: id
  }, function (err, done) {
    if (err) return next(err);
    if (done) {
      res.render('add-address', {
        id: id,
        operation: 'edit',
        addrs: done
      })
    }
  })
}

exports.editMyAddr = function (req, res, next) {
  var newAdd = req.body;

  Address.findOne({
    name: newAdd.first_name,
    email: newAdd.email
  }, function (err, addrs) {
    if (err) return next(err);
    if (addrs) {
      addrs.update(function (err, done) {
        if (err) req.flash('error', 'Couldn\'t update address');
        if (done) {
          req.flash('info', 'Address updated successfully');
          res.status(303);
          res.redirect('/address/');
        }
      })
    }
  })
}